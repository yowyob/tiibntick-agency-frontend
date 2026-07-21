import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Connexion livreur',
  description:
    'Accédez à l’espace livreur TiiBnTick : missions assignées, navigation GPS, preuves de livraison et gains.',
  path: '/livreur/login',
  image: '/landing/driver_light.png',
})

export default function LivreurLoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
