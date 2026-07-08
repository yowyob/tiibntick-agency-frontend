import { livreurFetch } from '@/lib/livreur/api';
import type { OfflineAction } from '@/lib/livreur/offlineQueue';

const SYNC_TOKEN_KEY = 'tnt-livreur-sync-token';
const DEVICE_ID = 'livreur-pwa';

export interface SyncPullResult {
  nextSyncToken: string;
  changes: Record<string, unknown>[];
}

function extractMissionId(path: string): string {
  const match = path.match(/\/missions\/([^/]+)/);
  return match?.[1] ?? '';
}

function offlineActionToOperation(action: OfflineAction, sequenceNumber: number): Record<string, unknown> {
  const typeMap: Record<OfflineAction['type'], string> = {
    pickup: 'UPDATE',
    deliver: 'UPDATE',
    anomaly: 'CREATE',
    'deposit-hub': 'CREATE',
    location: 'UPDATE',
  };
  const aggregateTypeMap: Record<OfflineAction['type'], string> = {
    pickup: 'MISSION',
    deliver: 'MISSION',
    anomaly: 'MISSION',
    'deposit-hub': 'PACKAGE',
    location: 'LOCATION',
  };
  return {
    id: action.id,
    type: typeMap[action.type],
    aggregateType: aggregateTypeMap[action.type],
    aggregateId: extractMissionId(action.path) || action.id,
    payload: JSON.stringify({ path: action.path, method: action.method, body: action.body }),
    localTimestampMs: new Date(action.createdAt).getTime(),
    sequenceNumber,
  };
}

export function getSyncToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SYNC_TOKEN_KEY);
}

export function saveSyncToken(token: string | null | undefined): void {
  if (typeof window === 'undefined' || !token) return;
  localStorage.setItem(SYNC_TOKEN_KEY, token);
}

export const livreurSyncService = {
  async pull(filter?: string[]): Promise<SyncPullResult | null> {
    const params = new URLSearchParams();
    const token = getSyncToken();
    if (token) params.set('syncToken', token);
    if (filter?.length) params.set('filter', filter.join(','));
    const qs = params.toString();
    try {
      const result = await livreurFetch<SyncPullResult>(
        `/sync/pull${qs ? `?${qs}` : ''}`,
        { headers: { 'X-Device-Id': DEVICE_ID } },
      );
      saveSyncToken(result.nextSyncToken);
      return result;
    } catch {
      return null;
    }
  },

  async push(operations: Record<string, unknown>[]): Promise<string | null> {
    if (operations.length === 0) return getSyncToken();
    try {
      const result = await livreurFetch<{ nextSyncToken: string }>('/sync/push', {
        method: 'POST',
        headers: { 'X-Device-Id': DEVICE_ID },
        body: JSON.stringify({ operations }),
      });
      saveSyncToken(result.nextSyncToken);
      return result.nextSyncToken;
    } catch {
      return null;
    }
  },

  offlineActionToOperation,
};
