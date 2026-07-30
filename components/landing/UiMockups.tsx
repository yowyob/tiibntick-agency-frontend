'use client'

import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { FramedMedia } from './MediaFrame'

type CaptureKind = 'dashboard' | 'branch' | 'hub' | 'driver' | 'track'

const CAPTURES: Record<
  Exclude<CaptureKind, 'hub'>,
  { light: string; dark?: string; alt: string; phone?: boolean; motif: number }
> = {
  dashboard: {
    light: '/landing/dashboard_light.png',
    alt: 'Centre de commandement TiiBnTick Agency',
    motif: 1,
  },
  branch: {
    light: '/landing/branch_light.png',
    alt: 'Portail antenne TiiBnTick Agency',
    motif: 2,
  },
  driver: {
    light: '/landing/driver_light.png',
    dark: '/landing/driver_dark.png',
    alt: 'Espace livreur TiiBnTick Agency',
    phone: true,
    motif: 3,
  },
  track: {
    light: '/landing/track_light.png',
    dark: '/landing/track_dark.png',
    alt: 'Suivi de colis TiiBnTick Agency',
    phone: true,
    motif: 4,
  },
}

/** Mock CSS du portail gérant hub (pas de capture PNG dédiée). */
export function HubPortalMock({ className = '' }: { className?: string }) {
  return (
    <FramedMedia tone="light" variant={2} className={`w-full max-w-md ${className}`}>
      <div className="bg-[#F7F6F4] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">
              Espace hub
            </p>
            <p className="font-display text-base font-semibold text-slate-900">Hub Akwa Relais</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            Ouvert
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: 'En stock', value: '12' },
            { label: 'À valider', value: '3' },
            { label: 'Occupation', value: '64%' },
          ].map(kpi => (
            <div key={kpi.label} className="rounded-xl bg-white px-2.5 py-3 text-center shadow-sm">
              <p className="font-display text-lg font-semibold text-slate-900">{kpi.value}</p>
              <p className="text-[10px] text-slate-500">{kpi.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-orange-200 bg-orange-50/80 px-3 py-2.5">
            <p className="text-xs font-semibold text-slate-900">Dépôt · TNT-4821</p>
            <p className="text-[10px] text-slate-500">Livreur Jean — en attente</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
            <p className="text-xs font-semibold text-slate-900">Retrait · TNT-3904</p>
            <p className="text-[10px] text-slate-500">Confirmation client requise</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-lg bg-slate-900 py-2 text-center text-[11px] font-semibold text-white">
            QR Dépôt
          </span>
          <span className="flex-1 rounded-lg bg-orange-500 py-2 text-center text-[11px] font-semibold text-white">
            QR Retrait
          </span>
        </div>
      </div>
    </FramedMedia>
  )
}

export function CaptureFrame({
  kind,
  className = '',
}: {
  kind: CaptureKind
  className?: string
}) {
  const { theme } = useTheme()
  if (kind === 'hub') {
    return <HubPortalMock className={className} />
  }
  const cfg = CAPTURES[kind]
  const src = theme === 'dark' && cfg.dark ? cfg.dark : cfg.light

  return (
    <FramedMedia
      tone="light"
      variant={cfg.motif}
      className={`${cfg.phone ? 'mx-auto max-w-[280px]' : ''} ${className}`}
    >
      <Image
        key={src}
        src={src}
        alt={cfg.alt}
        width={cfg.phone ? 390 : 1440}
        height={cfg.phone ? 844 : 900}
        className="h-auto w-full landing-mock-swap"
        sizes={cfg.phone ? '280px' : '(max-width: 768px) 100vw, 560px'}
        priority={kind === 'dashboard'}
      />
    </FramedMedia>
  )
}

/** @deprecated Prefer CaptureFrame — kept as aliases for existing imports */
export function DashboardMockup({ className }: { className?: string }) {
  return <CaptureFrame kind="dashboard" className={className} />
}
export function BranchMockup({ className }: { className?: string }) {
  return <CaptureFrame kind="branch" className={className} />
}
export function LivreurMockup({ className }: { className?: string }) {
  return <CaptureFrame kind="driver" className={className} />
}
export function TrackMockup({ className }: { className?: string }) {
  return <CaptureFrame kind="track" className={className} />
}
