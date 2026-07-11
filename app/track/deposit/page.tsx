'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package, ArrowLeft, Loader2, AlertCircle, Building2, MapPin,
  User, Phone, Scale,
} from 'lucide-react'
import { formatUserError } from '@/lib/errors'
import { PUBLIC_AGENCY_ID } from '@/lib/config'
import { intakeService, type IntakeContext, type IntakeDeliveryMode } from '@/lib/services/intakeService'
import { trackingService, type PublicRelayHub } from '@/lib/services/trackingService'

const inputCls =
  'w-full h-11 px-4 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition'

function DepositForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const agencyId = searchParams.get('agencyId') ?? PUBLIC_AGENCY_ID
  const branchId = searchParams.get('branchId') ?? ''

  const [context, setContext] = useState<IntakeContext | null>(null)
  const [hubs, setHubs] = useState<PublicRelayHub[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    weightKg: '',
    packagesCount: '1',
    deliveryMode: 'DIRECT' as IntakeDeliveryMode,
    targetHubId: '',
    notes: '',
  })

  useEffect(() => {
    if (!branchId) {
      setError('Lien invalide — scannez le QR code affiché à l\'accueil de l\'agence.')
      setLoading(false)
      return
    }
    Promise.all([
      intakeService.getContext(agencyId, branchId),
      trackingService.listRelayHubs(agencyId),
    ])
      .then(([ctx, hubList]) => {
        setContext(ctx)
        setHubs(hubList)
        setForm(prev => ({
          ...prev,
          pickupAddress: ctx.branchAddress ?? prev.pickupAddress,
        }))
      })
      .catch(() => setError('Impossible de charger les informations de l\'agence.'))
      .finally(() => setLoading(false))
  }, [agencyId, branchId])

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!branchId) return
    setError('')
    setSubmitting(true)
    try {
      const result = await intakeService.submit({
        agencyId,
        branchId,
        senderName: form.senderName.trim(),
        senderPhone: form.senderPhone.trim() || undefined,
        recipientName: form.recipientName.trim(),
        recipientPhone: form.recipientPhone.trim() || undefined,
        pickupAddress: form.pickupAddress.trim(),
        deliveryAddress: form.deliveryAddress.trim(),
        weightKg: form.weightKg ? parseFloat(form.weightKg) : undefined,
        packagesCount: parseInt(form.packagesCount, 10) || 1,
        deliveryMode: form.deliveryMode,
        targetHubId: form.deliveryMode === 'HUB' ? form.targetHubId : undefined,
        notes: form.notes.trim() || undefined,
      })
      router.push(`/track/deposit/status?ref=${encodeURIComponent(result.referenceCode)}`)
    } catch (err) {
      setError(formatUserError(err, 'Impossible d\'envoyer votre demande.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/track" className="text-gray-400 hover:text-gray-600" aria-label="Retour au suivi">
            <ArrowLeft size={18} />
          </Link>
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-none">Demande d&apos;expédition</p>
              <p className="text-xs text-gray-400">Formulaire client</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={28} className="animate-spin text-orange-400" />
          </div>
        ) : (
          <>
            {context && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Building2 size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">{context.agencyName}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{context.branchName}</p>
                    {context.branchAddress && (
                      <p className="text-xs text-gray-400 mt-1 flex items-start gap-1">
                        <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                        {context.branchAddress}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {branchId && !error && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <User size={16} className="text-orange-500" /> Vos informations
                  </p>
                  <input required placeholder="Votre nom *" value={form.senderName}
                    onChange={e => update('senderName', e.target.value)} className={inputCls} />
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input placeholder="Votre téléphone" value={form.senderPhone}
                      onChange={e => update('senderPhone', e.target.value)} className={`${inputCls} pl-9`} />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-800">Destinataire & livraison</p>
                  <input required placeholder="Nom du destinataire *" value={form.recipientName}
                    onChange={e => update('recipientName', e.target.value)} className={inputCls} />
                  <input placeholder="Téléphone destinataire" value={form.recipientPhone}
                    onChange={e => update('recipientPhone', e.target.value)} className={inputCls} />
                  <input required placeholder="Adresse d'enlèvement *" value={form.pickupAddress}
                    onChange={e => update('pickupAddress', e.target.value)} className={inputCls} />
                  <input required placeholder="Adresse de livraison *" value={form.deliveryAddress}
                    onChange={e => update('deliveryAddress', e.target.value)} className={inputCls} />

                  <div className="flex rounded-xl border border-gray-200 overflow-hidden h-11">
                    {(['DIRECT', 'HUB'] as const).map(mode => (
                      <button key={mode} type="button"
                        onClick={() => update('deliveryMode', mode)}
                        className={`flex-1 text-sm font-medium transition-colors ${
                          form.deliveryMode === mode ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'
                        }`}>
                        {mode === 'DIRECT' ? 'À domicile' : 'Point relais'}
                      </button>
                    ))}
                  </div>

                  {form.deliveryMode === 'HUB' && (
                    <select required value={form.targetHubId}
                      onChange={e => update('targetHubId', e.target.value)} className={inputCls}>
                      <option value="">Choisir un point relais</option>
                      {hubs.map(h => (
                        <option key={h.id} value={h.id}>{h.name} — {h.city ?? h.address}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Scale size={16} className="text-orange-500" /> Colis
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" min="0.1" step="0.1" placeholder="Poids (kg)"
                      value={form.weightKg} onChange={e => update('weightKg', e.target.value)} className={inputCls} />
                    <input type="number" min="1" placeholder="Nb colis" value={form.packagesCount}
                      onChange={e => update('packagesCount', e.target.value)} className={inputCls} />
                  </div>
                  <input placeholder="Notes (fragile, etc.)" value={form.notes}
                    onChange={e => update('notes', e.target.value)} className={inputCls} />
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-xs text-orange-800">
                  Votre demande sera examinée par l&apos;équipe de l&apos;agence.
                  Vous recevrez votre code de suivi une fois la demande approuvée.
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Envoi...</> : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default function DepositPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-orange-400" />
      </div>
    }>
      <DepositForm />
    </Suspense>
  )
}
