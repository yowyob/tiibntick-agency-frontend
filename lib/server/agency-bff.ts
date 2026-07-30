import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import {
  AUTH_COOKIE,
  SHARED_SESSION_COOKIE,
  requestToken,
  verifyRequestToken,
} from '@/lib/server/verify-auth'
import { handleFleetMan } from '@/lib/server/fleetman-bff'
import { streamCorePresence } from '@/lib/server/presence-stream'
import { streamAgencyNotifications } from '@/lib/server/notification-stream'

const CORE_BASE_URL = (
  process.env.TNT_CORE_BASE_URL ??
  process.env.CORE_BASE_URL ??
  'https://tiibntick-core.yowyob.com'
).replace(/\/+$/, '')

const CORE_CLIENT_ID =
  process.env.TNT_AGENCY_CLIENT_ID ??
  process.env.CORE_CLIENT_ID ??
  ''

const CORE_API_KEY =
  process.env.TNT_AGENCY_API_KEY ??
  process.env.CORE_API_KEY ??
  ''

const SEARCH_BASE_URL = (
  process.env.TNT_SEARCH_BASE_URL ??
  'http://localhost:8091'
).replace(/\/+$/, '')

type JsonRecord = Record<string, unknown>

function jsonRecord(value: unknown): JsonRecord {
  return typeof value === 'object' && value !== null
    ? value as JsonRecord
    : {}
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

/** Aligné sur KernelAuthService.deriveUsername du BFF Java. */
export function deriveUsername(email: string): string {
  const local = (email.split('@')[0] ?? '')
    .replace(/[^a-zA-Z0-9._-]/g, '.')
    .toLowerCase()
  if (!local) return 'agency.owner'
  return local.length > 48 ? local.slice(0, 48) : local
}

function unwrap(value: unknown): unknown {
  const root = jsonRecord(value)
  return root.data ?? value
}

function success(data: unknown, status = 200): NextResponse {
  return NextResponse.json(
    {
      status: 'SUCCESS',
      data,
      error: null,
      timestamp: new Date().toISOString(),
    },
    { status },
  )
}

function error(message: string, status = 500, code = 'BFF_ERROR'): NextResponse {
  return NextResponse.json(
    {
      status: 'ERROR',
      data: null,
      error: { code, message },
      timestamp: new Date().toISOString(),
    },
    { status },
  )
}

function coreHeaders(request: NextRequest, tenantId?: string): Headers {
  const headers = new Headers()
  const forwarded = [
    'authorization',
    'content-type',
    'accept',
    'x-user-id',
    'x-user-email',
    'x-user-role',
    'x-agency-id',
    'x-branch-id',
    'x-correlation-id',
  ]

  for (const name of forwarded) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }
  const claims = bearerClaims(request)
  const token = requestToken(request)
  const claimTenantId = stringValue(claims.tid) || stringValue(claims.tenantId)
  const claimUserId =
    stringValue(claims.sub) || stringValue(claims.userId) || stringValue(claims.uid)
  const claimAgencyId = stringValue(claims.aid) || stringValue(claims.agencyId)
  const claimEmail = stringValue(claims.email)
  const roles = tokenRoles(request)

  if (token) headers.set('authorization', `Bearer ${token}`)
  if (claimTenantId || tenantId) headers.set('x-tenant-id', claimTenantId || tenantId!)
  if (claimUserId) headers.set('x-user-id', claimUserId)
  if (claimAgencyId) headers.set('x-agency-id', claimAgencyId)
  if (claimEmail) headers.set('x-user-email', claimEmail)
  if (roles[0]) headers.set('x-user-role', roles[0].replace(/^ROLE_/, ''))
  if (CORE_CLIENT_ID) headers.set('x-client-id', CORE_CLIENT_ID)
  if (CORE_API_KEY) headers.set('x-api-key', CORE_API_KEY)
  return headers
}

async function bodyFor(request: NextRequest): Promise<ArrayBuffer | undefined> {
  if (request.method === 'GET' || request.method === 'HEAD') return undefined
  const body = await request.arrayBuffer()
  return body.byteLength > 0 ? body : undefined
}

async function fetchCore(
  request: NextRequest,
  path: string,
  options: {
    tenantId?: string
    method?: string
    body?: BodyInit
    query?: URLSearchParams
  } = {},
): Promise<Response> {
  const query = options.query?.toString()
  const url = `${CORE_BASE_URL}${path}${query ? `?${query}` : ''}`
  return fetch(url, {
    method: options.method ?? request.method,
    headers: coreHeaders(request, options.tenantId),
    body: options.body,
    redirect: 'manual',
    cache: 'no-store',
  })
}

async function readJson(response: Response): Promise<unknown> {
  return response.json().catch(() => ({}))
}

async function coreData(
  request: NextRequest,
  path: string,
  tenantId: string,
): Promise<{ response: Response; data: unknown; body: unknown }> {
  const response = await fetchCore(request, path, { tenantId, method: 'GET' })
  const body = await readJson(response)
  return { response, data: unwrap(body), body }
}

function authOutcome(coreBody: unknown, responseStatus: number): JsonRecord {
  const data = jsonRecord(unwrap(coreBody))
  if (stringValue(data.status) === 'EMAIL_VERIFICATION_REQUIRED') {
    return {
      status: 'EMAIL_VERIFICATION_REQUIRED',
      email: stringValue(data.email),
    }
  }

  if (stringValue(data.nextStep) === 'CONFIRM_MFA' || responseStatus === 202) {
    return {
      status: 'MFA_REQUIRED',
      mfaToken: stringValue(data.mfaToken),
      mfaChannel: stringValue(data.channel),
      codePreview: data.codePreview ?? null,
    }
  }

  const authorities = Array.isArray(data.authorities)
    ? data.authorities.filter((role): role is string => typeof role === 'string')
    : []
  const role = authorities[0]?.replace(/^ROLE_/, '') ?? ''
  const sharedSession = jsonRecord(data.sharedSession)

  return {
    status: 'AUTHENTICATED',
    accessToken: stringValue(data.accessToken),
    tenantId: stringValue(data.tenantId),
    userId: stringValue(data.id),
    email: stringValue(data.email),
    role,
    sharedSessionToken:
      stringValue(sharedSession.token) || stringValue(data.sessionToken) || undefined,
  }
}

