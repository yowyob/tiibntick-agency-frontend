'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Clock, XCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { authService } from '@/lib/services/authService'
import { registerService } from '@/lib/services/registerService'
import { formatUserError } from '@/lib/errors'

function PendingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rejected = searchParams.get('rejected') === '1'
  const [email, setEmail] = useState('')
  const [ready, setReady] = useState(false)
  const [kernelIdentityReady, setKernelIdentityReady] = useState(true)
  const [identityRetrying, setIdentityRetrying] = useState(false)
  const [identityError, setIdentityError] = useState('')

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.replace('/login?from=/pending')
      return
    }
    setEmail(localStorage.getItem('tnt-user-email') ?? '')
    registerService.getMyApplication()
      .then(status => setKernelIdentityReady(status.kernelIdentityReady))
      .catch(() => setKernelIdentityReady(registerService.isKernelIdentityReady()))
    authService.refreshSession()
      .then(session => {
        if (session?.agencyActive) router.replace('/dashboard')
      })
      .catch(() => undefined)
      .finally(() => setReady(true))
  }, [router])

  const retryKernelIdentity = async () => {
    const agencyId = localStorage.getItem('tnt-agency-id')
    if (!agencyId) return
    setIdentityRetrying(true)
    setIdentityError('')
    try {
      const result = await registerService.completeKernelIdentity(agencyId)
      setKernelIdentityReady(result.readyForAdminApproval)
    } catch (err) {
      setIdentityError(formatUserError(
        err,
        'Impossible de finaliser la vérification d\'identité. Réessayez dans quelques instants.',
      ))
    } finally {
      setIdentityRetrying(false)
    }
  }

  if (!ready && !rejected && authService.getAgencyStatus() !== 'REJECTED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    )
  }

  if (rejected || authService.getAgencyStatus() === 'REJECTED') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Demande refusée</h1>
          <p className="text-gray-500 mt-3 leading-relaxed">
            Votre demande d&apos;inscription n&apos;a pas été approuvée. Contactez
            l&apos;équipe TiiBnTick pour plus d&apos;informations.
          </p>
          <button
            onClick={() => authService.logout()}
            className="mt-8 text-sm text-gray-500 hover:text-gray-700"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-lg w-full">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5">
            <Clock size={32} className="text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Validation en cours</h1>
          <p className="text-gray-500 mt-3 leading-relaxed">
            Votre compte est actif mais votre agence est en attente de validation par
            l&apos;équipe TiiBnTick. Vous recevrez un email sur{' '}
            <strong>{email || 'votre adresse'}</strong> dès l&apos;activation.
          </p>
          <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-4 text-left text-sm text-orange-800 space-y-2">
            <p className="font-semibold">Accès limité</p>
            <p>Tant que votre agence n&apos;est pas <strong>ACTIVE</strong>, le tableau de bord et les opérations restent indisponibles.</p>
          </div>
          {!kernelIdentityReady && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-sm text-amber-900 space-y-3">
              <p className="font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
                Vérification d&apos;identité requise
              </p>
              <p className="text-amber-800 leading-relaxed">
                Finalisez la liaison avec la plateforme d&apos;identité pour que votre dossier puisse être validé par l&apos;équipe.
              </p>
              {identityError && <p className="text-red-600 text-xs">{identityError}</p>}
              <button
                onClick={retryKernelIdentity}
                disabled={identityRetrying}
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 disabled:opacity-60 px-4 py-2 rounded-lg transition-colors"
              >
                {identityRetrying
                  ? <><Loader2 size={14} className="animate-spin" /> Vérification en cours…</>
                  : <><RefreshCw size={14} /> Finaliser la vérification</>}
              </button>
            </div>
          )}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Loader2 size={14} className="animate-spin" />
            Vérification du statut…
          </div>
          <button
            onClick={() => authService.refreshSession().then(s => {
              if (s?.agencyActive) window.location.href = '/dashboard'
            })}
            className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Actualiser le statut
          </button>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button onClick={() => authService.logout()} className="text-xs text-gray-400 hover:text-gray-600">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    }>
      <PendingPageContent />
    </Suspense>
  )
}
