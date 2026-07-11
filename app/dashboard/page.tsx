'use client'

import { useMemo, useState } from 'react'
import {
  Package, Users, Truck, TrendingUp,
  Clock, CheckCircle2, AlertTriangle, ConciergeBell,
} from 'lucide-react'
import Link from 'next/link'
import CreateMissionForm from '@/components/forms/CreateMissionForm'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { missionService } from '@/lib/services/missionService'
import { useAgencyOperationalData } from '@/lib/agency/useAgencyOperationalData'
import { buildAgencyActions, buildAgencyCommandSummary } from '@/lib/agency/actionQueue'
import { computeBranchBenchmarks } from '@/lib/branch/branchBenchmark'
import AgencyActionQueue from '@/components/agency/AgencyActionQueue'
import AgencyCommandSummaryCard from '@/components/agency/AgencyCommandSummaryCard'
import AgencyBenchmarkCard from '@/components/agency/AgencyBenchmarkCard'
import AgencyQuickDispatchModal from '@/components/agency/AgencyQuickDispatchModal'
import HubAlertBanner from '@/components/branch/HubAlertBanner'

const PIPELINE_DATA = [
  { label: 'Brouillon',  key: 'DRAFT',      color: '#d1d5db' },
  { label: 'En attente', key: 'PENDING',    color: '#fb923c' },
  { label: 'Assignée',   key: 'ASSIGNED',   color: '#818cf8' },
  { label: 'En transit', key: 'IN_TRANSIT', color: '#3b82f6' },
  { label: 'Au hub',     key: 'AT_HUB',     color: '#a855f7' },
  { label: 'Livrée',     key: 'DELIVERED',  color: '#10b981' },
  { label: 'Échouée',    key: 'FAILED',     color: '#ef4444' },
  { label: 'Annulée',    key: 'CANCELLED',  color: '#e5e7eb' },
]

