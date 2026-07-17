import 'server-only'

import { createRemoteJWKSet } from 'jose/jwks/remote'
import { jwtVerify } from 'jose/jwt/verify'
import type { JWTPayload } from 'jose'
import type { NextRequest } from 'next/server'

const ISSUER =
  process.env.JWT_ISSUER_URI ??
  process.env.YOWAUTH0_ISSUER_URI ??
  'https://kernel-core.yowyob.com'

const JWKS_URL =
  process.env.JWT_JWK_SET_URI ??
  process.env.YOWAUTH0_JWK_URI ??
  `${ISSUER.replace(/\/+$/, '')}/.well-known/jwks.json`

const JWKS = createRemoteJWKSet(new URL(JWKS_URL))

export const AUTH_COOKIE = 'tnt-auth'
export const SHARED_SESSION_COOKIE = 'tnt-shared-session'

export function requestToken(request: NextRequest): string | null {
  const authorization = request.headers.get('authorization')
  const bearer = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim()
  return bearer || request.cookies.get(AUTH_COOKIE)?.value || null
}

export async function verifyRequestToken(request: NextRequest): Promise<JWTPayload | null> {
  const token = requestToken(request)
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
    })
    return payload
  } catch {
    return null
  }
}
