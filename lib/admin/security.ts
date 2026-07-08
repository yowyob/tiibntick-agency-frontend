/** Client-side validation & throttling (defense in depth — backend enforces auth). */

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const RATE_BUCKETS = new Map<string, { count: number; resetAt: number }>();

export function assertUuid(value: string, label = 'Identifiant'): string {
  const trimmed = value.trim();
  if (!UUID_RE.test(trimmed)) {
    throw new Error(`${label} invalide. Format UUID attendu.`);
  }
  return trimmed;
}

/** Strip control chars and cap length — reduces injection/XSS surface in text fields. */
export function sanitizeText(value: string, maxLen = 500): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLen);
}

export function sanitizeReason(value: string): string {
  const cleaned = sanitizeText(value, 1000);
  if (cleaned.length < 3) {
    throw new Error('Le motif doit contenir au moins 3 caractères.');
  }
  return cleaned;
}

export function assertEmail(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 254) {
    throw new Error('Adresse email invalide.');
  }
  return trimmed;
}

/** Simple in-memory rate limiter per browser tab (anti brute-force UI). */
export function checkRateLimit(key: string, maxAttempts: number, windowMs: number): void {
  const now = Date.now();
  const bucket = RATE_BUCKETS.get(key);
  if (!bucket || now >= bucket.resetAt) {
    RATE_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (bucket.count >= maxAttempts) {
    throw new Error('Trop de tentatives. Patientez quelques instants.');
  }
  bucket.count += 1;
}

export function adminActionRateLimit(action: string): void {
  checkRateLimit(`admin:${action}`, 20, 60_000);
}

export function adminLoginRateLimit(): void {
  checkRateLimit('admin:login', 8, 300_000);
}
