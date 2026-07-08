'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Truck, Package, MapPin, LogOut } from 'lucide-react'
import clsx from 'clsx'
import { branchAuthService } from '@/lib/services/branchAuthService'
import BranchPwaInstallPrompt from '@/components/branch/BranchPwaInstallPrompt'

const NAV_ITEMS = [
  { label: 'Dashboard',  href: '/branch',          icon: LayoutDashboard, exact: true },
  { label: 'Personnel',  href: '/branch/staff',     icon: Users },
  { label: 'Flotte',     href: '/branch/fleet',     icon: Truck },
  { label: 'Missions',   href: '/branch/missions',  icon: Package },
  { label: 'Hubs Relais',href: '/branch/hubs',      icon: MapPin },
]

interface Props {
  branchName: string
  managerName: string
}

export default function BranchSidebar({ branchName, managerName }: Props) {
  const pathname = usePathname()

  const initials = managerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200 flex-shrink-0 gap-3">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">TA</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-900 truncate">{branchName}</p>
          <p className="text-[10px] text-orange-500 font-medium">Espace Antenne</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative',
                isActive
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-r" />
              )}
              <Icon
                size={16}
                className={clsx(
                  'flex-shrink-0',
                  isActive ? 'text-orange-500' : 'text-gray-400'
                )}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <BranchPwaInstallPrompt />

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 flex-shrink-0">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <span className="text-orange-700 text-xs font-semibold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">{managerName}</p>
            <p className="text-[10px] text-gray-400">Responsable d'antenne</p>
          </div>
          <button
            onClick={() => branchAuthService.logout()}
            title="Déconnexion"
            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
