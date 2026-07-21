import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Dépôt colis',
  description:
    'Déposez une demande de prise en charge : QR, formulaire client et suivi du statut de dépôt.',
  path: '/track/deposit',
  image: '/landing/track_light.png',
})

export default function TrackDepositLayout({ children }: { children: React.ReactNode }) {
  return children
}
