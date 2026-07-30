# TiiBnTick Agency — Frontend

Interface web multi-portails pour les agences de livraison (écosystème TiiBnTick).

---

## Aperçu

L’application permet de piloter une agence de livraison : missions, antennes, flotte, hubs relais, personnel, facturation, accueil client, litiges, suivi public et portails terrain (antenne / livreur).

**Runtime :** le frontend embarque son BFF sous `/api/agency/*`. Les Route Handlers appellent TiiBnTick Core (agency-registry, auth, media, SSO, realtime…) et des satellites (Search, FleetMan).

Le service Java historique `backend/tnt-agency` **n’est plus requis à l’exécution** ; il reste dans le dépôt comme solution de retour arrière.

Doc d’architecture détaillée : `../docs-technique/` (LaTeX).

---

## Prérequis

- Node.js ≥ 20
- npm ≥ 9

---

## Installation et démarrage

```bash
cd frontend
cp .env.example .env.local   # renseigner secrets Core / JWT / FleetMan
npm install
npm run dev                  # http://localhost:3000
# npm run dev:turbo          # Next avec Turbopack
```

### Commandes

| Script | Rôle |
|--------|------|
| `npm run dev` | Serveur de développement |
| `npm run dev:turbo` | Dev + Turbopack |
| `npm run build` / `npm start` | Build et run production |
| `npm run lint` | ESLint |
| `npm test` | Vitest (BFF, FleetMan, offline livreur) |

---

## Portails

| Portail | Routes | Auth edge (`middleware.ts`) |
|---------|--------|------------------------------|
| **Marketing** | `/` (landing), `/tarifs`, `/pricing` → `/tarifs` | Public |
| **Guide utilisateur** | `/guide`, `/guide/[slug]` | Public |
| **HQ agence** | `/dashboard`, `/missions`, `/branches`, `/fleet`, `/hubs`, `/staff`, `/billing`, `/accueil`, `/litiges`, `/messages`, `/settings`, `/profile` | Cookie JWT `tnt-auth` |
| **Inscription** | `/register`, `/pending` | Public |
| **Connexion HQ** | `/login` | Public |
| **Antenne** | `/branch/*` (login, dashboard, missions, flotte, hubs, staff, messages) | Public edge — auth dans le portail |
| **Livreur (PWA)** | `/livreur/*` (login, missions, carte, gains, profile, messages) | Public edge — auth dans le portail + offline IndexedDB |
| **Suivi client** | `/track`, `/track/deposit`, `/track/deposit/status`, `/track/messages` | Public |
| **Admin plateforme** | `/admin`, `/admin/login`, `/admin/agencies`, `/admin/onboarding` | JWT + rôle admin |

Le shell HQ (Sidebar + Header + `AuthGuard`) est appliqué via `LayoutController` **uniquement** hors routes standalone (landing, guide, login/register, branch, livreur, track, admin, tarifs…).

> **Attention :** `/` est la **landing marketing**, pas le tableau de bord. Le dashboard HQ est `/dashboard`.

---

## Structure du projet

```
frontend/
├── app/
│   ├── page.tsx                 # Landing marketing
│   ├── dashboard/               # Centre de commandement HQ
│   ├── login/ | register/ | pending/
│   ├── missions/ | branches/ | fleet/ | hubs/ | staff/
│   ├── billing/ | accueil/ | litiges/ | messages/
│   ├── profile/ | settings/
│   ├── branch/                  # Portail antenne
│   ├── livreur/                 # Portail livreur (PWA)
│   ├── track/                   # Suivi / dépôt public
│   ├── admin/                   # Admin TNT
│   ├── guide/ | tarifs/ | pricing/
│   ├── api/agency/[...path]/   # Entrée BFF (nodejs, force-dynamic)
│   ├── sitemap.ts | robots.ts
│   └── layout.tsx
│
├── components/
│   ├── landing/                 # Landing, tarifs, chrome
│   ├── layout/                  # Sidebar, Header HQ
│   ├── forms/                   # Drawer + Create*Form (RHF + Zod)
│   ├── guide/                   # Guide + demos
│   ├── auth/                    # MFA, etc.
│   ├── LayoutController.tsx     # Standalone vs shell HQ
│   ├── AuthGuard.tsx            # Garde session HQ
│   └── *DetailDrawer.tsx
│
├── contexts/                    # Theme, Toast
├── lib/
│   ├── server/
│   │   ├── agency-bff.ts        # Router BFF → Core / Search / sync / SSE
│   │   ├── verify-auth.ts       # JWT JWKS (jose) + cookies
│   │   ├── fleetman-bff.ts      # Pont FleetMan (tokens chiffrés)
│   │   └── presence-stream.ts   # Relais realtime Core → SSE
│   ├── services/                # Clients métier navigateur → /api/agency
│   ├── livreur/                 # offlineQueue, syncService, conflits
│   ├── api/                     # client, envelope, mappers, dto
│   ├── guide/                   # nav sections guide
│   ├── config.ts | seo.ts | session.ts | types.ts
│   └── …
├── tests/                       # Vitest (agency-bff, fleetman, offline)
├── middleware.ts                # Auth edge + headers SEO
├── .env.example
└── package.json
```

