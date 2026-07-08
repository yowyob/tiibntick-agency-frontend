'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { livreurAuthService } from '@/lib/services/livreurAuthService'
import { formatUserError } from '@/lib/errors'
import { useToast } from '@/contexts/ToastContext'
import { useLoginWithMfa } from '@/lib/hooks/useLoginWithMfa'
import MfaChallengeForm from '@/components/auth/MfaChallengeForm'

export default function LivreurLoginPage() {
  const router = useRouter()
  const { error: toastError } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { mfa, email: mfaEmail, captureMfa, resetMfa } = useLoginWithMfa()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    try {
      await livreurAuthService.login(email.trim(), password)
      router.replace('/livreur')
    } catch (err) {
      if (!captureMfa(err, email.trim())) {
        toastError(formatUserError(err, 'Connexion impossible. Vérifiez votre email et votre mot de passe.'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMfa = async (code: string) => {
    if (!mfa) return
    setLoading(true)
    try {
      await livreurAuthService.confirmMfa(mfa.mfaToken, code, mfaEmail || email.trim())
      router.replace('/livreur')
    } catch (err) {
      toastError(formatUserError(err, 'Code MFA invalide.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-orange-500">
      <div className="px-6 pt-14 pb-20 flex-shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Package size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white/60 tracking-widest uppercase">TiiBnTick Agency</p>
            <p className="text-base font-bold text-white leading-tight">Espace Livreur</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white leading-tight mb-2">
          Bonjour,<br />connectez-vous
        </h1>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl -mt-6 px-6 pt-8 pb-10">
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
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Adresse email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="prenom.nom@agence.cm"
                  autoComplete="email"
                  className="w-full h-13 pl-11 pr-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  className="w-full h-13 pl-11 pr-12 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full h-13 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 text-white text-sm font-bold rounded-xl flex items-center justify-center mt-2"
            >
              {loading
                ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : 'Se connecter'}
            </button>
          </form>
        )}
        <p className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
          Compte créé par votre agence (Personnel → Livreurs).
        </p>
      </div>
    </div>
  )
}
