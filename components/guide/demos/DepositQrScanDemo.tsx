'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { Pause, Play, RotateCcw } from 'lucide-react'
import clsx from 'clsx'

type Phase = 'approach' | 'scan' | 'form' | 'send' | 'done'

const PHASES: Phase[] = ['approach', 'scan', 'form', 'send', 'done']

const PHASE_MS: Record<Phase, number> = {
  approach: 2000,
  scan: 3600,
  form: 4200,
  send: 1800,
  done: 2800,
}

const LABELS: Record<Phase, string> = {
  approach: 'Le client approche le téléphone du QR',
  scan: 'Le téléphone scanne le QR au-dessus de l’affiche',
  form: 'Saisie des infos sur le téléphone',
  send: 'Envoi de la demande',
  done: 'Demande en attente de l’agent',
}

function QrGlyph({
  active,
  className,
}: {
  active?: boolean
  className?: string
}) {
  return (
    <svg viewBox="0 0 64 64" className={clsx('h-full w-full', className)} aria-hidden>
      <rect width="64" height="64" rx="6" fill="#fff" />
      <g fill={active ? '#ea580c' : '#1e293b'}>
        <rect x="6" y="6" width="18" height="18" rx="2" />
        <rect x="10" y="10" width="10" height="10" rx="1" fill="#fff" />
        <rect x="13" y="13" width="4" height="4" />
        <rect x="40" y="6" width="18" height="18" rx="2" />
        <rect x="44" y="10" width="10" height="10" rx="1" fill="#fff" />
        <rect x="47" y="13" width="4" height="4" />
        <rect x="6" y="40" width="18" height="18" rx="2" />
        <rect x="10" y="44" width="10" height="10" rx="1" fill="#fff" />
        <rect x="13" y="47" width="4" height="4" />
        <rect x="28" y="6" width="4" height="4" />
        <rect x="34" y="12" width="4" height="4" />
        <rect x="28" y="18" width="4" height="4" />
        <rect x="40" y="28" width="4" height="4" />
        <rect x="48" y="34" width="4" height="4" />
        <rect x="28" y="28" width="8" height="8" />
        <rect x="40" y="40" width="4" height="4" />
        <rect x="48" y="48" width="4" height="4" />
        <rect x="56" y="40" width="4" height="4" />
        <rect x="40" y="56" width="4" height="4" />
        <rect x="28" y="48" width="4" height="8" />
        <rect x="34" y="40" width="4" height="4" />
      </g>
    </svg>
  )
}

