import { formatUserError } from '@/lib/errors';
import { unwrapApiData } from '@/lib/api/envelope';
import { publicClientHeaders, publicClientJsonHeaders } from '@/lib/tracking/publicApi';

export async function publicFetchJson<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error(formatUserError(
      { status: 0, message: 'network' },
      'Impossible de joindre le serveur.',
    ));
  }

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const raw = (body as { error?: { message?: string }; message?: string })?.error?.message
      ?? (body as { message?: string })?.message
      ?? '';
    const message = formatUserError({ status: res.status, message: raw }, 'Requête refusée.');
    throw { status: res.status, message };
  }

  return unwrapApiData<T>(body);
}

export { publicClientHeaders, publicClientJsonHeaders };
