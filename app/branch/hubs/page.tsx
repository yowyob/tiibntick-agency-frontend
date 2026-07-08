'use client'

import { useMemo } from 'react'
import { MapPin, Package, AlertTriangle } from 'lucide-react'
import { useBranchOperationalData } from '@/lib/branch/useBranchOperationalData'
import { isHubSaturated, isParcelExpiringSoon, hubOccupancyPct } from '@/lib/branch/actionQueue'
import HubAlertBanner from '@/components/branch/HubAlertBanner'
import type { HubStatus } from '@/lib/types'

const STATUS_LABELS: Record<HubStatus, string> = {
  OPEN: 'Ouvert', FULL: 'Complet',
  TEMPORARILY_CLOSED: 'Fermé temp.', PERMANENTLY_CLOSED: 'Fermé',
}
const STATUS_COLORS: Record<HubStatus, string> = {
  OPEN: 'bg-emerald-50 text-emerald-700',
  FULL: 'bg-orange-50 text-orange-700',
  TEMPORARILY_CLOSED: 'bg-yellow-50 text-yellow-700',
  PERMANENTLY_CLOSED: 'bg-gray-100 text-gray-400',
}

function OccupancyBar({ current, capacity }: { current: number; capacity: number }) {
  const pct = capacity > 0 ? Math.min(100, Math.round((current / capacity) * 100)) : 0
  const color = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-orange-400' : 'bg-emerald-500'
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{current}/{capacity} colis</span>
        <span className="text-xs font-semibold text-gray-700">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function BranchHubsPage() {
  const { data, loading, branchId } = useBranchOperationalData();

  const hubs = data?.hubs ?? [];
  const parcels = data?.parcels ?? [];

  const expiringCount = useMemo(
    () => parcels.filter(p => isParcelExpiringSoon(p)).length,
    [parcels],
  );

  if (!branchId) return null;
  if (loading) {
    return (
      <div className="p-6 flex justify-center min-h-[40vh] items-center">
        <span className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Hubs Relais</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {hubs.length} hub{hubs.length !== 1 ? 's' : ''} rattaché{hubs.length !== 1 ? 's' : ''} à cette antenne
        </p>
      </div>

      <HubAlertBanner hubs={hubs} />

      {expiringCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>{expiringCount}</strong> colis proche(s) de la date limite de retrait (24h)
          </p>
        </div>
      )}

      {hubs.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 flex flex-col items-center gap-3">
          <MapPin size={32} className="text-gray-200" />
          <p className="text-sm text-gray-400">Aucun hub relais rattaché à cette antenne</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {hubs.map(hub => {
            const hubParcels = parcels.filter(p => p.hubId === hub.id && p.status === 'DEPOSITED')
            return (
              <div key={hub.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{hub.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-52">{hub.address}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[hub.status]}`}>
                    {STATUS_LABELS[hub.status]}
                  </span>
                </div>

                {/* Occupancy */}
                <OccupancyBar current={hub.currentOccupancy} capacity={hub.capacity} />
                {isHubSaturated(hub) && (
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                    <AlertTriangle size={12} /> Saturation {hubOccupancyPct(hub)}% — action requise
                  </p>
                )}

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1">Horaires</p>
                    <p className="text-xs text-gray-700">{hub.openingHours}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1">Rétention max</p>
                    <p className="text-xs text-gray-700">{hub.maxRetentionDays} jours</p>
                  </div>
                </div>

                {/* Manager */}
                {hub.managerName && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">Responsable :</span>
                    <span>{hub.managerName}</span>
                    {hub.managerPhone && (
                      <a href={`tel:${hub.managerPhone}`} className="text-orange-500 hover:underline ml-1">
                        {hub.managerPhone}
                      </a>
                    )}
                  </div>
                )}

                {/* Parcel records */}
                {hubParcels.length > 0 && (
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={13} className="text-gray-400" />
                      <p className="text-xs font-semibold text-gray-600">{hubParcels.length} colis en attente de retrait</p>
                    </div>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {hubParcels.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                          <div className="min-w-0">
                            <p className="text-[11px] font-mono font-semibold text-gray-900 truncate">{p.trackingCode}</p>
                            <p className="text-[10px] text-gray-400 truncate">{p.recipientName}</p>
                          </div>
                          <p className="text-[10px] text-gray-400 shrink-0">
                            {new Date(p.depositedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      ))}
                      {hubParcels.length > 4 && (
                        <p className="text-[10px] text-gray-400 text-center pt-1">
                          + {hubParcels.length - 4} autres colis
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