async function proxyAuth(request: NextRequest, path: string): Promise<NextResponse> {
  const incoming = jsonRecord(await request.json().catch(() => ({})))
  let corePath: string
  let body: JsonRecord

  switch (path) {
    case 'auth/login':
      corePath = '/api/v1/auth/login'
      body = {
        principal: stringValue(incoming.email),
        password: stringValue(incoming.password),
      }
      break
    case 'auth/signup': {
      const email = stringValue(incoming.email).trim()
      corePath = '/api/v1/auth/sign-up'
      body = {
        firstName: stringValue(incoming.firstName),
        lastName: stringValue(incoming.lastName),
        username: deriveUsername(email),
        email,
        password: stringValue(incoming.password),
        accountType: 'BUSINESS',
        businessType: 'LOGISTICS',
        onboardingData: {
          organizationName: stringValue(incoming.organizationName),
        },
      }
      break
    }
    case 'auth/login/mfa/confirm':
      corePath = '/api/v1/auth/login/mfa/confirm'
      body = {
        mfaToken: stringValue(incoming.mfaToken),
        code: stringValue(incoming.code),
      }
      break
    default:
      return error('Endpoint d’authentification inconnu.', 404, 'AUTH_ROUTE_NOT_FOUND')
  }

  const response = await fetchCore(request, corePath, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  const coreBody = await readJson(response)
  if (!response.ok && response.status !== 202) {
    const root = jsonRecord(coreBody)
    const data = jsonRecord(unwrap(coreBody))
    const message =
      stringValue(jsonRecord(root.error).message) ||
      stringValue(root.message) ||
      stringValue(data.message) ||
      'Authentification impossible.'
    return error(message, response.status, 'AUTH_FAILED')
  }

  const outcome = authOutcome(coreBody, response.status)
  if (outcome.status === 'AUTHENTICATED' && !outcome.accessToken) {
    return error('Réponse auth invalide : token manquant.', 502, 'AUTH_INVALID_RESPONSE')
  }
  const sharedSessionToken = stringValue(outcome.sharedSessionToken)
  const result = success({
    ...outcome,
    accessToken: outcome.status === 'AUTHENTICATED' ? 'http-only-session' : undefined,
    sharedSessionToken: undefined,
  })
  if (outcome.status === 'AUTHENTICATED') {
    result.cookies.set(AUTH_COOKIE, stringValue(outcome.accessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    })
    if (sharedSessionToken) {
      result.cookies.set(SHARED_SESSION_COOKIE, sharedSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60,
      })
    }
  }
  return result
}

function requiredHeader(request: NextRequest, name: string): string | null {
  const value = request.headers.get(name)?.trim()
  return value || null
}

function bearerClaims(request: NextRequest): JsonRecord {
  const token = requestToken(request)
  if (!token) return {}
  try {
    const payload = token.split('.')[1]
    if (!payload) return {}
    return jsonRecord(JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')))
  } catch {
    return {}
  }
}

function identityValue(request: NextRequest, ...claimNames: string[]): string | null {
  const claims = bearerClaims(request)
  for (const name of claimNames) {
    const value = stringValue(claims[name])
    if (value) return value
  }
  return null
}

function tokenRoles(request: NextRequest): string[] {
  const claims = bearerClaims(request)
  const raw = claims.roles ?? claims.authorities
  if (Array.isArray(raw)) return raw.map(String)
  if (typeof raw === 'string') return raw.split(/[,;\s]+/).filter(Boolean)
  const role = stringValue(claims.role)
  return role ? [role] : []
}

function isPlatformAdmin(request: NextRequest): boolean {
  const allowed = new Set([
    'TNT_ADMIN',
    'SYSTEM_ADMIN',
    'TENANT_ADMIN',
    'GENERAL_ADMIN',
    'IAM_ADMIN',
  ])
  return tokenRoles(request).some(role => allowed.has(role.replace(/^ROLE_/, '')))
}

function requireAdmin(request: NextRequest): NextResponse | null {
  return isPlatformAdmin(request)
    ? null
    : error('Accès administrateur TiiBnTick requis.', 403, 'FORBIDDEN')
}

async function agencySession(request: NextRequest): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  const userId =
    identityValue(request, 'sub', 'userId', 'uid') ??
    requiredHeader(request, 'x-user-id')
  const email =
    identityValue(request, 'email') ??
    requiredHeader(request, 'x-user-email') ??
    ''
  if (!tenantId || !userId) {
    return error('X-Tenant-Id et X-User-Id sont requis.', 400, 'MISSING_SESSION_HEADERS')
  }

  let agencyId =
    identityValue(request, 'aid', 'agencyId') ??
    requiredHeader(request, 'x-agency-id')
  let agency: JsonRecord = {}

  if (!agencyId) {
    const mine = await coreData(
      request,
      `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/onboarding/applications/me`,
      tenantId,
    )
    if (mine.response.ok) {
      agencyId = stringValue(jsonRecord(mine.data).agencyId) || null
    }
  }

  if (agencyId) {
    const found = await coreData(
      request,
      `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}`,
      tenantId,
    )
    if (found.response.ok) agency = jsonRecord(found.data)
  } else if (email) {
    const listed = await coreData(
      request,
      `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies`,
      tenantId,
    )
    if (listed.response.ok && Array.isArray(listed.data)) {
      agency = jsonRecord(
        listed.data.find(
          item => stringValue(jsonRecord(item).contactEmail).toLowerCase() === email.toLowerCase(),
        ),
      )
      agencyId = stringValue(agency.id) || null
    }
  }

  const agencyStatus = stringValue(agency.status) || 'PENDING_VALIDATION'
  return success({
    accessToken: null,
    tenantId,
    agencyId,
    userId,
    email,
    role: 'AGENCY_MANAGER',
    agencyStatus,
    agencyActive: agencyStatus.toUpperCase() === 'ACTIVE',
  })
}

async function branchSession(request: NextRequest): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  const userId =
    identityValue(request, 'sub', 'userId', 'uid') ??
    requiredHeader(request, 'x-user-id')
  const email =
    identityValue(request, 'email') ??
    requiredHeader(request, 'x-user-email')
  if (!tenantId || !userId || !email) {
    return error(
      'X-Tenant-Id, X-User-Id et X-User-Email sont requis.',
      400,
      'MISSING_SESSION_HEADERS',
    )
  }

  const base = `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry`
  const agencies = await coreData(request, `${base}/agencies`, tenantId)
  if (!agencies.response.ok || !Array.isArray(agencies.data)) {
    return error('Impossible de résoudre les agences.', agencies.response.status || 502)
  }

  for (const candidate of agencies.data) {
    const agencyId = stringValue(jsonRecord(candidate).id)
    if (!agencyId) continue
    const staff = await coreData(
      request,
      `${base}/agencies/${encodeURIComponent(agencyId)}/staff`,
      tenantId,
    )
    if (!staff.response.ok || !Array.isArray(staff.data)) continue
    const member = jsonRecord(
      staff.data.find(item => {
        const row = jsonRecord(item)
        return (
          stringValue(row.email).toLowerCase() === email.toLowerCase() &&
          stringValue(row.status).toUpperCase() === 'ACTIVE' &&
          Boolean(row.branchId)
        )
      }),
    )
    const branchId = stringValue(member.branchId)
    if (!branchId) continue
    const branch = await coreData(
      request,
      `${base}/branches/${encodeURIComponent(branchId)}`,
      tenantId,
    )
    if (!branch.response.ok) continue
    const branchData = jsonRecord(branch.data)
    return success({
      tenantId,
      agencyId: stringValue(branchData.agencyId) || agencyId,
      managerId: stringValue(member.id),
      branchId,
      branchName: stringValue(branchData.name),
      managerName: stringValue(member.fullName),
      managerEmail: stringValue(member.email) || email,
      userId,
    })
  }

  return error(
    'Aucune antenne associée à ce compte. Contactez votre administrateur agence.',
    404,
    'BRANCH_NOT_FOUND',
  )
}

