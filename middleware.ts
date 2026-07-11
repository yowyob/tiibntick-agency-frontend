import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth-session';
import { claimRoles, claimString, isPlatformAdmin, parseJwtPayload } from '@/lib/jwt';

const PUBLIC_PATHS = ['/login', '/register', '/pending', '/track', '/admin/login'];

function isPublic(pathname: string): boolean {
  if (pathname === '/') return true;
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(`${p}/`))) return true;
  if (pathname.startsWith('/livreur')) return true;
  if (pathname.startsWith('/branch')) return true;
  return false;
}

function isAdminArea(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

function hasAdminRole(token: string): boolean {
  const claims = parseJwtPayload(token);
  const roles = claimRoles(claims);
  if (isPlatformAdmin(roles)) return true;
  const role = claimString(claims, 'role');
  return role === 'TNT_ADMIN';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (isAdminArea(pathname)) {
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      return NextResponse.next();
    }
    if (!token || !hasAdminRole(token)) {
      const login = new URL('/admin/login', request.url);
      login.searchParams.set('from', pathname);
      return NextResponse.redirect(login);
    }
    const res = NextResponse.next();
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return res;
  }

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const login = new URL('/login', request.url);
    login.searchParams.set('from', pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
