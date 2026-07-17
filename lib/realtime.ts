import { API_BASE_URL, PUBLIC_TENANT_ID, USE_CORE_REALTIME } from '@/lib/config';
import { subscribeCorePresence } from '@/lib/coreRealtime';
import { getAgencyId, getTenantId } from '@/lib/session';
import { unwrapApiData } from '@/lib/api/envelope';

const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

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

let sharedSocket: WebSocket | null = null;
let sharedHandlers: Set<RealtimeHandler> = new Set();

function ensureAgencyWebSocket(): WebSocket | null {
  if (typeof window === 'undefined') return null;
  if (sharedSocket && sharedSocket.readyState <= WebSocket.OPEN) return sharedSocket;

  const tenantId = getTenantId();
  if (!tenantId) return null;

  sharedSocket = new WebSocket(`${WS_BASE_URL}/ws/realtime?tenantId=${encodeURIComponent(tenantId)}`);

  sharedSocket.onmessage = (msg) => {
    try {
      const event = JSON.parse(msg.data as string);
      sharedHandlers.forEach(h => h(event));
    } catch { /* ignore malformed */ }
  };

  sharedSocket.onclose = () => {
    sharedSocket = null;
    setTimeout(() => {
      if (sharedHandlers.size > 0) ensureAgencyWebSocket();
    }, 3000);
  };

  return sharedSocket;
}

function ensureWebSocket(): WebSocket | null {
  if (USE_CORE_REALTIME) return null;
  return ensureAgencyWebSocket();
}

export function subscribeRealtime(handler: RealtimeHandler): () => void {
  sharedHandlers.add(handler);
  if (USE_CORE_REALTIME) {
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
      sharedHandlers.delete(handler);
      unsubCore();
    };
  }
  ensureWebSocket();
  return () => {
    sharedHandlers.delete(handler);
    if (sharedHandlers.size === 0 && sharedSocket) {
      sharedSocket.close();
      sharedSocket = null;
    }
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
  const tenantId = getTenantId();
  const agencyId = getAgencyId();
  const seen = new Set<string>();
  let closed = false;
  let initialized = false;

  const poll = async () => {
    if (closed || !tenantId || !agencyId) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/agencies/${encodeURIComponent(agencyId)}/notifications?limit=20`,
        {
          headers: {
            'X-Tenant-Id': tenantId,
          },
          cache: 'no-store',
        },
      );
      if (!response.ok) return;
      const notifications = unwrapApiData<Record<string, unknown>[]>(await response.json());
      for (const notification of [...notifications].reverse()) {
        const id = String(notification.id ?? '');
        if (!id || seen.has(id)) continue;
        seen.add(id);
        if (initialized) onNotif(notification);
      }
      initialized = true;
    } catch { /* ignore */ }
  };

  void poll();
  const timer = window.setInterval(() => void poll(), 15_000);
  return {
    close: () => {
      closed = true;
      window.clearInterval(timer);
    },
  };
}