async function livreurSession(request: NextRequest): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  const userId =
    identityValue(request, 'sub', 'userId', 'uid') ??
    requiredHeader(request, 'x-user-id')
  const requestedAgencyId =
    identityValue(request, 'aid', 'agencyId') ??
    requiredHeader(request, 'x-agency-id')
  if (!tenantId || !userId) {
    return error('X-Tenant-Id et X-User-Id sont requis.', 400, 'MISSING_SESSION_HEADERS')
  }

  const base = `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry`
  const agencies = await coreData(request, `${base}/agencies`, tenantId)
  if (!agencies.response.ok || !Array.isArray(agencies.data)) {
    return error('Impossible de résoudre les agences.', agencies.response.status || 502)
  }

  for (const candidate of agencies.data) {
    const agencyId = stringValue(jsonRecord(candidate).id)
    if (!agencyId || (requestedAgencyId && requestedAgencyId !== agencyId)) continue
    const deliverers = await coreData(
      request,
      `${base}/agencies/${encodeURIComponent(agencyId)}/deliverers`,
      tenantId,
    )
    if (!deliverers.response.ok || !Array.isArray(deliverers.data)) continue
    const deliverer = jsonRecord(
      deliverers.data.find(item => stringValue(jsonRecord(item).actorId) === userId),
    )
    const delivererId = stringValue(deliverer.id)
    if (!delivererId) continue
    return success({
      tenantId,
      agencyId,
      delivererId,
      delivererName:
        stringValue(deliverer.fullName) || `Livreur ${delivererId.slice(0, 8)}`,
      userId,
    })
  }

  return error('Aucun profil livreur associé à ce compte.', 404, 'DELIVERER_NOT_FOUND')
}

function hubSessionPayload(
  tenantId: string,
  userId: string,
  email: string,
  hub: JsonRecord,
  overrides: JsonRecord = {},
): JsonRecord {
  return {
    tenantId,
    agencyId: stringValue(overrides.agencyId) || stringValue(hub.agencyId),
    hubId: stringValue(overrides.hubId) || stringValue(hub.id),
    hubName: stringValue(overrides.hubName) || stringValue(hub.name),
    hubCode: stringValue(overrides.hubCode) || stringValue(hub.code),
    operatorName:
      stringValue(overrides.operatorName) || stringValue(hub.operatorName),
    operatorEmail:
      stringValue(overrides.operatorEmail) ||
      stringValue(hub.operatorEmail) ||
      email,
    operatorUserId:
      stringValue(overrides.operatorUserId) ||
      stringValue(hub.operatorUserId) ||
      userId,
    userId,
  }
}

async function hubSession(request: NextRequest): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  const userId =
    identityValue(request, 'sub', 'userId', 'uid') ??
    requiredHeader(request, 'x-user-id')
  const email =
    identityValue(request, 'email') ??
    requiredHeader(request, 'x-user-email') ??
    ''
  const preferredHubId =
    requiredHeader(request, 'x-hub-id') ??
    request.nextUrl.searchParams.get('hubId')?.trim() ??
    ''
  if (!tenantId || !userId) {
    return error('X-Tenant-Id et X-User-Id sont requis.', 400, 'MISSING_SESSION_HEADERS')
  }

  const base = `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry`
  const byOperator = await coreData(
    request,
    `${base}/hub-operators/${encodeURIComponent(userId)}/hub`,
    tenantId,
  )
  if (byOperator.response.ok) {
    const hub = jsonRecord(byOperator.data)
    const hubId = stringValue(hub.id)
    if (hubId && (!preferredHubId || preferredHubId === hubId)) {
      return success(hubSessionPayload(tenantId, userId, email, hub))
    }
    if (hubId && preferredHubId && preferredHubId !== hubId) {
      return error(
        'Le hub demandé ne correspond pas au hub rattaché à ce compte.',
        403,
        'HUB_MISMATCH',
      )
    }
  }

  if (!email) {
    return error(
      'Aucun hub associé à ce compte gérant. Contactez votre administrateur agence.',
      404,
      'HUB_NOT_FOUND',
    )
  }

  const agencies = await coreData(request, `${base}/agencies`, tenantId)
  if (!agencies.response.ok || !Array.isArray(agencies.data)) {
    return error('Impossible de résoudre les agences.', agencies.response.status || 502)
  }

  type Match = {
    agencyId: string
    hub: JsonRecord
    member: JsonRecord
  }
  const matches: Match[] = []

  for (const candidate of agencies.data) {
    const agencyId = stringValue(jsonRecord(candidate).id)
    if (!agencyId) continue
    const staff = await coreData(
      request,
      `${base}/agencies/${encodeURIComponent(agencyId)}/staff`,
      tenantId,
    )
    if (!staff.response.ok || !Array.isArray(staff.data)) continue
    const member = jsonRecord(
      staff.data.find(item => {
        const row = jsonRecord(item)
        return (
          stringValue(row.email).toLowerCase() === email.toLowerCase() &&
          stringValue(row.status).toUpperCase() === 'ACTIVE' &&
          ['HUB_OPERATOR', 'AGENCY_HUB_OPERATOR'].includes(
            stringValue(row.role).toUpperCase(),
          )
        )
      }),
    )
    if (!stringValue(member.id)) continue

    const hubs = await coreData(
      request,
      `${base}/agencies/${encodeURIComponent(agencyId)}/hubs`,
      tenantId,
    )
    if (!hubs.response.ok || !Array.isArray(hubs.data)) continue

    for (const item of hubs.data) {
      const hub = jsonRecord(item)
      const operatorEmail = stringValue(hub.operatorEmail).toLowerCase()
      const operatorUserId = stringValue(hub.operatorUserId)
      const emailMatch = operatorEmail === email.toLowerCase()
      const userMatch = operatorUserId === userId
      if (!emailMatch && !userMatch) continue
      if (preferredHubId && stringValue(hub.id) !== preferredHubId) continue
      matches.push({ agencyId, hub, member })
    }
  }

  if (matches.length === 0) {
    return error(
      'Aucun hub associé à ce compte gérant. Contactez votre administrateur agence.',
      404,
      'HUB_NOT_FOUND',
    )
  }

  if (matches.length > 1 && !preferredHubId) {
    const byUser = matches.filter(
      m => stringValue(m.hub.operatorUserId) === userId,
    )
    if (byUser.length === 1) {
      const chosen = byUser[0]
      return success(
        hubSessionPayload(tenantId, userId, email, chosen.hub, {
          agencyId: stringValue(chosen.hub.agencyId) || chosen.agencyId,
          operatorName:
            stringValue(chosen.member.fullName) ||
            stringValue(chosen.hub.operatorName),
          operatorEmail: stringValue(chosen.member.email) || email,
        }),
      )
    }
    return error(
      'Plusieurs hubs sont associés à ce compte. Précisez X-Hub-Id ou hubId.',
      409,
      'AMBIGUOUS_HUB',
    )
  }

  const chosen = matches[0]
  return success(
    hubSessionPayload(tenantId, userId, email, chosen.hub, {
      agencyId: stringValue(chosen.hub.agencyId) || chosen.agencyId,
      operatorName:
        stringValue(chosen.member.fullName) || stringValue(chosen.hub.operatorName),
      operatorEmail: stringValue(chosen.member.email) || email,
    }),
  )
}

function flattenHubAddress(hub: JsonRecord): string {
  const parts = [
    stringValue(hub.addrStreet),
    stringValue(hub.addrQuarter),
    stringValue(hub.addrCity),
    stringValue(hub.addrCountry),
  ].filter(Boolean)
  if (parts.length) return parts.join(', ')
  return stringValue(hub.address)
}

