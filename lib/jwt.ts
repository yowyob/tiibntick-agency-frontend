/** Decode JWT payload claims without external dependency. */
export function parseJwtPayload(token: string): Record<string, unknown> {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return {};
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json = atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function claimString(claims: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = claims[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return '';
}

export function claimRoles(claims: Record<string, unknown>): string[] {
  const roles = claims.roles ?? claims.authorities;
  if (Array.isArray(roles)) {
    return roles.map(String);
  }
  if (typeof roles === 'string') {
    return roles.split(/[,;\s]+/).filter(Boolean);
  }
  return [];
}

export function hasRole(roles: string[], role: string): boolean {
  return roles.some(r => r === role || r === `ROLE_${role}`);
}

const PLATFORM_ADMIN_ROLES = [
  'TNT_ADMIN',
  'SYSTEM_ADMIN',
  'TENANT_ADMIN',
  'GENERAL_ADMIN',
  'IAM_ADMIN',
] as const;

export function isPlatformAdmin(roles: string[]): boolean {
  return PLATFORM_ADMIN_ROLES.some(role => hasRole(roles, role));
}
