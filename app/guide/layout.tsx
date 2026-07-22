import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Guide utilisateur',
  description:
    'Documentation utilisateur TiiBnTick Agency : dépôt client, missions, flotte, hubs, livreurs, commissions et facturation.',
  path: '/guide',
  keywords: ['guide utilisateur', 'aide', 'documentation agence livraison', 'TiiBnTick'],
})

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
