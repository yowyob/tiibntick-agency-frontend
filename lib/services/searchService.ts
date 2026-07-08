import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';

export interface SearchHit {
  entityType: string;
  entityId: string;
  title: string;
  snippet: string;
  score: number;
}

export interface SearchResults {
  hits: SearchHit[];
  total: number;
}

const ROUTES: Record<string, (id: string) => string> = {
  MISSION: () => '/missions',
  mission: () => '/missions',
  DELIVERER: () => '/staff',
  deliverer: () => '/staff',
  BRANCH: () => '/branches',
  branch: () => '/branches',
  HUB: () => '/hubs',
  hub: () => '/hubs',
  VEHICLE: () => '/fleet',
  vehicle: () => '/fleet',
  STAFF: () => '/staff',
  staff: () => '/staff',
};

export function searchResultHref(hit: SearchHit): string {
  const key = hit.entityType.toUpperCase();
  const builder = ROUTES[key] ?? ROUTES[hit.entityType.toLowerCase()];
  return builder ? builder(hit.entityId) : '/';
}

export const searchService = {
  async search(query: string, entityType?: string, limit = 8): Promise<SearchResults> {
    const agencyId = getAgencyId();
    const params = new URLSearchParams({ q: query.trim(), limit: String(limit) });
    if (entityType) params.set('entityType', entityType);
    const result = await apiClient.get<SearchResults>(
      `/agencies/${agencyId}/search?${params.toString()}`,
    );
    return result ?? { hits: [], total: 0 };
  },
};
