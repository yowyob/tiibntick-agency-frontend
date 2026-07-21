import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Connexion antenne',
  description:
    'Portail antenne TiiBnTick : briefing, dispatch, supervision GPS et hubs relais de votre zone.',
  path: '/branch/login',
  image: '/landing/branch_light.png',
})

export default function BranchLoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
