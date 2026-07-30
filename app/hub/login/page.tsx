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
        setError(formatUserError(err, 'Connexion impossible.'))
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
      <div className="hidden lg:flex lg:w-2/5 bg-slate-800 flex-col justify-between p-10">
        <Link href="/" className="text-white font-semibold">TiiBnTick Agency</Link>
        <div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">
            Espace<br />Gérant de Hub
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Validez les dépôts et retraits, suivez votre stock et affichez vos QR codes.
          </p>
        </div>
        <p className="text-slate-400 text-xs">Rôle AGENCY_HUB_OPERATOR</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Connexion hub</h2>
          {mfa ? (
            <MfaChallengeForm
              onSubmit={handleMfa}
              onCancel={resetMfa}
              loading={loading}
              error={error}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} className="mt-0.5" /> {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg disabled:opacity-60"
              >
                {loading ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
