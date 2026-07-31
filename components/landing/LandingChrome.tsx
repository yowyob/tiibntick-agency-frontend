'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Facebook, Instagram, Linkedin, Menu, Moon, Sun, Twitter, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { GLOBAL_LINKS } from '@/lib/config'
import { CREATE_ENTERPRISE_CTA } from './landingCopy'

type LandingChromeProps = {
  children: React.ReactNode
  active?: 'home' | 'pricing' | 'guide'
}

type NavItem = { href: string; label: string; hash?: boolean }

export default function LandingChrome({ children, active }: LandingChromeProps) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [connOpen, setConnOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!connOpen) return
    const close = () => setConnOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [connOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const navCls = (isActive: boolean) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-orange-600 dark:text-orange-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`

  const primaryNav: NavItem[] =
    active === 'home'
      ? [
          { href: '#portails', label: 'Portails', hash: true },
          { href: '#fonctionnalites', label: 'Fonctionnalités', hash: true },
          { href: '/tarifs', label: 'Tarifs' },
          { href: '/guide', label: 'Guide' },
          { href: '#demarrer', label: 'Démarrer', hash: true },
        ]
      : [
          { href: '/#portails', label: 'Portails' },
          { href: '/#fonctionnalites', label: 'Fonctionnalités' },
          { href: '/tarifs', label: 'Tarifs' },
          { href: '/guide', label: 'Guide' },
          { href: '/#demarrer', label: 'Démarrer' },
        ]

  const loginLinks = [
    { href: '/login', label: 'Agence' },
    { href: '/branch/login', label: 'Antenne' },
    { href: '/hub/login', label: 'Hub relais' },
    { href: '/livreur/login', label: 'Livreur' },
  ]

  const closeMobile = () => setMobileOpen(false)

  const headerSolid =
    scrolled || mobileOpen
      ? 'border-b border-slate-200/80 bg-[#F7F6F4]/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B1220]/95'
      : 'bg-transparent'

  return (
    <div className="landing-root font-landing text-slate-900 antialiased dark:text-slate-100">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerSolid}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={closeMobile}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-[11px] font-bold text-white">
              TA
            </span>
            <span className="font-display truncate text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              TiiBnTick{' '}
              <span className="hidden text-slate-500 sm:inline dark:text-slate-400">Agency</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {primaryNav.map((item) =>
              item.hash ? (
                <a key={item.href} href={item.href} className={navCls(false)}>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navCls(
                    (item.href === '/tarifs' && active === 'pricing') ||
                      (item.href === '/guide' && active === 'guide'),
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="relative hidden sm:block" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setConnOpen((o) => !o)}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800 sm:px-3"
              >
                Connexion
                <ChevronDown size={14} className={connOpen ? 'rotate-180' : ''} />
              </button>
              {connOpen && (
                <div className="absolute right-0 mt-1 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  {loginLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      onClick={() => setConnOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/register"
              className="hidden items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 md:inline-flex"
            >
              {CREATE_ENTERPRISE_CTA}
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
              onClick={() => {
                setConnOpen(false)
                setMobileOpen((o) => !o)
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet panel */}
        {mobileOpen && (
          <div className="border-t border-slate-200/80 bg-[#F7F6F4] dark:border-slate-800 dark:bg-[#0B1220] lg:hidden">
            <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-6xl overflow-y-auto px-4 py-4 sm:px-8">
              <nav className="flex flex-col gap-1">
                {primaryNav.map((item) =>
                  item.hash ? (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="rounded-xl px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-200/50 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={`rounded-xl px-3 py-3 text-base font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800 ${
                        (item.href === '/tarifs' && active === 'pricing') ||
                        (item.href === '/guide' && active === 'guide')
                          ? 'text-orange-600 dark:text-orange-400'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Connexion
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {loginLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center text-sm font-medium text-slate-700 hover:border-orange-300 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-orange-500/40"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/register"
                onClick={closeMobile}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                {CREATE_ENTERPRISE_CTA}
              </Link>
            </div>
          </div>
        )}
      </header>

      {children}

      <footer className="border-t border-slate-200 bg-[#F7F6F4] py-12 dark:border-slate-800 dark:bg-[#0B1220]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:flex-row sm:items-start sm:justify-between sm:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 text-[10px] font-bold text-white">
                TA
              </span>
              <span className="font-display text-sm font-semibold">TiiBnTick Agency</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Plateforme de gestion pour agences de livraison.
            </p>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Suivez-nous
              </p>
              <div className="mt-3 flex items-center gap-2">
                {(
                  [
                    { Icon: Facebook, href: GLOBAL_LINKS.social.facebook, label: 'Facebook' },
                    { Icon: Twitter, href: GLOBAL_LINKS.social.twitter, label: 'X / Twitter' },
                    { Icon: Linkedin, href: GLOBAL_LINKS.social.linkedin, label: 'LinkedIn' },
                    { Icon: Instagram, href: GLOBAL_LINKS.social.instagram, label: 'Instagram' },
                  ] as const
                ).map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-orange-400 hover:text-orange-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-orange-500/50 dark:hover:text-orange-400"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Portails</p>
              <ul className="mt-3 space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/login" className="hover:text-orange-500">
                    Agence
                  </Link>
                </li>
                <li>
                  <Link href="/branch/login" className="hover:text-orange-500">
                    Antenne
                  </Link>
                </li>
                <li>
                  <Link href="/hub/login" className="hover:text-orange-500">
                    Hub relais
                  </Link>
                </li>
                <li>
                  <Link href="/livreur/login" className="hover:text-orange-500">
                    Livreur
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="hover:text-orange-500">
                    Suivi colis
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Entreprise</p>
              <ul className="mt-3 space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/register" className="hover:text-orange-500">
                    {CREATE_ENTERPRISE_CTA}
                  </Link>
                </li>
                <li>
                  <Link href="/tarifs" className="hover:text-orange-500">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="/track/deposit" className="hover:text-orange-500">
                    Expédier
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="hover:text-orange-500">
                    Guide utilisateur
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Légal</p>
              <ul className="mt-3 space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <a
                    href={GLOBAL_LINKS.terms}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500"
                  >
                    Conditions d&apos;utilisation
                  </a>
                </li>
                <li>
                  <a
                    href={GLOBAL_LINKS.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500"
                  >
                    Avis de confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href={GLOBAL_LINKS.cookies}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500"
                  >
                    Avis cookies &amp; publicités
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-5 text-xs text-slate-400 sm:px-8">
          © {new Date().getFullYear()} TiiBnTick Agency
        </div>
      </footer>
    </div>
  )
}
