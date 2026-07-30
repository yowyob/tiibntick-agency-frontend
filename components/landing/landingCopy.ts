/** Libellés marketing partagés (landing + pricing). */
export const CREATE_ENTERPRISE_CTA = 'Créer Mon entreprise'

export type PricingPlan = {
  id: string
  name: string
  tagline: string
  price: string
  priceNote: string
  highlighted?: boolean
  badge?: string
  features: string[]
  cta: string
  href: string
}

/** Deux offres pour l’instant — à affiner avec le métier. */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    tagline: 'Pour démarrer votre activité logistique sur TiiBnTick.',
    price: '15 000',
    priceNote: 'XAF / mois',
    features: [
      '1 antenne opérationnelle',
      'Jusqu’à 5 livreurs',
      'Missions, bordereaux et suivi colis',
      'Accueil comptoir & dépôt QR client',
      'Portail livreur (PWA)',
      'Support par e-mail',
    ],
    cta: CREATE_ENTERPRISE_CTA,
    href: '/register',
  },
  {
    id: 'professionnel',
    name: 'Professionnel',
    tagline: 'Pour les structures multi-sites qui veulent tout piloter.',
    price: '45 000',
    priceNote: 'XAF / mois',
    highlighted: true,
    badge: 'Le plus choisi',
    features: [
      'Antennes illimitées',
      'Livreurs & flotte illimités',
      'Hubs relais, GPS live & dispatch',
      'Facturation, commissions & politiques tarifaires',
      'Portails antenne + hub + livreur + suivi client',
      'Support prioritaire',
    ],
    cta: CREATE_ENTERPRISE_CTA,
    href: '/register',
  },
]
