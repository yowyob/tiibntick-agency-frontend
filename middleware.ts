import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE } from '@/lib/auth-session'
import { claimRoles, claimString, isPlatformAdmin } from '@/lib/jwt'
import { verifyRequestToken } from '@/lib/server/verify-auth'
import { isSeoPublicPath } from '@/lib/seo'

const PUBLIC_PATHS = ['/login', '/register', '/pending', '/track', '/admin/login', '/guide']

function isPublic(pathname: string): boolean {
  if (pathname === '/') return true
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(`${p}/`))) return true
  if (pathname.startsWith('/livreur')) return true
  if (pathname.startsWith('/branch')) return true
  return false
}

function isAdminArea(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/')
}

function hasAdminRole(claims: Record<string, unknown>): boolean {
  const roles = claimRoles(claims)
  if (isPlatformAdmin(roles)) return true
  const role = claimString(claims, 'role')
  return role === 'TNT_ADMIN'
}

function withSeoHeaders(res: NextResponse, pathname: string): NextResponse {
  if (!isSeoPublicPath(pathname)) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  return res
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value
  const verifiedClaims = token ? await verifyRequestToken(request) : null

  if (isAdminArea(pathname)) {
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      return withSeoHeaders(NextResponse.next(), pathname)
    }
    if (!verifiedClaims || !hasAdminRole(verifiedClaims as Record<string, unknown>)) {
      const login = new URL('/admin/login', request.url)
      login.searchParams.set('from', pathname)
      return NextResponse.redirect(login)
    }
    const res = NextResponse.next()
    res.headers.set('X-Frame-Options', 'DENY')
    return withSeoHeaders(res, pathname)
  }

  if (isPublic(pathname)) {
    return withSeoHeaders(NextResponse.next(), pathname)
  }

  if (!verifiedClaims) {
    const login = new URL('/login', request.url)
    login.searchParams.set('from', pathname)
    return NextResponse.redirect(login)
  }

  return withSeoHeaders(NextResponse.next(), pathname)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
