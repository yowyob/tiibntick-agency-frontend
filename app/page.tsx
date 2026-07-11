import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'

export const metadata: Metadata = {
  title: 'TiiBnTick Agency — Poste de pilotage pour agences de livraison',
  description:
    'Missions, antennes, hubs relais, livreurs et facturation — la plateforme de gestion pour agences de livraison TiiBnTick.',
}

export default function HomePage() {
  return <LandingPage />
}
