'use client'

import { useCallback, useEffect, useState } from 'react'
import { hubAuthService } from '@/lib/services/hubAuthService'
import { hubService } from '@/lib/services/hubService'
import type { HubParcelRecord } from '@/lib/types'
import { Loader2 } from 'lucide-react'

export default function HubStockPage() {
  const session = hubAuthService.getSession()
  const [parcels, setParcels] = useState<HubParcelRecord[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!session?.hubId) return
    setLoading(true)
    try {
      const list = await hubService.getParcelRecords(session.hubId)
      setParcels(list.filter(p => p.status === 'DEPOSITED'))
    } catch {
      setParcels([])
    } finally {
      setLoading(false)
    }
  }, [session?.hubId])

  useEffect(() => { void load() }, [load])

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-semibold text-gray-900">Stock du hub</h1>
      <p className="text-sm text-gray-500 mt-1">Colis actuellement déposés dans votre espace.</p>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-6"><Loader2 className="animate-spin" size={16} /> Chargement…</div>
      ) : parcels.length === 0 ? (
        <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6 mt-6">Aucun colis en stock.</p>
      ) : (
        <div className="mt-6 overflow-hidden border border-gray-200 rounded-xl bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3">Suivi</th>
                <th className="px-4 py-3">Déposé le</th>
                <th className="px-4 py-3">Échéance</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(p => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.trackingCode}</td>
                  <td className="px-4 py-3 text-gray-600">{p.depositedAt ? new Date(p.depositedAt).toLocaleString('fr-FR') : '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{p.withdrawalDeadline ? new Date(p.withdrawalDeadline).toLocaleString('fr-FR') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
