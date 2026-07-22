'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, ChevronLeft, Menu, Moon, Sun, X } from 'lucide-react'
import clsx from 'clsx'
import { GUIDE_GROUPS, GUIDE_SECTIONS, type GuideSectionMeta } from '@/lib/guide/nav'
import { useTheme } from '@/contexts/ThemeContext'

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (ids.length === 0) return
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids.join('|')])

  return active
}

export default function GuideShell({
  section,
  children,
}: {
  section: GuideSectionMeta
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const headingIds = section.headings.map(h => h.id)
  const activeHeading = useActiveHeading(headingIds)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const grouped = GUIDE_GROUPS.map(group => ({
    group,
    items: GUIDE_SECTIONS.filter(s => s.group === group),
  })).filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-[#F7F6F4] font-landing text-slate-900 antialiased dark:bg-[#0B1220] dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#F7F6F4]/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B1220]/95">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-200/60 lg:hidden dark:hover:bg-slate-800"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Sommaire"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 text-[10px] font-bold text-white">TA</span>
            <span className="hidden font-display text-sm font-semibold sm:inline">
              TiiBnTick <span className="text-slate-500">Agency</span>
            </span>
          </Link>
          <span className="hidden h-4 w-px bg-slate-300 sm:block dark:bg-slate-700" />
          <div className="flex min-w-0 items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
            <BookOpen size={15} className="shrink-0 text-orange-500" />
            <span className="truncate font-medium">Guide utilisateur</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 sm:inline-flex dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={14} />
              Accueil
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Thème"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-0 lg:gap-8">
        {/* Left TOC */}
        <aside
          className={clsx(
            'fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r border-slate-200 bg-[#F7F6F4] pt-14 transition-transform lg:static lg:z-0 lg:block lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-0 lg:bg-transparent lg:pt-0 dark:border-slate-800 dark:bg-[#0B1220]',
            mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <nav className="space-y-6 p-5 lg:sticky lg:top-14 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:py-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Sommaire</p>
            {grouped.map(({ group, items }) => (
              <div key={group}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {group}
                </p>
                <ul className="space-y-0.5">
                  {items.map(item => {
                    const active = pathname === `/guide/${item.slug}`
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/guide/${item.slug}`}
                          className={clsx(
                            'block rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                            active
                              ? 'bg-orange-50 font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
                              : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                          )}
                        >
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {mobileOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            aria-label="Fermer"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Center */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-4 lg:py-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-500">
              {section.group}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {section.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
              {section.description}
            </p>
            <article className="mt-2 pb-20">{children}</article>

            <GuidePager current={section.slug} />
          </div>
        </main>

        {/* Right on-this-page */}
        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-20 py-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Sur cette page
            </p>
            <ul className="space-y-1 border-l border-slate-200 dark:border-slate-700">
              {section.headings.map(h => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className={clsx(
                      'block border-l-2 py-1 pl-3 text-xs leading-snug transition-colors',
                      activeHeading === h.id
                        ? '-ml-px border-orange-500 font-semibold text-orange-600 dark:text-orange-400'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
                    )}
                    onClick={e => {
                      e.preventDefault()
                      document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    {h.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

function GuidePager({ current }: { current: string }) {
  const idx = GUIDE_SECTIONS.findIndex(s => s.slug === current)
  const prev = idx > 0 ? GUIDE_SECTIONS[idx - 1] : null
  const next = idx >= 0 && idx < GUIDE_SECTIONS.length - 1 ? GUIDE_SECTIONS[idx + 1] : null

  return (
    <nav className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:justify-between dark:border-slate-700">
      {prev ? (
        <Link
          href={`/guide/${prev.slug}`}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-orange-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-500/40"
        >
          <span className="block text-[11px] text-slate-400">Précédent</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100">{prev.title}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link
          href={`/guide/${next.slug}`}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm transition-colors hover:border-orange-300 sm:ml-auto dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-500/40"
        >
          <span className="block text-[11px] text-slate-400">Suivant</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  )
}