---

## BFF intégré

```text
Navigateur  →  /api/agency/*  →  Core (agency-registry, auth, media, SSO, WS)
                              →  Search / FleetMan (routes dédiées)
```

- Entrée : `app/api/agency/[...path]/route.ts` → `lib/server/agency-bff.ts`
- Auth navigateur : cookie HttpOnly `tnt-auth` (plus de JWT en localStorage). Cookie optionnel `tnt-shared-session` pour SSO Yowyob.
- Routes BFF publiques (extrait) : `auth/login|signup|mfa`, tracking, intake-requests, drop-off, claims, intake-context, relay-hubs, `hub-handoffs/*/confirm-client`.
- Sessions enrichies : `auth/session`, `auth/branch/session`, `auth/livreur/session`, `auth/hub/session`.
- Rewrites registry : `hubs/*/parcels` → `…/deposit`, `hubs/expired` → `…/process` (+ mapping `{processed}`), withdraw par `recordId` → `hub-parcels/{tracking}/withdraw`.
- GPS livreur : `PATCH deliverers/{id}/location` → persist agency-registry + ping `realtime/gps/ping`.
- Admin : `GET admin/agencies` paginé `{items,page,size,total}`.
- Client public : `relay-hubs`, `drop-off`, `claims`, `hub-handoffs/*/confirm-client`.
- Fallback métier :  
  `{TNT_CORE_BASE_URL}/api/v1/tenants/{tenantId}/agency-registry/{path}`

Les secrets Core / FleetMan / JWT sont **serveur uniquement** (jamais `NEXT_PUBLIC_*`). Liste commentée : `.env.example`.

### Variables serveur obligatoires (prod)

- `TNT_CORE_BASE_URL`, `TNT_CORE_WS_URL`
- `TNT_AGENCY_CLIENT_ID`, `TNT_AGENCY_API_KEY`
- `JWT_ISSUER_URI`, `JWT_JWK_SET_URI`
- `TNT_SEARCH_BASE_URL`
- FleetMan : `TNT_FLEETMAN_*` + `TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY` (Base64 32 octets) ; `TNT_FLEETMAN_ALLOW_PLAINTEXT_TOKENS=false`

### Variables publiques utiles

- `NEXT_PUBLIC_API_BASE_URL` / `NEXT_PUBLIC_AGENCY_PUBLIC_BASE_URL` → `/api/agency`
- `NEXT_PUBLIC_AGENCY_FRONTEND_URL` — URL canonique (SEO, QR)
- `NEXT_PUBLIC_TENANT_ID` — tenant **plateforme** (portail public), pas un `agencyId`
- `NEXT_PUBLIC_USE_CORE_REALTIME` — SSE présence via BFF (défaut recommandé : `true`)

Ingress : désactiver le buffering sur `/api/agency/realtime/*` et autoriser les connexions longues (SSE).

---

## Stack technique

| Technologie | Version / usage |
|-------------|-----------------|
| Next.js | 15.5.20 (App Router) |
| React | 19.0.0 |
| TypeScript | 5.x |
| Tailwind CSS | ^3.4 |
| jose | JWT / JWKS côté serveur |
| react-hook-form + Zod | Formulaires |
| Leaflet / react-leaflet | Cartes |
| recharts | Graphiques HQ |
| framer-motion, lucide-react, clsx | UI |
| qrcode.react | QR dépôt |
| ws | Pont realtime serveur |
| Vitest | Tests unitaires BFF / offline |

---

## Fonctionnalités notables

- **Onboarding** : `/register` → `/pending` → validation `/admin/onboarding` (identité Kernel via Core, JWT candidat).
- **Intake** : QR `/track/deposit`, walk-in `/accueil`, file de demandes.
- **Livreur offline** : file IndexedDB (`lib/livreur/offlineQueue.ts`) + sync pull/push/bootstrap.
- **FleetMan** : connect / launch / sync (managers HQ), tokens chiffrés.
- **SSO Yowyob** : launch HRM / Accounting / Billing… via BFF + shared session.
- **SEO** : `lib/seo.ts`, `sitemap.ts`, `robots.ts` ; landing + guide + tarifs indexables.

---

## Système de design (HQ / app)

| Élément | Valeur |
|---------|--------|
| Accent | Orange (`#f97316` / `orange-500`) |
| Dark mode | Stratégie `class` sur `<html>` (`ThemeContext`, clé `tnt-theme`) |
| Drawers | Panneau latéral (Escape / overlay) |
| Landing marketing | Typo display dédiée (`LandingChrome`), distincte du shell HQ |

---

## Tests

```bash
npm test
```

Fichiers : `tests/agency-bff.test.ts`, `tests/fleetman-bff.test.ts`, `tests/offline-*.test.ts`.
