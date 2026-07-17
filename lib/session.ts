/** Session helpers — no hardcoded demo tenant IDs. */

function ls(primary: string, fallback?: string): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(primary) ?? (fallback ? localStorage.getItem(fallback) : null) ?? '';
}

export function getAgencyId(): string {
  return ls('tnt-agency-id', 'tnt-branch-agency-id');
}

export function getTenantId(): string {
  return ls('tnt-tenant-id', 'tnt-branch-tenant-id');
}

export function getUserId(): string {
  return ls('tnt-user-id', 'tnt-branch-user-id');
}

export function getAuthToken(): string | null {
  return null;
}

export function getSharedSessionToken(): string | null {
  return null;
}

export function getUserEmail(): string {
  return ls('tnt-user-email', 'tnt-branch-email');
}

export function getUserRole(): string {
  const role = ls('tnt-user-role', 'tnt-branch-user-role');
  if (role) return role;
  if (typeof window !== 'undefined' && localStorage.getItem('tnt-branch-session-active') === 'true') {
    return 'BRANCH_MANAGER';
  }
  return '';
}

export function getBranchId(): string {
  return ls('tnt-branch-id');
}
