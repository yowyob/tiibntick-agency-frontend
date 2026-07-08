'use client'

import { useMemo } from 'react'
import { Users, Phone, Star, Package, MapPin, Radio } from 'lucide-react'
import { useBranchOperationalData } from '@/lib/branch/useBranchOperationalData'
import { useBranchLivePositions } from '@/lib/branch/useBranchLivePositions'
import type { DelivererStatus } from '@/lib/types'
import YowyobLaunchCard from '@/components/integrations/YowyobLaunchCard'

const STATUS_LABELS: Record<DelivererStatus, string> = {
  AVAILABLE: 'Disponible', ON_MISSION: 'En mission',
  OFFLINE: 'Hors ligne', SUSPENDED: 'Suspendu', INACTIVE: 'Inactif',
}
const STATUS_COLORS: Record<DelivererStatus, string> = {
  AVAILABLE:  'bg-emerald-50 text-emerald-700',
  ON_MISSION: 'bg-orange-50 text-orange-700',
  OFFLINE:    'bg-gray-100 text-gray-500',
  SUSPENDED:  'bg-red-50 text-red-700',
  INACTIVE:   'bg-gray-100 text-gray-400',
}
const TYPE_LABELS: Record<string, string> = {
  PERMANENT: 'Permanent', PART_TIME: 'Mi-temps', FREELANCER_ASSOCIATED: 'Freelancer',
}

function LiveIndicator({ hasGps }: { hasGps: boolean }) {
  if (!hasGps) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        Pas de signal GPS
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
      <Radio size={10} className="animate-pulse" />
      GPS live
    </span>
  );
}

export default function BranchStaffPage() {
  const { data, loading, branchId } = useBranchOperationalData()
  const staff = data?.deliverers ?? []
  const missions = data?.missions ?? []
  const delivererIds = useMemo(() => staff.map(d => d.id), [staff])
  const { positions } = useBranchLivePositions(delivererIds)

  if (!branchId) return null
  if (loading || !data) {
    return (
      <div className="p-6 flex justify-center min-h-[40vh] items-center">
        <span className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const available = staff.filter(d => d.status === 'AVAILABLE').length
  const onMission = staff.filter(d => d.status === 'ON_MISSION').length
  const gpsActive = Object.keys(positions).length

  const activeMissionFor = (delivererId: string) =>
    missions.find(m => m.delivererId === delivererId && (m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT'))

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Personnel</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {staff.length} livreur{staff.length !== 1 ? 's' : ''} · {available} disponible{available !== 1 ? 's' : ''} · {onMission} en mission · {gpsActive} GPS actif{gpsActive !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <YowyobLaunchCard
        app="HRM"
        title="Gestion RH antenne (YowYob HRM)"
        description="Contrats, paie et dossiers employés de votre antenne uniquement."
        accent="emerald"
      />

      {staff.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 flex flex-col items-center gap-3 text-center">
          <Users size={32} className="text-gray-200" />
          <p className="text-sm text-gray-400">Aucun livreur rattaché à cette antenne</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Mission active</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Note</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staff.map(d => {
                const initials = d.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                const pos = positions[d.id]
                const active = activeMissionFor(d.id)
                return (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-700 text-xs font-semibold">{initials}</span>
                          {pos && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{d.fullName}</p>
                          {d.vehiclePlate && (
                            <p className="text-[11px] text-gray-400 font-mono">{d.vehiclePlate}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {d.phone ? (
                        <a href={`tel:${d.phone}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                          <Phone size={12} className="text-gray-400" />
                          {d.phone}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-gray-600">{TYPE_LABELS[d.type] ?? d.type}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {active ? (
                        <div className="flex items-center gap-1.5">
                          <Package size={12} className="text-orange-400" />
                          <span className="text-xs font-mono font-semibold text-gray-800">{active.manifestNumber}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="space-y-0.5">
                        <LiveIndicator hasGps={!!pos} />
                        {pos && (
                          <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            <MapPin size={10} />
                            {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-orange-400 fill-orange-400" />
                        <span className="text-sm font-semibold text-gray-900">{d.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[d.status]}`}>
                        {STATUS_LABELS[d.status]}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
