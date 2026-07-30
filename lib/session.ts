/** Session helpers — HQ, antenne, hub, livreur (no hardcoded demo tenant IDs). */

function ls(...keys: string[]): string {
  if (typeof window === 'undefined') return ''
  for (const key of keys) {
    const value = localStorage.getItem(key)
    if (value) return value
  }
  return ''
}

export function getAgencyId(): string {
  return ls(
    'tnt-agency-id',
    'tnt-branch-agency-id',
    'tnt-hub-agency-id',
    'tnt-livreur-agency-id',
  )
}

export function getTenantId(): string {
  return ls(
    'tnt-tenant-id',
    'tnt-branch-tenant-id',
    'tnt-hub-tenant-id',
    'tnt-livreur-tenant-id',
  )
}

export function getUserId(): string {
  return ls(
    'tnt-user-id',
    'tnt-branch-user-id',
    'tnt-hub-user-id',
    'tnt-livreur-user-id',
  )
}

export function getAuthToken(): string | null {
  return null
}

export function getSharedSessionToken(): string | null {
  return null
}

export function getUserEmail(): string {
  return ls(
    'tnt-user-email',
    'tnt-branch-email',
    'tnt-hub-email',
  )
}

export function getUserRole(): string {
  const role = ls(
    'tnt-user-role',
    'tnt-branch-user-role',
    'tnt-hub-user-role',
    'tnt-livreur-user-role',
  )
  if (role) return role
  if (typeof window === 'undefined') return ''
  if (localStorage.getItem('tnt-hub-session-active') === 'true') return 'AGENCY_HUB_OPERATOR'
  if (localStorage.getItem('tnt-branch-session-active') === 'true') return 'BRANCH_MANAGER'
  if (localStorage.getItem('tnt-livreur-session-active') === 'true') return 'PERMANENT_DELIVERER'
  return ''
}

export function getBranchId(): string {
  return ls('tnt-branch-id')
}

export function getActivePortalLoginPath(): string {
  if (typeof window === 'undefined') return '/login'
  if (localStorage.getItem('tnt-hub-session-active') === 'true') return '/hub/login'
  if (localStorage.getItem('tnt-branch-session-active') === 'true') return '/branch/login'
  if (localStorage.getItem('tnt-livreur-session-active') === 'true') return '/livreur/login'
  return '/login'
}
