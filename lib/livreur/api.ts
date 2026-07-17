import { formatUserError } from '@/lib/errors';
import { API_BASE_URL } from '@/lib/config';
import { unwrapApiData } from '@/lib/api/envelope';

const SESSION_KEYS = {
  token: 'tnt-livreur-token',
  active: 'tnt-livreur-session-active',
  id: 'tnt-livreur-id',
  name: 'tnt-livreur-name',
  tenantId: 'tnt-livreur-tenant-id',
  agencyId: 'tnt-livreur-agency-id',
  userId: 'tnt-livreur-user-id',
} as const;

export interface LivreurSession {
  token: string;
  delivererId: string;
  delivererName: string;
  tenantId: string;
  agencyId: string;
  userId: string;
}

export function getLivreurSession(): LivreurSession | null {
  if (typeof window === 'undefined') return null;
  const delivererId = localStorage.getItem(SESSION_KEYS.id);
  const tenantId = localStorage.getItem(SESSION_KEYS.tenantId);
  const agencyId = localStorage.getItem(SESSION_KEYS.agencyId);
  if (
    localStorage.getItem(SESSION_KEYS.active) !== 'true' ||
    !delivererId ||
    !tenantId ||
    !agencyId
  ) return null;
  return {
    token: '',
    delivererId,
    delivererName: localStorage.getItem(SESSION_KEYS.name) ?? 'Livreur',
    tenantId,
    agencyId,
    userId: localStorage.getItem(SESSION_KEYS.userId) ?? '',
  };
}

export function saveLivreurSession(s: LivreurSession) {
  localStorage.removeItem(SESSION_KEYS.token);
  localStorage.setItem(SESSION_KEYS.active, 'true');
  localStorage.setItem(SESSION_KEYS.id, s.delivererId);
  localStorage.setItem(SESSION_KEYS.name, s.delivererName);
  localStorage.setItem(SESSION_KEYS.tenantId, s.tenantId);
  localStorage.setItem(SESSION_KEYS.agencyId, s.agencyId);
  localStorage.setItem(SESSION_KEYS.userId, s.userId);
}

export function clearLivreurSession() {
  Object.values(SESSION_KEYS).forEach(k => localStorage.removeItem(k));
}

export function getLivreurHeaders(extra?: Record<string, string>): Record<string, string> {
  const session = getLivreurSession();
  return {
    'Content-Type': 'application/json',
    'X-Tenant-Id': session?.tenantId ?? '',
    'X-Agency-Id': session?.agencyId ?? '',
    ...(session?.userId ? { 'X-User-Id': session.userId } : {}),
    ...extra,
  };
}

export async function livreurFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${normalized}`, {
      ...options,
      headers: { ...getLivreurHeaders(), ...(options.headers as Record<string, string> | undefined) },
    });
  } catch {
    throw new Error(formatUserError(null, 'Impossible de joindre le serveur. Vérifiez votre connexion.'));
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(formatUserError(
      { status: res.status, message: (body as { message?: string })?.message ?? '' },
      'Une erreur est survenue. Réessayez dans un instant.',
    ));
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json();
  return unwrapApiData<T>(body);
}

export async function livreurUpload(
  file: Blob,
  filename: string,
  category: string,
): Promise<{ mediaId: string; url: string; publicUrl: string }> {
  const session = getLivreurSession();
  if (!session) throw new Error('Session expirée');

  const form = new FormData();
  form.append('file', file, filename);

  const res = await fetch(`${API_BASE_URL}/media/upload?category=${encodeURIComponent(category)}`, {
    method: 'POST',
    headers: {
      'X-Tenant-Id': session.tenantId,
      'X-Agency-Id': session.agencyId,
      'X-User-Id': session.userId,
    },
    body: form,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(formatUserError(
      { status: res.status, message: (body as { message?: string })?.message ?? '' },
      'Échec de l\'envoi du fichier.',
    ));
  }

  const data = unwrapApiData<{ mediaId: string; url: string; publicUrl: string }>(await res.json());
  return data;
}
