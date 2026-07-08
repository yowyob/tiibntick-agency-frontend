'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Copy, Check, ExternalLink, Mail } from 'lucide-react'
import { AGENCY_FRONTEND_URL, WHATSAPP_BASE_URL } from '@/lib/config'
import { useToast } from '@/contexts/ToastContext'

export default function LivreurAccessPanel() {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const { success: toastSuccess } = useToast()

  useEffect(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : AGENCY_FRONTEND_URL
    setUrl(`${base}/livreur/login`)
  }, [])

  const handleCopy = async () => {
    if (!url) return
    await navigator.clipboard.writeText(url)
    toastSuccess('Lien copié dans le presse-papiers.')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappText = encodeURIComponent(
    `Bonjour ! Voici votre lien pour accéder à votre espace livreur TiiBnTick Agency :\n${url}\n\nConnectez-vous avec votre numéro de téléphone.`
  )

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 mb-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
          <Smartphone size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Accès Espace Livreur</p>
          <p className="text-xs text-gray-500">Partagez ce lien avec vos livreurs pour qu'ils se connectent</p>
        </div>
      </div>

      {/* URL row */}
      <div className="flex items-center gap-2 bg-white border border-orange-200 rounded-lg px-3 py-2 mb-3">
        <p className="flex-1 text-xs font-mono text-gray-600 truncate">{url || '...'}</p>
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={handleCopy}
            title="Copier le lien"
            className="p-1.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
          >
            {copied
              ? <Check size={14} className="text-emerald-500" />
              : <Copy size={14} />
            }
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ouvrir la page livreur"
            className="p-1.5 rounded-md text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`${WHATSAPP_BASE_URL}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#25D366' }}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent('Accès Espace Livreur TiiBnTick Agency')}&body=${encodeURIComponent(`Bonjour,\n\nVoici votre lien pour accéder à votre espace livreur TiiBnTick Agency :\n${url}\n\nConnectez-vous avec votre numéro de téléphone et votre mot de passe.\n\nCordialement,\nRapid Express Douala`)}`}
          className="flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-colors"
        >
          <Mail size={13} />
          Email
        </a>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
