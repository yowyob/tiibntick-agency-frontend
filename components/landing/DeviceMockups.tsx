'use client'

import Image from 'next/image'

/** Cadres device en CSS — pas besoin d’assets mockup externes. */

export function LaptopMockup({
  src,
  alt,
  className = '',
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`relative ${className}`} aria-hidden={!alt}>
      <div className="overflow-hidden rounded-t-lg border border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/30 ring-1 ring-black/20">
        <div className="flex items-center justify-center border-b border-slate-700/60 bg-slate-900 py-1">
          <span className="h-1 w-1.5 rounded-full bg-slate-600" />
        </div>
        <div className="relative aspect-[16/10] bg-slate-950 p-1 sm:p-1.5">
          <div className="relative h-full w-full overflow-hidden rounded-sm bg-slate-900">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain object-top"
              sizes="(max-width: 1024px) 70vw, 480px"
              priority={priority}
            />
          </div>
        </div>
      </div>
      <div className="relative mx-auto h-2 w-[102%] -translate-x-[1%] rounded-b-md bg-gradient-to-b from-slate-600 to-slate-800 shadow-md">
        <div className="absolute left-1/2 top-0.5 h-0.5 w-14 -translate-x-1/2 rounded-full bg-slate-500/80" />
      </div>
      <div className="mx-auto h-1 w-[108%] -translate-x-[4%] rounded-b-lg bg-slate-700/90" />
    </div>
  )
}

export function PhoneMockup({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-[2.5px] border-slate-800 bg-slate-900 shadow-2xl shadow-black/40 ring-1 ring-white/10 ${className}`}
      aria-hidden={!alt}
    >
      <div className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[0.85rem] bg-slate-950 p-0.5">
        <div className="relative h-full w-full overflow-hidden rounded-[0.7rem] bg-slate-900">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-top"
            sizes="160px"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-1 left-1/2 h-0.5 w-14 -translate-x-1/2 rounded-full bg-white/35" />
    </div>
  )
}
