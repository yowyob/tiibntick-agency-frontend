'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Package, Plus, Filter, Search, LayoutList, Map, RefreshCw } from 'lucide-react'
import { EMPTY_MISSIONS } from '@/lib/emptyDefaults'
import type { MissionStatus, MissionPriority, Mission } from '@/lib/types'
import CreateMissionForm from '@/components/forms/CreateMissionForm'
import MissionDetailDrawer from '@/components/MissionDetailDrawer'
import { usePagination } from '@/lib/hooks/usePagination'
import Pagination from '@/components/ui/Pagination'
import { missionService } from '@/lib/services/missionService'
import { useService } from '@/lib/hooks/useService'
import { subscribeRealtime } from '@/lib/realtime'

const MissionsMap = dynamic(() => import('@/components/MissionsMap'), { ssr: false })

// ── Status badge ───────────────────────────────────────────
function StatusBadge({ status }: { status: MissionStatus }) {
  const map: Record<MissionStatus, string> = {
    DELIVERED:  'bg-emerald-50 text-emerald-700',
    IN_TRANSIT: 'bg-blue-50 text-blue-700',
    ASSIGNED:   'bg-indigo-50 text-indigo-700',
    PENDING:    'bg-orange-50 text-orange-700',
    AT_HUB:     'bg-violet-50 text-violet-700',
    DRAFT:      'bg-gray-100 text-gray-600',
    FAILED:     'bg-red-50 text-red-700',
    CANCELLED:  'bg-gray-100 text-gray-400',
  }
  const labels: Record<MissionStatus, string> = {
    DELIVERED: 'Livré', IN_TRANSIT: 'En transit', ASSIGNED: 'Assignée',
    PENDING: 'En attente', AT_HUB: 'Au hub', DRAFT: 'Brouillon',
    FAILED: 'Échoué', CANCELLED: 'Annulé',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
      {labels[status]}
    </span>
  )
}

