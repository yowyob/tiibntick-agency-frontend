# TiiBnTick Agency — Frontend

Interface web de gestion pour les agences de livraison. Ce module est un sous-système de la plateforme TiiBnTick (écosystème logistique Cameroun).

---

## Apercu

TiiBnTick Agency permet a une agence de livraison de piloter l'ensemble de ses operations depuis un tableau de bord centralisé : suivi des missions, gestion du personnel (livreurs, contrats, freelancers), gestion de la flotte de véhicules, supervision des hubs relais et facturation.

Le frontend contient son propre BFF sous `/api/agency/*`. Les Route Handlers
appellent directement TiiBnTick Core et les services satellites. Le service
Java historique `backend/tnt-agency` n'est plus requis à l'exécution, mais il
reste conservé dans le dépôt comme solution de retour arrière.

---

## Prérequis

- Node.js >= 20
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
npm test        # Tests unitaires du BFF
```

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
│   ├── server/                 # BFF, auth JWT, FleetMan et temps réel
│   ├── services/               # Clients métier du navigateur
│   └── types.ts                # Types TypeScript
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
| Next.js | 15.5.20 (App Router, Turbopack) |
| React | 19.0.0 |
| TypeScript | 5.x |
| Tailwind CSS | 3.4.x |
| lucide-react | 0.468.0 |
| clsx | 2.1.1 |

---

## BFF intégré et déploiement

Flux principal :

```text
Navigateur → /api/agency/* (Next.js) → TiiBnTick Core / Agency Registry
```

Les secrets Core, FleetMan et JWT doivent être injectés dans le processus
Next.js et ne doivent jamais porter le préfixe `NEXT_PUBLIC_`. La liste
exhaustive et commentée se trouve dans `.env.example`.

Variables serveur obligatoires en production :

- `TNT_CORE_BASE_URL`, `TNT_AGENCY_CLIENT_ID`, `TNT_AGENCY_API_KEY`
- `JWT_ISSUER_URI`, `JWT_JWK_SET_URI`
- `TNT_SEARCH_BASE_URL`
- `TNT_FLEETMAN_API_BASE_URL`, `TNT_FLEETMAN_UI_BASE_URL`
- `TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY` : Base64 de 32 octets
- `TNT_CORE_WS_URL` pour le pont SSE → WebSocket Core

L'ingress doit désactiver le buffering sur `/api/agency/realtime/*` et autoriser
les connexions longues pour les flux SSE. Les cookies d'authentification sont
`HttpOnly`, `Secure` en production et `SameSite=Lax`.
