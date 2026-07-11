'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ConciergeBell,
  MapPin,
  Moon,
  Package,
  Receipt,
  Scale,
  Smartphone,
  Store,
  Sun,
  Truck,
  Users,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { CaptureFrame } from './UiMockups'
import Image from 'next/image'
import Reveal from './Reveal'
import { FramedMedia, HeroTextMotif } from './MediaFrame'

const PORTALS = [
  {
    id: 'hq',
    title: 'Je dirige l’agence',
    desc: 'Centre de commandement, antennes, litiges, facturation.',
    href: '/login',
    cta: 'Connexion agence',
    icon: Building2,
    mock: 'dashboard' as const,
  },
  {
    id: 'branch',
    title: 'Je gère une antenne',
    desc: 'Briefing, dispatch, GPS live, hubs de l’antenne.',
    href: '/branch/login',
    cta: 'Espace antenne',
    icon: Store,
    mock: 'branch' as const,
  },
  {
    id: 'livreur',
    title: 'Je livre',
    desc: 'Missions, scan QR, POD, dépôt hub, gains.',
    href: '/livreur/login',
    cta: 'Espace livreur',
    icon: Smartphone,
    mock: 'driver' as const,
  },
  {
    id: 'track',
    title: 'Je suis un colis',
    desc: 'Suivi public, dépôt walk-in ou demande d’expédition.',
    href: '/track',
    cta: 'Suivre un colis',
    icon: Package,
    mock: 'track' as const,
  },
]

