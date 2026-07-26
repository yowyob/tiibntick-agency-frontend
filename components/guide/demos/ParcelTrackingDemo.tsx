'use client'

import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { DemoShell, useDemoPhases } from '@/components/guide/demos/DemoShell'

const PHASES = ['open', 'type', 'search', 'timeline'] as const
type Phase = (typeof PHASES)[number]

const PHASE_MS: Record<Phase, number> = {
  open: 1800,
  type: 2400,
  search: 1600,
  timeline: 4200,
}

const LABELS: Record<Phase, string> = {
  open: 'Le client ouvre le suivi public',
  type: 'Il saisit le code de suivi',
  search: 'Recherche du colis…',
  timeline: 'La fiche et le parcours s’affichent',
}

const STEPS = [
  { id: 'created', label: 'Créé' },
  { id: 'transit', label: 'En transit' },
  { id: 'hub', label: 'Au hub' },
  { id: 'done', label: 'Livré' },
] as const

function TypewriterText({
  text,
  mode,
}: {
  text: string
  mode: 'placeholder' | 'typing' | 'full'
}) {
  if (mode === 'placeholder') {
    return <span className="text-slate-300">TRK-…</span>
  }
  if (mode === 'full') {
    return <span>{text}</span>
  }
  return (
    <span className="inline-flex items-center">
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.22, duration: 0.05 }}
        >
          {ch}
        </motion.span>
      ))}
      <motion.span
        className="ml-0.5 inline-block h-3 w-0.5 bg-orange-500"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  )
}

/** Client tape son code et voit la timeline. */
export function ParcelTrackingDemo() {
  const demo = useDemoPhases(PHASES, PHASE_MS)
  const currentStep = demo.phase === 'timeline' ? 2 : -1
  const showCard = demo.phase === 'timeline'

  const typeMode =
    demo.phase === 'open'
      ? 'placeholder'
      : demo.phase === 'type'
        ? 'typing'
        : 'full'

  return (
    <DemoShell
      title="Démo — suivi du colis"
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
      stageClassName="flex h-[340px] max-w-md items-center justify-center"
      reducedFallback="Le client ouvre le suivi, saisit son code (ex. TRK-4821), puis voit le statut et la timeline du colis."
    >
      <div className="relative w-[150px] rounded-[1.35rem] border-[3px] border-slate-800 bg-slate-800 p-1.5 shadow-xl">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-slate-950" />
        <div className="relative h-[280px] overflow-hidden rounded-[1rem] bg-[#f8fafc]">
          <div className="border-b border-slate-200 px-3 py-2.5">
            <p className="text-[11px] font-bold text-slate-800">Suivre mon colis</p>
          </div>

          <div className="px-3 pt-3">
            <p className="mb-1 text-[8px] font-medium text-slate-500">Code de suivi</p>
            <div className="flex h-7 items-center rounded-md border border-slate-200 bg-white px-2">
              <span className="font-mono text-[10px] font-semibold text-slate-700">
                <TypewriterText
                  key={`${demo.cycle}-${demo.phase === 'type'}`}
                  text="TRK-4821"
                  mode={typeMode}
                />
              </span>
            </div>

            <motion.div
              className="mt-2 flex h-7 items-center justify-center rounded-md bg-orange-500 text-[10px] font-semibold text-white"
              animate={
                demo.phase === 'search'
                  ? { scale: [1, 0.95, 1], opacity: [1, 0.8, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5 }}
            >
              {demo.phase === 'search' ? 'Recherche…' : 'Rechercher'}
            </motion.div>
          </div>

          <AnimatePresence>
            {showCard && (
              <motion.div
                className="absolute inset-x-2 bottom-2 top-[7.5rem] overflow-hidden rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-800">TRK-4821</p>
                  <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[8px] font-semibold text-sky-800">
                    Au hub
                  </span>
                </div>
                <p className="mt-0.5 text-[8px] text-slate-500">→ Cotonou · Point relais</p>

                <div className="mt-3 space-y-2">
                  {STEPS.map((s, i) => {
                    const done = i < currentStep
                    const current = i === currentStep
                    return (
                      <div key={s.id} className="flex items-center gap-2">
                        <motion.div
                          className={clsx(
                            'flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold',
                            done || current
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-200 text-slate-400',
                          )}
                          animate={current ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                          transition={{ duration: 1, repeat: current ? Infinity : 0 }}
                        >
                          {done ? '✓' : i + 1}
                        </motion.div>
                        <span
                          className={clsx(
                            'text-[9px]',
                            done || current
                              ? 'font-semibold text-slate-800'
                              : 'text-slate-400',
                          )}
                        >
                          {s.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {demo.phase === 'search' && (
              <motion.div
                className="pointer-events-none absolute bottom-[11.5rem] right-4"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, scale: [1, 0.88, 1] }}
                exit={{ opacity: 0 }}
              >
                <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden>
                  <path
                    d="M10 18c0-5 2-11 4-11s4 6 4 11v6c0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3v-6z"
                    fill="#f0b27a"
                    stroke="#c47a45"
                    strokeWidth="1"
                  />
                  <circle cx="14" cy="9" r="3.5" fill="#f0b27a" stroke="#c47a45" strokeWidth="1" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoShell>
  )
}
