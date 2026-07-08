import { API_BASE_URL } from '@/lib/config';

const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

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

let branchSocket: WebSocket | null = null;
let branchHandlers = new Set<BranchRealtimeHandler>();
let branchTenantId: string | null = null;

function getBranchTenantId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tnt-branch-tenant-id');
}

function ensureBranchWebSocket(): WebSocket | null {
  if (typeof window === 'undefined') return null;

  const tenantId = getBranchTenantId();
  if (!tenantId) return null;

  if (branchSocket && branchSocket.readyState <= WebSocket.OPEN && branchTenantId === tenantId) {
    return branchSocket;
  }

  if (branchSocket) {
    branchSocket.close();
    branchSocket = null;
  }

  branchTenantId = tenantId;
  branchSocket = new WebSocket(`${WS_BASE_URL}/ws/realtime?tenantId=${encodeURIComponent(tenantId)}`);

  branchSocket.onmessage = (msg) => {
    try {
      const event = JSON.parse(msg.data as string) as BranchRealtimeEvent;
      branchHandlers.forEach(h => h(event));
    } catch { /* ignore */ }
  };

  branchSocket.onclose = () => {
    branchSocket = null;
    branchTenantId = null;
    setTimeout(() => {
      if (branchHandlers.size > 0) ensureBranchWebSocket();
    }, 3000);
  };

  return branchSocket;
}

export function subscribeBranchRealtime(handler: BranchRealtimeHandler): () => void {
  branchHandlers.add(handler);
  ensureBranchWebSocket();
  return () => {
    branchHandlers.delete(handler);
    if (branchHandlers.size === 0 && branchSocket) {
      branchSocket.close();
      branchSocket = null;
      branchTenantId = null;
    }
  };
}

export function openBranchNotificationStream(
  token: string,
  onNotif: (n: Record<string, unknown>) => void,
): EventSource | null {
  if (typeof window === 'undefined') return null;
  const tenantId = getBranchTenantId();
  if (!tenantId) return null;

  const url = `${API_BASE_URL}/notifications/stream?token=${encodeURIComponent(token)}&tenantId=${encodeURIComponent(tenantId)}`;
  const es = new EventSource(url);
  es.onmessage = (e) => {
    try {
      onNotif(JSON.parse(e.data));
    } catch { /* ignore */ }
  };
  return es;
}
