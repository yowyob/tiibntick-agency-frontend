'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Package, QrCode, Inbox, LogOut } from 'lucide-react'
import clsx from 'clsx'
import { hubAuthService, type HubSession } from '@/lib/services/hubAuthService'
import { agencyService } from '@/lib/services/agencyService'

const NAV_ITEMS = [
  { href: '/hub', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/hub/demandes', label: 'Demandes', icon: Inbox },
  { href: '/hub/stock', label: 'Stock', icon: Package },
  { href: '/hub/qr', label: 'QR codes', icon: QrCode },
]

export default function HubAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useState<HubSession | null>(null)
  const [agencyName, setAgencyName] = useState('')
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
    const s = hubAuthService.getSession()
    setSession(s)
    if (s?.agencyId) {
      agencyService.getAgency(s.agencyId)
        .then(a => setAgencyName(a.name))
        .catch(() => setAgencyName(''))
    }
    setReady(true)
  }, [pathname, isLoginPage, isScanPage, router])

  if (!ready) return null

  if (isLoginPage || isScanPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  if (!session) return null

  const initials = (session.operatorName || 'GH')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const affiliationLabel = agencyName
    ? `${agencyName} - Hub ${session.hubName}`
    : session.hubName

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen">
        <div className="h-16 flex items-center px-4 border-b border-gray-200 flex-shrink-0 gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">TA</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate" title={affiliationLabel}>
              {affiliationLabel}
            </p>
            <p className="text-[10px] text-orange-500 font-medium">Espace Hub Relais</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative',
                  isActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-r" />
                )}
                <Icon
                  size={16}
                  className={clsx(
                    'flex-shrink-0',
                    isActive ? 'text-orange-500' : 'text-gray-400',
                  )}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-3 flex-shrink-0">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-700 text-xs font-semibold">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">
                {session.operatorName || 'Gérant'}
              </p>
              <p className="text-[10px] text-gray-400">Gérant de hub</p>
            </div>
            <button
              type="button"
              onClick={() => hubAuthService.logout()}
              title="Déconnexion"
              className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-900">{affiliationLabel}</p>
            <p className="text-xs text-gray-400">
              Espace Gérant de Hub
              {session.hubCode ? ` · ${session.hubCode}` : ''}
            </p>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
