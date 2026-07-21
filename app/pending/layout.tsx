import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Inscription en attente',
  description: 'Votre demande d’inscription agence est en cours de validation par l’équipe TiiBnTick.',
  path: '/pending',
  noIndex: true,
})

export default function PendingLayout({ children }: { children: React.ReactNode }) {
  return children
}