async function persistInboxNotification(
  request: NextRequest,
  tenantId: string,
  agencyId: string,
  payload: { eventType: string; title: string; body: string; href?: string },
): Promise<void> {
  if (!agencyId) return
  await fetchCore(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/notifications`,
    {
      tenantId,
      method: 'POST',
      body: JSON.stringify({
        eventType: payload.eventType,
        title: payload.title,
        body: payload.body,
        href: payload.href ?? null,
      }),
    },
  )
}

type HandoffInboxKind =
  | 'create'
  | 'approve'
  | 'reject'
  | 'claim'
  | 'confirm'
  | 'withdraw'

function matchHandoffInbox(
  method: string,
  path: string,
): { kind: HandoffInboxKind; hubId?: string; handoffId?: string } | null {
  if (method !== 'POST') return null
  const create = /^hubs\/([^/]+)\/handoffs$/.exec(path)
  if (create) return { kind: 'create', hubId: decodeURIComponent(create[1]) }
  const claim = /^hubs\/([^/]+)\/handoffs\/claim-client-withdraw$/.exec(path)
  if (claim) return { kind: 'claim', hubId: decodeURIComponent(claim[1]) }
  const approve = /^hub-handoffs\/([^/]+)\/approve$/.exec(path)
  if (approve) return { kind: 'approve', handoffId: decodeURIComponent(approve[1]) }
  const reject = /^hub-handoffs\/([^/]+)\/reject$/.exec(path)
  if (reject) return { kind: 'reject', handoffId: decodeURIComponent(reject[1]) }
  const confirm = /^hub-handoffs\/([^/]+)\/confirm-client$/.exec(path)
  if (confirm) return { kind: 'confirm', handoffId: decodeURIComponent(confirm[1]) }
  const withdraw = /^hub-parcels\/([^/]+)\/withdraw$/.exec(path)
  if (withdraw) return { kind: 'withdraw' }
  return null
}

function handoffInboxCopy(
  kind: HandoffInboxKind,
  data: JsonRecord,
): { eventType: string; title: string; body: string; href: string } {
  const tracking = stringValue(data.trackingCode) || 'Colis'
  const type = stringValue(data.handoffType).toUpperCase() || 'HANDOFF'
  switch (kind) {
    case 'create':
      return {
        eventType: 'HUB_HANDOFF_REQUESTED',
        title: type === 'WITHDRAW' ? 'Demande de retrait hub' : 'Demande de dépôt hub',
        body: `${tracking} — en attente de validation`,
        href: '/hub/demandes',
      }
    case 'approve':
      return {
        eventType: 'HUB_HANDOFF_APPROVED',
        title: 'Handoff hub validé',
        body: `${tracking} — ${type.toLowerCase()} confirmé`,
        href: '/hub/demandes',
      }
    case 'reject':
      return {
        eventType: 'HUB_HANDOFF_REJECTED',
        title: 'Handoff hub refusé',
        body: `${tracking} — demande refusée`,
        href: '/hub/demandes',
      }
    case 'claim':
      return {
        eventType: 'HUB_CLIENT_WITHDRAW_CLAIMED',
        title: 'Retrait client initié',
        body: `${tracking} — retrait client en cours`,
        href: '/hub/demandes',
      }
    case 'confirm':
      return {
        eventType: 'HUB_CLIENT_WITHDRAW_CONFIRMED',
        title: 'Retrait client confirmé',
        body: `${tracking} — remis au destinataire`,
        href: '/hub/stock',
      }
    case 'withdraw':
    default:
      return {
        eventType: 'DELIVERY_CONFIRMED',
        title: 'Colis retiré au hub',
        body: `${tracking} — retrait enregistré`,
        href: '/hubs',
      }
  }
}

async function notifyHandoffInbox(
  request: NextRequest,
  tenantId: string,
  kind: HandoffInboxKind,
  coreBody: unknown,
  fallbackAgencyId?: string,
): Promise<void> {
  const data = jsonRecord(unwrap(coreBody))
  const agencyId =
    stringValue(data.agencyId) ||
    fallbackAgencyId ||
    requiredHeader(request, 'x-agency-id') ||
    ''
  if (!agencyId) return
  const copy = handoffInboxCopy(kind, data)
  await persistInboxNotification(request, tenantId, agencyId, copy)
}

async function listPublicRelayHubs(
  request: NextRequest,
  tenantId: string,
  agencyId: string,
): Promise<NextResponse> {
  const listed = await coreData(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/hubs`,
    tenantId,
  )
  if (!listed.response.ok) {
    return error(
      'Impossible de lister les hubs relais.',
      listed.response.status || 502,
      'RELAY_HUBS_UNAVAILABLE',
    )
  }
  const hubs = Array.isArray(listed.data) ? listed.data : []
  const open = hubs
    .map(item => jsonRecord(item))
    .filter(hub => {
      const status = stringValue(hub.status).toUpperCase()
      const openStatus = status === 'OPEN' || status === 'ACTIVE' || !status
      const capacity = Number(hub.capacityUnits ?? hub.capacity ?? 0)
      const occupancy = Number(hub.currentOccupancy ?? 0)
      return openStatus && (capacity <= 0 || occupancy < capacity)
    })
    .map(hub => {
      const capacity = Number(hub.capacityUnits ?? hub.capacity ?? 0)
      const occupancy = Number(hub.currentOccupancy ?? 0)
      return {
        id: stringValue(hub.id),
        name: stringValue(hub.name),
        code: stringValue(hub.code),
        address: flattenHubAddress(hub),
        city: stringValue(hub.addrCity) || stringValue(hub.city),
        openingHours: stringValue(hub.openingHours),
        availableSpace: Math.max(0, capacity - occupancy),
        capacityUnits: capacity,
        latitude: typeof hub.latitude === 'number' ? hub.latitude : undefined,
        longitude: typeof hub.longitude === 'number' ? hub.longitude : undefined,
      }
    })
  return success(open)
}

