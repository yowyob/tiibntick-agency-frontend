import { CORE_WS_URL, USE_CORE_REALTIME } from '@/lib/config';
import { getAuthToken, getTenantId, getUserId } from '@/lib/session';

const NULL_BYTE = '\u0000';
const LF = '\n';

export type CorePresenceUpdate = {
  userId: string;
  latitude: number;
  longitude: number;
  status?: string;
  activeMissionId?: string;
};

export type CorePresenceHandler = (update: CorePresenceUpdate) => void;

type StompCommand = 'CONNECTED' | 'MESSAGE' | 'ERROR' | 'RECEIPT' | 'HEARTBEAT' | 'UNKNOWN';

type ParsedFrame = {
  command: StompCommand;
  headers: Record<string, string>;
  body: string;
};

let sharedSocket: WebSocket | null = null;
let connected = false;
let subscriptionCounter = 0;
const presenceHandlers = new Set<CorePresenceHandler>();
const topicSubscriptions = new Map<string, string>();
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

function parseStompFrame(raw: string): ParsedFrame {
  if (!raw || raw === '\n' || raw === '\r\n') {
    return { command: 'HEARTBEAT', headers: {}, body: '' };
  }
  const message = raw.replace(NULL_BYTE, '').trim();
  const sections = message.split('\n\n');
  const headerSection = sections[0] ?? '';
  const body = sections.length > 1 ? sections.slice(1).join('\n\n').trim() : '';
  const headerLines = headerSection.split('\n');
  const command = (headerLines[0]?.trim().toUpperCase() ?? 'UNKNOWN') as StompCommand;
  const headers: Record<string, string> = {};
  for (let i = 1; i < headerLines.length; i += 1) {
    const line = headerLines[i];
    if (!line?.trim()) continue;
    const colon = line.indexOf(':');
    if (colon > 0) {
      const name = line.slice(0, colon).trim().toLowerCase();
      const value = line.slice(colon + 1).trim();
      if (!headers[name]) headers[name] = value;
    }
  }
  return { command, headers, body };
}

function buildStompFrame(command: string, headers: Record<string, string>, body = ''): string {
  let frame = `${command}${LF}`;
  Object.entries(headers).forEach(([key, value]) => {
    frame += `${key}:${value}${LF}`;
  });
  frame += `${LF}${body}${NULL_BYTE}`;
  return frame;
}

function buildWsUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const tenantId = getTenantId();
  if (!tenantId) return null;
  const token = getAuthToken();
  const params = new URLSearchParams({ tenantId });
  if (token) params.set('token', token);
  return `${CORE_WS_URL}/realtime?${params.toString()}`;
}

function sendConnect() {
  if (!sharedSocket || sharedSocket.readyState !== WebSocket.OPEN) return;
  const userId = getUserId() || 'anonymous';
  const connectBody = JSON.stringify({
    deviceType: 'PWA_BROWSER',
    appVersion: 'agency-frontend',
    osVersion: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  });
  sharedSocket.send(buildStompFrame('CONNECT', {
    'accept-version': '1.2',
    'heart-beat': '10000,10000',
    'user-id': userId,
  }, connectBody));
}

function subscribePresenceTopic(tenantId: string) {
  if (!sharedSocket || !connected) return;
  const topic = `/topic/presence/${tenantId}`;
  if (topicSubscriptions.has(topic)) return;
  const subId = `sub-${++subscriptionCounter}`;
  topicSubscriptions.set(topic, subId);
  sharedSocket.send(buildStompFrame('SUBSCRIBE', {
    id: subId,
    destination: topic,
  }));
}

function handlePresenceMessage(body: string) {
  try {
    const payload = JSON.parse(body) as Record<string, unknown>;
    const userId = String(payload.userId ?? '');
    const coords = payload.currentCoordinates as Record<string, unknown> | undefined;
    const lat = Number(coords?.latitude ?? coords?.lat);
    const lng = Number(coords?.longitude ?? coords?.lng ?? coords?.lon);
    if (!userId || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
    const update: CorePresenceUpdate = {
      userId,
      latitude: lat,
      longitude: lng,
      status: payload.status != null ? String(payload.status) : undefined,
      activeMissionId: payload.activeMissionId != null
        ? String(payload.activeMissionId)
        : undefined,
    };
    presenceHandlers.forEach(h => h(update));
  } catch {
    // ignore malformed payloads
  }
}

function ensureCoreSocket(): WebSocket | null {
  if (!USE_CORE_REALTIME) return null;
  if (typeof window === 'undefined') return null;

  const tenantId = getTenantId();
  if (!tenantId) return null;

  if (sharedSocket && sharedSocket.readyState <= WebSocket.OPEN) {
    if (connected) subscribePresenceTopic(tenantId);
    return sharedSocket;
  }

  const url = buildWsUrl();
  if (!url) return null;

  sharedSocket = new WebSocket(url);
  connected = false;
  topicSubscriptions.clear();

  sharedSocket.onopen = () => {
    sendConnect();
  };

  sharedSocket.onmessage = (msg) => {
    const frame = parseStompFrame(String(msg.data));
    if (frame.command === 'CONNECTED') {
      connected = true;
      subscribePresenceTopic(tenantId);
      return;
    }
    if (frame.command === 'MESSAGE') {
      const destination = frame.headers.destination ?? '';
      if (destination.startsWith('/topic/presence/')) {
        handlePresenceMessage(frame.body);
      }
    }
  };

  sharedSocket.onclose = () => {
    sharedSocket = null;
    connected = false;
    topicSubscriptions.clear();
    if (presenceHandlers.size > 0) {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => ensureCoreSocket(), 3000);
    }
  };

  return sharedSocket;
}

/** Subscribe to Core STOMP presence board (GPS positions). No-op when USE_CORE_REALTIME=false. */
export function subscribeCorePresence(handler: CorePresenceHandler): () => void {
  if (!USE_CORE_REALTIME) {
    return () => {};
  }
  presenceHandlers.add(handler);
  ensureCoreSocket();
  return () => {
    presenceHandlers.delete(handler);
    if (presenceHandlers.size === 0 && sharedSocket) {
      sharedSocket.close();
      sharedSocket = null;
      connected = false;
      topicSubscriptions.clear();
    }
  };
}

export function isCoreRealtimeEnabled(): boolean {
  return USE_CORE_REALTIME;
}
