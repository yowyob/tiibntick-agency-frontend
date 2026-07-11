import type { ApiError } from '@/lib/api/client';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const TECHNICAL_PATTERNS = [
  /failed to fetch/i,
  /networkerror/i,
  /network request failed/i,
  /load failed/i,
  /fetch failed/i,
  /aborterror/i,
  /internal server error/i,
  /bad gateway/i,
  /service unavailable/i,
  /gateway timeout/i,
  /unexpected token/i,
  /syntaxerror/i,
  /typeerror/i,
  /referenceerror/i,
  /^error api$/i,
  /^erreur api$/i,
  /^error$/i,
  /^unknown error$/i,
];

const HTTP_MESSAGES: Record<number, string> = {
  400: 'Les informations envoyées sont invalides. Vérifiez le formulaire et réessayez.',
  401: 'Votre session a expiré. Veuillez vous reconnecter.',
  403: 'Vous n\'avez pas les droits pour effectuer cette action.',
  404: 'L\'élément demandé est introuvable ou n\'existe plus.',
  408: 'La requête a pris trop de temps. Vérifiez votre connexion et réessayez.',
  409: 'Cette action entre en conflit avec l\'état actuel. Actualisez la page.',
  422: 'Certaines données ne respectent pas les règles métier.',
  429: 'Trop de tentatives. Patientez quelques instants avant de réessayer.',
  500: 'Le serveur rencontre une difficulté temporaire. Réessayez dans un instant.',
  502: 'Le service est momentanément indisponible. Réessayez dans un instant.',
  503: 'Le service est en maintenance. Réessayez plus tard.',
  504: 'Le délai de réponse a été dépassé. Vérifiez votre connexion et réessayez.',
};

export function isUuid(value: string | undefined | null): boolean {
  return !!value && UUID_RE.test(value.trim());
}

function isTechnicalMessage(message: string): boolean {
  const trimmed = message.trim();
  if (!trimmed) return true;
  if (isUuid(trimmed)) return true;
  if (TECHNICAL_PATTERNS.some(p => p.test(trimmed))) return true;
  if (/^[A-Z][A-Z0-9_]+$/.test(trimmed)) return true;
  if (trimmed.length > 280) return true;
  return false;
}

function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) return true;
  const msg = extractRawMessage(error).toLowerCase();
  return (
    msg.includes('failed to fetch') ||
    msg.includes('network') ||
    msg.includes('load failed') ||
    msg.includes('fetch failed')
  );
}

function extractRawMessage(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const msg = (error as { message?: unknown }).message;
    if (typeof msg === 'string') return msg;
  }
  return '';
}

function extractStatus(error: unknown): number | undefined {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as ApiError).status;
    if (typeof status === 'number') return status;
  }
  return undefined;
}

/**
 * Convertit toute erreur (réseau, HTTP, API) en message utilisateur en français.
 */
export function formatUserError(error: unknown, fallback: string): string {
  if (isNetworkError(error)) {
    return 'Impossible de joindre le serveur. Vérifiez votre connexion internet et réessayez.';
  }

  const status = extractStatus(error);
  if (status && HTTP_MESSAGES[status]) {
    const raw = extractRawMessage(error);
    if (raw && !isTechnicalMessage(raw) && raw.length <= 280) {
      return raw;
    }
    return HTTP_MESSAGES[status];
  }

  const raw = extractRawMessage(error);
  if (raw && !isTechnicalMessage(raw)) {
    return raw;
  }

  return fallback;
}
