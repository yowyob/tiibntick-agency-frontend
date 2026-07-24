export type MessagingAudience = 'agency-admin' | 'branch' | 'livreur' | 'client'

export const MESSAGING_COPY: Record<
  MessagingAudience,
  {
    title: string
    subtitle: string
    filters: string[]
    listHint: string
    threadHint: string
    capabilities: string[]
  }
> = {
  'agency-admin': {
    title: 'Messagerie',
    subtitle: 'Coordination avec les responsables d’antenne — un fil permanent par antenne.',
    filters: ['Antennes', 'Non lus', 'Escalades'],
    listHint: 'Vos conversations avec chaque antenne apparaîtront ici.',
    threadHint: 'Sélectionnez une antenne pour échanger avec son responsable.',
    capabilities: [
      'Fil permanent Admin ↔ Responsable par antenne',
      'Cartes d’escalade de colis',
      'Pièces jointes et accusés de lecture',
    ],
  },
  branch: {
    title: 'Messagerie',
    subtitle: 'Vos échanges clients, livreurs et admin — plus les annonces antenne.',
    filters: ['Tous', 'Clients', 'Livreurs', 'Admin', 'Annonces', 'Non lus'],
    listHint: 'Les fils colis et annonces de votre antenne apparaîtront ici.',
    threadHint: 'Ouvrez une conversation pour écrire au client, au livreur ou à l’admin.',
    capabilities: [
      'Fils privés par colis (Client / Livreur)',
      'Fil permanent avec l’admin agence',
      'Broadcast antenne → livreurs (lecture seule + qui a lu)',
      'Escalade de dossier vers l’admin',
    ],
  },
  livreur: {
    title: 'Messages',
    subtitle: 'Clients de vos courses, votre responsable, et les annonces antenne.',
    filters: ['Actifs', 'Annonces', 'Archivés'],
    listHint: 'Vos conversations apparaîtront ici.',
    threadHint: 'Choisissez un fil pour contacter un client ou votre responsable.',
    capabilities: [
      'Chat avec les clients de vos colis',
      'Chat avec votre responsable d’antenne',
      'Annonces antenne (lecture seule)',
      'Pièces jointes et accusés de lecture',
    ],
  },
  client: {
    title: 'Messages',
    subtitle: 'Contactez le livreur de votre colis ou l’antenne d’émission.',
    filters: ['Actifs', 'Archivés'],
    listHint: 'Vos conversations liées à vos colis apparaîtront ici.',
    threadHint: 'Échangez avec le livreur ou le responsable de l’antenne.',
    capabilities: [
      'Chat avec le livreur de chaque colis',
      'Chat avec le responsable de l’antenne d’émission',
      'Pièces jointes et accusés de lecture',
    ],
  },
}
