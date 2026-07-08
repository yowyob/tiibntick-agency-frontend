'use client'

import { useEffect, useState } from 'react'
import { Truck } from 'lucide-react'
import { branchAuthService } from '@/lib/services/branchAuthService'
import { branchPortalService } from '@/lib/services/branchPortalService'
import VehicleDetailDrawer from '@/components/VehicleDetailDrawer'
import type { Vehicle, VehicleStatus } from '@/lib/types'

const STATUS_LABELS: Record<VehicleStatus, string> = {
  AVAILABLE: 'Disponible', IN_USE: 'En service',
  IN_MAINTENANCE: 'En maintenance', RETIRED: 'Retraité',
}
const STATUS_COLORS: Record<VehicleStatus, string> = {
  AVAILABLE:      'bg-emerald-50 text-emerald-700',
  IN_USE:         'bg-blue-50 text-blue-700',
  IN_MAINTENANCE: 'bg-orange-50 text-orange-700',
  RETIRED:        'bg-gray-100 text-gray-400',
}
const TYPE_LABELS: Record<string, string> = {
  MOTORCYCLE: 'Moto', CAR: 'Voiture', TRUCK_LIGHT: 'Camionnette',
  TRUCK_HEAVY: 'Camion', TRICYCLE: 'Tricycle', BICYCLE: 'Vélo', ON_FOOT: 'À pied',
}

export default function BranchFleetPage() {
  const [branchId, setBranchId] = useState<string | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Vehicle | null>(null)
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})

  useEffect(() => {
    const id = branchAuthService.getCurrentBranchId()
    setBranchId(id)
    if (!id) return
    branchPortalService.getVehicles(id, branchAuthService.getAgencyId() ?? undefined)
      .then(setVehicles)
      .finally(() => setLoading(false))
  }, [])

  if (!branchId) return null
  if (loading) {
    return (
      <div className="p-6 flex justify-center min-h-[40vh] items-center">
        <span className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const available  = vehicles.filter(v => v.status === 'AVAILABLE').length
  const inUse      = vehicles.filter(v => v.status === 'IN_USE').length

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Flotte</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {vehicles.length} véhicule{vehicles.length !== 1 ? 's' : ''} · {available} disponible{available !== 1 ? 's' : ''} · {inUse} en service
        </p>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 flex flex-col items-center gap-3">
          <Truck size={32} className="text-gray-200" />
          <p className="text-sm text-gray-400">Aucun véhicule affecté à cette antenne</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Véhicule</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Immatriculation</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Capacité</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Livreur assigné</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vehicles.map(v => {
                const thumb = photoMap[v.id] ?? v.photoUrl
                return (
                  <tr
                    key={v.id}
                    onClick={() => setSelected(v)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={v.model} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Truck size={16} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{v.model}</p>
                          <p className="text-[11px] text-gray-400">{TYPE_LABELS[v.type] ?? v.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-mono font-semibold text-gray-900">{v.registrationNumber}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-gray-700">{v.maxWeightKg} kg</p>
                      <p className="text-[11px] text-gray-400">{v.maxVolumeM3} m³</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {v.assignedDelivererName
                        ? <p className="text-sm text-gray-700">{v.assignedDelivererName}</p>
                        : <p className="text-sm text-gray-400 italic">Libre</p>
                      }
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[v.status]}`}>
                        {STATUS_LABELS[v.status]}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <VehicleDetailDrawer
        vehicle={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
        onPhotoChange={(id, url) => setPhotoMap(p => ({ ...p, [id]: url }))}
      />
    </div>
  )
}
