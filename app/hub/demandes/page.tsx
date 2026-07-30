'use client'

import { useCallback, useEffect, useState } from 'react'
import { hubAuthService } from '@/lib/services/hubAuthService'
import { apiClient } from '@/lib/api/client'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { Check, X, Loader2 } from 'lucide-react'

type Handoff = {
  id: string
  handoffType: string
  status: string
  trackingCode: string
  requesterLabel?: string
  withdrawParty?: string
  createdAt?: string
}

export default function HubDemandesPage() {
  const session = hubAuthService.getSession()
  const { success, error: toastError } = useToast()
  const [items, setItems] = useState<Handoff[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async (silent = false) => {
    if (!session?.hubId) return
    if (!silent) setLoading(true)
    try {
      const data = await apiClient.get<Handoff[]>(`/hubs/${session.hubId}/handoffs/pending`)
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      if (!silent) {
        toastError(toastErrorMessage(err, 'Impossible de charger les demandes.'))
        setItems([])
      }
    } finally {
      if (!silent) setLoading(false)
    }
  }, [session?.hubId, toastError])

  useEffect(() => { void load() }, [load])

  useEffect(() => {
    if (!session?.hubId) return
    const id = window.setInterval(() => { void load(true) }, 15_000)
    return () => window.clearInterval(id)
  }, [session?.hubId, load])

  const approve = async (id: string) => {
    if (!session) return
    setBusyId(id)
    try {
      await apiClient.post(`/hub-handoffs/${id}/approve`, {
        validatorActorId: session.userId,
        validatorLabel: session.operatorName || session.operatorEmail,
      })
      success('Demande validée.')
      await load()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Validation impossible.'))
    } finally {
      setBusyId(null)
    }
  }

  const reject = async (id: string) => {
    if (!session) return
    setBusyId(id)
    try {
      await apiClient.post(`/hub-handoffs/${id}/reject`, {
        validatorActorId: session.userId,
        validatorLabel: session.operatorName || session.operatorEmail,
      })
      success('Demande rejetée.')
      await load()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Rejet impossible.'))
    } finally {
      setBusyId(null)
    }
  }

  const claimClient = async () => {
    if (!session) return
    const trackingCode = window.prompt('Code de suivi du colis récupéré par le client ?')
    if (!trackingCode?.trim()) return
    setBusyId('claim')
    try {
      await apiClient.post(`/hubs/${session.hubId}/handoffs/claim-client-withdraw`, {
        trackingCode: trackingCode.trim(),
        operatorActorId: session.userId,
        operatorLabel: session.operatorName || session.operatorEmail,
      })
      success('Retrait déclaré — en attente de confirmation client.')
      await load()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Déclaration impossible.'))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Demandes</h1>
          <p className="text-sm text-gray-500 mt-1">Dépôts / retraits à valider, ou confirmation client.</p>
        </div>
        <button
          type="button"
          onClick={() => void claimClient()}
          disabled={busyId === 'claim'}
          className="px-3 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:opacity-60"
        >
          Client a récupéré…
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 className="animate-spin" size={16} /> Chargement…</div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6">Aucune demande en attente.</p>
      ) : (
        <ul className="space-y-3">
          {items.map(h => (
            <li key={h.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {h.handoffType === 'DEPOSIT' ? 'Dépôt' : 'Retrait'} · {h.trackingCode}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {h.status === 'AWAITING_CLIENT_CONFIRM'
                    ? 'En attente confirmation client'
                    : `Demandeur : ${h.requesterLabel || '—'}`}
                </p>
              </div>
              {h.status === 'PENDING' && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === h.id}
                    onClick={() => void approve(h.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg"
                  >
                    <Check size={12} /> Valider
                  </button>
                  <button
                    type="button"
                    disabled={busyId === h.id}
                    onClick={() => void reject(h.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg"
                  >
                    <X size={12} /> Rejeter
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
