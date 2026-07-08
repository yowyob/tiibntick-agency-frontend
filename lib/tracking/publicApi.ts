import { PUBLIC_TENANT_ID } from '@/lib/config';

/** Headers for public client-portal API calls (no JWT). */
export function publicClientHeaders(): HeadersInit {
  return {
    'X-Tenant-Id': PUBLIC_TENANT_ID,
    Accept: 'application/json',
  };
}

export function publicClientJsonHeaders(): HeadersInit {
  return {
    ...publicClientHeaders(),
    'Content-Type': 'application/json',
  };
}
