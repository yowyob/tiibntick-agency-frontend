'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Inbox, Package, QrCode, ChevronRight, Loader2, Clock } from 'lucide-react'
import { hubAuthService } from '@/lib/services/hubAuthService'
import { hubService } from '@/lib/services/hubService'
import { apiClient } from '@/lib/api/client'

type Handoff = { id: string; status: string }

export default function HubDashboardPage() {
  const session = hubAuthService.getSession()
  const [pendingCount, setPendingCount] = useState<number | null>(null)
  const [stockCount, setStockCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!session?.hubId) {
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const [handoffs, parcels] = await Promise.all([
        apiClient.get<Handoff[]>(`/hubs/${session.hubId}/handoffs/pending`).catch(() => [] as Handoff[]),
        hubService.getParcelRecords(session.hubId).catch(() => []),
      ])
      const pending = Array.isArray(handoffs)
        ? handoffs.filter(h => h.status === 'PENDING' || h.status === 'AWAITING_CLIENT_CONFIRM').length
        : 0
      setPendingCount(pending)
      setStockCount(Array.isArray(parcels) ? parcels.filter(p => p.status === 'DEPOSITED').length : 0)
    } finally {
      setLoading(false)
    }
  }, [session?.hubId])

  useEffect(() => { void load() }, [load])

  const actions = [
    {
      href: '/hub/demandes',
      title: 'Demandes',
      description: 'Valider les dépôts et retraits en attente',
      icon: Inbox,
      meta: pendingCount === null ? '—' : `${pendingCount} en attente`,
      accent: pendingCount && pendingCount > 0,
    },
    {
      href: '/hub/stock',
      title: 'Stock',
      description: 'Colis actuellement présents dans votre espace',
      icon: Package,
      meta: stockCount === null ? '—' : `${stockCount} colis`,
      accent: false,
    },
    {
      href: '/hub/qr',
      title: 'QR codes',
      description: 'Afficher les QR dépôt et retrait pour le terrain',
      icon: QrCode,
      meta: 'Affichage',
      accent: false,
    },
  ]

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Bonjour{session?.operatorName ? `, ${session.operatorName}` : ''}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Vue d&apos;ensemble de votre hub relais.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Demandes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
            {loading ? <Loader2 size={18} className="animate-spin text-orange-400" /> : pendingCount ?? '—'}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">À traiter</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Stock</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
            {loading ? <Loader2 size={18} className="animate-spin text-orange-400" /> : stockCount ?? '—'}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Colis déposés</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 col-span-2 sm:col-span-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Hub</p>
          <p className="text-sm font-semibold text-gray-900 mt-2 truncate">{session?.hubName || '—'}</p>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">{session?.hubCode || '—'}</p>
        </div>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Accès rapide</p>
      <div className="space-y-2">
        {actions.map(action => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3.5 hover:border-orange-200 hover:bg-orange-50/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-orange-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{action.title}</p>
                  {action.accent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-white px-1.5 py-0.5 rounded">
                      <Clock size={10} /> Urgent
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{action.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-gray-700">{action.meta}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
