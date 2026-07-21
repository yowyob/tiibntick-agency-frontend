import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Connexion agence',
  description:
    'Connectez-vous au portail TiiBnTick Agency — centre de commandement, missions, flotte et facturation.',
  path: '/login',
})

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