async function publicDropOff(
  request: NextRequest,
  tenantId: string,
  agencyId: string,
): Promise<NextResponse> {
  const incoming = jsonRecord(await request.json().catch(() => ({})))
  const hubId = stringValue(incoming.hubId)
  if (!hubId) return error('hubId est requis.', 400, 'HUB_ID_REQUIRED')

  const senderName = stringValue(incoming.senderName).trim()
  const recipientName = stringValue(incoming.recipientName).trim()
  const recipientPhone = stringValue(incoming.recipientPhone).trim()
  if (!senderName) {
    return error('senderName est requis.', 400, 'SENDER_NAME_REQUIRED')
  }
  if (!recipientName) {
    return error('recipientName est requis.', 400, 'RECIPIENT_NAME_REQUIRED')
  }

  const tracking = stringValue(incoming.trackingCode).trim().toUpperCase()
  const depositedByLabel = [
    `Expéditeur: ${senderName}`,
    `Destinataire: ${recipientName}`,
    recipientPhone ? `Tél: ${recipientPhone}` : '',
  ]
    .filter(Boolean)
    .join(' · ')

  const body: JsonRecord = {
    missionId: incoming.missionId ?? null,
    packageId: incoming.packageId ?? null,
    trackingCode: tracking || null,
    depositedByActorId: incoming.depositedByActorId ?? null,
    depositedByLabel,
  }
  const upstream = await fetchCore(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/hubs/${encodeURIComponent(hubId)}/parcels/deposit`,
    {
      tenantId,
      method: 'POST',
      body: JSON.stringify(body),
    },
  )
  const coreBody = await readJson(upstream)
  if (!upstream.ok) {
    const root = jsonRecord(coreBody)
    const message =
      stringValue(jsonRecord(root.error).message) ||
      stringValue(root.message) ||
      'Dépôt impossible.'
    return error(message, upstream.status, 'DROP_OFF_FAILED')
  }
  const parcel = jsonRecord(unwrap(coreBody))
  const trackingCode = stringValue(parcel.trackingCode)
  void persistInboxNotification(request, tenantId, agencyId, {
    eventType: 'HUB_DROP_OFF',
    title: 'Dépôt public au hub',
    body: `${trackingCode || 'Colis'} — ${senderName} → ${recipientName}`,
    href: '/hubs',
  }).catch(() => undefined)

  return success(
    {
      recordId: stringValue(parcel.id),
      trackingCode,
      withdrawalDeadline: stringValue(parcel.withdrawalDeadline) || undefined,
      hubId: stringValue(parcel.hubId) || hubId,
      senderName,
      recipientName,
      recipientPhone: recipientPhone || undefined,
      message:
        'Colis déposé avec succès — utilisez le code de suivi pour le retrouver.',
    },
    201,
  )
}

async function withdrawParcelByRecord(
  request: NextRequest,
  tenantId: string,
  hubId: string,
  recordId: string,
): Promise<NextResponse> {
  const listed = await coreData(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/hubs/${encodeURIComponent(hubId)}/parcels`,
    tenantId,
  )
  if (!listed.response.ok || !Array.isArray(listed.data)) {
    return error('Impossible de résoudre le colis hub.', listed.response.status || 502)
  }
  const parcel = jsonRecord(
    listed.data.find(item => stringValue(jsonRecord(item).id) === recordId),
  )
  const trackingCode = stringValue(parcel.trackingCode)
  if (!trackingCode) {
    return error('Enregistrement de colis introuvable.', 404, 'PARCEL_NOT_FOUND')
  }
  const incoming = jsonRecord(await request.json().catch(() => ({})))
  const upstream = await fetchCore(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/hub-parcels/${encodeURIComponent(trackingCode)}/withdraw`,
    {
      tenantId,
      method: 'POST',
      body: JSON.stringify({
        withdrawnBy: stringValue(incoming.withdrawnBy) || 'OPERATOR',
        identityVerified: incoming.identityVerified !== false,
        pickedUpByActorId: incoming.pickedUpByActorId ?? null,
      }),
    },
  )
  const coreBody = await readJson(upstream)
  if (upstream.ok) {
    let agencyId = requiredHeader(request, 'x-agency-id') || ''
    if (!agencyId) {
      const hubLookup = await coreData(
        request,
        `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/hubs/${encodeURIComponent(hubId)}`,
        tenantId,
      )
      agencyId = stringValue(jsonRecord(hubLookup.data).agencyId)
    }
    void notifyHandoffInbox(
      request,
      tenantId,
      'withdraw',
      { data: { trackingCode, agencyId } },
      agencyId,
    ).catch(() => undefined)
  }
  return NextResponse.json(coreBody, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

async function updateDelivererLocation(
  request: NextRequest,
  tenantId: string,
  delivererId: string,
): Promise<NextResponse> {
  const incoming = jsonRecord(await request.json().catch(() => ({})))
  const latitude = Number(incoming.latitude)
  const longitude = Number(incoming.longitude)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return error('latitude et longitude sont requis.', 400, 'INVALID_LOCATION')
  }
  const accuracyMeters =
    incoming.accuracyMeters == null ? null : Number(incoming.accuracyMeters)
  const missionId = stringValue(incoming.missionId) || null

  const persist = fetchCore(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/deliverers/${encodeURIComponent(delivererId)}/location`,
    {
      tenantId,
      method: 'PATCH',
      body: JSON.stringify({
        latitude,
        longitude,
        accuracyMeters,
        missionId,
      }),
    },
  )

  const realtimeBody: JsonRecord = {
    delivererId,
    latitude,
    longitude,
    accuracyMeters: accuracyMeters ?? 0,
    speedKmh: Number(incoming.speedKmh) || 0,
    bearing: Number(incoming.bearing) || 0,
  }
  if (missionId) realtimeBody.missionId = missionId

  const realtime = fetchCore(request, '/api/v1/realtime/gps/ping', {
    tenantId,
    method: 'POST',
    body: JSON.stringify(realtimeBody),
  }).catch(() => null)

  const [persistRes, realtimeRes] = await Promise.all([persist, realtime])
  if (!persistRes.ok) {
    const body = await readJson(persistRes)
    const root = jsonRecord(body)
    const message =
      stringValue(jsonRecord(root.error).message) ||
      stringValue(root.message) ||
      'Mise à jour GPS impossible.'
    return error(message, persistRes.status, 'GPS_PERSIST_FAILED')
  }
  if (realtimeRes && !realtimeRes.ok) {
    console.warn(
      '[Agency BFF] realtime GPS ping failed',
      realtimeRes.status,
      await realtimeRes.text().catch(() => ''),
    )
  }
  return new NextResponse(null, { status: 204 })
}

async function listAdminAgenciesPage(
  request: NextRequest,
  tenantId: string,
): Promise<NextResponse> {
  const listed = await coreData(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies`,
    tenantId,
  )
  if (!listed.response.ok) {
    return error(
      'Impossible de lister les agences.',
      listed.response.status || 502,
      'ADMIN_AGENCIES_UNAVAILABLE',
    )
  }
  const all = Array.isArray(listed.data) ? listed.data.map(item => jsonRecord(item)) : []
  const page = Math.max(0, Number(request.nextUrl.searchParams.get('page') || 0) || 0)
  const size = Math.min(
    100,
    Math.max(1, Number(request.nextUrl.searchParams.get('size') || 20) || 20),
  )
  const start = page * size
  const items = all.slice(start, start + size)
  return success({
    items,
    page,
    size,
    total: all.length,
  })
}

async function processExpiredParcels(
  request: NextRequest,
  tenantId: string,
): Promise<NextResponse> {
  const upstream = await fetchCore(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/hubs/expired/process`,
    {
      tenantId,
      method: 'POST',
      body: JSON.stringify({}),
    },
  )
  const body = await readJson(upstream)
  if (!upstream.ok) {
    const root = jsonRecord(body)
    const message =
      stringValue(jsonRecord(root.error).message) ||
      stringValue(root.message) ||
      'Traitement des colis expirés impossible.'
    return error(message, upstream.status, 'EXPIRED_PROCESS_FAILED')
  }
  const data = jsonRecord(unwrap(body))
  const count = Number(data.processedCount ?? data.processed ?? 0) || 0
  return success({
    processed: count,
    processedCount: count,
    message: stringValue(data.message) || `${count} colis expiré(s) traité(s).`,
  })
}

function mediaTypeFor(category: string): string {
  if (category.startsWith('onboarding-')) return 'KYC_DOCUMENT'
  switch (category) {
    case 'avatar':
      return 'PROFILE_PHOTO'
    case 'delivery-proof':
      return 'DELIVERY_PROOF_PHOTO'
    case 'vehicle-photo':
    case 'vehicle-doc':
      return 'PACKAGE_PHOTO'
    default:
      return 'KYC_DOCUMENT'
  }
}

