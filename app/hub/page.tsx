'use client'

import Link from 'next/link'
import { Inbox, Package, QrCode, ChevronRight } from 'lucide-react'
import { hubAuthService } from '@/lib/services/hubAuthService'

const CARDS = [
  {
    href: '/hub/demandes',
    title: 'Demandes',
    description: 'Valider les dépôts et retraits en attente',
    icon: Inbox,
  },
  {
    href: '/hub/stock',
    title: 'Stock',
    description: 'Colis actuellement présents dans votre espace',
    icon: Package,
  },
  {
    href: '/hub/qr',
    title: 'QR codes',
    description: 'Afficher les QR dépôt et retrait pour le terrain',
    icon: QrCode,
  },
]

export default function HubDashboardPage() {
  const session = hubAuthService.getSession()

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900">
          Bonjour{session?.operatorName ? `, ${session.operatorName}` : ''}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gérez les flux de votre hub relais depuis ce tableau de bord.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {CARDS.map(card => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:bg-orange-50/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                <Icon size={18} className="text-orange-500" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{card.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.description}</p>
                </div>
                <ChevronRight size={14} className="text-gray-300 mt-0.5 group-hover:text-orange-400 shrink-0" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
