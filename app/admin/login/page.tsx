'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2, Shield, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { authService } from '@/lib/services/authService'
import { adminLoginRateLimit } from '@/lib/admin/security'
import { formatUserError } from '@/lib/errors'
import { useLoginWithMfa } from '@/lib/hooks/useLoginWithMfa'
import MfaChallengeForm from '@/components/auth/MfaChallengeForm'

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { mfa, email, captureMfa, resetMfa } = useLoginWithMfa()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      adminLoginRateLimit()
      await authService.adminLogin(form)
      window.location.href = '/admin'
    } catch (err) {
      if (!captureMfa(err, form.email)) {
        setError(formatUserError(err, 'Connexion administrateur impossible.'))
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
      await authService.adminConfirmMfa(mfa.mfaToken, code, email || form.email)
      window.location.href = '/admin'
    } catch (err) {
      setError(formatUserError(err, 'Code MFA invalide.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">TiiBnTick Admin</p>
            <p className="text-slate-400 text-xs">Validation des inscriptions agence</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-300">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {mfa ? (
            <MfaChallengeForm
              channel={mfa.mfaChannel}
              codePreview={mfa.codePreview}
              loading={loading}
              variant="dark"
              onSubmit={handleMfa}
              onCancel={resetMfa}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email administrateur</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full h-11 px-3 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="w-full h-11 px-3 pr-10 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                Connexion admin
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          <Link href="/login" className="hover:text-slate-300">← Retour portail agence</Link>
        </p>
      </div>
    </div>
  )
}
