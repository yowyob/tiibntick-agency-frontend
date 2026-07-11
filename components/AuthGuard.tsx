'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { authService } from '@/lib/services/authService'

const PUBLIC_PREFIXES = ['/login', '/register', '/track', '/livreur', '/branch']
const PENDING_ALLOWED = ['/pending', '/admin']

/** Garde client-side — session + statut agence (compte limité si non ACTIVE). */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      const loginPath = pathname.startsWith('/admin') ? '/admin/login' : '/login'
      router.replace(`${loginPath}?from=${encodeURIComponent(pathname)}`)
      return
    }

    if (pathname.startsWith('/admin')) {
      if (!authService.isAdmin()) {
        router.replace('/admin/login')
      }
      return
    }

    const status = authService.getAgencyStatus()
    const active = authService.isAgencyActive()

    if (status === 'REJECTED') {
      router.replace('/pending?rejected=1')
      return
    }

    if (!active && !PENDING_ALLOWED.some(p => pathname.startsWith(p))) {
      router.replace('/pending')
      return
    }

    if (active && pathname === '/pending') {
      router.replace('/dashboard')
    }
  }, [pathname, router])

  return <>{children}</>
}
