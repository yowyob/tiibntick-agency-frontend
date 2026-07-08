'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Package } from 'lucide-react'
import { livreurAuthService } from '@/lib/services/livreurAuthService'
import { livreurMissionService } from '@/lib/services/livreurMissionService'
import type { Mission } from '@/lib/types'

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  ASSIGNED: 'Assignée',
  IN_TRANSIT: 'En transit',
  AT_HUB: 'Au hub',
  DELIVERED: 'Livrée',
  FAILED: 'Echouée',
  CANCELLED: 'Annulée',
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  ASSIGNED: 'bg-blue-100 text-blue-700',
  IN_TRANSIT: 'bg-orange-100 text-orange-700',
  AT_HUB: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
  FAILED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

const PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Basse', NORMAL: 'Normale', HIGH: 'Haute', URGENT: 'Urgente',
}

const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'text-gray-400',
  NORMAL: 'text-gray-500',
  HIGH: 'text-orange-500',
  URGENT: 'text-red-500',
}

type Filter = 'all' | 'active' | 'delivered' | 'other'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'active', label: 'En cours' },
  { key: 'delivered', label: 'Livrées' },
  { key: 'other', label: 'Autres' },
]

function applyFilter(missions: Mission[], filter: Filter): Mission[] {
  switch (filter) {
    case 'active': return missions.filter(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT')
    case 'delivered': return missions.filter(m => m.status === 'DELIVERED')
    case 'other': return missions.filter(m => ['PENDING', 'AT_HUB', 'FAILED', 'CANCELLED'].includes(m.status))
    default: return missions
  }
}

export default function LivreurMissionsPage() {
  const router = useRouter()
  const [missions, setMissions] = useState<Mission[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login')
      return
    }
    const id = livreurAuthService.getCurrentDelivererId()!
    livreurMissionService.getMyMissions(id).then(setMissions).finally(() => setLoading(false))
  }, [router])

  const filtered = applyFilter(missions, filter)

  return (
    <div className="flex-1 pb-20">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold text-gray-900">Mes missions</h1>
        <p className="text-sm text-gray-500">{missions.length} au total</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 mb-5 overflow-x-auto">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full transition-colors ${
              filter === f.key
                ? 'bg-orange-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 gap-2">
          <Package size={32} className="text-gray-200" />
          <p className="text-sm text-gray-400">Aucune mission dans cette catégorie</p>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          {filtered.map(m => (
            <Link
              key={m.id}
              href={`/livreur/missions/${m.id}`}
              className="block bg-white rounded-2xl border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs text-gray-400 font-mono">{m.manifestNumber}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{m.recipientName}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-[10px] font-bold ${PRIORITY_COLORS[m.priority]}`}>
                    {PRIORITY_LABELS[m.priority]}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[m.status]}`}>
                    {STATUS_LABELS[m.status]}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 truncate">{m.deliveryAddress}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">{m.packagesCount} colis · {m.totalWeightKg} kg</p>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
