/** Cookie de session agence (lu par middleware Next.js). */
export const AUTH_COOKIE = 'tnt-auth';

export function setAuthCookie(token: string, maxAgeSec = 86400): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSec}; SameSite=Lax`;
}

export function clearAuthCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
