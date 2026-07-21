import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Suivi de colis',
  description:
    'Suivez votre colis TiiBnTick en temps réel : statut, hub relais, délai de retrait et réclamation.',
  path: '/track',
  image: '/landing/track_light.png',
  keywords: ['suivi colis', 'tracking', 'hub relais', 'TiiBnTick'],
})

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children
}
