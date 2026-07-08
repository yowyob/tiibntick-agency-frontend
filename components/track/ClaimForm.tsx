'use client'

import { useState } from 'react'
import { AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react'
import { trackingService, type TrackingResult } from '@/lib/services/trackingService'
import { PUBLIC_AGENCY_ID } from '@/lib/config'
import { formatUserError } from '@/lib/errors'
import { sanitizeText, assertEmail } from '@/lib/admin/security'

const CLAIM_TYPES = [
  { value: 'DAMAGED', label: 'Colis endommagé' },
  { value: 'LOST', label: 'Colis perdu / introuvable' },
  { value: 'DELAY', label: 'Retard de livraison' },
  { value: 'OTHER', label: 'Autre problème' },
] as const

interface Props {
  parcel: TrackingResult
  onSuccess?: (reference: string) => void
}

export default function ClaimForm({ parcel, onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [claimType, setClaimType] = useState<string>('DAMAGED')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reference, setReference] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await trackingService.submitClaim({
        agencyId: PUBLIC_AGENCY_ID,
        trackingCode: parcel.trackingCode,
        missionId: parcel.mission?.missionId,
        claimType,
        description: sanitizeText(description, 2000),
        contactEmail: assertEmail(email),
      })
      setReference(result.reference)
      onSuccess?.(result.reference)
    } catch (err) {
      setError(formatUserError(err, 'Impossible d\'envoyer votre réclamation.'))
    } finally {
      setLoading(false)
    }
  }

  if (reference) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-800">Réclamation enregistrée</p>
            <p className="text-emerald-700 mt-1 text-xs">
              Référence <span className="font-mono font-semibold">{reference}</span>.
              Vous serez contacté sous 48 h.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50/50 hover:bg-red-50 rounded-xl py-3 transition-colors"
      >
        <AlertTriangle size={16} />
        Signaler un problème
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <p className="text-sm font-semibold text-gray-900">Déposer une réclamation</p>
      <p className="text-xs text-gray-500">
        Colis {parcel.trackingCode} — décrivez le problème rencontré.
      </p>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
        <select
          value={claimType}
          onChange={e => setClaimType(e.target.value)}
          className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white"
        >
          {CLAIM_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email de contact</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg"
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
        <textarea
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          maxLength={2000}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none"
          placeholder="Décrivez le problème en détail…"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 h-10 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 h-10 text-sm font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          Envoyer
        </button>
      </div>
    </form>
  )
}
