import { API_BASE_URL, PUBLIC_TENANT_ID, USE_CORE_REALTIME } from '@/lib/config';
import { subscribeCorePresence } from '@/lib/coreRealtime';
import { getAgencyId, getTenantId } from '@/lib/session';

export type RealtimeHandler = (event: {
  channel: string;
  type: string;
  title: string;
  body: string;
  href?: string;
  trackingCode?: string;
  missionId?: string;
  data?: Record<string, unknown>;
}) => void;

/**
 * Presence / tracking updates — always via Core SSE when available.
 * Legacy `/ws/realtime` is retired (flag kept only for emergency rollback docs).
 */
export function subscribeRealtime(handler: RealtimeHandler): () => void {
  if (USE_CORE_REALTIME === false) {
    // Explicit opt-out still uses Core presence; WS legacy is no longer served by Next BFF.
  }
  const unsubCore = subscribeCorePresence((update) => {
    handler({
      channel: 'tracking',
      type: 'DELIVERER_LOCATION',
      title: 'Position livreur',
      body: 'Mise à jour GPS (Core)',
      data: {
        delivererId: update.userId,
        latitude: update.latitude,
        longitude: update.longitude,
        source: 'core-stomp',
      },
    });
  });
  return () => {
    unsubCore();
  };
}

export function openTrackingStream(
  code: string,
  onUpdate: (data: Record<string, unknown>) => void,
): EventSource | null {
  if (typeof window === 'undefined') return null;
  const url = `${API_BASE_URL}/tracking/${encodeURIComponent(code.trim().toUpperCase())}/stream?tenantId=${encodeURIComponent(PUBLIC_TENANT_ID)}`;
  const es = new EventSource(url, { withCredentials: false });
  es.onmessage = (e) => {
    try {
      onUpdate(JSON.parse(e.data));
    } catch { /* keepalive */ }
  };
  return es;
}

export function openMissionStream(
  missionId: string,
  onUpdate: (data: Record<string, unknown>) => void,
): EventSource | null {
  if (typeof window === 'undefined') return null;
  const tenantId = getTenantId();
  if (!tenantId) return null;
  const es = new EventSource(
    `${API_BASE_URL}/missions/${missionId}/events?tenantId=${encodeURIComponent(tenantId)}`,
  );
  es.onmessage = (e) => {
    try {
      onUpdate(JSON.parse(e.data));
    } catch { /* keepalive */ }
  };
  return es;
}

export function openNotificationStream(
  onNotif: (n: Record<string, unknown>) => void,
): { close: () => void } {
  const agencyId = getAgencyId();
  if (typeof window === 'undefined' || !agencyId) {
    return { close: () => undefined };
  }

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
