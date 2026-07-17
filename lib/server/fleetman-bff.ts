import 'server-only'

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

import { requestToken } from '@/lib/server/verify-auth'

const CORE_BASE_URL = (
  process.env.TNT_CORE_BASE_URL ??
  'https://tiibntick-core.yowyob.com'
).replace(/\/+$/, '')

const FLEETMAN_BASE_URL = (
  process.env.TNT_FLEETMAN_API_BASE_URL ??
  'https://fleetman.yowyob.com'
).replace(/\/+$/, '')

const FLEETMAN_UI_URL = (
  process.env.TNT_FLEETMAN_UI_BASE_URL ??
  FLEETMAN_BASE_URL
).replace(/\/+$/, '')

const FLEETMAN_ENABLED = process.env.TNT_FLEETMAN_ENABLED !== 'false'

/** FleetMan reste réservé à l’agence (pas aux antennes — pas de scope branche côté FleetMan). */
const MANAGER_ROLES = new Set([
  'AGENCY_MANAGER',
  'OPERATIONS_MANAGER',
  'TNT_ADMIN',
])

type JsonRecord = Record<string, unknown>

function record(value: unknown): JsonRecord {
  return typeof value === 'object' && value !== null ? value as JsonRecord : {}
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function unwrap(value: unknown): unknown {
  return record(value).data ?? value
}

function envelope(data: unknown, status = 200): NextResponse {
  return NextResponse.json({
    status: 'SUCCESS',
    data,
    error: null,
    timestamp: new Date().toISOString(),
  }, { status })
}

function failure(message: string, status = 422): NextResponse {
  return NextResponse.json({
    status: 'ERROR',
    data: null,
    error: { code: 'FLEETMAN_ERROR', message },
    timestamp: new Date().toISOString(),
  }, { status })
}

function claims(request: NextRequest): JsonRecord {
  const token = requestToken(request)
  const payload = token?.split('.')[1]
  if (!payload) return {}
  try {
    return record(JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')))
  } catch {
    return {}
  }
}

function claim(request: NextRequest, ...names: string[]): string {
  const payload = claims(request)
  for (const name of names) {
    const value = text(payload[name])
    if (value) return value
  }
  return ''
}

function role(request: NextRequest): string {
  const payload = claims(request)
  const values = payload.roles ?? payload.authorities
  const first = Array.isArray(values) ? text(values[0]) : text(values)
  return (
    claim(request, 'role') ||
    first ||
    request.headers.get('x-user-role') ||
    ''
  ).replace(/^ROLE_/, '').toUpperCase()
}

function requireManager(request: NextRequest): NextResponse | null {
  const current = role(request)
  if (current === 'BRANCH_MANAGER') {
    return failure(
      'FleetMan est réservé à l’administration agence. Utilisez la flotte de votre antenne dans Agency.',
      403,
    )
  }
  // Rôle absent autorisé (session agence) ; rôle présent hors allowlist refusé.
  if (!current || MANAGER_ROLES.has(current)) return null
  return failure('Rôle insuffisant pour FleetMan (manager agence requis).', 403)
}

async function requireCoreOk(
  result: { response: Response; data: unknown },
  message: string,
): Promise<unknown> {
  if (!result.response.ok) throw new Error(message)
  return result.data
}

function coreHeaders(request: NextRequest, tenantId: string): Headers {
  const headers = new Headers({
    accept: 'application/json',
    'content-type': 'application/json',
    'x-tenant-id': tenantId,
  })
  const token = requestToken(request)
  if (token) headers.set('authorization', `Bearer ${token}`)
  const clientId = process.env.TNT_AGENCY_CLIENT_ID
  const apiKey = process.env.TNT_AGENCY_API_KEY
  if (clientId) headers.set('x-client-id', clientId)
  if (apiKey) headers.set('x-api-key', apiKey)
  const userId = claim(request, 'sub', 'userId', 'uid')
  if (userId) headers.set('x-user-id', userId)
  return headers
}

async function core(
  request: NextRequest,
  tenantId: string,
  path: string,
  init: RequestInit = {},
): Promise<{ response: Response; data: unknown }> {
  const response = await fetch(`${CORE_BASE_URL}${path}`, {
    ...init,
    headers: coreHeaders(request, tenantId),
    cache: 'no-store',
  })
  const body = await response.json().catch(() => ({}))
  return { response, data: unwrap(body) }
}

async function fleetman(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
): Promise<{ response: Response; data: unknown }> {
  const headers = new Headers(init.headers)
  headers.set('accept', 'application/json')
  if (accessToken) headers.set('authorization', `Bearer ${accessToken}`)
  const response = await fetch(`${FLEETMAN_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  })
  const data = await response.json().catch(() => ({}))
  return { response, data }
}

function encryptionKey(): Buffer | null {
  const raw = process.env.TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY?.trim()
  if (!raw) {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.TNT_FLEETMAN_ALLOW_PLAINTEXT_TOKENS === 'true'
    ) return null
    throw new Error('TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY est requise (Base64, 32 octets).')
  }
  if (!/^[A-Za-z0-9+/]+=*$/.test(raw)) {
    throw new Error('TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY doit être du Base64 valide (32 octets).')
  }
  const key = Buffer.from(raw, 'base64')
  if (key.length !== 32 || key.toString('base64').replace(/=+$/, '') !== raw.replace(/=+$/, '')) {
    throw new Error('TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY doit encoder exactement 32 octets.')
  }
  return key
}

export function encryptFleetManToken(token: string): string {
  const key = encryptionKey()
  if (!key) return `plain:${token}`
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()])
  return Buffer.concat([iv, encrypted, cipher.getAuthTag()]).toString('base64')
}

export function decryptFleetManToken(stored: string): string {
  if (stored.startsWith('plain:')) return stored.slice('plain:'.length)
  const key = encryptionKey()
  if (!key) return stored
  const all = Buffer.from(stored, 'base64')
  if (all.length < 29) throw new Error('Token FleetMan chiffré invalide.')
  const iv = all.subarray(0, 12)
  const tag = all.subarray(all.length - 16)
  const encrypted = all.subarray(12, all.length - 16)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

function authTokens(value: unknown): {
  accessToken: string
  refreshToken: string
  userId: string
  email: string
} {
  const data = record(value)
  const user = record(data.user)
  return {
    accessToken: text(data.accessToken),
    refreshToken: text(data.refreshToken),
    userId: text(user.id),
    email: text(user.email),
  }
}

async function authenticateOrRegister(
  email: string,
  password: string,
  phone: string,
  agencyName: string,
): Promise<ReturnType<typeof authTokens>> {
  const user = {
    email,
    password,
    phone: phone || '+237000000000',
    username: email.split('@')[0] || email,
    firstName: agencyName || 'Manager',
    lastName: 'Manager',
    roles: ['FLEET_MANAGER'],
  }
  const form = new FormData()
  form.set('user', new Blob([JSON.stringify(user)], { type: 'application/json' }))
  const registration = await fleetman('/api/v1/auth/register', {
    method: 'POST',
    body: form,
  })
  if (registration.response.ok) return authTokens(registration.data)

  // Java tente le login sur toute erreur client 4xx (compte déjà existant, etc.).
  if (registration.response.status < 400 || registration.response.status >= 500) {
    throw new Error('Création du compte FleetMan impossible.')
  }
  const login = await fleetman('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ identifier: email, password }),
  })
  if (!login.response.ok) {
    throw new Error('Compte FleetMan existant, mauvais mot de passe.')
  }
  return authTokens(login.data)
}

async function refreshedAccessToken(link: JsonRecord): Promise<string> {
  const encrypted = text(link.refreshTokenEnc)
  if (!encrypted) throw new Error('Token FleetMan manquant — reconnectez FleetMan.')
  const refresh = await fleetman('/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ refreshToken: decryptFleetManToken(encrypted) }),
  })
  if (!refresh.response.ok) {
    throw new Error('Session FleetMan expirée — reconnectez avec votre mot de passe.')
  }
  return authTokens(refresh.data).accessToken
}

async function ensureFleet(
  accessToken: string,
  name: string,
  phone: string,
): Promise<string> {
  const listed = await fleetman('/api/v1/fleets', {}, accessToken)
  const fleets = Array.isArray(listed.data) ? listed.data : []
  const exact = fleets.find(item => text(record(item).name).toLowerCase() === name.toLowerCase())
  const fallback = fleets.length === 1 ? fleets[0] : undefined
  const existingId = text(record(exact ?? fallback).id)
  if (existingId) return existingId

  const created = await fleetman('/api/v1/fleets', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name,
      ...(phone ? { phoneNumber: phone } : {}),
    }),
  }, accessToken)
  if (!created.response.ok || !text(record(created.data).id)) {
    throw new Error('FleetMan n’a pas renvoyé d’identifiant de flotte.')
  }
  return text(record(created.data).id)
}

function findArray(catalog: JsonRecord, keys: string[]): unknown[] {
  for (const key of keys) {
    if (Array.isArray(catalog[key])) return catalog[key] as unknown[]
  }
  for (const [name, value] of Object.entries(catalog)) {
    const normalized = name.toLowerCase().replace(/-/g, '')
    if (
      Array.isArray(value) &&
      keys.some(key => normalized.includes(key.toLowerCase().replace(/-/g, '')))
    ) return value
  }
  return []
}

function itemId(item: unknown): string {
  const value = record(item)
  return text(value.id) || text(value.uuid)
}

function itemName(item: unknown): string {
  const value = record(item)
  for (const field of ['name', 'label', 'code', 'value', 'brand', 'model']) {
    const found = text(value[field]).toLowerCase()
    if (found) return found
  }
  return ''
}

function pickId(catalog: JsonRecord, keys: string[], ...matches: string[]): string | null {
  const list = findArray(catalog, keys)
  const needles = matches.map(value => value.toLowerCase()).filter(Boolean)
  const matched = list.find(item => needles.some(needle => itemName(item).includes(needle)))
  return itemId(matched ?? list[0]) || null
}

export function buildFleetManVehicleRequest(
  catalog: JsonRecord,
  vehicle: JsonRecord,
): JsonRecord {
  const plate = text(vehicle.licensePlate) || text(vehicle.registrationNumber)
  const brand = text(vehicle.brand) || text(vehicle.model).split(/\s+/)[0] || 'Unknown'
  const model = text(vehicle.model) || 'Unknown'
  return {
    licensePlate: plate,
    manufacturingYear: Number(vehicle.year || vehicle.manufacturingYear || 2020),
    vehicleTypeId: pickId(catalog, ['vehicleTypes', 'vehicle-types', 'types'], text(vehicle.vehicleType), brand),
    manufacturerId: pickId(catalog, ['manufacturers', 'manufacturer'], brand),
    brandId: pickId(catalog, ['brands', 'brand'], brand),
    modelId: pickId(catalog, ['models', 'model'], model, brand),
    sizeId: pickId(catalog, ['sizes', 'size', 'gabarits']),
    usageTypeId: pickId(catalog, ['usages', 'usageTypes', 'usage-types']),
    fuelTypeId: pickId(catalog, ['fuels', 'fuelTypes', 'fuel-types']),
    transmissionTypeId: pickId(catalog, ['transmissions', 'transmissionTypes']),
    colorId: pickId(catalog, ['colors', 'color']),
  }
}

function normalizedPlate(value: unknown): string {
  return text(value).replace(/\s+/g, '').toUpperCase()
}

async function pushVehicle(
  request: NextRequest,
  tenantId: string,
  accessToken: string,
  fleetId: string,
  catalog: JsonRecord,
  vehicle: JsonRecord,
): Promise<string> {
  const plate = text(vehicle.licensePlate)
  if (text(vehicle.fleetmanVehicleId)) return plate || text(vehicle.fleetmanVehicleId)
  if (!plate) throw new Error('Véhicule sans plaque.')
  const payload = buildFleetManVehicleRequest(catalog, vehicle)
  if (Object.values(payload).some(value => value === null || value === '')) {
    throw new Error(`Catalogue FleetMan incomplet pour ${plate}.`)
  }
  const created = await fleetman('/api/v1/vehicles', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }, accessToken)
  const remoteId = text(record(created.data).id)
  if (!created.response.ok || !remoteId) throw new Error(`Création FleetMan échouée pour ${plate}.`)

  await fleetman(`/api/v1/fleets/${encodeURIComponent(fleetId)}/vehicles`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ vehicleId: remoteId }),
  }, accessToken)

  const localId = text(vehicle.id)
  if (localId) {
    await requireCoreOk(
      await core(
        request,
        tenantId,
        `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/vehicles/${encodeURIComponent(localId)}/fleetman-link`,
        {
          method: 'PATCH',
          body: JSON.stringify({ fleetmanVehicleId: remoteId, source: 'AGENCY' }),
        },
      ),
      `Liaison Core échouée pour ${plate}.`,
    )
  }
  return plate
}

async function getLink(
  request: NextRequest,
  tenantId: string,
  agencyId: string,
): Promise<{ response: Response; link: JsonRecord }> {
  const result = await core(
    request,
    tenantId,
    `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/fleetman-link`,
  )
  return { response: result.response, link: record(result.data) }
}

export async function handleFleetMan(
  request: NextRequest,
  agencyId: string,
  action: string,
): Promise<NextResponse> {
  try {
    if (!FLEETMAN_ENABLED) {
      return failure('Intégration FleetMan désactivée.', 503)
    }

    const tenantId =
      claim(request, 'tid', 'tenantId') ||
      request.headers.get('x-tenant-id') ||
      ''
    if (!tenantId) return failure('Tenant requis.', 400)

    const denied = requireManager(request)
    if (denied) return denied

    if (request.method === 'GET' && action === 'status') {
      const { response, link } = await getLink(request, tenantId, agencyId)
      return envelope(response.ok
        ? {
            linked: true,
            email: text(link.email) || null,
            fleetmanFleetId: text(link.fleetmanFleetId) || null,
          }
        : { linked: false, email: null, fleetmanFleetId: null })
    }

    if (request.method === 'POST' && action === 'launch') {
      const { response, link } = await getLink(request, tenantId, agencyId)
      if (!response.ok) return failure('FleetMan non connecté. Définissez d’abord votre mot de passe.')
      return envelope({
        email: text(link.email),
        redirectUrl: FLEETMAN_UI_URL,
        linked: true,
      })
    }

    if (request.method === 'POST' && action === 'connect') {
      const body = record(await request.json().catch(() => ({})))
      const email =
        text(body.email).trim() ||
        claim(request, 'email') ||
        request.headers.get('x-user-email') ||
        ''
      const password = text(body.password)
      if (!email) return failure('Email utilisateur requis pour FleetMan.', 400)
      if (password.length < 8) return failure('Mot de passe FleetMan requis (min. 8 caractères).', 400)

      const agencyResult = await core(
        request,
        tenantId,
        `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}`,
      )
      if (!agencyResult.response.ok) return failure('Agence introuvable.', 404)
      const agency = record(agencyResult.data)
      const auth = await authenticateOrRegister(
        email,
        password,
        text(body.phone) || text(agency.contactPhone),
        text(agency.name),
      )
      if (!auth.accessToken || !auth.refreshToken) {
        return failure('Réponse d’authentification FleetMan invalide.', 502)
      }
      const fleetId = await ensureFleet(
        auth.accessToken,
        text(agency.name) || `Agence ${agencyId}`,
        text(agency.contactPhone),
      )
      await requireCoreOk(
        await core(
          request,
          tenantId,
          `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/fleetman-link`,
          {
            method: 'PUT',
            body: JSON.stringify({
              fleetmanUserId: auth.userId,
              fleetmanFleetId: fleetId,
              email,
              refreshTokenEnc: encryptFleetManToken(auth.refreshToken),
              status: 'ACTIVE',
            }),
          },
        ),
        'Impossible de persister le lien FleetMan.',
      )

      const [catalogResult, vehiclesResult] = await Promise.all([
        fleetman('/api/v1/vehicles/resources/all', {}, auth.accessToken),
        core(
          request,
          tenantId,
          `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/vehicles`,
        ),
      ])
      if (!catalogResult.response.ok) {
        return failure('Catalogue FleetMan indisponible.', 502)
      }
      const vehicles = vehiclesResult.response.ok && Array.isArray(vehiclesResult.data)
        ? vehiclesResult.data
        : []
      const syncedPlates: string[] = []
      const failedPlates: string[] = []
      for (const vehicleValue of vehicles) {
        const vehicle = record(vehicleValue)
        try {
          syncedPlates.push(await pushVehicle(
            request,
            tenantId,
            auth.accessToken,
            fleetId,
            record(catalogResult.data),
            vehicle,
          ))
        } catch (cause) {
          failedPlates.push(`${text(vehicle.licensePlate) || '?'}: ${
            cause instanceof Error ? cause.message : 'échec'
          }`)
        }
      }
      return envelope({
        email,
        redirectUrl: FLEETMAN_UI_URL,
        linked: true,
        syncedPlates,
        failedPlates,
      })
    }

    if (request.method === 'POST' && action === 'sync') {
      const { response, link } = await getLink(request, tenantId, agencyId)
      if (!response.ok) return failure('FleetMan non connecté.')
      const accessToken = await refreshedAccessToken(link)
      const fleetId = text(link.fleetmanFleetId)
      let remoteResult = await fleetman(
        `/api/v1/fleets/${encodeURIComponent(fleetId)}/vehicles`,
        {},
        accessToken,
      )
      if (!remoteResult.response.ok) {
        remoteResult = await fleetman('/api/v1/vehicles', {}, accessToken)
      }
      const localResult = await core(
        request,
        tenantId,
        `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/vehicles`,
      )
      if (!remoteResult.response.ok) {
        return failure('Impossible de lire les véhicules FleetMan.', 502)
      }
      const remote = Array.isArray(remoteResult.data) ? remoteResult.data : []
      const local = localResult.response.ok && Array.isArray(localResult.data)
        ? localResult.data
        : []
      const localByPlate = new Map(
        local.map(item => [
          normalizedPlate(record(item).licensePlate ?? record(item).registrationNumber),
          record(item),
        ]),
      )
      let created = 0
      let linked = 0
      const failed: string[] = []
      for (const remoteValue of remote) {
        const vehicle = record(remoteValue)
        const plate = normalizedPlate(vehicle.licensePlate)
        const remoteId = text(vehicle.id)
        if (!plate || !remoteId) continue
        const existing = localByPlate.get(plate)
        try {
          if (existing) {
            const localId = text(existing.id)
            if (!localId) continue
            if (text(existing.fleetmanVehicleId) !== remoteId) {
              await requireCoreOk(
                await core(
                  request,
                  tenantId,
                  `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/vehicles/${encodeURIComponent(localId)}/fleetman-link`,
                  {
                    method: 'PATCH',
                    body: JSON.stringify({ fleetmanVehicleId: remoteId, source: 'FLEETMAN' }),
                  },
                ),
                `Liaison Core échouée pour ${plate}.`,
              )
              linked += 1
            }
          } else {
            await requireCoreOk(
              await core(
                request,
                tenantId,
                `/api/v1/tenants/${encodeURIComponent(tenantId)}/agency-registry/agencies/${encodeURIComponent(agencyId)}/vehicles`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    licensePlate: text(vehicle.licensePlate),
                    brand: text(vehicle.brand) || 'Unknown',
                    model: text(vehicle.model) || 'Unknown',
                    year: Number(vehicle.manufacturingYear || 2020),
                    vehicleType: 'CAR',
                    source: 'FLEETMAN',
                    fleetmanVehicleId: remoteId,
                  }),
                },
              ),
              `Import Core échoué pour ${plate}.`,
            )
            created += 1
          }
        } catch (cause) {
          failed.push(`${plate}: ${cause instanceof Error ? cause.message : 'échec'}`)
        }
      }
      return envelope({ created, linked, failed })
    }

    return failure('Opération FleetMan inconnue.', 404)
  } catch (cause) {
    return failure(cause instanceof Error ? cause.message : 'FleetMan indisponible.', 502)
  }
}
