import { yowAuthService, challengeToTokens, isMfaRequiredError, type AuthChallenge } from '@/lib/yowauthService'
import { API_BASE_URL } from '@/lib/config'
import { formatUserError } from '@/lib/errors'
import { unwrapApiData } from '@/lib/api/envelope'

const TENANT_KEY = 'tnt-hub-tenant-id'
const AGENCY_KEY = 'tnt-hub-agency-id'
const HUB_ID_KEY = 'tnt-hub-id'
const HUB_NAME_KEY = 'tnt-hub-name'
const HUB_CODE_KEY = 'tnt-hub-code'
const OPERATOR_NAME_KEY = 'tnt-hub-operator-name'
const OPERATOR_USER_ID_KEY = 'tnt-hub-operator-user-id'
const EMAIL_KEY = 'tnt-hub-email'
const USER_ID_KEY = 'tnt-hub-user-id'

export interface HubSession {
  tenantId: string
  agencyId: string
  hubId: string
  hubName: string
  hubCode: string
  operatorName: string
  operatorEmail: string
  operatorUserId: string
  userId: string
}

export const hubAuthService = {
  async login(email: string, password: string): Promise<HubSession> {
    const challenge = await yowAuthService.login(email, password)
    return hubAuthService.completeLogin(challenge, email)
  },

  async confirmMfa(mfaToken: string, code: string, email: string): Promise<HubSession> {
    const challenge = await yowAuthService.confirmMfa(mfaToken, code)
    return hubAuthService.completeLogin(challenge, email)
  },

  async completeLogin(challenge: AuthChallenge, email: string): Promise<HubSession> {
    const tokens = challengeToTokens(challenge, email)
    const role = tokens.role.replace(/^ROLE_/, '')
    if (role !== 'AGENCY_HUB_OPERATOR' && role !== 'RELAY_OPERATOR' && role !== 'AGENCY_MANAGER') {
      throw new Error('Ce compte n\'a pas les droits gérant de hub.')
    }

    const res = await fetch(`${API_BASE_URL}/auth/hub/session`, {
      headers: {
        'X-Tenant-Id': tokens.tenantId,
        'X-User-Id': tokens.userId,
        'X-User-Email': email,
      },
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(formatUserError(
        { status: res.status, message: body?.message ?? '' },
        'Impossible de résoudre votre hub. Contactez l\'administrateur agence.',
      ))
    }

    const data = unwrapApiData<{
      tenantId: string
      agencyId: string
      hubId: string
      hubName: string
      hubCode: string
      operatorName: string
      operatorEmail: string
      operatorUserId?: string
      userId: string
    }>(await res.json())

    localStorage.setItem('tnt-hub-session-active', 'true')
    localStorage.setItem(TENANT_KEY, data.tenantId)
    localStorage.setItem(AGENCY_KEY, data.agencyId)
    localStorage.setItem(HUB_ID_KEY, data.hubId)
    localStorage.setItem(HUB_NAME_KEY, data.hubName)
    localStorage.setItem(HUB_CODE_KEY, data.hubCode || '')
    localStorage.setItem(OPERATOR_NAME_KEY, data.operatorName || '')
    localStorage.setItem(
      OPERATOR_USER_ID_KEY,
      data.operatorUserId || data.userId || tokens.userId,
    )
    localStorage.setItem(EMAIL_KEY, data.operatorEmail || email)
    localStorage.setItem(USER_ID_KEY, data.userId || tokens.userId)
    localStorage.setItem('tnt-hub-user-role', 'AGENCY_HUB_OPERATOR')

    return {
      tenantId: data.tenantId,
      agencyId: data.agencyId,
      hubId: data.hubId,
      hubName: data.hubName,
      hubCode: data.hubCode,
      operatorName: data.operatorName,
      operatorEmail: data.operatorEmail || email,
      operatorUserId: data.operatorUserId || data.userId || tokens.userId,
      userId: data.userId || tokens.userId,
    }
  },

  isMfaRequiredError,

  logout(): void {
    ;[
      'tnt-hub-session-active', TENANT_KEY, AGENCY_KEY, HUB_ID_KEY, HUB_NAME_KEY,
      HUB_CODE_KEY, OPERATOR_NAME_KEY, OPERATOR_USER_ID_KEY, EMAIL_KEY, USER_ID_KEY,
      'tnt-hub-user-role',
    ].forEach(k => localStorage.removeItem(k))
    window.location.href = '/hub/login'
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('tnt-hub-session-active') === 'true'
      && !!localStorage.getItem(HUB_ID_KEY)
  },

  getSession(): HubSession | null {
    if (!hubAuthService.isAuthenticated()) return null
    return {
      tenantId: localStorage.getItem(TENANT_KEY) || '',
      agencyId: localStorage.getItem(AGENCY_KEY) || '',
      hubId: localStorage.getItem(HUB_ID_KEY) || '',
      hubName: localStorage.getItem(HUB_NAME_KEY) || '',
      hubCode: localStorage.getItem(HUB_CODE_KEY) || '',
      operatorName: localStorage.getItem(OPERATOR_NAME_KEY) || '',
      operatorEmail: localStorage.getItem(EMAIL_KEY) || '',
      operatorUserId: localStorage.getItem(OPERATOR_USER_ID_KEY) || localStorage.getItem(USER_ID_KEY) || '',
      userId: localStorage.getItem(USER_ID_KEY) || '',
    }
  },
}
