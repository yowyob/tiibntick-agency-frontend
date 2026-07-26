'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { DemoShell, useDemoPhases } from '@/components/guide/demos/DemoShell'

const PHASES = ['waiting', 'queue', 'approve', 'success'] as const
type Phase = (typeof PHASES)[number]

const PHASE_MS: Record<Phase, number> = {
  waiting: 2200,
  queue: 2400,
  approve: 2200,
  success: 2800,
}

const LABELS: Record<Phase, string> = {
  waiting: 'Le client attend sur son téléphone',
  queue: 'L’agent ouvre « Demandes en attente »',
  approve: 'L’agent approuve la demande',
  success: 'Le client reçoit le code de suivi',
}

function MiniPhone({ phase }: { phase: Phase }) {
  const approved = phase === 'success'
  return (
    <div className="relative mx-auto w-[100px] rounded-[1.2rem] border-[3px] border-slate-800 bg-slate-800 p-1 shadow-xl sm:w-[110px]">
      <div className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-slate-950" />
      <div className="flex h-[170px] flex-col items-center justify-center overflow-hidden rounded-[0.9rem] bg-white px-2 text-center sm:h-[185px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={approved ? 'ok' : 'wait'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {approved ? (
              <>
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm text-white">
                  ✓
                </div>
                <p className="mt-2 text-[10px] font-bold text-emerald-900">Approuvée</p>
                <p className="mt-1 rounded-md bg-slate-100 px-1.5 py-1 font-mono text-[9px] font-semibold text-slate-700">
                  TRK-4821
                </p>
                <p className="mt-1.5 text-[8px] text-slate-500">Suivre mon colis</p>
              </>
            ) : (
              <>
                <motion.div
                  className="mx-auto h-8 w-8 rounded-full border-2 border-orange-400 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="mt-2 text-[10px] font-bold text-slate-800">En traitement…</p>
                <p className="mt-1 text-[8px] leading-snug text-slate-500">
                  L’agence étudie votre demande
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function AgentDesk({ phase }: { phase: Phase }) {
  const highlight = phase === 'queue' || phase === 'approve'
  const pressing = phase === 'approve'

  return (
    <div className="relative w-[168px] rounded-xl border border-slate-300 bg-white p-2.5 shadow-md dark:border-slate-600 dark:bg-slate-800 sm:w-[190px]">
      <p className="text-[9px] font-bold uppercase tracking-wide text-orange-600">
        Accueil client
      </p>
      <p className="mt-0.5 text-[10px] font-semibold text-slate-800 dark:text-slate-100">
        Demandes en attente
      </p>

      <motion.div
        className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-600 dark:bg-slate-900/60"
        animate={{
          scale: highlight ? 1.02 : 1,
          boxShadow: highlight
            ? '0 0 0 2px rgba(249,115,22,0.35)'
            : '0 0 0 0 rgba(0,0,0,0)',
        }}
      >
        <p className="text-[10px] font-semibold text-slate-800 dark:text-slate-100">Jeff B.</p>
        <p className="text-[8px] text-slate-500">→ Cotonou · Domicile</p>
        <div className="mt-2 flex gap-1.5">
          <motion.div
            className="flex flex-1 items-center justify-center rounded-md bg-emerald-500 py-1 text-[9px] font-bold text-white"
            animate={pressing ? { scale: [1, 0.92, 1] } : { scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            Approuver
          </motion.div>
          <div className="flex flex-1 items-center justify-center rounded-md bg-slate-200 py-1 text-[9px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            Refuser
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === 'approve' && (
          <motion.div
            className="pointer-events-none absolute bottom-6 right-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, scale: [1, 0.9, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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
  )
}

/** Split-screen : client en attente ↔ agent qui approuve. */
export function AgentApproveDemo() {
  const demo = useDemoPhases(PHASES, PHASE_MS)

  return (
    <DemoShell
      title="Démo — validation par l’agent"
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
      stageClassName="flex h-[300px] max-w-lg items-center justify-center gap-4 sm:gap-8"
      reducedFallback="Le client attend sur son téléphone. L’agent ouvre les demandes en attente, clique Approuver, et le client reçoit son code de suivi."
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Client</p>
        <MiniPhone phase={demo.phase} />
      </div>

      <motion.div
        className="flex flex-col items-center gap-1"
        animate={{ opacity: demo.phase === 'success' ? 1 : 0.7 }}
      >
        <motion.div
          className="h-0.5 w-8 rounded bg-orange-400 sm:w-12"
          animate={{
            scaleX: demo.phase === 'success' ? [0.4, 1] : 1,
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="text-[9px] font-medium text-orange-600">
          {demo.phase === 'success' ? 'Code envoyé' : 'En attente'}
        </span>
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Agent</p>
        <AgentDesk phase={demo.phase} />
      </div>
    </DemoShell>
  )
}
