import { API_BASE_URL, PUBLIC_TENANT_ID } from '@/lib/config';
import { getTenantId } from '@/lib/session';

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

function ensureWebSocket(): WebSocket | null {
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
      if (sharedHandlers.size > 0) ensureWebSocket();
    }, 3000);
  };

  return sharedSocket;
}

export function subscribeRealtime(handler: RealtimeHandler): () => void {
  sharedHandlers.add(handler);
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
  token: string,
  onNotif: (n: Record<string, unknown>) => void,
): EventSource {
  const tenantId = getTenantId();
  const url = `${API_BASE_URL}/notifications/stream?token=${encodeURIComponent(token)}&tenantId=${encodeURIComponent(tenantId)}`;
  const es = new EventSource(url);
  es.onmessage = (e) => {
    try {
      onNotif(JSON.parse(e.data));
    } catch { /* ignore */ }
  };
  return es;
}