async function proxyMediaUpload(request: NextRequest): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  const userId =
    identityValue(request, 'sub', 'userId', 'uid') ??
    requiredHeader(request, 'x-user-id')
  if (!tenantId || !userId) {
    return error('X-Tenant-Id et X-User-Id sont requis.', 400, 'MISSING_MEDIA_HEADERS')
  }

  const category = request.nextUrl.searchParams.get('category')?.trim() || 'general'
  const query = new URLSearchParams({
    mediaType: mediaTypeFor(category),
    category,
  })
  const upstream = await fetchCore(request, '/api/v1/media/upload', {
    tenantId,
    method: 'POST',
    body: await bodyFor(request),
    query,
  })
  const body = await readJson(upstream)
  if (!upstream.ok) {
    return new NextResponse(JSON.stringify(body), {
      status: upstream.status,
      headers: { 'content-type': 'application/json' },
    })
  }
  const uploaded = jsonRecord(unwrap(body))
  const downloadUrl = stringValue(uploaded.downloadUrl)
  return success({
    mediaId: uploaded.mediaId,
    storageKey: uploaded.storageKey,
    url: downloadUrl,
    publicUrl: downloadUrl,
  })
}

async function proxyKycVerify(request: NextRequest): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  if (!tenantId) {
    return error('X-Tenant-Id est requis.', 400, 'TENANT_REQUIRED')
  }
  const upstream = await fetchCore(request, '/api/v1/kyc/verify', {
    tenantId,
    method: 'POST',
    body: await bodyFor(request),
  })
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

async function proxyMediaDownloadUrl(
  request: NextRequest,
  mediaId: string,
): Promise<NextResponse> {
  const denied = requireAdmin(request)
  if (denied) return denied
  if (!/^[0-9a-f-]{36}$/i.test(mediaId)) {
    return error('Identifiant media invalide.', 400, 'INVALID_MEDIA_ID')
  }
  const query = new URLSearchParams()
  query.set('ttlSeconds', request.nextUrl.searchParams.get('ttlSeconds') || '3600')
  const upstream = await fetchCore(
    request,
    `/api/v1/media/${encodeURIComponent(mediaId)}/download-url`,
    { method: 'GET', query },
  )
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

const YOWYOB_APPS: Record<string, { serviceCode: string; allowedRoles: string[] }> = {
  HRM: {
    serviceCode: 'HRM',
    allowedRoles: ['AGENCY_MANAGER', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER', 'ACCOUNTANT'],
  },
  ACCOUNTING: {
    serviceCode: 'ACCOUNTING',
    allowedRoles: ['AGENCY_MANAGER', 'BRANCH_MANAGER', 'ACCOUNTANT'],
  },
  BILLING: {
    serviceCode: 'BILLING',
    allowedRoles: ['AGENCY_MANAGER', 'BRANCH_MANAGER', 'ACCOUNTANT'],
  },
}

async function launchYowyobApp(request: NextRequest): Promise<NextResponse> {
  const appName = (request.nextUrl.searchParams.get('app') || '').toUpperCase()
  const app = YOWYOB_APPS[appName]
  if (!app) return error('Application YowYob inconnue.', 400, 'INVALID_YOWYOB_APP')

  const tenantId = requiredHeader(request, 'x-tenant-id')
  const agencyId = requiredHeader(request, 'x-agency-id')
  const sharedSessionToken =
    request.cookies.get(SHARED_SESSION_COOKIE)?.value ??
    requiredHeader(request, 'x-shared-session-token')
  const role = (
    requiredHeader(request, 'x-user-role') ||
    tokenRoles(request)[0] ||
    ''
  ).replace(/^ROLE_/, '').toUpperCase()
  if (!tenantId || !agencyId || !sharedSessionToken) {
    return error('Session SSO incomplète.', 400, 'MISSING_SSO_CONTEXT')
  }
  if (!app.allowedRoles.includes(role)) {
    return error('Accès refusé à cette application YowYob.', 403, 'FORBIDDEN')
  }

  const base = `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry`
  const agencyResult = await coreData(
    request,
    `${base}/agencies/${encodeURIComponent(agencyId)}`,
    tenantId,
  )
  if (!agencyResult.response.ok) {
    return error('Agence introuvable.', agencyResult.response.status, 'AGENCY_NOT_FOUND')
  }
  const agency = jsonRecord(agencyResult.data)
  const kernelOrganizationId = stringValue(agency.kernelOrganizationId)
  if (!kernelOrganizationId) {
    return error(
      'Organisation Kernel non liée. Approbation onboarding requise.',
      422,
      'KERNEL_ORGANIZATION_MISSING',
    )
  }

  let kernelAgencyId: string | undefined
  let branchName: string | undefined
  const branchId = requiredHeader(request, 'x-branch-id')
  if (role === 'BRANCH_MANAGER') {
    if (!branchId) {
      return error(
        'Aucune antenne associée à cette session.',
        403,
        'BRANCH_SCOPE_REQUIRED',
      )
    }

    const email = identityValue(request, 'email')
    if (!email) {
      return error(
        'Impossible de vérifier le rattachement du responsable à l’antenne.',
        403,
        'BRANCH_SCOPE_UNVERIFIED',
      )
    }
    const staffResult = await coreData(
      request,
      `${base}/agencies/${encodeURIComponent(agencyId)}/staff`,
      tenantId,
    )
    const assignedMember = Array.isArray(staffResult.data)
      ? staffResult.data.find(item => {
          const member = jsonRecord(item)
          return (
            stringValue(member.email).toLowerCase() === email.toLowerCase() &&
            stringValue(member.status).toUpperCase() === 'ACTIVE' &&
            stringValue(member.role).replace(/^ROLE_/, '').toUpperCase() === 'BRANCH_MANAGER' &&
            stringValue(member.branchId) === branchId
          )
        })
      : undefined
    if (!staffResult.response.ok || !assignedMember) {
      return error(
        'Cette antenne n’est pas rattachée à ce responsable.',
        403,
        'BRANCH_SCOPE_FORBIDDEN',
      )
    }

    const branchResult = await coreData(
      request,
      `${base}/branches/${encodeURIComponent(branchId)}`,
      tenantId,
    )
    if (!branchResult.response.ok) {
      return error('Antenne introuvable.', 404, 'BRANCH_NOT_FOUND')
    }
    const branch = jsonRecord(branchResult.data)
    if (stringValue(branch.agencyId) !== agencyId) {
      return error(
        'Cette antenne n’appartient pas à l’agence active.',
        403,
        'BRANCH_SCOPE_FORBIDDEN',
      )
    }
    kernelAgencyId = stringValue(branch.coreBranchId) || undefined
    branchName = stringValue(branch.name) || undefined
    if (!kernelAgencyId) {
      return error(
        'Cette antenne n’est pas encore liée à HRM.',
        422,
        'KERNEL_BRANCH_MISSING',
      )
    }
  }

  const upstream = await fetchCore(request, '/api/v1/sso/yowyob/launch', {
    method: 'POST',
    body: JSON.stringify({
      app: app.serviceCode,
      sharedSessionToken,
      kernelOrganizationId,
      kernelAgencyId,
      branchName,
    }),
  })
  const body = await readJson(upstream)
  if (!upstream.ok) {
    const root = jsonRecord(body)
    return error(
      stringValue(jsonRecord(root.error).message) ||
        stringValue(root.message) ||
        'Impossible d’ouvrir l’application YowYob.',
      upstream.status,
      'SSO_LAUNCH_FAILED',
    )
  }
  return success(unwrap(body))
}

/** Routes sync offline vers les endpoints Agency Core scopés par agence. */
export function resolveAgencySyncCorePath(
  path: string,
  agencyId: string,
): string | null {
  if (path === 'sync/pull' || path === 'sync/push' || path === 'sync/bootstrap') {
    return `agencies/${encodeURIComponent(agencyId)}/${path}`
  }
  const scoped = /^agencies\/([^/]+)\/sync\/(pull|push|bootstrap)$/.exec(path)
  if (!scoped) return null
  const requestedAgencyId = decodeURIComponent(scoped[1])
  if (requestedAgencyId !== agencyId) return null
  return `agencies/${encodeURIComponent(agencyId)}/sync/${scoped[2]}`
}

async function proxyAgencySync(
  request: NextRequest,
  path: string,
): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  const agencyId =
    identityValue(request, 'aid', 'agencyId') ??
    requiredHeader(request, 'x-agency-id')
  const userId =
    identityValue(request, 'sub', 'userId', 'uid') ??
    requiredHeader(request, 'x-user-id')
  if (!tenantId || !agencyId || !userId) {
    return error(
      'Tenant, agence et utilisateur sont requis pour la synchronisation.',
      400,
      'MISSING_SYNC_CONTEXT',
    )
  }

  const corePath = resolveAgencySyncCorePath(path, agencyId)
  if (!corePath) {
    return error(
      'Route de synchronisation invalide ou agence non autorisée.',
      403,
      'SYNC_SCOPE_FORBIDDEN',
    )
  }
  if (request.method === 'POST' && !corePath.endsWith('/push')) {
    return error('Méthode non autorisée pour cette route sync.', 405, 'METHOD_NOT_ALLOWED')
  }
  if (request.method === 'GET' && corePath.endsWith('/push')) {
    return error('Méthode non autorisée pour cette route sync.', 405, 'METHOD_NOT_ALLOWED')
  }

  const query = new URLSearchParams(request.nextUrl.searchParams)
  query.delete('tenantId')
  query.delete('agencyId')
  const headers = coreHeaders(request, tenantId)
  headers.set('x-user-id', userId)
  headers.set('x-agency-id', agencyId)
  headers.set('x-tenant-id', tenantId)
  const deviceId = request.headers.get('x-device-id')?.trim()
  if (deviceId) headers.set('x-device-id', deviceId)

  const url = `${CORE_BASE_URL}/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/${corePath}${
    query.toString() ? `?${query}` : ''
  }`
  const upstream = await fetch(url, {
    method: request.method,
    headers,
    body: await bodyFor(request),
    redirect: 'manual',
    cache: 'no-store',
  })
  const responseHeadersOut = responseHeaders(upstream)
  responseHeadersOut.set('Cache-Control', 'no-store')
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeadersOut,
  })
}

