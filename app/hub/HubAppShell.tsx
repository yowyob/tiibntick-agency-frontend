'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Package, QrCode, Inbox, LogOut } from 'lucide-react'
import { hubAuthService, type HubSession } from '@/lib/services/hubAuthService'

const nav = [
  { href: '/hub', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/hub/demandes', label: 'Demandes', icon: Inbox },
  { href: '/hub/stock', label: 'Stock', icon: Package },
  { href: '/hub/qr', label: 'QR codes', icon: QrCode },
]

export default function HubAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useState<HubSession | null>(null)
  const [ready, setReady] = useState(false)
  const isLoginPage = pathname === '/hub/login'
  const isScanPage = pathname?.startsWith('/hub/scan')

  useEffect(() => {
    if (isLoginPage || isScanPage) {
      setReady(true)
      return
    }
    if (!hubAuthService.isAuthenticated()) {
      router.replace('/hub/login')
      return
    }
    setSession(hubAuthService.getSession())
    setReady(true)
  }, [pathname, isLoginPage, isScanPage, router])

  if (!ready) return null

  if (isLoginPage || isScanPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Portail Hub</p>
          <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{session?.hubName}</p>
          <p className="text-xs text-gray-500 truncate">{session?.operatorName}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(item => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          onClick={() => hubAuthService.logout()}
          className="m-3 flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
