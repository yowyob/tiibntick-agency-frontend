'use client'

import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Pause, Play, RotateCcw } from 'lucide-react'
import clsx from 'clsx'

export function useDemoPhases<P extends string>(
  phases: readonly P[],
  durations: Record<P, number>,
) {
  const reduceMotion = useReducedMotion()
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [cycle, setCycle] = useState(0)

  const phase = phases[phaseIndex] ?? phases[0]

  const restart = useCallback(() => {
    setPhaseIndex(0)
    setCycle(c => c + 1)
    setPlaying(true)
  }, [])

  useEffect(() => {
    if (reduceMotion || !playing) return
    const ms = durations[phase]
    const t = window.setTimeout(() => {
      setPhaseIndex(i => (i >= phases.length - 1 ? 0 : i + 1))
    }, ms)
    return () => window.clearTimeout(t)
  }, [phase, playing, reduceMotion, cycle, durations, phases])

  return {
    reduceMotion: !!reduceMotion,
    phase,
    phaseIndex,
    playing,
    setPlaying,
    setPhaseIndex,
    cycle,
    restart,
  }
}

export function DemoShell({
  title,
  label,
  playing,
  onTogglePlay,
  onRestart,
  phases,
  phaseIndex,
  phaseLabels,
  onSelectPhase,
  children,
  stageClassName,
  reducedFallback,
}: {
  title: string
  label: string
  playing: boolean
  onTogglePlay: () => void
  onRestart: () => void
  phases: readonly string[]
  phaseIndex: number
  phaseLabels: Record<string, string>
  onSelectPhase: (index: number) => void
  children: React.ReactNode
  stageClassName?: string
  reducedFallback: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-orange-50 p-5 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <figcaption className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </figcaption>
        <p className="text-sm text-slate-600 dark:text-slate-300">{reducedFallback}</p>
      </figure>
    )
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-orange-50 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700">
        <div>
          <figcaption className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </figcaption>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
            {label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTogglePlay}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? 'Pause' : 'Lecture'}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Rejouer
          </button>
        </div>
      </div>

      <div className={clsx('relative mx-auto overflow-hidden px-4', stageClassName)}>
        {children}
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-4">
        {phases.map((p, i) => (
          <button
            key={p}
            type="button"
            aria-label={phaseLabels[p] ?? p}
            onClick={() => onSelectPhase(i)}
            className={clsx(
              'h-1.5 rounded-full transition-all',
              i === phaseIndex
                ? 'w-6 bg-orange-500'
                : 'w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600',
            )}
          />
        ))}
      </div>
    </figure>
  )
}
