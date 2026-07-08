import { formatUserError } from '@/lib/errors';

/** Passe une erreur API/réseau au toast avec repli métier en français. */
export function toastErrorMessage(error: unknown, fallback: string): string {
  return formatUserError(error, fallback);
}
