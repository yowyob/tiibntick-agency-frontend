'use client'

import { MessageSquare, Paperclip, Send, Megaphone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ComingSoonBadge from './ComingSoonBadge'
import { MESSAGING_COPY, type MessagingAudience } from './messagingCopy'

type Props = {
  audience: 'livreur' | 'client'
  backHref?: string
  backLabel?: string
}

export default function MessagingSimple({ audience, backHref, backLabel }: Props) {
  const copy = MESSAGING_COPY[audience as MessagingAudience]
  const isLivreur = audience === 'livreur'

  return (
    <div className={`flex flex-col ${isLivreur ? 'min-h-screen pb-24' : 'min-h-[70vh]'}`}>
      <header className="px-5 pt-8 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-orange-600 mb-3"
          >
            <ArrowLeft size={14} />
            {backLabel ?? 'Retour'}
          </Link>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl font-bold text-gray-900">{copy.title}</h1>
          <ComingSoonBadge />
        </div>
        <p className="text-sm text-gray-500 mt-1">{copy.subtitle}</p>
      </header>

      <div className="px-5 py-3 flex gap-1.5 overflow-x-auto bg-white border-b border-gray-100">
        {copy.filters.map((f, i) => (
          <button
            key={f}
            type="button"
            disabled
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border cursor-not-allowed opacity-70 ${
              i === 0
                ? 'bg-orange-50 text-orange-600 border-orange-200'
                : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 px-5 py-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
          <MessageSquare size={26} className="text-orange-500" />
        </div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">Bientôt disponible</h2>
        <p className="text-sm text-gray-500 max-w-sm mb-6">{copy.listHint}</p>

        <ul className="w-full max-w-sm text-left space-y-2 mb-8">
          {copy.capabilities.map(item => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm rounded-xl px-3 py-2.5 border border-gray-100 bg-white"
            >
              {item.toLowerCase().includes('annonce') ? (
                <Megaphone size={15} className="text-orange-500 mt-0.5 shrink-0" />
              ) : (
                <MessageSquare size={15} className="text-orange-500 mt-0.5 shrink-0" />
              )}
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 pb-4 bg-white border-t border-gray-100 sticky bottom-0">
        <div className="flex items-end gap-2 max-w-md mx-auto">
          <button
            type="button"
            disabled
            className="p-2.5 rounded-xl border border-gray-200 cursor-not-allowed opacity-50"
          >
            <Paperclip size={18} className="text-gray-400" />
          </button>
          <input
            type="text"
            disabled
            placeholder="Écrire un message… (bientôt)"
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm cursor-not-allowed opacity-70"
          />
          <button
            type="button"
            disabled
            className="p-2.5 rounded-xl bg-orange-500 text-white cursor-not-allowed opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
