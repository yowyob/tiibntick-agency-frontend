'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Package, ArrowLeft, Loader2, AlertCircle, Building2, CheckCircle2,
} from 'lucide-react'
import { formatUserError } from '@/lib/errors'
import {
  trackingService,
  type PublicRelayHub,
  type DropOffResult,
} from '@/lib/services/trackingService'

const inputCls =
  'w-full h-11 px-4 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition'

function DropOffForm() {
  const searchParams = useSearchParams()
  const agencyId = searchParams.get('agencyId')?.trim() ?? ''
  const preselectedHubId = searchParams.get('hubId')?.trim() ?? ''

  const [hubs, setHubs] = useState<PublicRelayHub[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<DropOffResult | null>(null)
  const [form, setForm] = useState({
    hubId: preselectedHubId,
    senderName: '',
    recipientName: '',
    recipientPhone: '',
    trackingCode: '',
  })

  useEffect(() => {
    if (!agencyId) {
      setError('Lien invalide — ajoutez agencyId (et optionnellement hubId).')
      setLoading(false)
      return
    }
    trackingService
      .listRelayHubs(agencyId)
      .then(list => {
        setHubs(list)
        if (!form.hubId && list[0]?.id) {
          setForm(prev => ({ ...prev, hubId: list[0].id }))
        }
      })
      .catch(() => setError('Impossible de charger les hubs relais.'))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyId])

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agencyId || !form.hubId) return
    setError('')
    setSubmitting(true)
    try {
      const deposited = await trackingService.dropOff({
        agencyId,
        hubId: form.hubId,
        senderName: form.senderName.trim(),
        recipientName: form.recipientName.trim(),
        recipientPhone: form.recipientPhone.trim() || undefined,
        trackingCode: form.trackingCode.trim() || undefined,
      })
      setResult(deposited)
    } catch (err) {
      setError(formatUserError(err, 'Impossible d\'enregistrer le dépôt.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-orange-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/track" className="text-gray-400 hover:text-gray-600" aria-label="Retour au suivi">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-base font-semibold text-gray-900">Dépôt au hub relais</h1>
            <p className="text-xs text-gray-500">Enregistrement public d&apos;un colis en point relais</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        {result ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 size={20} />
              <h2 className="font-semibold">Dépôt enregistré</h2>
            </div>
            <p className="text-sm text-gray-600">{result.message}</p>
            <p className="font-mono text-lg font-bold text-gray-900">{result.trackingCode}</p>
            <Link
              href={`/track?code=${encodeURIComponent(result.trackingCode)}`}
              className="inline-flex text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Suivre ce colis →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Hub relais *</label>
              <div className="relative">
                <Building2 size={15} className="absolute left-3 top-3.5 text-gray-400" />
                <select
                  required
                  value={form.hubId}
                  onChange={e => update('hubId', e.target.value)}
                  className={`${inputCls} pl-9`}
                >
                  <option value="">Choisir un hub</option>
                  {hubs.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name}{h.city ? ` — ${h.city}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Votre nom *</label>
              <input
                required
                value={form.senderName}
                onChange={e => update('senderName', e.target.value)}
                className={inputCls}
                placeholder="Expéditeur"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Destinataire *</label>
              <input
                required
                value={form.recipientName}
                onChange={e => update('recipientName', e.target.value)}
                className={inputCls}
                placeholder="Nom du destinataire"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Tél. destinataire</label>
              <input
                value={form.recipientPhone}
                onChange={e => update('recipientPhone', e.target.value)}
                className={inputCls}
                placeholder="Optionnel"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Code de suivi existant</label>
              <input
                value={form.trackingCode}
                onChange={e => update('trackingCode', e.target.value)}
                className={inputCls}
                placeholder="Laisser vide pour en générer un"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || hubs.length === 0}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Package size={15} />}
              {submitting ? 'Enregistrement…' : 'Déposer le colis'}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}

export default function TrackDropOffPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-orange-400" />
      </div>
    }>
      <DropOffForm />
    </Suspense>
  )
}