// ── Priority badge ─────────────────────────────────────────
function PriorityBadge({ priority }: { priority: MissionPriority }) {
  const map: Record<MissionPriority, string> = {
    URGENT: 'bg-red-50 text-red-700 border border-red-200',
    HIGH:   'bg-orange-50 text-orange-700 border border-orange-200',
    NORMAL: 'bg-gray-50 text-gray-600 border border-gray-200',
    LOW:    'bg-gray-50 text-gray-400 border border-gray-100',
  }
  const labels: Record<MissionPriority, string> = { URGENT: 'Urgent', HIGH: 'Haute', NORMAL: 'Normale', LOW: 'Basse' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[priority]}`}>{labels[priority]}</span>
}

// ── Pipeline chips ─────────────────────────────────────────
const pipelineSteps: { status: MissionStatus; label: string; color: string }[] = [
  { status: 'DRAFT',      label: 'Brouillon',  color: 'bg-gray-200 text-gray-600' },
  { status: 'PENDING',    label: 'En attente', color: 'bg-orange-100 text-orange-700' },
  { status: 'ASSIGNED',   label: 'Assignée',   color: 'bg-indigo-100 text-indigo-700' },
  { status: 'IN_TRANSIT', label: 'En transit', color: 'bg-blue-100 text-blue-700' },
  { status: 'AT_HUB',     label: 'Au hub',     color: 'bg-violet-100 text-violet-700' },
  { status: 'DELIVERED',  label: 'Livrée',     color: 'bg-emerald-100 text-emerald-700' },
  { status: 'FAILED',     label: 'Échouée',    color: 'bg-red-100 text-red-700' },
  { status: 'CANCELLED',  label: 'Annulée',    color: 'bg-gray-100 text-gray-400' },
]

const ACTIVE_STATUSES: MissionStatus[] = ['ASSIGNED', 'IN_TRANSIT']

export default function MissionsPage() {
  const { data: allMissions, refetch } = useService(() => missionService.getMissions(), EMPTY_MISSIONS)
  const [statusFilter, setStatusFilter] = useState<MissionStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [missionFormOpen, setMissionFormOpen] = useState(false)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [livePositions, setLivePositions] = useState<Record<string, { lat: number; lng: number }>>({})
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const statusCounts = missionService.getStatusCounts(allMissions)
  const openDetail = (m: Mission) => { setSelectedMission(m); setDetailOpen(true) }

  const activeMissions = allMissions.filter(m => ACTIVE_STATUSES.includes(m.status))

  const filtered = allMissions.filter(m => {
    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter
    const matchSearch = search === '' ||
      m.manifestNumber.toLowerCase().includes(search.toLowerCase()) ||
      m.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      (m.delivererName ?? '').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const { page, setPage, pageCount, pageSize, paginatedData: pageMissions, total } = usePagination(filtered, 10)

  const doRefresh = useCallback(() => {
    refetch()
    setCountdown(30)
  }, [refetch])

  // Auto-refresh every 30s when in map view
  useEffect(() => {
    if (view !== 'map') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    setCountdown(30)
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { doRefresh(); return 30 }
        return c - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [view, doRefresh])

  useEffect(() => {
    if (view !== 'map') return
    return subscribeRealtime(event => {
      if (event.channel !== 'tracking' || !event.data) return
      const delivererId = String(event.data.delivererId ?? '')
      const lat = Number(event.data.latitude)
      const lng = Number(event.data.longitude)
      if (!delivererId || Number.isNaN(lat) || Number.isNaN(lng)) return
      setLivePositions(prev => ({ ...prev, [delivererId]: { lat, lng } }))
    })
  }, [view])

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Missions</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {allMissions.length} missions au total · {activeMissions.length} en cours
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
            <button
              onClick={() => setView('list')}
              title="Vue liste"
              className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutList size={15} />
            </button>
            <button
              onClick={() => setView('map')}
              title="Vue carte"
              className={`p-1.5 rounded-md transition-colors ${view === 'map' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Map size={15} />
            </button>
          </div>
          <button
            onClick={() => setMissionFormOpen(true)}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} />
            Nouvelle mission
          </button>
        </div>
      </div>

      {/* Pipeline filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
            statusFilter === 'ALL'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          Toutes ({allMissions.length})
        </button>
        {pipelineSteps.map(step => (
          <button
            key={step.status}
            onClick={() => setStatusFilter(step.status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              statusFilter === step.status
                ? `${step.color} border-current`
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {step.label} ({statusCounts[step.status] ?? 0})
          </button>
        ))}
      </div>

      {/* Search (list view only) */}
      {view === 'list' && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un bordereau, destinataire, livreur..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400 transition"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={14} />
            Filtres
          </button>
          <span className="text-xs text-gray-400">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* ── MAP VIEW ───────────────────────────────────────── */}
      {view === 'map' && (
        <div
          className="relative rounded-xl overflow-hidden border border-gray-200"
          style={{ height: 'calc(100vh - 260px)', minHeight: 520 }}
        >
          {/* Refresh pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs text-gray-600">Actualisation dans <strong>{countdown}s</strong></span>
            <button
              onClick={doRefresh}
              title="Actualiser maintenant"
              className="p-0.5 rounded-full text-gray-400 hover:text-orange-500 transition-colors"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          {/* Active missions sidebar */}
          {activeMissions.length > 0 && (
            <div className="absolute left-3 top-14 z-[1000] bg-white/97 border border-gray-200 rounded-xl shadow-lg w-64 overflow-hidden">
              <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-700">En cours</p>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
                  {activeMissions.length}
                </span>
              </div>
              <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
                {activeMissions.map(m => (
                  <button
                    key={m.id}
                    onClick={() => openDetail(m)}
                    className="w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-orange-50 transition-colors text-left"
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.status === 'IN_TRANSIT' ? 'bg-orange-400' : 'bg-indigo-400'}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-900 font-mono truncate">{m.manifestNumber}</p>
                      <p className="text-[11px] text-gray-500 truncate">{m.delivererName ?? 'Non assigné'}</p>
                      <p className="text-[11px] text-gray-400 truncate">{m.deliveryAddress}</p>
                    </div>
                    <StatusBadge status={m.status} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leaflet map */}
          <MissionsMap
            missions={filtered.length > 0 && filtered.length < allMissions.length ? filtered : allMissions}
            onMissionClick={openDetail}
            livePositions={livePositions}
          />
        </div>
      )}

      {/* ── LIST VIEW ──────────────────────────────────────── */}
      {view === 'list' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Bordereau</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Expéditeur → Destinataire</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Antenne</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Priorité</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Colis</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <Package size={32} className="mx-auto text-gray-200 mb-3" />
                    <p className="text-sm text-gray-400">Aucune mission trouvée</p>
                  </td>
                </tr>
              ) : (
                pageMissions.map(m => (
                  <tr key={m.id} onClick={() => openDetail(m)} className="table-row-hover cursor-pointer group">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 font-mono">{m.manifestNumber}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {new Date(m.scheduledPickupAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-xs text-gray-500 truncate max-w-44">{m.senderName}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-gray-300">→</span>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-40">{m.recipientName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {m.delivererName ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-700 text-[10px] font-semibold">
                              {m.delivererName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-700 truncate max-w-24">{m.delivererName.split(' ')[0]}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Non assigné</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-gray-600">{m.branchName}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <PriorityBadge priority={m.priority} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={m.status} />
                      {m.targetHubName && (
                        <p className="text-[10px] text-violet-500 mt-0.5 truncate max-w-28">{m.targetHubName}</p>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm text-gray-700">{m.packagesCount} colis</p>
                        <p className="text-[11px] text-gray-400">{m.totalWeightKg} kg</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-gray-900">
                        {m.sellingPrice.toLocaleString('fr-FR')}
                        <span className="text-xs font-normal text-gray-400 ml-1">{m.currency}</span>
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="px-5 py-3">
            <Pagination page={page} pageCount={pageCount} total={total} pageSize={pageSize} onPage={setPage} />
          </div>
        </div>
      )}

      <CreateMissionForm open={missionFormOpen} onClose={() => setMissionFormOpen(false)} />
      <MissionDetailDrawer mission={selectedMission} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </div>
  )
}