function ViewfinderCorners() {
  const corners = [
    'M 10 28 L 10 10 L 28 10',
    'M 72 10 L 90 10 L 90 28',
    'M 90 72 L 90 90 L 72 90',
    'M 28 90 L 10 90 L 10 72',
  ]
  return (
    <motion.svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      aria-hidden
      animate={{ scale: [1, 0.94, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
    >
      {corners.map(d => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#fb923c"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </motion.svg>
  )
}

function PhoneScreen({ phase }: { phase: Phase }) {
  if (phase === 'approach') {
    return (
      <div className="relative flex h-full flex-col items-center justify-center bg-slate-900 px-3">
        <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-900" />
          <div className="absolute inset-4 rounded-lg border border-dashed border-white/35" />
          <p className="absolute inset-0 flex items-center justify-center text-[9px] text-white/50">
            Caméra
          </p>
        </div>
        <p className="mt-3 text-center text-[10px] font-medium text-white/80">
          Pointer vers le QR…
        </p>
      </div>
    )
  }

  if (phase === 'scan') {
    return (
      <div className="relative flex h-full flex-col items-center justify-center bg-slate-950 px-2 pt-3">
        <div className="relative h-[7.5rem] w-[7.5rem] overflow-hidden rounded-2xl border-2 border-orange-400/80 shadow-[0_0_20px_rgba(251,146,60,0.35)]">
          {/* QR seen through camera */}
          <div className="absolute inset-0 flex items-center justify-center bg-white p-3">
            <motion.div
              className="h-full w-full"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <QrGlyph active />
            </motion.div>
          </div>
          <ViewfinderCorners />
          <motion.div
            className="absolute left-2 right-2 z-10 h-0.5 bg-orange-400 shadow-[0_0_14px_#fb923c]"
            initial={{ top: '10%' }}
            animate={{ top: ['10%', '88%', '10%'] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: 'linear' }}
          />
          {/* Lock flash near end of scan — timed via parent duration; show mid-late via delay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-emerald-500/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1, 1] }}
            transition={{ duration: 3.4, times: [0, 0.55, 0.7, 0.78, 1] }}
          >
            <motion.span
              className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white shadow"
              initial={{ scale: 0.6 }}
              animate={{ scale: [0.6, 0.6, 1.05, 1] }}
              transition={{ duration: 3.4, times: [0, 0.7, 0.82, 1] }}
            >
              QR scanné ✓
            </motion.span>
          </motion.div>
        </div>
        <p className="mt-2.5 text-center text-[10px] font-semibold text-orange-300">
          Lecture du code…
        </p>
      </div>
    )
  }

  if (phase === 'form' || phase === 'send') {
    return (
      <div className="flex h-full flex-col bg-[#f8fafc] px-3 pt-4">
        <p className="text-[11px] font-bold text-slate-800">Demande d’expédition</p>
        <p className="mt-0.5 text-[9px] text-slate-500">Formulaire client</p>
        <div className="mt-3 space-y-2">
          {[
            { label: 'Votre nom', delay: 0.2 },
            { label: 'Destinataire', delay: 0.9 },
            { label: 'Adresse', delay: 1.6 },
          ].map(field => (
            <div key={field.label}>
              <p className="mb-0.5 text-[8px] font-medium text-slate-500">{field.label}</p>
              <div className="h-5 overflow-hidden rounded-md border border-slate-200 bg-white px-1.5">
                <motion.div
                  className="h-full w-[70%] rounded-sm bg-slate-200/90"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: field.delay, duration: 0.55, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
        <motion.div
          className={clsx(
            'mt-auto mb-3 flex h-8 items-center justify-center rounded-lg text-[10px] font-semibold text-white',
            phase === 'send' ? 'bg-orange-600' : 'bg-orange-500',
          )}
          animate={
            phase === 'send'
              ? { scale: [1, 0.94, 1], opacity: [1, 0.85, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.45 }}
        >
          {phase === 'send' ? 'Envoi…' : 'Envoyer ma demande'}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-emerald-50 px-4 text-center">
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl text-white"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      >
        ✓
      </motion.div>
      <p className="mt-3 text-[11px] font-bold text-emerald-900">Demande envoyée</p>
      <p className="mt-1 text-[9px] leading-snug text-emerald-800/80">
        En cours de traitement par l’agence
      </p>
    </div>
  )
}

function FingerTap({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none absolute bottom-10 right-3 z-20"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: [1, 0.88, 1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, scale: { repeat: 1, duration: 0.4 } }}
        >
          <svg width="36" height="40" viewBox="0 0 36 40" aria-hidden>
            <ellipse cx="18" cy="36" rx="8" ry="3" fill="rgba(15,23,42,0.12)" />
            <path
              d="M14 22c0-6 2.5-14 5-14s5 8 5 14v8c0 2.2-1.8 4-4 4h-2c-2.2 0-4-1.8-4-4v-8z"
              fill="#f0b27a"
              stroke="#c47a45"
              strokeWidth="1"
            />
            <circle cx="19" cy="12" r="4.5" fill="#f0b27a" stroke="#c47a45" strokeWidth="1" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function HandSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 220" aria-hidden>
      <ellipse cx="118" cy="200" rx="46" ry="14" fill="rgba(15,23,42,0.08)" />
      <path
        d="M70 210c8-42 28-70 55-78 18-5 38 2 48 18 6 10 8 24 4 38-12 18-38 28-62 30-22 2-40-2-45-8z"
        fill="#f0b27a"
        stroke="#c47a45"
        strokeWidth="1.5"
      />
      <path
        d="M128 128c18-22 38-20 44-8 4 8-2 22-14 30-10 6-22 4-30-4"
        fill="#f0b27a"
        stroke="#c47a45"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/** Démo illustrative : scan QR → formulaire → envoi (parcours client smartphone). */
export function DepositQrScanDemo() {
  const reduceMotion = useReducedMotion()
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [cycle, setCycle] = useState(0)

  const phase = PHASES[phaseIndex] ?? 'approach'
  const isScanning = phase === 'approach' || phase === 'scan'

  const restart = useCallback(() => {
    setPhaseIndex(0)
    setCycle(c => c + 1)
    setPlaying(true)
  }, [])

  useEffect(() => {
    if (reduceMotion || !playing) return
    const ms = PHASE_MS[phase]
    const t = window.setTimeout(() => {
      setPhaseIndex(i => {
        if (i >= PHASES.length - 1) return 0
        return i + 1
      })
    }, ms)
    return () => window.clearTimeout(t)
  }, [phase, playing, reduceMotion, cycle])

  /** Phone stays near center; approaches QR from the right, then hovers above it. */
  const phonePose = useMemo(() => {
    if (reduceMotion) {
      return { x: 0, y: 0, rotate: -6, scale: 1 }
    }
    switch (phase) {
      case 'approach':
        return { x: 36, y: 10, rotate: -12, scale: 0.9 }
      case 'scan':
        return { x: -42, y: -52, rotate: -6, scale: 0.86 }
      default:
        return { x: 28, y: 4, rotate: -5, scale: 0.95 }
    }
  }, [phase, reduceMotion])

  if (reduceMotion) {
    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-orange-50 p-5 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <figcaption className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
          Démo — du scan à l’envoi
        </figcaption>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Le client place son téléphone au-dessus du QR à l’accueil, le scanne, remplit
          le formulaire, puis envoie la demande. L’agent la retrouve dans « Demandes en
          attente ».
        </p>
      </figure>
    )
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-orange-50 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700">
        <div>
          <figcaption className="text-sm font-semibold text-slate-900 dark:text-white">
            Démo — du scan à l’envoi
          </figcaption>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
            {LABELS[phase]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying(p => !p)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? 'Pause' : 'Lecture'}
          </button>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Rejouer
          </button>
        </div>
      </div>

      {/* Stage: QR fixed; phone overlays it during scan */}
      <div className="relative mx-auto h-[380px] max-w-md overflow-hidden px-4 sm:h-[400px]">
        <div className="pointer-events-none absolute inset-x-10 bottom-6 h-10 rounded-[100%] bg-slate-900/5 blur-md dark:bg-black/30" />

        {/* QR board — slightly left of center */}
        <motion.div
          className="absolute bottom-14 left-[22%] z-10 w-[120px] sm:left-[24%] sm:w-[132px]"
          animate={{
            scale: phase === 'scan' ? 1.03 : 1,
            filter:
              phase === 'scan'
                ? 'drop-shadow(0 0 16px rgba(234,88,12,0.45))'
                : 'drop-shadow(0 8px 16px rgba(15,23,42,0.08))',
          }}
          transition={{ duration: 0.45 }}
        >
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-3 shadow-md dark:border-slate-600 dark:bg-slate-800">
            <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-wide text-orange-600">
              Accueil
            </p>
            <div className="relative aspect-square w-full">
              <QrGlyph active={phase === 'scan'} />
              {/* Scan beam hitting the physical QR */}
              <AnimatePresence>
                {phase === 'scan' && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_12px_#fb923c]"
                      initial={{ top: '8%' }}
                      animate={{ top: ['8%', '90%', '8%'] }}
                      transition={{ duration: 1.35, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 rounded-md ring-2 ring-orange-400/50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-2 text-center text-[8px] leading-tight text-slate-500">
              Scannez pour déposer
            </p>
          </div>
          <div className="mx-auto mt-1 h-3 w-10 rounded-sm bg-slate-400/80" />
          <div className="mx-auto h-8 w-2 rounded-b-md bg-slate-400/60" />

          {/* Cone / rays from phone down onto QR while scanning */}
          <AnimatePresence>
            {phase === 'scan' && (
              <motion.div
                className="pointer-events-none absolute -top-16 left-1/2 z-0 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                exit={{ opacity: 0 }}
              >
                <svg width="120" height="70" viewBox="0 0 120 70" aria-hidden>
                  <defs>
                    <linearGradient id="scanCone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points="48,0 72,0 110,70 10,70" fill="url(#scanCone)" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hand + phone — stays in frame, hovers over QR */}
        <motion.div
          key={cycle}
          className="absolute bottom-10 left-[calc(50%-80px)] z-20 w-[160px] sm:left-[calc(50%-86px)] sm:w-[172px]"
          initial={false}
          animate={phonePose}
          transition={{ type: 'spring', stiffness: 95, damping: 16 }}
        >
          <HandSvg
            className={clsx(
              'pointer-events-none absolute -left-5 bottom-0 z-0 h-[190px] w-[190px] transition-opacity duration-300',
              isScanning && phase === 'scan' ? 'opacity-70' : 'opacity-100',
            )}
          />

          <div className="relative z-10 mx-auto">
            <div className="relative mx-auto w-[112px] rounded-[1.35rem] border-[3px] border-slate-800 bg-slate-800 p-1.5 shadow-2xl sm:w-[124px]">
              <div className="absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-slate-950" />
              {/* Camera lens hint facing the QR while scanning */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    className="absolute -left-1 top-10 z-20 h-3 w-3 rounded-full border-2 border-slate-600 bg-slate-900"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      boxShadow:
                        phase === 'scan'
                          ? ['0 0 0 0 rgba(251,146,60,0.6)', '0 0 0 8px rgba(251,146,60,0)']
                          : '0 0 0 0 rgba(251,146,60,0)',
                    }}
                    exit={{ opacity: 0 }}
                    transition={
                      phase === 'scan'
                        ? { boxShadow: { duration: 1.1, repeat: Infinity } }
                        : { duration: 0.25 }
                    }
                  />
                )}
              </AnimatePresence>
              <div className="relative h-[200px] overflow-hidden rounded-[1rem] bg-white sm:h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${phase}-${cycle}`}
                    className="h-full"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                  >
                    <PhoneScreen phase={phase} />
                  </motion.div>
                </AnimatePresence>
                <FingerTap show={phase === 'send'} />
              </div>
            </div>
          </div>

          {/* Caption chip under phone during scan */}
          <AnimatePresence>
            {phase === 'scan' && (
              <motion.p
                className="absolute -bottom-7 left-1/2 w-max -translate-x-1/2 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Au-dessus du QR
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-4">
        {PHASES.map((p, i) => (
          <button
            key={p}
            type="button"
            aria-label={LABELS[p]}
            onClick={() => {
              setPhaseIndex(i)
              setPlaying(false)
            }}
            className={clsx(
              'h-1.5 rounded-full transition-all',
              i === phaseIndex ? 'w-6 bg-orange-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600',
            )}
          />
        ))}
      </div>
    </figure>
  )
}
