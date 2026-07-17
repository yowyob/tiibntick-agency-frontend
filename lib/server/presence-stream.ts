import 'server-only'

import WebSocket from 'ws'
import { NextRequest, NextResponse } from 'next/server'

import { requestToken } from '@/lib/server/verify-auth'

const CORE_WS_URL = (
  process.env.TNT_CORE_WS_URL ??
  `${(process.env.TNT_CORE_BASE_URL ?? 'https://tiibntick-core.yowyob.com')
    .replace(/^http/, 'ws')
    .replace(/\/+$/, '')}/ws`
).replace(/\/+$/, '')

function claim(token: string, ...names: string[]): string {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1] ?? '', 'base64url').toString('utf8'),
    ) as Record<string, unknown>
    for (const name of names) {
      const value = payload[name]
      if (typeof value === 'string' && value) return value
    }
  } catch {
    // The caller already verified the token in the main BFF handler.
  }
  return ''
}

function stompFrame(
  command: string,
  headers: Record<string, string>,
  body = '',
): string {
  const lines = [command]
  for (const [name, value] of Object.entries(headers)) {
    lines.push(`${name}:${value}`)
  }
  return `${lines.join('\n')}\n\n${body}\0`
}

function parseStomp(raw: string): {
  command: string
  headers: Record<string, string>
  body: string
} {
  const message = raw.replace(/\0/g, '')
  const separator = message.indexOf('\n\n')
  const headerBlock = separator >= 0 ? message.slice(0, separator) : message
  const body = separator >= 0 ? message.slice(separator + 2).trim() : ''
  const lines = headerBlock.trim().split(/\r?\n/)
  const command = lines.shift()?.trim().toUpperCase() ?? ''
  const headers: Record<string, string> = {}
  for (const line of lines) {
    const colon = line.indexOf(':')
    if (colon > 0) headers[line.slice(0, colon).toLowerCase()] = line.slice(colon + 1)
  }
  return { command, headers, body }
}

export function streamCorePresence(request: NextRequest): NextResponse {
  const token = requestToken(request)
  if (!token) {
    return NextResponse.json(
      { status: 'ERROR', error: { code: 'UNAUTHORIZED', message: 'Session requise.' } },
      { status: 401 },
    )
  }
  const tenantId = claim(token, 'tid', 'tenantId')
  const userId = claim(token, 'sub', 'userId', 'uid')
  if (!tenantId || !userId) {
    return NextResponse.json(
      { status: 'ERROR', error: { code: 'INVALID_SESSION', message: 'Session incomplète.' } },
      { status: 401 },
    )
  }

  const encoder = new TextEncoder()
  let socket: WebSocket | null = null
  let heartbeat: ReturnType<typeof setInterval> | null = null

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const url = new URL(`${CORE_WS_URL}/realtime`)
      url.searchParams.set('tenantId', tenantId)
      // Core's current handshake accepts only this query token. It remains
      // server-to-server and is never exposed to browser JavaScript or logs.
      url.searchParams.set('token', token)
      socket = new WebSocket(url)

      const close = () => {
        if (heartbeat) clearInterval(heartbeat)
        heartbeat = null
        if (socket?.readyState === WebSocket.OPEN) socket.close()
        socket = null
        try {
          controller.close()
        } catch {
          // Stream already closed by the client.
        }
      }

      socket.on('open', () => {
        socket?.send(stompFrame('CONNECT', {
          'accept-version': '1.2',
          'heart-beat': '10000,10000',
          'user-id': userId,
        }, JSON.stringify({
          deviceType: 'NEXT_BFF',
          appVersion: 'agency-frontend',
          osVersion: 'server',
        })))
        heartbeat = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(': heartbeat\n\n'))
          } catch {
            close()
          }
        }, 15_000)
      })

      socket.on('message', data => {
        const frame = parseStomp(data.toString())
        if (frame.command === 'CONNECTED') {
          socket?.send(stompFrame('SUBSCRIBE', {
            id: `presence-${tenantId}`,
            destination: `/topic/presence/${tenantId}`,
          }))
          return
        }
        if (
          frame.command === 'MESSAGE' &&
          frame.headers.destination?.startsWith('/topic/presence/') &&
          frame.body
        ) {
          controller.enqueue(encoder.encode(`data: ${frame.body}\n\n`))
        }
        if (frame.command === 'ERROR') {
          controller.enqueue(encoder.encode(
            `event: error\ndata: ${JSON.stringify({ message: 'Core realtime error' })}\n\n`,
          ))
        }
      })
      socket.on('error', close)
      socket.on('close', close)
      request.signal.addEventListener('abort', close, { once: true })
    },
    cancel() {
      if (heartbeat) clearInterval(heartbeat)
      if (socket?.readyState === WebSocket.OPEN) socket.close()
      socket = null
    },
  })

  return new NextResponse(stream, {
    headers: {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache, no-transform',
      connection: 'keep-alive',
      'x-accel-buffering': 'no',
    },
  })
}
