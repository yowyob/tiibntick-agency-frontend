# TiiBnTick Agency — Frontend

Interface web de gestion pour les agences de livraison. Ce module est un sous-système de la plateforme TiiBnTick (écosystème logistique Cameroun).

---

## Apercu

TiiBnTick Agency permet a une agence de livraison de piloter l'ensemble de ses operations depuis un tableau de bord centralisé : suivi des missions, gestion du personnel (livreurs, contrats, freelancers), gestion de la flotte de véhicules, supervision des hubs relais et facturation.

L'agence de démonstration utilisée dans les données fictives est **Rapid Express Douala** (Douala, Cameroun — devise XAF).

> **Note** : Le backend n'est pas encore connecté. Toutes les données affichées sont fictives et définies dans `lib/mock-data.ts`.

---

## Prérequis

- Node.js >= 18
- npm >= 9

---

## Installation et démarrage

```bash
cd "g:\TiiBnTick Agency\frontend"
npm install
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

### Autres commandes

```bash
npm run build   # Build de production
npm run start   # Démarrer le build de production
npm run lint    # Vérification ESLint
```

---

## Identifiants de démonstration

Page `/login` :

| Champ | Valeur |
|---|---|
| Email | admin@rapidexpress.cm |
| Mot de passe | demo1234 |

---

## Structure du projet

```
frontend/
├── app/                        # Routes Next.js App Router
│   ├── layout.tsx              # Layout racine (LayoutController + ThemeProvider)
│   ├── page.tsx                # Tableau de bord (/)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── profile/page.tsx
│   ├── branches/page.tsx
│   ├── staff/page.tsx
│   ├── fleet/page.tsx
│   ├── missions/page.tsx
│   ├── hubs/page.tsx
│   ├── billing/page.tsx
│   └── settings/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navigation latérale (dark mode inclus)
│   │   └── Header.tsx          # En-tête avec fil d'Ariane et bascule dark mode
│   ├── forms/
│   │   └── Drawer.tsx          # Panneau glissant de base (slide-in depuis la droite)
│   ├── LayoutController.tsx    # Masque le layout sur /login et /register
│   ├── PageTransition.tsx      # Animation de transition entre pages
│   ├── BranchDetailDrawer.tsx
│   ├── ContractDetailDrawer.tsx
│   ├── CommissionDetailDrawer.tsx
│   ├── FreelancerDetailDrawer.tsx
│   ├── InvoiceDetailDrawer.tsx
│   └── MissionDetailDrawer.tsx
│
├── contexts/
│   └── ThemeContext.tsx         # Fournisseur dark/light mode (clé localStorage : tnt-theme)
│
├── lib/
│   ├── types.ts                # Types TypeScript (diagramme de classes)
│   └── mock-data.ts            # Données fictives de l'agence
│
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Pages

| Route | Description |
|---|---|
| `/login` | Connexion agence (deux panneaux) |
| `/register` | Inscription agence en 5 étapes : Identité, Contact, KYC/Documents, Opérations, Compte |
| `/` | Tableau de bord : KPIs, graphique pipeline, occupation des hubs, missions récentes |
| `/profile` | Profil de l'agence |
| `/branches` | Liste des agences / succursales — clic sur une carte ouvre `BranchDetailDrawer` |
| `/staff` | Personnel : onglets Livreurs / Contrats / Commissions / Freelancers, chaque ligne ouvre un drawer de détail |
| `/fleet` | Gestion de la flotte : maintenance, retour, affectation, GPS, mise hors service |
| `/missions` | Table des missions avec filtres par statut — clic sur une ligne ouvre `MissionDetailDrawer` |
| `/hubs` | Hubs relais et registre des colis |
| `/billing` | Politiques de facturation, factures, commissions avec drawers de détail |
| `/settings` | Paramètres : dark mode, bascules de notifications |

---

## Systeme de design

| Element | Valeur |
|---|---|
| Couleur principale | Blanc (`#ffffff`) |
| Couleur d'accent | Orange (`#f97316`, Tailwind `orange-500`) |
| Bordures | Gris clair (`gray-200`) |
| Police | Inter (Google Fonts) |
| Style général | Interface épurée, inspiration Google |
| Dark mode | Stratégie `class` (Tailwind) — classe `dark` appliquée sur `<html>` |
| Composant drawer | Panneau `z-50`, au-dessus du header, fermeture par `Escape` ou clic sur l'overlay |
| Animation page | Fondu (`opacity`) sans transformation de position |

---

## Stack technique

| Technologie | Version |
|---|---|
| Next.js | 15.3.1 (App Router, Turbopack) |
| React | 19.0.0 |
| TypeScript | 5.x |
| Tailwind CSS | 3.4.x |
| lucide-react | 0.468.0 |
| clsx | 2.1.1 |

---

## Backend

Le backend n'est pas encore intégré. L'architecture cible est documentée dans `g:\TiiBnTick Agency\BACKEND_SPEC.md` (Java 21, Spring Boot 3.3 WebFlux, PostgreSQL 16, Redis, Kafka, auth déléguée à YowAuth0).
