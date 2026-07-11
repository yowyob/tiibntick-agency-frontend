'use client'

import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { FramedMedia } from './MediaFrame'

type CaptureKind = 'dashboard' | 'branch' | 'driver' | 'track'

const CAPTURES: Record<
  CaptureKind,
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

export function CaptureFrame({
  kind,
  className = '',
}: {
  kind: CaptureKind
  className?: string
}) {
  const { theme } = useTheme()
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
