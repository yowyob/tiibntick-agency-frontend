'use client'

import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { DemoShell, useDemoPhases } from '@/components/guide/demos/DemoShell'

const PHASES = [
  'deposit',
  'approve',
  'dispatch',
  'transit',
  'deliver',
  'done',
] as const
type Phase = (typeof PHASES)[number]

const PHASE_MS: Record<Phase, number> = {
  deposit: 2400,
  approve: 2200,
  dispatch: 2200,
  transit: 2600,
  deliver: 2400,
  done: 2800,
}

const LABELS: Record<Phase, string> = {
  deposit: '1 · Le client dépose (QR / formulaire)',
  approve: '2 · L’agent valide → mission créée',
  dispatch: '3 · Un livreur est assigné',
  transit: '4 · Le colis est en route',
  deliver: '5 · Livraison ou dépôt au hub',
  done: '6 · Facturation & commission',
}

const NODES: { id: Phase; title: string; who: string }[] = [
  { id: 'deposit', title: 'Dépôt', who: 'Client' },
  { id: 'approve', title: 'Validation', who: 'Agent' },
  { id: 'dispatch', title: 'Dispatch', who: 'HQ' },
  { id: 'transit', title: 'Transit', who: 'Livreur' },
  { id: 'deliver', title: 'Livraison', who: 'Terrain' },
  { id: 'done', title: 'Finance', who: 'Agence' },
]

function phaseIndex(phase: Phase): number {
  return PHASES.indexOf(phase)
}

function SceneIcon({ phase }: { phase: Phase }) {
  switch (phase) {
    case 'deposit':
      return (
        <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
          <rect x="4" y="8" width="28" height="28" rx="4" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <rect x="8" y="12" width="8" height="8" fill="#ea580c" />
          <rect x="20" y="12" width="8" height="8" fill="#ea580c" />
          <rect x="8" y="24" width="8" height="8" fill="#ea580c" />
          <rect x="44" y="6" width="26" height="44" rx="5" fill="#1e293b" />
          <rect x="47" y="10" width="20" height="34" rx="2" fill="#f8fafc" />
          <path d="M52 52c6-10 14-10 18 0" fill="#f0b27a" stroke="#c47a45" strokeWidth="1" />
        </svg>
      )
    case 'approve':
      return (
        <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
          <rect x="10" y="8" width="50" height="36" rx="4" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <rect x="16" y="14" width="28" height="6" rx="2" fill="#e2e8f0" />
          <rect x="16" y="24" width="20" height="10" rx="2" fill="#22c55e" />
          <circle cx="58" cy="48" r="10" fill="#22c55e" />
          <path d="M53 48l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'dispatch':
      return (
        <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
          <circle cx="28" cy="30" r="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
          <circle cx="52" cy="30" r="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <path d="M36 30h8" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="28" cy="30" r="3" fill="#9a3412" />
          <circle cx="52" cy="30" r="3" fill="#075985" />
        </svg>
      )
    case 'transit':
      return (
        <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
          <path d="M8 40h40l8-12h12v20H8z" fill="#f97316" />
          <circle cx="22" cy="50" r="5" fill="#1e293b" />
          <circle cx="54" cy="50" r="5" fill="#1e293b" />
          <motion.rect
            x="4"
            y="28"
            width="10"
            height="8"
            rx="1"
            fill="#cbd5e1"
            animate={{ x: [4, 20, 4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      )
    case 'deliver':
      return (
        <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
          <rect x="28" y="12" width="24" height="30" rx="3" fill="#fff" stroke="#64748b" strokeWidth="2" />
          <path d="M28 22h24" stroke="#64748b" strokeWidth="2" />
          <circle cx="40" cy="36" r="4" fill="#22c55e" />
          <path d="M18 48c6-10 16-14 24-8" fill="none" stroke="#f0b27a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
          <rect x="18" y="10" width="44" height="36" rx="4" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <path d="M26 28h12M26 36h20" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          <circle cx="52" cy="24" r="7" fill="#fbbf24" />
          <path d="M52 20v8M49 24h6" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
  }
}

/** Vue d’ensemble illustrée du parcours colis de bout en bout. */
export function WorkflowOverviewDemo() {
  const demo = useDemoPhases(PHASES, PHASE_MS)
  const idx = phaseIndex(demo.phase)

  return (
    <DemoShell
      title="Démo — workflow complet"
      label={LABELS[demo.phase]}
      playing={demo.playing}
      onTogglePlay={() => demo.setPlaying(p => !p)}
      onRestart={demo.restart}
      phases={PHASES}
      phaseIndex={demo.phaseIndex}
      phaseLabels={LABELS}
      onSelectPhase={i => {
        demo.setPhaseIndex(i)
        demo.setPlaying(false)
      }}
      stageClassName="flex h-[360px] max-w-xl flex-col items-center justify-center gap-5 py-4"
      reducedFallback="Parcours complet : dépôt client → validation agent → dispatch livreur → transit → livraison / hub → facturation et commission."
    >
      {/* Pipeline */}
      <div className="flex w-full items-start justify-between gap-1 px-1 sm:px-2">
        {NODES.map((node, i) => {
          const done = i < idx
          const current = i === idx
          return (
            <div key={node.id} className="relative flex min-w-0 flex-1 flex-col items-center">
              {i < NODES.length - 1 && (
                <div className="absolute left-[55%] top-3.5 h-0.5 w-[90%] bg-slate-200 dark:bg-slate-700">
                  <motion.div
                    className="h-full origin-left bg-orange-500"
                    initial={false}
                    animate={{ scaleX: i < idx ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
              <motion.div
                className={clsx(
                  'relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold',
                  done || current
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
                )}
                animate={current ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 1.1, repeat: current ? Infinity : 0 }}
              >
                {done ? '✓' : i + 1}
              </motion.div>
              <p
                className={clsx(
                  'mt-1.5 max-w-[4.5rem] text-center text-[9px] leading-tight',
                  current
                    ? 'font-bold text-orange-700 dark:text-orange-300'
                    : 'font-medium text-slate-600 dark:text-slate-400',
                )}
              >
                {node.title}
              </p>
              <p className="text-[8px] text-slate-400">{node.who}</p>
            </div>
          )
        })}
      </div>

      {/* Spotlight card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={demo.phase}
          className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm dark:border-slate-600 dark:bg-slate-800/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
        >
          <SceneIcon phase={demo.phase} />
          <p className="mt-2 text-center text-sm font-semibold text-slate-900 dark:text-white">
            {NODES[idx]?.title}
          </p>
          <p className="mt-1 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {LABELS[demo.phase].replace(/^\d\s·\s/, '')}
          </p>
        </motion.div>
      </AnimatePresence>
    </DemoShell>
  )
}