function StatCard({
  icon: Icon, label, value, sub, color = 'orange',
}: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color?: 'orange' | 'default'
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color === 'orange' ? 'bg-orange-50' : 'bg-gray-50'}`}>
        <Icon size={18} className={color === 'orange' ? 'text-orange-500' : 'text-gray-500'} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    DELIVERED: 'bg-emerald-50 text-emerald-700', IN_TRANSIT: 'bg-blue-50 text-blue-700',
    ASSIGNED: 'bg-indigo-50 text-indigo-700', PENDING: 'bg-orange-50 text-orange-700',
    AT_HUB: 'bg-violet-50 text-violet-700', DRAFT: 'bg-gray-100 text-gray-600',
    FAILED: 'bg-red-50 text-red-700', CANCELLED: 'bg-gray-200 text-gray-500',
  }
  const labels: Record<string, string> = {
    DELIVERED: 'Livré', IN_TRANSIT: 'En transit', ASSIGNED: 'Assignée',
    PENDING: 'En attente', AT_HUB: 'Au hub', DRAFT: 'Brouillon',
    FAILED: 'Échoué', CANCELLED: 'Annulé',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {labels[status] ?? status}
    </span>
  )
}

function PriorityDot({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    URGENT: 'bg-red-500', HIGH: 'bg-orange-500', NORMAL: 'bg-gray-300', LOW: 'bg-gray-200',
  }
  return <span className={`w-2 h-2 rounded-full inline-block ${map[priority] ?? 'bg-gray-200'}`} />
}

export default function DashboardPage() {
  const { data, loading, refresh } = useAgencyOperationalData()
  const [missionFormOpen, setMissionFormOpen] = useState(false)
  const [dispatchMissionId, setDispatchMissionId] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const actions = useMemo(() => {
    if (!data) return []
    return buildAgencyActions(data.missions, data.hubs, data.parcels, data.deliverers, data.commissions)
  }, [data])

  const commandSummary = useMemo(() => {
    if (!data) return null
    return buildAgencyCommandSummary(data.missions, data.branches, data.hubs)
  }, [data])

  const benchmarkRows = useMemo(() => {
    if (!data) return []
    const hq = data.branches.find(b => b.isHeadquarters)?.id ?? data.branches[0]?.id ?? ''
    return computeBranchBenchmarks(data.branches, data.missions, data.deliverers, hq)
  }, [data])

  const doRefresh = async () => {
    setRefreshing(true)
    try { await refresh() } finally { setRefreshing(false) }
  }

  if (loading || !data) {
    return (
      <div className="p-6 flex justify-center min-h-[40vh] items-center">
        <span className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { dashboard, reports, missions, deliverers, vehicles, hubs } = data
  const dispatchMission = missions.find(m => m.id === dispatchMissionId) ?? null

  const activeDeliverers = deliverers.filter(d => d.status !== 'OFFLINE' && d.status !== 'SUSPENDED' && d.status !== 'INACTIVE')
  const availableVehicles = vehicles.filter(v => v.status === 'AVAILABLE')
  const recentMissions = [...missions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)
  const deliveredCount = missions.filter(m => m.status === 'DELIVERED').length
  const pendingCount = missions.filter(m => m.status === 'PENDING').length

  const localCounts = missionService.getStatusCounts(missions)
  const pipelineChartData = PIPELINE_DATA.map(d => ({
    label: d.label,
    count: reports.missionsByStatus[d.key] ?? localCounts[d.key as keyof typeof localCounts] ?? 0,
    color: d.color,
  }))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Centre de commandement</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Vue réseau · {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/accueil"
            className="inline-flex items-center gap-2 border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <ConciergeBell size={15} />
            Accueillir un client
          </Link>
          <button
            onClick={() => setMissionFormOpen(true)}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Package size={15} />
            Nouvelle mission
          </button>
        </div>
      </div>

      <HubAlertBanner hubs={hubs} href="/hubs" />

      {commandSummary && (
        <AgencyCommandSummaryCard summary={commandSummary} onRefresh={() => void doRefresh()} refreshing={refreshing} />
      )}

      <AgencyActionQueue actions={actions} onDispatch={id => setDispatchMissionId(id)} />

      {benchmarkRows.length > 1 && <AgencyBenchmarkCard rows={benchmarkRows} />}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          label="Missions actives"
          value={dashboard.activeMissionsCount}
          sub={`${pendingCount} en attente · ${deliveredCount} livrées`}
          color="orange"
        />
        <StatCard
          icon={Users}
          label="Livreurs actifs"
          value={`${activeDeliverers.length}/${dashboard.deliverersCount || deliverers.length}`}
          sub={`${deliverers.filter(d => d.status === 'ON_MISSION').length} en mission`}
        />
        <StatCard
          icon={Truck}
          label="Véhicules disponibles"
          value={`${availableVehicles.length}/${vehicles.filter(v => v.status !== 'RETIRED').length || dashboard.vehiclesCount}`}
          sub={`${vehicles.filter(v => v.status === 'IN_MAINTENANCE').length} en maintenance`}
        />
        <StatCard
          icon={TrendingUp}
          label="Commissions en attente"
          value={dashboard.pendingCommissionsCount}
          sub={`${commandSummary?.revenueXaf.toLocaleString('fr-FR') ?? 0} XAF livrés`}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Pipeline des missions</h2>
              <p className="text-xs text-gray-400 mt-0.5">{missions.length} missions au total</p>
            </div>
            <Link href="/missions" className="text-xs text-orange-500 hover:text-orange-600 font-medium">Voir tout</Link>
          </div>
          <div className="h-56 min-h-[224px] min-w-0 w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={224}>
              <BarChart data={pipelineChartData} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }} barSize={14}>
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="label" width={72} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} formatter={(val) => [val, 'Missions']} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {pipelineChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Occupation des hubs</h2>
              <p className="text-xs text-gray-400 mt-0.5">{dashboard.hubsCount || hubs.length} hubs actifs</p>
            </div>
            <Link href="/hubs" className="text-xs text-orange-500 hover:text-orange-600 font-medium">Gérer</Link>
          </div>
          <div className="space-y-5">
            {hubs.slice(0, 5).map(hub => {
              const pct = hub.capacity > 0 ? Math.round((hub.currentOccupancy / hub.capacity) * 100) : 0
              const barColor = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f97316' : '#10b981'
              return (
                <div key={hub.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700 truncate">{hub.name}</span>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{hub.currentOccupancy}/{hub.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-700 mb-3">Livreurs</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Disponibles', count: deliverers.filter(d => d.status === 'AVAILABLE').length, icon: CheckCircle2, color: 'text-emerald-600' },
                { label: 'En mission', count: deliverers.filter(d => d.status === 'ON_MISSION').length, icon: Clock, color: 'text-blue-500' },
                { label: 'Hors ligne', count: deliverers.filter(d => d.status === 'OFFLINE' || d.status === 'SUSPENDED').length, icon: AlertTriangle, color: 'text-gray-400' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <s.icon size={16} className={`mx-auto mb-1 ${s.color}`} />
                  <p className="text-lg font-bold text-gray-900">{s.count}</p>
                  <p className="text-[10px] text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Missions récentes</h2>
            <p className="text-xs text-gray-400 mt-0.5">Dernières activités du réseau</p>
          </div>
          <Link href="/missions" className="text-xs text-orange-500 hover:text-orange-600 font-medium">Voir toutes</Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Bordereau</th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Destinataire</th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Antenne</th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Priorité</th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Montant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentMissions.map(m => (
              <tr key={m.id} className="table-row-hover cursor-pointer" onClick={() => window.location.href = '/missions'}>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-medium text-gray-900 font-mono">{m.manifestNumber}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-gray-700">{m.recipientName}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-gray-600">{m.branchName}</p>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <PriorityDot priority={m.priority} />
                    <span className="text-xs text-gray-600">{m.priority}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={m.status} /></td>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-medium text-gray-900">{m.sellingPrice.toLocaleString('fr-FR')} {m.currency}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateMissionForm open={missionFormOpen} onClose={() => { setMissionFormOpen(false); void doRefresh() }} />

      <AgencyQuickDispatchModal
        open={!!dispatchMission}
        mission={dispatchMission}
        deliverers={deliverers}
        vehicles={vehicles}
        onClose={() => setDispatchMissionId(null)}
        onAssigned={() => void doRefresh()}
      />
    </div>
  )
}
