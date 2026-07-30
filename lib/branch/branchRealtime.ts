import { API_BASE_URL } from '@/lib/config';
import { subscribeCorePresence } from '@/lib/coreRealtime';

export type BranchRealtimeEvent = {
  channel: string;
  type: string;
  title: string;
  body: string;
  href?: string;
  trackingCode?: string;
  missionId?: string;
  data?: Record<string, unknown>;
};

export type BranchRealtimeHandler = (event: BranchRealtimeEvent) => void;

function getBranchTenantId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tnt-branch-tenant-id');
}

export function subscribeBranchRealtime(handler: BranchRealtimeHandler): () => void {
  return subscribeCorePresence(update => {
    handler({
      channel: 'tracking',
      type: 'DELIVERER_LOCATION',
      title: 'Position livreur',
      body: 'Mise à jour GPS (Core)',
      data: {
        delivererId: update.userId,
        latitude: update.latitude,
        longitude: update.longitude,
        status: update.status,
        activeMissionId: update.activeMissionId,
      },
    });
  });
}

export function openBranchNotificationStream(
  onNotif: (n: Record<string, unknown>) => void,
): { close: () => void } | null {
  if (typeof window === 'undefined') return null;
  const tenantId = getBranchTenantId();
  const agencyId = localStorage.getItem('tnt-branch-agency-id');
  if (!tenantId || !agencyId) return null;

  const es = new EventSource(
    `${API_BASE_URL}/agencies/${encodeURIComponent(agencyId)}/notifications/stream`,
    { withCredentials: true },
  );
  es.onmessage = (e) => {
    try {
      onNotif(JSON.parse(e.data) as Record<string, unknown>);
    } catch { /* keepalive */ }
  };
  return {
    close: () => es.close(),
  };
}
