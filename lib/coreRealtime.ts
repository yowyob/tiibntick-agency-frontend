import { API_BASE_URL, USE_CORE_REALTIME } from '@/lib/config'

export type CorePresenceUpdate = {
  userId: string
  latitude: number
  longitude: number
  status?: string
  activeMissionId?: string
}

export type CorePresenceHandler = (update: CorePresenceUpdate) => void

let source: EventSource | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
const handlers = new Set<CorePresenceHandler>()

function parsePresence(raw: string): CorePresenceUpdate | null {
  try {
    const payload = JSON.parse(raw) as Record<string, unknown>
    const coordinates = payload.currentCoordinates as Record<string, unknown> | undefined
    const userId = String(payload.userId ?? payload.delivererId ?? '')
    const latitude = Number(
      payload.latitude ?? coordinates?.latitude ?? coordinates?.lat,
    )
    const longitude = Number(
      payload.longitude ?? coordinates?.longitude ?? coordinates?.lng ?? coordinates?.lon,
    )
    if (!userId || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return null
    return {
      userId,
      latitude,
      longitude,
      status: payload.status == null ? undefined : String(payload.status),
      activeMissionId:
        payload.activeMissionId == null ? undefined : String(payload.activeMissionId),
    }
  } catch {
    return null
  }
}

function ensurePresenceStream(): EventSource | null {
  if (!USE_CORE_REALTIME || typeof window === 'undefined') return null
  if (source && source.readyState !== EventSource.CLOSED) return source

  source = new EventSource(`${API_BASE_URL}/realtime/presence`, {
    withCredentials: true,
  })
  source.onmessage = event => {
    const update = parsePresence(event.data)
    if (update) handlers.forEach(handler => handler(update))
  }
  source.onerror = () => {
    source?.close()
    source = null
    if (handlers.size > 0 && !reconnectTimer) {
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null
        ensurePresenceStream()
      }, 3_000)
    }
  }
  return source
}

/** Presence is bridged server-side so the JWT stays in the HttpOnly cookie. */
export function subscribeCorePresence(handler: CorePresenceHandler): () => void {
  if (!USE_CORE_REALTIME) return () => {}
  handlers.add(handler)
  ensurePresenceStream()
  return () => {
    handlers.delete(handler)
    if (handlers.size === 0) {
      source?.close()
      source = null
      if (reconnectTimer) clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  }
}

export function isCoreRealtimeEnabled(): boolean {
  return USE_CORE_REALTIME
}
