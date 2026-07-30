import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Créer Mon entreprise',
  description:
    'Inscrivez votre entreprise de livraison sur TiiBnTick : identité, antennes, validation admin et mise en service.',
  path: '/register',
  keywords: ['inscription entreprise', 'créer entreprise livraison', 'TiiBnTick onboarding'],
})

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
