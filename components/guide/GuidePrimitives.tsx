'use client'

import Link from 'next/link'
import clsx from 'clsx'

/** Mot bleu cliquable vers une autre section du guide (pas un « lien » écrit). */
export function GLink({
  to,
  hash,
  children,
  className,
}: {
  to: string
  hash?: string
  children: React.ReactNode
  className?: string
}) {
  const href = hash ? `/guide/${to}#${hash}` : `/guide/${to}`
  return (
    <Link
      href={href}
      className={clsx(
        'font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-700',
        'dark:text-blue-400 dark:decoration-blue-400/40 dark:hover:text-blue-300',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'tip' | 'warn'
  title?: string
  children: React.ReactNode
}) {
  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100',
    tip: 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100',
    warn: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100',
  }
  const labels = { info: 'À savoir', tip: 'Astuce', warn: 'Attention' }
  return (
    <aside className={clsx('my-6 rounded-xl border px-4 py-3 text-sm leading-relaxed', styles[tone])}>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide opacity-80">{title ?? labels[tone]}</p>
      <div className="[&_a]:font-medium">{children}</div>
    </aside>
  )
}

export function Steps({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
            <div className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-28 border-b border-slate-200 pb-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:border-slate-700 dark:text-white">
      {children}
    </h2>
  )
}

export function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-28 font-display text-lg font-semibold text-slate-900 dark:text-white">
      {children}
    </h3>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">{children}</p>
}

export function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-600 dark:text-slate-300">{children}</ul>
}

export function StatusChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {children}
    </span>
  )
}

/** Nom exact d’un bouton / action dans l’interface. */
export function Btn({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[13px] font-semibold text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
      {children}
    </span>
  )
}

/** Libellé de champ / zone d’écran. */
export function Field({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[12px] font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
      {children}
    </span>
  )
}

export function Path({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-orange-500">Où</span>
      {children}
    </p>
  )
}
