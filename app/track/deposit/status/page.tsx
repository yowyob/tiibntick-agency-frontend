'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Package, Loader2, Clock, CheckCircle2, XCircle, ArrowRight,
} from 'lucide-react'
import {
  intakeService,
  type IntakeStatusResult,
} from '@/lib/services/intakeService'

function StatusContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref') ?? ''
  const [status, setStatus] = useState<IntakeStatusResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    if (!ref) {
      setError('Référence manquante.')
      setLoading(false)
      return
    }
    intakeService.getStatus(ref)
      .then(setStatus)
      .catch(() => setError('Demande introuvable.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    if (!ref) return
    const interval = setInterval(() => {
      intakeService.getStatus(ref).then(setStatus).catch(() => undefined)
    }, 15000)
    return () => clearInterval(interval)
  }, [ref])


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <p className="font-bold text-gray-900 text-sm">Suivi de demande</p>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10 text-center space-y-6">
        {loading ? (
          <Loader2 size={32} className="animate-spin text-orange-400 mx-auto" />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : status?.status === 'SUBMITTED' ? (
          <>
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
              <Clock size={36} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Demande en cours de traitement</h1>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Votre demande a bien été reçue par{' '}
                <strong>{status.agencyName}</strong>
                {status.branchName && <> — antenne <strong>{status.branchName}</strong></>}.
                Un responsable va l&apos;examiner sous peu.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Référence</p>
              <p className="text-lg font-bold font-mono text-gray-900 mt-1">{status.referenceCode}</p>
            </div>
            <p className="text-xs text-gray-400">Cette page se met à jour automatiquement.</p>
          </>
        ) : status?.status === 'APPROVED' ? (
          <>
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Demande approuvée</h1>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Votre colis a été pris en charge par{' '}
                <strong>{status.agencyName}</strong>
                {status.branchName && <> — antenne <strong>{status.branchName}</strong></>}.
              </p>
            </div>
            {status.trackingCode && (
              <div className="bg-white border border-emerald-200 rounded-2xl px-6 py-5 shadow-sm">
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Code de suivi</p>
                <p className="text-xl font-bold font-mono text-gray-900 mt-1">{status.trackingCode}</p>
              </div>
            )}
            {status.trackingCode && (
              <Link
                href={`/track?code=${encodeURIComponent(status.trackingCode)}`}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Suivre mon colis <ArrowRight size={16} />
              </Link>
            )}
          </>
        ) : status?.status === 'REJECTED' ? (
          <>
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <XCircle size={36} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Demande non retenue</h1>
            <p className="text-sm text-gray-500 mt-2">{status.rejectionReason ?? 'Contactez l\'agence pour plus d\'informations.'}</p>
          </>
        ) : null}

        <Link href="/track" className="text-sm text-gray-400 hover:text-orange-600">Retour au suivi</Link>
      </main>
    </div>
  )
}

export default function DepositStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-400" /></div>}>
      <StatusContent />
    </Suspense>
  )
}
