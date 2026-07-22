import type { Metadata } from 'next'
import { DETAILED_HEADINGS } from '@/lib/guide/headings'

export type GuideHeading = { id: string; title: string }

export type GuideSectionMeta = {
  slug: string
  title: string
  description: string
  group: string
  headings: GuideHeading[]
}

export const GUIDE_GROUPS = [
  'Démarrer',
  'Parcours client',
  'Agence (HQ)',
  'Antenne & terrain',
  'Finance & litiges',
] as const

const META: Omit<GuideSectionMeta, 'headings'>[] = [
  { slug: 'demarrer', title: 'Bienvenue dans le guide', description: 'Comprendre TiiBnTick Agency et choisir le bon portail selon votre rôle.', group: 'Démarrer' },
  { slug: 'portails', title: 'Les quatre portails', description: 'Agence, antenne, livreur et suivi colis — à quoi sert chaque entrée et comment s’y connecter.', group: 'Démarrer' },
  { slug: 'depot-client', title: 'Dépôt et accueil client', description: 'QR autonome, walk-in au comptoir, validation des demandes et reçu — pas à pas.', group: 'Parcours client' },
  { slug: 'suivi-colis', title: 'Suivi de colis', description: 'Recherche par code, lecture de la fiche, hub de retrait et réclamation.', group: 'Parcours client' },
  { slug: 'dashboard', title: 'Centre de commandement', description: 'Tableau de bord HQ : alertes, file d’actions, KPI et vision réseau.', group: 'Agence (HQ)' },
  { slug: 'missions', title: 'Missions', description: 'Créer, filtrer, assigner et suivre une mission jusqu’à la livraison — boutons et champs.', group: 'Agence (HQ)' },
  { slug: 'antennes', title: 'Antennes', description: 'Réseau d’antennes, siège et responsabilités locales.', group: 'Agence (HQ)' },
  { slug: 'flotte', title: 'Flotte', description: 'Véhicules, menu d’actions, assignation livreur, maintenance et FleetMan.', group: 'Agence (HQ)' },
  { slug: 'hubs', title: 'Hubs relais', description: 'Créer un hub, occupation, dépôt, retrait et colis expirés.', group: 'Agence (HQ)' },
  { slug: 'personnel', title: 'Personnel et livreurs', description: 'Onglets managers, livreurs, contrats, commissions et freelancers.', group: 'Agence (HQ)' },
  { slug: 'vue-antenne', title: 'Espace Antenne', description: 'Connexion, briefing, Mode Rush, GPS live et hubs locaux.', group: 'Antenne & terrain' },
  { slug: 'vue-livreur', title: 'Espace Livreur', description: 'PWA terrain : disponibilité, scan, POD, hub, gains et hors ligne.', group: 'Antenne & terrain' },
  { slug: 'commissions', title: 'Commissions', description: 'Calcul, validation, paiement et litige — côté agence et livreur.', group: 'Finance & litiges' },
  { slug: 'facturation', title: 'Facturation', description: 'Politiques tarifaires, factures, revenus et lien avec les missions.', group: 'Finance & litiges' },
  { slug: 'litiges', title: 'Litiges et incidents', description: 'Réclamations clients, enquêtes et incidents terrain.', group: 'Finance & litiges' },
  { slug: 'parametres', title: 'Paramètres', description: 'Apparence, notifications, automatisation et règles agence champ par champ.', group: 'Agence (HQ)' },
  { slug: 'workflow-complet', title: 'Workflow complet', description: 'Du dépôt client jusqu’à la commission — enchaînement détaillé.', group: 'Démarrer' },
]

export const GUIDE_SECTIONS: GuideSectionMeta[] = META.map(m => ({
  ...m,
  headings: DETAILED_HEADINGS[m.slug] ?? [],
}))

export function getGuideSection(slug: string): GuideSectionMeta | undefined {
  return GUIDE_SECTIONS.find(s => s.slug === slug)
}

export function guideMetadata(section: GuideSectionMeta): Metadata {
  return {
    title: `${section.title} — Guide utilisateur`,
    description: section.description,
  }
}
