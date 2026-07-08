'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface MfaChallengeFormProps {
  channel?: string
  codePreview?: string | null
  loading?: boolean
  variant?: 'light' | 'dark'
  onSubmit: (code: string) => void
  onCancel?: () => void
}

export default function MfaChallengeForm({
  channel,
  codePreview,
  loading,
  variant = 'light',
  onSubmit,
  onCancel,
}: MfaChallengeFormProps) {
  const [code, setCode] = useState('')
  const dark = variant === 'dark'

  return (
    <div className="space-y-4">
      <div>
        <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
          Vérification en deux étapes
        </p>
        <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>
          Saisissez le code reçu par {channel?.toLowerCase() ?? 'email ou SMS'}.
        </p>
        {codePreview && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-2">
            Mode dev — code : <strong>{codePreview}</strong>
          </p>
        )}
      </div>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Code à 6 chiffres"
        className={`w-full h-11 px-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
          dark
            ? 'bg-slate-950 border-slate-700 text-white'
            : 'border-gray-200'
        }`}
      />
      <div className="flex gap-3">
        <button
          type="button"
          disabled={loading || code.trim().length < 4}
          onClick={() => onSubmit(code.trim())}
          className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          Valider le code
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`px-4 text-sm ${dark ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Retour
          </button>
        )}
      </div>
    </div>
  )
}
