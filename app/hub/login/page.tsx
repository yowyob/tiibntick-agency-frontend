'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { hubAuthService } from '@/lib/services/hubAuthService'
import { formatUserError } from '@/lib/errors'
import { useLoginWithMfa } from '@/lib/hooks/useLoginWithMfa'
import MfaChallengeForm from '@/components/auth/MfaChallengeForm'

export default function HubLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { mfa, email: mfaEmail, captureMfa, resetMfa } = useLoginWithMfa()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await hubAuthService.login(email, password)
      router.replace('/hub')
    } catch (err: unknown) {
      if (!captureMfa(err, email)) {
        setError(formatUserError(err, 'Connexion impossible. Vérifiez votre email et votre mot de passe.'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMfa = async (code: string) => {
    if (!mfa) return
    setError('')
    setLoading(true)
    try {
      await hubAuthService.confirmMfa(mfa.mfaToken, code, mfaEmail || email)
      router.replace('/hub')
    } catch (err) {
      setError(formatUserError(err, 'Code MFA invalide.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — orange brand */}
      <div className="hidden lg:flex lg:w-2/5 bg-orange-500 flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TA</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">TiiBnTick Agency</p>
              <p className="text-orange-100 text-xs">Portail Hub Relais</p>
            </div>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">
            Espace<br />Gérant de Hub
          </h1>
          <p className="text-orange-100 text-sm leading-relaxed">
            Validez les dépôts et retraits, suivez votre stock et affichez vos QR codes — depuis votre point relais.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-orange-200 text-xs text-center">
            Connectez-vous avec votre compte YowAuth0 (rôle gérant de hub).
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link
              href="/"
              className="mb-6 flex items-center gap-2 lg:hidden hover:opacity-90 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
                <span className="text-xs font-bold text-white">TA</span>
              </div>
              <span className="text-sm font-bold text-gray-900">TiiBnTick Agency</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-sm text-gray-500 mt-1">Accédez à votre espace hub relais</p>
          </div>

          {error && !mfa && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {mfa ? (
            <MfaChallengeForm
              channel={mfa.mfaChannel}
              codePreview={mfa.codePreview}
              loading={loading}
              onSubmit={handleMfa}
              onCancel={resetMfa}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="gerant.hub@agence.cm"
                    required
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-sm font-semibold rounded-lg"
              >
                {loading ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-gray-400">
            Pas un gérant de hub ?{' '}
            <Link href="/login" className="text-orange-500 hover:underline font-medium">
              Portail Agence
            </Link>
            {' · '}
            <Link href="/branch/login" className="text-orange-500 hover:underline font-medium">
              Antenne
            </Link>
            {' · '}
            <Link href="/" className="text-orange-500 hover:underline font-medium">
              Accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
