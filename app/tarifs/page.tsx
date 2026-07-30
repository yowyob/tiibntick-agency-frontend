import type { Metadata } from 'next'
import PricingPage from '@/components/landing/PricingPage'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Tarifs',
  description:
    'Tarifs TiiBnTick Agency : formules Essentiel et Professionnel pour digitaliser votre entreprise de livraison.',
  path: '/tarifs',
  keywords: ['tarifs', 'abonnement agence livraison', 'TiiBnTick Agency'],
})

export default function TarifsRoute() {
  return <PricingPage />
}
