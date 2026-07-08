'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { branchAuthService } from '@/lib/services/branchAuthService'
import { formatUserError } from '@/lib/errors'
import { useLoginWithMfa } from '@/lib/hooks/useLoginWithMfa'
import MfaChallengeForm from '@/components/auth/MfaChallengeForm'

export default function BranchLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { mfa, email: mfaEmail, captureMfa, resetMfa } = useLoginWithMfa()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await branchAuthService.login(email, password)
      router.replace('/branch')
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
      await branchAuthService.confirmMfa(mfa.mfaToken, code, mfaEmail || email)
      router.replace('/branch')
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
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TA</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">TiiBnTick Agency</p>
            <p className="text-orange-100 text-xs">Rapid Express Douala</p>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">
            Espace<br />Responsable d'Antenne
          </h1>
          <p className="text-orange-100 text-sm leading-relaxed">
            Gérez votre antenne, suivez vos missions, votre personnel et votre flotte — en toute autonomie.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-orange-200 text-xs text-center">
            Connectez-vous avec votre compte YowAuth0 (rôle BRANCH_MANAGER).
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-sm text-gray-500 mt-1">Accédez à votre espace antenne</p>
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
                  placeholder="prenom.nom@rapidexpress.cm"
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
            Pas un responsable d'antenne ?{' '}
            <a href="/login" className="text-orange-500 hover:underline font-medium">
              Portail Agence
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
