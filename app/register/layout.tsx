import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Créer mon agence',
  description:
    'Inscrivez votre agence de livraison sur TiiBnTick : identité, antennes, validation admin et mise en service.',
  path: '/register',
  keywords: ['inscription agence', 'créer agence livraison', 'TiiBnTick onboarding'],
})

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
