'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { API_BASE_URL, PUBLIC_TENANT_ID } from '@/lib/config'
import { publicFetchJson, publicClientJsonHeaders } from '@/lib/api/publicFetch'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { Loader2, CheckCircle2 } from 'lucide-react'

function ConfirmInner() {
  const params = useSearchParams()
  const handoffId = params.get('handoffId') || ''
  const { success, error: toastError } = useToast()
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!handoffId) return
    setLoading(true)
    try {
      await publicFetchJson(`${API_BASE_URL}/hub-handoffs/${encodeURIComponent(handoffId)}/confirm-client`, {
        method: 'POST',
        headers: {
          ...publicClientJsonHeaders(),
          'X-Tenant-Id': params.get('tenantId') || PUBLIC_TENANT_ID,
        },
        body: JSON.stringify({
          clientLabel: name.trim() || 'CLIENT',
        }),
      })
      success('Retrait confirmé. Merci !')
      setDone(true)
    } catch (err) {
      toastError(toastErrorMessage(err, 'Confirmation impossible.'))
    } finally {
      setLoading(false)
    }
  }

  if (!handoffId) {
    return (
      <p className="text-sm text-gray-500 text-center">
        Lien invalide. Demandez un nouveau lien au gérant du hub ou à l&apos;antenne.
      </p>
    )
  }

  if (done) {
    return (
      <div className="text-center space-y-3">
        <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
        <p className="font-semibold text-gray-900">Colis bien reçu</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Confirmer la récupération</h1>
        <p className="text-sm text-gray-500 mt-1">
          Le hub a déclaré que vous avez récupéré le colis. Confirmez pour finaliser.
        </p>
      </div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Votre nom"
        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-orange-500 text-white rounded-lg text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : null}
        Oui, j&apos;ai récupéré mon colis
      </button>
    </form>
  )
}

export default function HubConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6">
        <Suspense fallback={<Loader2 className="animate-spin mx-auto text-gray-400" />}>
          <ConfirmInner />
        </Suspense>
      </div>
    </div>
  )
}
