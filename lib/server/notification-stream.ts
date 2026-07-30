import 'server-only'

import { NextRequest, NextResponse } from 'next/server'

type JsonRecord = Record<string, unknown>

function jsonRecord(value: unknown): JsonRecord {
  return typeof value === 'object' && value !== null ? (value as JsonRecord) : {}
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function unwrap(value: unknown): unknown {
  const root = jsonRecord(value)
  return root.data ?? value
}

/**
 * SSE inbox stream: polls Core agency notifications and pushes deltas to the client.
 * Replaces browser-side 15s polling with a single EventSource connection.
 */
export function streamAgencyNotifications(
  request: NextRequest,
  options: {
    tenantId: string
    agencyId: string
    fetchNotifications: () => Promise<unknown[]>
  },
): NextResponse {
  const encoder = new TextEncoder()
  const seen = new Set<string>()
  let closed = false
  let pollTimer: ReturnType<typeof setInterval> | null = null
  let heartbeat: ReturnType<typeof setInterval> | null = null
  let initialized = false

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (payload: string) => {
        if (closed) return
        try {
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
        } catch {
          closed = true
        }
      }

      const poll = async () => {
        if (closed) return
        try {
          const items = await options.fetchNotifications()
          for (const item of [...items].reverse()) {
            const row = jsonRecord(item)
            const id = stringValue(row.id)
            if (!id || seen.has(id)) continue
            seen.add(id)
            if (initialized) {
              send(JSON.stringify({
                id,
                type: stringValue(row.eventType) || stringValue(row.type) || 'info',
                title: stringValue(row.title),
                body: stringValue(row.body),
                href: stringValue(row.href) || '/',
                read: row.read === true,
                time: stringValue(row.createdAt) || 'À l\'instant',
                eventType: stringValue(row.eventType),
              }))
            }
          }
          initialized = true
        } catch {
          // Keep the stream alive; next poll retries.
        }
      }

      void poll()
      pollTimer = setInterval(() => void poll(), 5_000)
      heartbeat = setInterval(() => {
        if (closed) return
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'))
        } catch {
          closed = true
        }
      }, 25_000)

      request.signal.addEventListener('abort', () => {
        closed = true
        if (pollTimer) clearInterval(pollTimer)
        if (heartbeat) clearInterval(heartbeat)
        try {
          controller.close()
        } catch { /* already closed */ }
      })
    },
    cancel() {
      closed = true
      if (pollTimer) clearInterval(pollTimer)
      if (heartbeat) clearInterval(heartbeat)
    },
  })

  return new NextResponse(stream, {
    headers: {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache, no-transform',
      connection: 'keep-alive',
    },
  })
}
