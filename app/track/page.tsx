'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Package, Search, Loader2, AlertCircle, ShieldCheck,
  Copy, Check, Share2,
} from 'lucide-react'
import { parcelStatusLabel } from '@/lib/displayLabels'
import { formatUserError } from '@/lib/errors'
import { trackingService, type TrackingResult } from '@/lib/services/trackingService'
import { openTrackingStream } from '@/lib/realtime'
import TrackHubCard from '@/components/track/TrackHubCard'
import TrackTimeline from '@/components/track/TrackTimeline'
import ClaimForm from '@/components/track/ClaimForm'

function ParcelCard({
  parcel,
  agencyId,
  onCopy,
}: {
  parcel: TrackingResult
  agencyId?: string
  onCopy: () => void
}) {
  const [copied, setCopied] = useState(false)
  const statusLabel = parcelStatusLabel(parcel.status)
  const badgeClass =
    parcel.status === 'WITHDRAWN' ? 'bg-emerald-100 text-emerald-700' :
    parcel.status === 'EXPIRED' ? 'bg-red-100 text-red-700' :
    parcel.status === 'RETURNED_TO_AGENCY' ? 'bg-amber-100 text-amber-800' :
    'bg-orange-100 text-orange-700'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(parcel.trackingCode)
    setCopied(true)
    onCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/track?code=${encodeURIComponent(parcel.trackingCode)}`
    : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Suivi colis TiiBnTick',
        text: `Suivez mon colis : ${parcel.trackingCode}`,
        url: shareUrl,
      }).catch(() => undefined)
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Code de suivi</p>
            <p className="text-lg font-bold text-gray-900 font-mono">{parcel.trackingCode}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-orange-600 transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                {copied ? 'Copié' : 'Copier'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-orange-600 transition-colors"
              >
                <Share2 size={13} />
                Partager
              </button>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${badgeClass}`}>
            {statusLabel.split(' — ')[0]}
          </span>
        </div>

        {parcel.recipientName && (
          <div className="px-6 py-3 border-b border-gray-100 text-sm">
            <span className="text-gray-400 text-xs">Destinataire · </span>
            <span className="font-medium text-gray-900">{parcel.recipientName}</span>
          </div>
        )}

        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Parcours</p>
          <TrackTimeline parcel={parcel} />
        </div>

        <div className="px-6 py-4 flex items-center gap-2">
          <ShieldCheck size={14} className={parcel.identityVerified ? 'text-emerald-500' : 'text-gray-300'} />
          <p className="text-xs text-gray-500">
            {parcel.identityVerified
              ? 'Identité vérifiée lors du retrait'
              : 'Une pièce d\'identité sera demandée au retrait'}
          </p>
        </div>
      </div>

      <TrackHubCard hub={parcel.hub} />

      <Link
        href="/track/messages"
        className="block bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm hover:border-orange-200 hover:bg-orange-50/40 transition-colors"
      >
        <p className="font-semibold text-gray-900">Contacter l&apos;antenne ou le livreur</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Messagerie · bientôt disponible
        </p>
      </Link>

      {(parcel.status === 'EXPIRED' || parcel.status === 'DEPOSITED' || parcel.status === 'WITHDRAWN') && (
        <ClaimForm parcel={parcel} agencyId={agencyId} />
      )}

      {parcel.status === 'DEPOSITED' && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-sm text-orange-800">
          <p className="font-semibold">Votre colis vous attend</p>
          <p className="text-orange-700 mt-1 text-xs leading-relaxed">
            Présentez-vous au point relais avec une pièce d&apos;identité et ce code de suivi.
            {parcel.withdrawalDeadline && (
              <> Retrait avant le{' '}
                <strong>
                  {new Date(parcel.withdrawalDeadline).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
                  })}
                </strong>.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

function TrackPageContent() {
  const searchParams = useSearchParams()
  const initialCode = searchParams.get('code') ?? ''
  const agencyIdFromUrl = searchParams.get('agencyId')?.trim() || undefined

  const [trackingCode, setTrackingCode] = useState(initialCode)
  const [parcel, setParcel] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const search = useCallback(async (code: string) => {
    const trimmed = code.trim()
    if (!trimmed) return

    setError('')
    setParcel(null)
    setLoading(true)

    try {
      const result = await trackingService.trackByCode(trimmed)
      setParcel(result)
      const url = new URL(window.location.href)
      url.searchParams.set('code', result.trackingCode)
      window.history.replaceState({}, '', url.toString())
    } catch (err) {
      setError(formatUserError(
        err,
        `Aucun colis trouvé pour le code « ${trimmed.toUpperCase()} ». Vérifiez votre numéro de suivi.`,
      ))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialCode) {
      void search(initialCode)
    }
  }, [initialCode, search])

  useEffect(() => {
    if (!parcel?.trackingCode) return
    const code = parcel.trackingCode
    const es = openTrackingStream(code, () => {
      void trackingService.trackByCode(code).then(setParcel).catch(() => undefined)
    })
    return () => es?.close()
  }, [parcel?.trackingCode])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    void search(trackingCode)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
              <Package size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-none text-sm">TiiBnTick</p>
              <p className="text-xs text-gray-400">Suivi de colis</p>
            </div>
          </Link>
          <Link
            href="/track/messages"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50"
          >
            Messages
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suivre mon colis</h1>
          <p className="text-sm text-gray-500 mt-1">
            Entrez votre code de suivi pour connaître l&apos;état de votre colis et le point relais de retrait.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={trackingCode}
              onChange={e => setTrackingCode(e.target.value)}
              placeholder="ex : TRK-20260427-0035"
              className="w-full h-11 pl-9 pr-4 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !trackingCode.trim()}
            className="h-11 px-5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 flex-shrink-0"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
            {loading ? '...' : 'Rechercher'}
          </button>
        </form>

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {parcel && (
          <ParcelCard
            parcel={parcel}
            agencyId={agencyIdFromUrl}
            onCopy={() => undefined}
          />
        )}

        {!parcel && !error && !loading && (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-orange-300" />
            </div>
            <p className="text-sm text-gray-500">
              Saisissez votre code de suivi ci-dessus pour commencer.
            </p>
            <p className="text-xs text-gray-400 mt-4 max-w-xs mx-auto leading-relaxed">
              Pour déposer un colis, scannez le QR code affiché à l&apos;accueil de l&apos;agence.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-orange-400" />
      </div>
    }>
      <TrackPageContent />
    </Suspense>
  )
}