const FLOW = [
  {
    label: 'Accueil / dépôt',
    detail: 'Comptoir ou QR client',
    explain:
      'Le client dépose au comptoir ou scanne un QR pour une demande autonome. L’agent valide le colis, imprime le reçu et ouvre le dossier dans le système.',
  },
  {
    label: 'Mission créée',
    detail: 'Bordereau & priorité',
    explain:
      'Une mission est générée avec bordereau, adresse, priorité et contraintes. Elle apparaît immédiatement dans le pipeline HQ et antenne.',
  },
  {
    label: 'Livreur assigné',
    detail: 'Dispatch antenne',
    explain:
      'L’antenne assigne un livreur disponible selon zone, charge et type de véhicule. Le livreur reçoit la mission sur sa PWA en temps réel.',
  },
  {
    label: 'Transit / hub',
    detail: 'Suivi GPS & relais',
    explain:
      'Le colis circule entre antennes et hubs relais. Le GPS live et les scans de passage permettent de savoir où il se trouve à chaque étape.',
  },
  {
    label: 'POD ou relais',
    detail: 'Preuve ou dépôt hub',
    explain:
      'Livraison avec preuve (signature, photo) ou dépôt en point relais. Le statut passe à livré / en attente de retrait, visible côté client.',
  },
  {
    label: 'Facturation',
    detail: 'Commissions & factures',
    explain:
      'Commissions livreur, tarifs agence et factures sont calculés à partir des missions clôturées — sans ressaisie manuelle.',
  },
]

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [connOpen, setConnOpen] = useState(false)
  const [activePortal, setActivePortal] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [activeFlow, setActiveFlow] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = requestAnimationFrame(() => setHeroReady(true))
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(t)
    }
  }, [])

  useEffect(() => {
    if (!connOpen) return
    const close = () => setConnOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [connOpen])

  const portal = PORTALS[activePortal]

  return (
    <div className="landing-root font-landing text-slate-900 antialiased dark:text-slate-100">
      {/* ── Nav ─────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/80 bg-[#F7F6F4]/90 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B1220]/90'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-[11px] font-bold text-white">
              TA
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              TiiBnTick{' '}
              <span className="text-slate-500 dark:text-slate-400">Agency</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a
              href="#portails"
              className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Portails
            </a>
            <a
              href="#fonctionnalites"
              className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Fonctionnalités
            </a>
            <a
              href="#demarrer"
              className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Démarrer
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setConnOpen((o) => !o)}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Connexion
                <ChevronDown size={14} className={connOpen ? 'rotate-180' : ''} />
              </button>
              {connOpen && (
                <div className="absolute right-0 mt-1 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  {[
                    { href: '/login', label: 'Agence' },
                    { href: '/branch/login', label: 'Antenne' },
                    { href: '/livreur/login', label: 'Livreur' },
                  ].map((item) => (
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Créer mon agence
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden bg-white dark:bg-[#0B1220]">
        {/* Texte — fond blanc ; padding gauche réduit pour laisser place à l’image */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 pb-16 pt-28 sm:px-5 lg:pl-6 lg:pr-8 lg:pb-20 lg:pt-24">
          <div
            className={`relative max-w-md transition-all duration-700 lg:max-w-[min(100%,24rem)] xl:max-w-[26rem] ${
              heroReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {/* Motif rectangles autour du texte, à peine sous le plan */}
            <div className="pointer-events-none absolute -inset-x-4 -top-3 bottom-[-1.25rem] z-0 translate-y-1 sm:-inset-x-6 sm:-top-4 sm:bottom-[-1.5rem]">
              <HeroTextMotif tone={theme === 'dark' ? 'dark' : 'light'} />
            </div>
            <div className="relative z-10">
            <p className="font-display text-sm font-semibold tracking-[0.12em] text-orange-500 uppercase">
              TiiBnTick Agency
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold italic leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[2.85rem] xl:text-[3.15rem]">
              Le poste de pilotage de votre agence de livraison.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Missions, antennes, hubs relais, livreurs et facturation — centralisés pour diriger
              l’opération au quotidien.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Créer mon agence
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Se connecter
              </Link>
            </div>
            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
              Déjà opérationnel ?{' '}
              <a href="#portails" className="font-medium text-orange-600 underline-offset-2 hover:underline dark:text-orange-400">
                Accès antenne · Espace livreur · Suivre un colis
              </a>
            </p>
            </div>
          </div>
        </div>

        {/* Image : sous le header (h-16), élargie, collée au bord droit */}
        <div
          className={`pointer-events-none absolute bottom-0 right-0 top-16 hidden w-[min(62vw,860px)] transition-all delay-150 duration-700 lg:block ${
            heroReady ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}
        >
          {/* Photo clipée ; le mockup peut dépasser pour laisser voir le quadrillage */}
          <div className="absolute inset-0 overflow-hidden rounded-l-[2rem]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/landing/hero-ops.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 via-[#0B1220]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-end justify-end overflow-visible p-6 pb-8 pr-5 xl:p-8 xl:pb-10 xl:pr-6">
            <FramedMedia tone="dark" variant={0} className="w-[62%] max-w-[400px] xl:max-w-[440px]">
              <Image
                src="/landing/mockup_ordi_pour_hero.png"
                alt="TiiBnTick Agency sur ordinateur"
                width={1040}
                height={720}
                className="h-auto w-full"
                sizes="440px"
                priority
              />
            </FramedMedia>
          </div>
        </div>

        {/* Mobile : panneau sous le texte */}
        <div className="relative mx-5 mb-14 sm:mx-8 lg:hidden">
          <div className="relative min-h-[400px] overflow-visible rounded-2xl">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/landing/hero-ops.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 via-[#0B1220]/25 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-end justify-end overflow-visible p-5 pb-8 pr-4">
              <FramedMedia tone="dark" variant={5} className="w-[78%] max-w-[300px]">
                <Image
                  src="/landing/mockup_ordi_pour_hero.png"
                  alt="TiiBnTick Agency sur ordinateur"
                  width={1040}
                  height={720}
                  className="h-auto w-full"
                  sizes="300px"
                  priority
                />
              </FramedMedia>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portails ────────────────────────────────────── */}
      <section
        id="portails"
        className="scroll-mt-20 border-b border-slate-200 bg-[#F7F6F4] py-20 dark:border-slate-800 dark:bg-[#0B1220] sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Une agence. Quatre espaces.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Choisissez votre entrée. Tout reste synchronisé — du directeur au livreur, jusqu’au
              client qui suit son colis.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <ul className="space-y-2">
              {PORTALS.map((p, i) => {
                const Icon = p.icon
                const active = i === activePortal
                return (
                  <Reveal key={p.id} as="li" delay={i * 80}>
                    <button
                      type="button"
                      onMouseEnter={() => setActivePortal(i)}
                      onFocus={() => setActivePortal(i)}
                      onClick={() => setActivePortal(i)}
                      className={`flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200 ${
                        active
                          ? 'border-orange-500/40 bg-orange-500/5 shadow-sm dark:bg-orange-500/10'
                          : 'border-transparent hover:border-slate-200 hover:bg-white/60 dark:hover:border-slate-700 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-200/80 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[15px] font-semibold">{p.title}</span>
                        <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">
                          {p.desc}
                        </span>
                        <Link
                          href={p.href}
                          className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold ${
                            active ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {p.cta}
                          <ArrowRight size={14} />
                        </Link>
                      </span>
                    </button>
                  </Reveal>
                )
              })}
            </ul>

            <Reveal delay={120}>
              <div
                key={portal.id}
                className="landing-mock-swap relative flex min-h-[300px] items-center justify-center overflow-visible px-4 py-6 sm:min-h-[340px] sm:px-8"
              >
                <CaptureFrame
                  kind={portal.mock}
                  className={
                    portal.mock === 'branch'
                      ? 'w-full max-w-md'
                      : portal.mock === 'dashboard'
                        ? 'w-full max-w-lg'
                        : ''
                  }
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Fil opération ───────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-orange-500 uppercase">
              Le fil de l’opération
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Du comptoir à la facture, un seul parcours.
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Survolez une étape · cliquez pour le détail
            </p>
          </Reveal>

          {/* Desktop timeline */}
          <ol className="relative mt-14 hidden md:grid md:grid-cols-6 md:gap-3">
            <li
              aria-hidden
              className="pointer-events-none absolute left-[8%] right-[8%] top-5 h-px bg-gradient-to-r from-orange-500/20 via-orange-500/50 to-orange-500/20"
            />
            {FLOW.map((step, i) => {
              const open = activeFlow === i
              return (
                <Reveal
                  key={step.label}
                  as="li"
                  delay={i * 70}
                  className="relative flex flex-col items-center text-center"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFlow(open ? null : i)}
                    aria-expanded={open}
                    className="group relative z-10 flex w-full flex-col items-center rounded-xl px-1 py-2 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-500/50"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
                        open
                          ? 'scale-110 border-orange-500 bg-orange-500 text-white'
                          : 'border-orange-500/30 bg-white text-orange-600 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white dark:border-orange-500/40 dark:bg-slate-950 dark:text-orange-400 dark:group-hover:bg-orange-500 dark:group-hover:text-white'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className={`mt-4 font-display text-sm font-semibold transition-colors ${
                        open
                          ? 'text-orange-600 dark:text-orange-400'
                          : 'text-slate-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`mt-1 text-xs leading-snug transition-colors ${
                        open
                          ? 'text-orange-600/80 dark:text-orange-400/80'
                          : 'text-slate-500 group-hover:text-orange-500/80 dark:text-slate-400'
                      }`}
                    >
                      {step.detail}
                    </p>
                  </button>
                </Reveal>
              )
            })}
          </ol>

          {/* Mobile timeline */}
          <ol className="relative mt-10 space-y-0 md:hidden">
            {FLOW.map((step, i) => {
              const open = activeFlow === i
              return (
                <Reveal
                  key={step.label}
                  as="li"
                  delay={i * 60}
                  className="relative flex gap-4 pb-2 last:pb-0"
                >
                  {i < FLOW.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[15px] top-10 w-px bg-orange-500/25"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveFlow(open ? null : i)}
                    aria-expanded={open}
                    className="group relative z-10 flex w-full gap-4 rounded-xl py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-500/50"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold transition-all duration-200 ${
                        open
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-orange-500/30 bg-white text-orange-600 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white dark:border-orange-500/40 dark:bg-slate-950 dark:text-orange-400'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5 pb-6">
                      <p
                        className={`font-display text-sm font-semibold transition-colors ${
                          open
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-slate-900 group-hover:text-orange-600 dark:text-white'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {step.detail}
                      </p>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="rounded-lg border border-orange-500/20 bg-orange-500/5 px-3 py-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {step.explain}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </ol>

          {/* Panneau détail desktop */}
          <div
            className={`mx-auto hidden max-w-2xl overflow-hidden transition-all duration-300 ease-out md:block ${
              activeFlow !== null
                ? 'mt-10 max-h-48 opacity-100'
                : 'mt-0 max-h-0 opacity-0'
            }`}
          >
            {activeFlow !== null && (
              <div className="rounded-2xl border border-orange-500/25 bg-orange-500/[0.06] px-6 py-5 text-center">
                <p className="text-[11px] font-semibold tracking-wider text-orange-500 uppercase">
                  Étape {String(activeFlow + 1).padStart(2, '0')} · {FLOW[activeFlow].label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {FLOW[activeFlow].explain}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Bento ───────────────────────────────────────── */}
      <section className="overflow-visible border-b border-slate-200 bg-[#F7F6F4] pb-42 pt-16 dark:border-slate-800 dark:bg-[#0B1220] sm:pb-56 sm:pt-24">
        <div className="mx-auto max-w-6xl overflow-visible px-5 sm:px-8">
          <Reveal className="mb-8 max-w-lg">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-orange-500 uppercase">
              Le réseau
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Antennes, hubs, flotte et missions — une grille pour voir ce que Agency tient ensemble.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 overflow-visible sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(240px,auto)_minmax(200px,auto)] lg:gap-x-6 lg:gap-y-4">
            {/* Grande case + bus qui arrive de la gauche */}
            <div className="relative z-20 overflow-visible sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <Reveal>
                <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-slate-900 sm:min-h-[480px] lg:min-h-[560px] dark:bg-slate-950">
                  <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-start p-7 sm:p-9 lg:p-10">
                    <div className="max-w-[15rem] sm:max-w-[16rem]">
                      <p className="font-display text-3xl font-semibold italic leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                        Le réseau bouge.
                        <br />
                        Vous pilotez.
                      </p>
                      <p className="mt-5 text-sm leading-relaxed text-slate-400">
                        Du dépôt au POD, chaque antenne et chaque véhicule reste dans le même fil
                        opérationnel.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal
                from="left"
                delay={180}
                className="pointer-events-none absolute inset-0 z-30 overflow-visible"
              >
                <div className="absolute bottom-0 right-0 w-[120%] max-w-none translate-x-[18%] translate-y-[20%] sm:w-[125%] sm:translate-x-[20%] sm:translate-y-[21%] lg:w-[130%] lg:translate-x-[24%] lg:translate-y-[22%]">
                  <Image
                    src="/landing/bus_sans_fond.png"
                    alt=""
                    width={640}
                    height={360}
                    className="h-auto w-full drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={80} className="relative z-10 flex flex-col justify-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 pb-16 dark:border-slate-800 dark:bg-slate-950 sm:p-7 sm:pb-20">
              <Store size={20} className="text-orange-500" />
              <div>
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  Antennes
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Multi-sites, un seul commandement.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140} className="relative z-10 flex flex-col justify-start gap-6 rounded-3xl border border-orange-500/20 bg-orange-500 p-6 pb-16 text-white sm:p-7 sm:pb-20">
              <MapPin size={20} className="text-white/90" />
              <div>
                <p className="font-display text-lg font-semibold">Hubs relais</p>
                <p className="mt-1 text-sm text-orange-100">
                  Occupation, dépôt, rétention.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="relative z-10 flex flex-col justify-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 pb-16 dark:border-slate-800 dark:bg-slate-950 sm:p-7 sm:pb-20">
              <Truck size={20} className="text-orange-500" />
              <div>
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  Flotte & GPS
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Véhicules, livreurs, suivi live.
                </p>
              </div>
            </Reveal>

            <Reveal delay={260} className="relative z-10 flex flex-col justify-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 pb-16 dark:border-slate-800 dark:bg-slate-950 sm:p-7 sm:pb-20">
              <Package size={20} className="text-orange-500" />
              <div>
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  Missions
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Du brouillon au POD, sans rupture.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section
        id="fonctionnalites"
        className="scroll-mt-20 bg-[#F7F6F4] py-20 dark:bg-[#0B1220] sm:py-24"
      >
        <div className="mx-auto max-w-6xl space-y-24 px-5 sm:px-8">
          {/* Commandement */}
          <FeatureBlock
            eyebrow="Centre de commandement"
            title="Voyez ce qui bloque avant que le client appelle."
            body="File d’actions, pipeline des missions, occupation des hubs, benchmarks antennes — le tableau de bord HQ pour diriger le réseau."
            reverse={false}
          >
            <div className="px-5 pt-7 pb-5 sm:px-8 sm:pt-9">
              <CaptureFrame kind="dashboard" />
            </div>
          </FeatureBlock>

          {/* Terrain */}
          <FeatureBlock
            eyebrow="Terrain"
            title="Le livreur a son outil. Pas un Excel — une PWA."
            body="Disponibilité, missions, scan QR à l’enlèvement, preuve de livraison, dépôt au hub, carte et gains. L’antenne suit le GPS et dispatch en direct."
            reverse
          >
            <div className="mx-auto max-w-[280px] px-5 pt-7 pb-5 sm:px-8 sm:pt-9">
              <CaptureFrame kind="driver" />
            </div>
          </FeatureBlock>

          {/* Réseau physique */}
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
                <ConciergeBell className="text-orange-500" size={22} />
                <h3 className="mt-4 font-display text-xl font-semibold">Au comptoir</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Accueil client : QR pour dépôt autonome, prise en charge walk-in, validation des
                  demandes, impression de reçu.
                </p>
                <Link
                  href="/track/deposit"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 dark:text-orange-400"
                >
                  Demande d’expédition
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
                <MapPin className="text-orange-500" size={22} />
                <h3 className="mt-4 font-display text-xl font-semibold">Hubs relais</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Configurez vos points relais, suivez l’occupation, déposez et retirez des colis,
                  gérez la rétention avant saturation.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Pilotage */}
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-orange-500 uppercase">
                Pilotage
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Flotte, personnel, litiges, facturation.
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                Le back-office qui suit le terrain — contrats, commissions, véhicules, incidents et
                factures au même endroit.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Truck,
                  title: 'Flotte',
                  text: 'Affectation livreur, maintenance, GPS, retrait.',
                },
                {
                  icon: Users,
                  title: 'Personnel',
                  text: 'Managers, livreurs, contrats, freelancers, commissions.',
                },
                {
                  icon: Scale,
                  title: 'Litiges',
                  text: 'Réclamations client et incidents livreur, suivis.',
                },
                {
                  icon: Receipt,
                  title: 'Facturation',
                  text: 'Politiques tarifaires, factures, revenus, commissions.',
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 70} className="border-l-2 border-orange-500/40 pl-4 py-1">
                  <item.icon size={18} className="text-slate-500 dark:text-slate-400" />
                  <h3 className="mt-3 font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Client */}
          <FeatureBlock
            eyebrow="Côté client"
            title="Le suivi fait partie de l’agence."
            body="Vos clients suivent leur colis, signalent un litige, ou déposent une demande d’expédition — sans quitter l’écosystème TiiBnTick Agency."
            reverse={false}
          >
            <div className="px-5 pt-7 pb-5 sm:px-8 sm:pt-9">
              <CaptureFrame kind="track" />
            </div>
          </FeatureBlock>
        </div>
      </section>

      {/* ── Démarrer ────────────────────────────────────── */}
      <section
        id="demarrer"
        className="scroll-mt-20 border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950 sm:py-24"
      >
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Inscrivez votre agence. Puis vous pilotez.
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Création du compte, pièces KYC (CNI, RCCM…), paramétrage opérationnel. Après validation,
            votre centre de commandement est prêt — antennes, staff, flotte, hubs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Créer mon agence
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Suivre un colis
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
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
              <p className="font-semibold text-slate-800 dark:text-slate-200">Agence</p>
              <ul className="mt-3 space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/register" className="hover:text-orange-500">
                    Créer mon agence
                  </Link>
                </li>
                <li>
                  <Link href="/track/deposit" className="hover:text-orange-500">
                    Expédier
                  </Link>
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

function FeatureBlock({
  eyebrow,
  title,
  body,
  children,
  reverse,
}: {
  eyebrow: string
  title: string
  body: string
  children: React.ReactNode
  reverse?: boolean
}) {
  return (
    <Reveal
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? '' : ''
      }`}
    >
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-orange-500 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">{body}</p>
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>{children}</div>
    </Reveal>
  )
}