async function proxySearch(
  request: NextRequest,
  agencyId: string,
): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id')
  if (!tenantId) return error('Tenant requis.', 400, 'TENANT_REQUIRED')

  const query = new URLSearchParams({
    q: request.nextUrl.searchParams.get('q') || '',
    entityType: request.nextUrl.searchParams.get('entityType') || 'all',
    limit: request.nextUrl.searchParams.get('limit') || '20',
    agencyId,
  })
  try {
    const response = await fetch(`${SEARCH_BASE_URL}/api/v1/search?${query}`, {
      headers: {
        accept: 'application/json',
        'x-tenant-id': tenantId,
        ...(requestToken(request)
          ? { authorization: `Bearer ${requestToken(request)}` }
          : {}),
      },
      cache: 'no-store',
      signal: request.signal,
    })
    if (!response.ok) {
      return error(
        'Le service de recherche est indisponible pour le moment.',
        response.status >= 500 ? 502 : response.status,
        'SEARCH_UNAVAILABLE',
      )
    }
    return NextResponse.json(await readJson(response))
  } catch {
    return error(
      'Impossible de joindre le service de recherche.',
      502,
      'SEARCH_UNAVAILABLE',
    )
  }
}

async function proxyRealtimeStream(
  request: NextRequest,
  corePath: string,
  tenantId: string,
): Promise<NextResponse> {
  const upstream = await fetchCore(request, corePath, {
    tenantId,
    method: 'GET',
  })
  const headers = responseHeaders(upstream)
  headers.set('content-type', 'text/event-stream')
  headers.set('cache-control', 'no-cache, no-transform')
  headers.set('connection', 'keep-alive')
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  })
}

function responseHeaders(upstream: Response): Headers {
  const headers = new Headers()
  for (const name of [
    'content-type',
    'content-disposition',
    'cache-control',
    'etag',
    'last-modified',
    'location',
    'retry-after',
    'accept-ranges',
    'content-range',
    'x-request-id',
    'x-total-count',
  ]) {
    const value = upstream.headers.get(name)
    if (value) headers.set(name, value)
  }
  return headers
}

