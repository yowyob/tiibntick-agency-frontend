import { API_BASE_URL } from '@/lib/config';
import { unwrapApiData } from '@/lib/api/envelope';
import { subscribeCorePresence } from '@/lib/coreRealtime';

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
  const unsubscribePresence = subscribeCorePresence(update => {
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
  return () => {
    unsubscribePresence();
    branchHandlers.delete(handler);
    if (branchHandlers.size === 0 && branchSocket) {
      branchSocket.close();
      branchSocket = null;
      branchTenantId = null;
    }
  };
}

export function openBranchNotificationStream(
  onNotif: (n: Record<string, unknown>) => void,
): { close: () => void } | null {
  if (typeof window === 'undefined') return null;
  const tenantId = getBranchTenantId();
  const agencyId = localStorage.getItem('tnt-branch-agency-id');
  if (!tenantId || !agencyId) return null;

  const seen = new Set<string>();
  let initialized = false;
  let closed = false;
  const poll = async () => {
    if (closed) return;
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
