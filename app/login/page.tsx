'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2, Package, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { authService } from '@/lib/services/authService'
import { formatUserError } from '@/lib/errors'
import { useLoginWithMfa } from '@/lib/hooks/useLoginWithMfa'
import MfaChallengeForm from '@/components/auth/MfaChallengeForm'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { mfa, email, captureMfa, resetMfa } = useLoginWithMfa()

  const redirectAfterLogin = (agencyActive: boolean) => {
    window.location.href = agencyActive ? '/' : '/pending'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const session = await authService.login({ email: form.email, password: form.password })
      redirectAfterLogin(session.agencyActive)
    } catch (err) {
      if (!captureMfa(err, form.email)) {
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
      const session = await authService.confirmMfa(mfa.mfaToken, code, email || form.email)
      redirectAfterLogin(session.agencyActive)
    } catch (err) {
      setError(formatUserError(err, 'Code MFA invalide.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-orange-500 to-orange-600 flex-col justify-between p-12 flex-shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">TiiBnTick</p>
              <p className="text-orange-100 text-xs">Agency Platform</p>
            </div>
          </div>
          <div className="mt-16">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Gérez votre<br />agence de<br />livraison.
            </h1>
            <p className="text-orange-100 mt-4 text-sm leading-relaxed max-w-sm">
              Missions, livreurs, hubs relais, facturation — tout centralisé sur une seule plateforme.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">TiiBnTick Agency</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Connexion antenne</h2>
            <p className="text-sm text-gray-500 mt-1">Accédez à votre espace de gestion agence</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email professionnel <span className="text-orange-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="contact@votre-agence.cm"
                  className="w-full h-11 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Mot de passe <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPwd ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="w-full h-11 px-3 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Connexion...</> : 'Se connecter'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Pas encore d&apos;agence ?{' '}
              <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                Créer votre agence
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
