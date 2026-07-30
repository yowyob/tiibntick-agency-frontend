'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { livreurFetch, getLivreurSession } from '@/lib/livreur/api'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { Loader2 } from 'lucide-react'

function HubScanForm() {
  const params = useSearchParams()
  const router = useRouter()
  const { success, error: toastError } = useToast()
  const hubId = params.get('hubId') || ''
  const agencyId = params.get('agencyId') || ''
  const action = (params.get('action') || 'deposit').toLowerCase()
  const [trackingCode, setTrackingCode] = useState('')
  const [missionId, setMissionId] = useState('')
  const [loading, setLoading] = useState(false)

  const title = useMemo(
    () => (action === 'withdraw' ? 'Demande de retrait hub' : 'Demande de dépôt hub'),
    [action],
  )

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hubId || !trackingCode.trim()) return
    const session = getLivreurSession()
    if (!session) {
      toastError('Connectez-vous en tant que livreur pour scanner un hub.')
      router.push('/livreur/login')
      return
    }
    setLoading(true)
    try {
      await livreurFetch(`/hubs/${hubId}/handoffs`, {
        method: 'POST',
        body: JSON.stringify({
          handoffType: action === 'withdraw' ? 'WITHDRAW' : 'DEPOSIT',
          trackingCode: trackingCode.trim(),
          missionId: missionId || undefined,
          requesterActorId: session.userId || session.delivererId,
          requesterRole: 'DELIVERER',
          requesterLabel: session.delivererName || 'Livreur',
          withdrawParty: action === 'withdraw' ? 'DELIVERER' : undefined,
        }),
      })
      success('Demande envoyée au gérant du hub. En attente de validation.')
      router.push('/livreur')
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'envoyer la demande.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Scan hub</p>
        <h1 className="text-xl font-semibold text-gray-900 mt-1">{title}</h1>
        <p className="text-xs text-gray-500 mt-1">
          Agence {agencyId.slice(0, 8)}… · Hub {hubId.slice(0, 8)}…
        </p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Code de suivi *</label>
        <input
          value={trackingCode}
          onChange={e => setTrackingCode(e.target.value)}
          required
          className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm"
          placeholder="Ex: TNT-XXXX"
        />
      </div>
      {action === 'deposit' && (
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mission (optionnel)</label>
          <input
            value={missionId}
            onChange={e => setMissionId(e.target.value)}
            className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm"
          />
        </div>
      )}
      <button
        type="submit"
        disabled={loading || !hubId}
        className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : null}
        Envoyer au gérant
      </button>
    </form>
  )
}

export default function HubScanPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Suspense fallback={<Loader2 className="animate-spin text-gray-400" />}>
        <HubScanForm />
      </Suspense>
    </div>
  )
}
