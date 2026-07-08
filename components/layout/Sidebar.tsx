'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, Building2, GitBranch, Package,
  Truck, MapPin, Users, Receipt, Settings, LogOut, Search, Smartphone, Store,
  ConciergeBell,
} from 'lucide-react'
import clsx from 'clsx'
import { getAgencyId } from '@/lib/session'
import { intakeService } from '@/lib/services/intakeService'

const navSections = [
  {
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Agence',
    items: [
      { label: 'Profil Agence', href: '/profile', icon: Building2 },
      { label: 'Antennes', href: '/branches', icon: GitBranch },
    ],
  },
  {
    title: 'Opérations',
    items: [
      { label: 'Accueil client', href: '/accueil', icon: ConciergeBell, isNew: true as const },
      { label: 'Missions', href: '/missions', icon: Package },
      { label: 'Flotte', href: '/fleet', icon: Truck },
      { label: 'Hubs Relais', href: '/hubs', icon: MapPin, isNew: true as const },
    ],
  },
  {
    title: 'Ressources Humaines',
    items: [
      { label: 'Personnel', href: '/staff', icon: Users },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Facturation', href: '/billing', icon: Receipt },
    ],
  },
  {
    title: 'Système',
    items: [
      { label: 'Paramètres', href: '/settings', icon: Settings },
      { label: 'Suivi colis', href: '/track', icon: Search },
      { label: 'Espace Livreur', href: '/livreur/login', icon: Smartphone, isExternal: true as const },
      { label: 'Espace Antenne', href: '/branch/login', icon: Store, isExternal: true as const },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Agency Manager')
  const [pendingIntakes, setPendingIntakes] = useState(0)

  useEffect(() => {
    setEmail(localStorage.getItem('tnt-user-email') ?? '')
    setRole(localStorage.getItem('tnt-user-role')?.replace(/_/g, ' ') ?? 'Agency Manager')
  }, [])

  useEffect(() => {
    const agencyId = getAgencyId()
    if (!agencyId) return
    const load = () => {
      intakeService.listPending(agencyId)
        .then(items => setPendingIntakes(items.length))
        .catch(() => undefined)
    }
    load()
    const interval = setInterval(load, 60_000)
    return () => clearInterval(interval)
  }, [pathname])

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 flex flex-col h-screen">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-5 border-b border-gray-200 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">TA</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">TiiBnTick Agency</p>
            <p className="text-[11px] text-gray-400 dark:text-slate-500 truncate">Portail Agence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navSections.map((section, si) => (
          <div key={si} className={si > 0 ? 'mt-5' : ''}>
            {section.title && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-600 px-3 mb-1.5">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    {'isExternal' in item && item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 group relative text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                      >
                        <Icon size={16} className="flex-shrink-0 text-orange-400" />
                        <span className="flex-1 truncate">{item.label}</span>
                        <span className="text-[9px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded uppercase tracking-wide">APP</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={clsx(
                          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 group relative',
                          isActive
                            ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600'
                            : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-slate-200'
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-r" />
                        )}
                        <Icon
                          size={16}
                          className={clsx(
                            'flex-shrink-0',
                            isActive ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300'
                          )}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.href === '/accueil' && pendingIntakes > 0 && (
                          <span className="text-[10px] font-bold bg-amber-500 text-white min-w-[1.25rem] h-5 px-1.5 rounded-full flex items-center justify-center">
                            {pendingIntakes > 9 ? '9+' : pendingIntakes}
                          </span>
                        )}
                        {'isNew' in item && item.isNew && (
                          <span className="text-[9px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                            NEW
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-200 dark:border-slate-800 p-3 flex-shrink-0">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-orange-700 dark:text-orange-400 text-xs font-semibold">
              {email.slice(0, 2).toUpperCase() || 'AM'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 dark:text-slate-200 truncate">{role}</p>
            <p className="text-[11px] text-gray-400 dark:text-slate-500 truncate">{email || '—'}</p>
          </div>
          <button
            onClick={() => { window.location.href = '/login' }}
            title="Déconnexion"
            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors flex-shrink-0"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
