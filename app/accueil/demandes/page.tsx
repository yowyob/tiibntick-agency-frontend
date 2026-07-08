'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, CheckCircle2, XCircle, Package, Clock,
} from 'lucide-react'
import { getAgencyId } from '@/lib/session'
import { intakeService, type IntakeStatusResult } from '@/lib/services/intakeService'
import { useToast } from '@/contexts/ToastContext'
import { formatUserError } from '@/lib/errors'

export default function AccueilDemandesPage() {
  const [items, setItems] = useState<IntakeStatusResult[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()
  const agencyId = getAgencyId()

  const load = () => {
    intakeService.listPending(agencyId)
      .then(setItems)
      .catch(() => toastError('Impossible de charger les demandes.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [agencyId])

  const approve = async (id: string) => {
    setActing(id)
    try {
      await intakeService.approve(id)
      toastSuccess('Demande approuvée — le client peut suivre son colis.')
      load()
    } catch (err) {
      toastError(formatUserError(err, 'Approbation impossible.'))
    } finally {
      setActing(null)
    }
  }

  const reject = async (id: string) => {
    const reason = window.prompt('Motif du refus :')
    if (!reason?.trim()) return
    setActing(id)
    try {
      await intakeService.reject(id, reason.trim())
      toastSuccess('Demande refusée.')
      load()
    } catch (err) {
      toastError(formatUserError(err, 'Refus impossible.'))
    } finally {
      setActing(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/accueil" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Demandes en attente</h1>
          <p className="text-sm text-gray-500">Soumises par les clients via QR à l&apos;accueil</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={28} className="animate-spin text-orange-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Package size={40} className="mx-auto mb-3 opacity-40" />
          <p>Aucune demande en attente.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono font-bold text-gray-900">{item.referenceCode}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.senderName} → {item.recipientName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate max-w-md">{item.deliveryAddress}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-amber-600">
                    <Clock size={12} />
                    {item.branchName} · {item.deliveryMode === 'HUB' ? 'Point relais' : 'Direct'}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button type="button" disabled={acting === item.id}
                    onClick={() => approve(item.id)}
                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-xs font-semibold px-3 py-2 rounded-lg">
                    {acting === item.id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                    Approuver
                  </button>
                  <button type="button" disabled={acting === item.id}
                    onClick={() => reject(item.id)}
                    className="inline-flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-3 py-2 rounded-lg">
                    <XCircle size={12} /> Refuser
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
