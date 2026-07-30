'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import LandingChrome from './LandingChrome'
import Reveal from './Reveal'
import { CREATE_ENTERPRISE_CTA, PRICING_PLANS } from './landingCopy'

export default function PricingPage() {
  return (
    <LandingChrome active="pricing">
      <main className="relative min-h-[100svh] bg-white pt-24 pb-20 dark:bg-[#0B1220] sm:pt-28 sm:pb-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.12),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.18),_transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm font-bold tracking-[0.12em] text-orange-500 uppercase">
              Tarifs
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Des offres simples pour digitaliser votre entreprise.
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              Deux formules pour l’instant. Choisissez selon la taille de votre réseau — vous pourrez
              évoluer plus tard.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
            {PRICING_PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 80}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 ${
                    plan.highlighted
                      ? 'border-orange-500 bg-orange-50/60 shadow-lg shadow-orange-500/10 dark:border-orange-500 dark:bg-orange-500/10'
                      : 'border-slate-200 bg-[#F7F6F4]/80 dark:border-slate-700 dark:bg-slate-900/60'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-3 py-0.5 text-[11px] font-semibold text-white">
                      {plan.badge}
                    </span>
                  )}

                  <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {plan.priceNote}
                    </span>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-orange-500"
                          strokeWidth={2.5}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="mx-auto mt-14 max-w-xl text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Besoin d’un volume plus large ou d’un déploiement multi-pays ?{' '}
              <Link
                href="/register"
                className="font-medium text-orange-600 underline-offset-2 hover:underline dark:text-orange-400"
              >
                {CREATE_ENTERPRISE_CTA}
              </Link>{' '}
              et précisez vos besoins lors de l’inscription.
            </p>
          </Reveal>
        </div>
      </main>
    </LandingChrome>
  )
}
