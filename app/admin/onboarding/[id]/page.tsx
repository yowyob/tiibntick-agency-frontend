'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, XCircle, Loader2, FileText, ExternalLink, AlertCircle } from 'lucide-react'
import { onboardingAdminService, type OnboardingDetail } from '@/lib/services/onboardingAdminService'
import { mediaService } from '@/lib/services/mediaService'
import { sanitizeReason } from '@/lib/admin/security'
import { formatUserError } from '@/lib/errors'

export default function AdminOnboardingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [detail, setDetail] = useState<OnboardingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showReject, setShowReject] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    onboardingAdminService.getDetail(id)
      .then(setDetail)
      .finally(() => setLoading(false))
  }, [id])

  const approve = async () => {
    setActionLoading(true)
    setError('')
    try {
      await onboardingAdminService.approve(id)
      router.push('/admin/onboarding')
    } catch (err) {
      setError(formatUserError(err, 'Approbation impossible.'))
    } finally {
      setActionLoading(false)
    }
  }

  const reject = async () => {
    setActionLoading(true)
    setError('')
    try {
      const reason = sanitizeReason(rejectReason)
      await onboardingAdminService.reject(id, reason)
      router.push('/admin/onboarding')
    } catch (err) {
      setError(formatUserError(err, 'Rejet impossible.'))
    } finally {
      setActionLoading(false)
    }
  }

  if (loading || !detail) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    )
  }

  const docs = [
    { label: 'CNI / Passeport', key: detail.docCniKey },
    { label: 'RCCM', key: detail.docRccmKey },
    { label: 'Justificatif', key: detail.docProofKey },
  ]

  const kernelReady = detail.summary.kernelIdentityReady

  return (
    <div className="p-6 max-w-3xl">
      <Link href="/admin/onboarding" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4">
        <ArrowLeft size={16} /> Retour à la liste
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{detail.agency.name}</h1>
          <p className="text-slate-400 text-sm mt-1">{detail.legalName} · RCCM {detail.agency.registrationNumber}</p>
          <Link
            href={`/admin/agencies?agencyId=${detail.summary.agencyId}&tenantId=${detail.summary.tenantId}`}
            className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block"
          >
            Ouvrir dans gestion agences →
          </Link>
        </div>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Responsable</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-slate-500">Nom</span><p>{detail.summary.ownerName}</p></div>
            <div><span className="text-slate-500">Email</span><p>{detail.summary.ownerEmail}</p></div>
            <div><span className="text-slate-500">Téléphone</span><p>{detail.summary.ownerPhone}</p></div>
            <div><span className="text-slate-500">Pièce</span><p>{detail.ownerIdType} {detail.ownerNationalId}</p></div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Identité Kernel (phase 1)</h2>
          <div className="flex items-start gap-3">
            {kernelReady ? (
              <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="text-sm space-y-1">
              <p className={kernelReady ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                {kernelReady ? 'Identité candidat enregistrée — approbation possible' : 'Identité candidat manquante — approbation bloquée'}
              </p>
              {detail.summary.kernelBusinessActorId && (
                <p className="text-slate-500 text-xs font-mono">
                  BusinessActor : {detail.summary.kernelBusinessActorId}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Documents KYC</h2>
          <div className="space-y-2">
            {docs.map(d => (
              <KycDocumentRow key={d.label} label={d.label} mediaKey={d.key} />
            ))}
          </div>
        </section>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {showReject ? (
          <div className="space-y-3">
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Motif du rejet (obligatoire)"
              maxLength={1000}
              className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm"
            />
            <div className="flex gap-3">
              <button onClick={reject} disabled={actionLoading || !rejectReason.trim()}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center justify-center gap-2">
                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                Confirmer le rejet
              </button>
              <button onClick={() => setShowReject(false)} className="px-4 text-slate-400">Annuler</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={approve}
              disabled={actionLoading || !kernelReady}
              title={!kernelReady ? 'Identité Kernel requise avant approbation' : undefined}
              className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
              Approuver l&apos;agence
            </button>
            <button onClick={() => setShowReject(true)} disabled={actionLoading}
              className="h-12 px-6 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl font-semibold flex items-center gap-2">
              <XCircle size={18} /> Rejeter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function KycDocumentRow({ label, mediaKey }: { label: string; mediaKey?: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openDocument = async () => {
    if (!mediaKey) return
    setError('')
    if (mediaKey.startsWith('http')) {
      window.open(mediaKey, '_blank', 'noopener,noreferrer')
      return
    }
    setLoading(true)
    try {
      const { url } = await mediaService.getDownloadUrl(mediaKey)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      setError(formatUserError(err, 'Impossible d\'ouvrir le document.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-2 border-b border-slate-800 last:border-0">
      <div className="flex items-center gap-3 text-sm">
        <FileText size={16} className="text-orange-500 flex-shrink-0" />
        <span className="flex-1">{label}</span>
        {mediaKey ? (
          <button
            type="button"
            onClick={openDocument}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 disabled:opacity-50"
          >
            {loading
              ? <Loader2 size={14} className="animate-spin" />
              : <ExternalLink size={14} />}
            Voir
          </button>
        ) : (
          <span className="text-slate-500 text-xs">Non fourni</span>
        )}
      </div>
      {mediaKey && (
        <p className="text-[10px] text-slate-600 font-mono mt-1 pl-7 truncate">
          {mediaService.isMediaId(mediaKey) ? `media:${mediaKey}` : mediaKey}
        </p>
      )}
      {error && <p className="text-xs text-red-400 mt-1 pl-7">{error}</p>}
    </div>
  )
}
