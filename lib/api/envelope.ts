/** Backend envelope (Agency + Branch controllers) */
import { formatUserError } from '@/lib/errors';

export interface ApiEnvelope<T> {
  status: 'SUCCESS' | 'ERROR' | 'PARTIAL';
  data: T;
  error?: { code?: string; message?: string } | null;
  correlationId?: string;
  timestamp?: string;
}

export function isApiEnvelope(value: unknown): value is ApiEnvelope<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'data' in value
  );
}

export function unwrapApiData<T>(body: unknown): T {
  if (isApiEnvelope(body)) {
    if (body.status === 'ERROR' || body.error) {
      throw new Error(formatUserError(
        { message: body.error?.message ?? '' },
        'Le serveur n\'a pas pu traiter votre demande. Réessayez.',
      ));
    }
    return body.data as T;
  }
  return body as T;
}