async function proxyAgencyRegistry(
  request: NextRequest,
  path: string,
): Promise<NextResponse> {
  const tenantId =
    identityValue(request, 'tid', 'tenantId') ??
    requiredHeader(request, 'x-tenant-id') ??
    request.nextUrl.searchParams.get('tenantId') ??
    process.env.NEXT_PUBLIC_TENANT_ID ??
    null
  if (!tenantId) {
    return error('Tenant requis pour appeler Agency Core.', 400, 'TENANT_REQUIRED')
  }

  // Public intake status — Core route is outside /tenants/{tid}/…
  if (request.method === 'GET' && /^intake-requests\/[^/]+$/.test(path)) {
    const reference = path.slice('intake-requests/'.length)
    const upstream = await fetchCore(
      request,
      `/api/v1/agency-registry/intake-requests/${encodeURIComponent(reference)}`,
      { tenantId, method: 'GET' },
    )
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: responseHeaders(upstream),
    })
  }

  const relayHubs = /^agencies\/([^/]+)\/relay-hubs$/.exec(path)
  if (request.method === 'GET' && relayHubs) {
    return listPublicRelayHubs(request, tenantId, decodeURIComponent(relayHubs[1]))
  }

  const dropOff = /^agencies\/([^/]+)\/drop-off$/.exec(path)
  if (request.method === 'POST' && dropOff) {
    return publicDropOff(request, tenantId, decodeURIComponent(dropOff[1]))
  }

  const withdraw = /^hubs\/([^/]+)\/parcels\/([^/]+)\/withdraw$/.exec(path)
  if (request.method === 'POST' && withdraw) {
    return withdrawParcelByRecord(
      request,
      tenantId,
      decodeURIComponent(withdraw[1]),
      decodeURIComponent(withdraw[2]),
    )
  }

  const location = /^deliverers\/([^/]+)\/location$/.exec(path)
  if (request.method === 'PATCH' && location) {
    return updateDelivererLocation(
      request,
      tenantId,
      decodeURIComponent(location[1]),
    )
  }

  if (request.method === 'POST' && path === 'hubs/expired') {
    return processExpiredParcels(request, tenantId)
  }

  if (request.method === 'GET' && path === 'admin/agencies') {
    const denied = requireAdmin(request)
    if (denied) return denied
    return listAdminAgenciesPage(request, tenantId)
  }

  let corePath = rewriteAgencyRegistryPath(request.method, path)
  if (
    request.method === 'POST' &&
    /^admin\/agencies\/[^/]+\/sync-core$/.test(path)
  ) {
    const denied = requireAdmin(request)
    if (denied) return denied
    corePath = path
      .replace(/^admin\/agencies\//, 'agencies/')
      .replace(/\/sync-core$/, '/sync-platform-core')
  } else if (path.startsWith('admin/onboarding/')) {
    const denied = requireAdmin(request)
    if (denied) return denied
  }

  const query = new URLSearchParams(request.nextUrl.searchParams)
  query.delete('tenantId')
  const handoff = matchHandoffInbox(request.method, path)
  const upstream = await fetchCore(
    request,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/${corePath}`,
    {
      tenantId,
      body: await bodyFor(request),
      query,
    },
  )

  if (handoff) {
    const coreBody = await readJson(upstream)
    if (upstream.ok) {
      void notifyHandoffInbox(
        request,
        tenantId,
        handoff.kind,
        coreBody,
        requiredHeader(request, 'x-agency-id') ?? undefined,
      ).catch(() => undefined)
    }
    return NextResponse.json(coreBody, {
      status: upstream.status,
      headers: responseHeaders(upstream),
    })
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

export function isPublicRequest(method: string, path: string): boolean {
  if (
    method === 'POST' &&
    ['auth/login', 'auth/signup', 'auth/login/mfa/confirm'].includes(path)
  ) return true
  if (method === 'GET' && /^tracking\/[^/]+(?:\/stream)?$/.test(path)) return true
  if (method === 'GET' && /^intake-requests\/[^/]+$/.test(path)) return true
  if (method === 'GET' && /^agencies\/[^/]+\/(relay-hubs|intake-context)$/.test(path)) return true
  if (method === 'POST' && /^(intake-requests|agencies\/[^/]+\/(?:drop-off|claims))$/.test(path)) {
    return true
  }
  if (method === 'POST' && /^hub-handoffs\/[^/]+\/confirm-client$/.test(path)) return true
  return false
}

/** Rewrites FE / Java-BFF shaped paths onto Core agency-registry suffixes. */
export function rewriteAgencyRegistryPath(method: string, path: string): string {
  if (method === 'POST' && path === 'hubs/expired') return 'hubs/expired/process'
  if (method === 'POST' && /^hubs\/[^/]+\/parcels$/.test(path)) return `${path}/deposit`
  return path
}

export function normalizeBffPath(pathSegments: string[]): string | null {
  if (pathSegments.length === 0) return null
  const normalized: string[] = []
  for (const raw of pathSegments) {
    let segment: string
    try {
      segment = decodeURIComponent(raw)
    } catch {
      return null
    }
    if (
      !segment ||
      segment === '.' ||
      segment === '..' ||
      segment.includes('/') ||
      segment.includes('\\') ||
      segment.includes('\0') ||
      /^[a-z][a-z0-9+.-]*:/i.test(segment)
    ) return null
    normalized.push(encodeURIComponent(segment))
  }
  return normalized.join('/')
}

export async function handleAgencyBff(
  request: NextRequest,
  pathSegments: string[],
): Promise<NextResponse> {
  const path = normalizeBffPath(pathSegments)
  if (!path) return error('Route Agency invalide.', 400, 'INVALID_ROUTE')

  try {
    if (request.method === 'POST' && path === 'auth/logout') {
      const response = success({ loggedOut: true })
      response.cookies.set(AUTH_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      })
      response.cookies.set(SHARED_SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      })
      return response
    }
    if (!isPublicRequest(request.method, path)) {
      const verified = await verifyRequestToken(request)
      if (!verified) {
        return error('Session invalide ou expirée.', 401, 'UNAUTHORIZED')
      }
    }
    if (
      request.method === 'POST' &&
      ['auth/login', 'auth/signup', 'auth/login/mfa/confirm'].includes(path)
    ) {
      return proxyAuth(request, path)
    }
    if (request.method === 'GET' && path === 'auth/session') {
      return agencySession(request)
    }
    if (request.method === 'GET' && path === 'auth/branch/session') {
      return branchSession(request)
    }
    if (request.method === 'GET' && path === 'auth/livreur/session') {
      return livreurSession(request)
    }
    if (request.method === 'GET' && path === 'auth/hub/session') {
      return hubSession(request)
    }
    if (request.method === 'POST' && path === 'media/upload') {
      return proxyMediaUpload(request)
    }
    if (request.method === 'POST' && path === 'kyc/documents/verify') {
      return proxyKycVerify(request)
    }
    const mediaDownload = /^media\/([^/]+)\/download-url$/.exec(path)
    if (request.method === 'GET' && mediaDownload) {
      return proxyMediaDownloadUrl(request, decodeURIComponent(mediaDownload[1]))
    }
    if (request.method === 'GET' && path === 'integrations/yowyob/launch') {
      return launchYowyobApp(request)
    }
    if (request.method === 'GET' && path === 'realtime/presence') {
      return streamCorePresence(request)
    }
    const notificationStream = /^agencies\/([^/]+)\/notifications\/stream$/.exec(path)
    if (request.method === 'GET' && notificationStream) {
      const tenantId =
        identityValue(request, 'tid', 'tenantId') ??
        requiredHeader(request, 'x-tenant-id')
      const agencyId = decodeURIComponent(notificationStream[1])
      if (!tenantId) return error('Tenant requis.', 400, 'TENANT_REQUIRED')
      return streamAgencyNotifications(request, {
        tenantId,
        agencyId,
        fetchNotifications: async () => {
          const listed = await coreData(
            request,
            `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/notifications?limit=20`,
            tenantId,
          )
          if (!listed.response.ok) return []
          return Array.isArray(listed.data) ? listed.data : []
        },
      })
    }
    const searchRoute = /^agencies\/([^/]+)\/search$/.exec(path)
    if (request.method === 'GET' && searchRoute) {
      return proxySearch(request, decodeURIComponent(searchRoute[1]))
    }
    const fleetManRoute = /^agencies\/([^/]+)\/fleetman\/(status|connect|launch|sync)$/.exec(path)
    if (fleetManRoute) {
      return handleFleetMan(
        request,
        decodeURIComponent(fleetManRoute[1]),
        fleetManRoute[2],
      )
    }
    if (
      path === 'sync/pull' ||
      path === 'sync/push' ||
      path === 'sync/bootstrap' ||
      /^agencies\/[^/]+\/sync\/(pull|push|bootstrap)$/.test(path)
    ) {
      return proxyAgencySync(request, path)
    }
    const trackingStream = /^tracking\/([^/]+)\/stream$/.exec(path)
    if (request.method === 'GET' && trackingStream) {
      const tenantId =
        requiredHeader(request, 'x-tenant-id') ??
        request.nextUrl.searchParams.get('tenantId') ??
        process.env.NEXT_PUBLIC_TENANT_ID ??
        ''
      if (!tenantId) return error('Tenant requis.', 400, 'TENANT_REQUIRED')
      return proxyRealtimeStream(
        request,
        `/api/v1/realtime/sse/tracking/${trackingStream[1]}`,
        tenantId,
      )
    }
    const missionStream = /^missions\/([^/]+)\/events$/.exec(path)
    if (request.method === 'GET' && missionStream) {
      const tenantId =
        requiredHeader(request, 'x-tenant-id') ??
        request.nextUrl.searchParams.get('tenantId') ??
        ''
      if (!tenantId) return error('Tenant requis.', 400, 'TENANT_REQUIRED')
      return proxyRealtimeStream(
        request,
        `/api/v1/realtime/sse/mission/${missionStream[1]}`,
        tenantId,
      )
    }
    return proxyAgencyRegistry(request, path)
  } catch (cause) {
    console.error('[Agency BFF]', cause)
    return error(
      cause instanceof Error ? cause.message : 'Core Agency est indisponible.',
      502,
      'CORE_UNAVAILABLE',
    )
  }
}
