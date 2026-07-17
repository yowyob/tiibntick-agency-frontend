import { API_BASE_URL } from '@/lib/config';
import { unwrapApiData } from '@/lib/api/envelope';
import { formatUserError } from '@/lib/errors';
import { getAgencyId, getTenantId, getUserId, getUserEmail, getUserRole } from '@/lib/session';

export interface ApiError {
  status: number;
  message: string;
}

function buildHeaders(options: RequestInit, tenantId?: string): Record<string, string> {
  const tid = tenantId ?? getTenantId();
  const aid = getAgencyId();
  const uid = getUserId();

  if (!tid || !uid) {
    throw toApiError(401, '', 'Session invalide. Veuillez vous reconnecter.');
  }

  const email = getUserEmail();
  const role = getUserRole();

  return {
    'Content-Type': 'application/json',
    'X-Tenant-Id': tid,
    'X-Agency-Id': aid,
    'X-User-Id': uid,
    ...(email ? { 'X-User-Email': email } : {}),
    ...(role ? { 'X-User-Role': role } : {}),
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string> | undefined),
  };
}

function toApiError(status: number, rawMessage: string, fallback: string): ApiError {
  return {
    status,
    message: formatUserError({ status, message: rawMessage }, fallback),
  };
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  overrideTenantId?: string,
): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${normalizedPath}`, {
      ...options,
      headers: buildHeaders(options, overrideTenantId),
    });
  } catch {
    throw toApiError(
      0,
      'network',
      'Impossible de joindre le serveur. Vérifiez votre connexion internet et réessayez.',
    );
  }

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tnt-token');
      localStorage.removeItem('tnt-session-active');
      window.location.href = '/login';
    }
    throw toApiError(401, '', 'Votre session a expiré. Veuillez vous reconnecter.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const raw =
      body?.error?.message ??
      body?.message ??
      '';
    throw toApiError(
      res.status,
      raw,
      'Une erreur est survenue lors de la communication avec le serveur.',
    );
  }

  if (res.status === 204) return undefined as T;

  const json = await res.json();
  return unwrapApiData<T>(json);
}

function getAuthHeaders(): Record<string, string> {
  return {};
}

async function upload<T>(
  path: string,
  file: File,
  overrideTenantId?: string,
): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const form = new FormData();
  form.append('file', file);

  const tid = overrideTenantId ?? getTenantId();
  const aid = getAgencyId();
  const uid = getUserId();

  if (!tid || !uid) {
    throw toApiError(401, '', 'Session invalide. Veuillez vous reconnecter.');
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${normalizedPath}`, {
      method: 'POST',
      headers: {
        'X-Tenant-Id': tid,
        'X-Agency-Id': aid,
        'X-User-Id': uid,
        ...getAuthHeaders(),
      },
      body: form,
    });
  } catch {
    throw toApiError(
      0,
      'network',
      'Impossible d\'envoyer le fichier. Vérifiez votre connexion et réessayez.',
    );
  }

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tnt-token');
      localStorage.removeItem('tnt-session-active');
      window.location.href = '/login';
    }
    throw toApiError(401, '', 'Votre session a expiré. Veuillez vous reconnecter.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const raw = body?.error?.message ?? body?.message ?? '';
    throw toApiError(
      res.status,
      raw,
      'L\'envoi du fichier a échoué. Réessayez avec un autre fichier.',
    );
  }

  if (res.status === 204) return undefined as T;
  const json = await res.json();
  return unwrapApiData<T>(json);
}

export const apiClient = {
  get: <T>(path: string, tenantId?: string, options?: RequestInit) =>
    request<T>(path, { method: 'GET', ...options }, tenantId),

  post: <T>(path: string, body: unknown, tenantId?: string) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }, tenantId),

  patch: <T>(path: string, body: unknown, tenantId?: string) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, tenantId),

  delete: <T>(path: string, tenantId?: string) =>
    request<T>(path, { method: 'DELETE' }, tenantId),

  upload: <T>(path: string, file: File, tenantId?: string) =>
    upload<T>(path, file, tenantId),
};
