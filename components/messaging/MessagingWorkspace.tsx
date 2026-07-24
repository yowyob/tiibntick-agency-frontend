'use client'

import {
  Search,
  MessageSquare,
  Paperclip,
  Send,
  Megaphone,
  Building2,
  Package,
} from 'lucide-react'
import ComingSoonBadge from './ComingSoonBadge'
import { MESSAGING_COPY, type MessagingAudience } from './messagingCopy'

type Props = {
  audience: 'agency-admin' | 'branch'
  /** Dark shell (platform admin) — reserved if needed later */
  tone?: 'light' | 'dark'
}

export default function MessagingWorkspace({ audience, tone = 'light' }: Props) {
  const copy = MESSAGING_COPY[audience as MessagingAudience]
  const dark = tone === 'dark'

  const shell = dark
    ? 'bg-slate-950 text-slate-100'
    : 'bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100'
  const panel = dark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800'
  const muted = dark ? 'text-slate-400' : 'text-gray-500 dark:text-slate-400'
  const input = dark
    ? 'bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-600'
    : 'bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 placeholder:text-gray-400'

  return (
    <div className={`flex flex-col h-full min-h-[520px] ${shell}`}>
      <header className={`shrink-0 px-6 py-4 border-b ${panel.split(' ').slice(1).join(' ')} ${dark ? 'border-slate-800' : 'border-gray-200 dark:border-slate-800'}`}>
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold font-display">{copy.title}</h1>
              <ComingSoonBadge />
            </div>
            <p className={`text-sm mt-1 max-w-2xl ${muted}`}>{copy.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* Inbox — LinkedIn-style */}
        <aside className={`w-full lg:w-[340px] xl:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r flex flex-col ${panel} border-gray-200 dark:border-slate-800`}>
          <div className="p-3 border-b border-gray-100 dark:border-slate-800 space-y-3">
            <div className="relative">
              <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${muted}`} />
              <input
                type="search"
                disabled
                placeholder="Rechercher une conversation…"
                className={`w-full pl-9 pr-3 py-2 rounded-lg border text-sm cursor-not-allowed opacity-70 ${input}`}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {copy.filters.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  disabled
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium border cursor-not-allowed opacity-70 ${
                    i === 0
                      ? dark
                        ? 'bg-orange-500/15 text-orange-400 border-orange-500/30'
                        : 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30'
                      : dark
                        ? 'bg-slate-950 text-slate-400 border-slate-700'
                        : 'bg-white text-gray-500 border-gray-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                dark ? 'bg-slate-800' : 'bg-orange-50 dark:bg-orange-500/10'
              }`}
            >
              {audience === 'agency-admin' ? (
                <Building2 size={22} className="text-orange-500" />
              ) : (
                <Package size={22} className="text-orange-500" />
              )}
            </div>
            <p className="text-sm font-medium">Aucune conversation pour l’instant</p>
            <p className={`text-xs mt-1.5 max-w-[240px] ${muted}`}>{copy.listHint}</p>
          </div>
        </aside>

        {/* Thread pane */}
        <section className={`flex-1 min-w-0 flex flex-col ${panel}`}>
          <div className={`px-5 py-3 border-b flex items-center gap-3 ${dark ? 'border-slate-800' : 'border-gray-100 dark:border-slate-800'}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${dark ? 'bg-slate-800' : 'bg-gray-100 dark:bg-slate-800'}`}>
              <MessageSquare size={16} className={muted} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${muted}`}>Aucune conversation sélectionnée</p>
              <p className={`text-xs truncate ${muted}`}>{copy.threadHint}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-lg mx-auto text-center">
              <ComingSoonBadge className="mb-4" />
              <h2 className="text-base font-semibold mb-2">La messagerie arrive bientôt</h2>
              <p className={`text-sm mb-6 ${muted}`}>
                L’interface est prête. La connexion à l’API kernel (via /core) sera branchée dès que le backend chat sera disponible.
              </p>
              <ul className="text-left space-y-2">
                {copy.capabilities.map(item => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-sm rounded-lg px-3 py-2.5 border ${
                      dark
                        ? 'border-slate-800 bg-slate-950/50'
                        : 'border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-950/40'
                    }`}
                  >
                    {item.includes('Broadcast') || item.includes('Annonces') ? (
                      <Megaphone size={15} className="text-orange-500 mt-0.5 shrink-0" />
                    ) : (
                      <MessageSquare size={15} className="text-orange-500 mt-0.5 shrink-0" />
                    )}
                    <span className={muted}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`p-4 border-t ${dark ? 'border-slate-800' : 'border-gray-100 dark:border-slate-800'}`}>
            <div className="flex items-end gap-2">
              <button
                type="button"
                disabled
                title="Bientôt disponible"
                className={`p-2.5 rounded-lg border cursor-not-allowed opacity-50 ${dark ? 'border-slate-700' : 'border-gray-200 dark:border-slate-700'}`}
              >
                <Paperclip size={18} className={muted} />
              </button>
              <textarea
                disabled
                rows={1}
                placeholder="Écrire un message… (bientôt disponible)"
                className={`flex-1 resize-none rounded-xl border px-3 py-2.5 text-sm cursor-not-allowed opacity-70 ${input}`}
              />
              <button
                type="button"
                disabled
                className="p-2.5 rounded-lg bg-orange-500 text-white cursor-not-allowed opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
