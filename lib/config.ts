// Variables d'environnement — source de vérité : backend/.env (section NEXT_PUBLIC_*)

/**
 * Auth IAM — Kernel RT-ComOps (PAS tnt-trust).
 * tnt-trust (:8090) = blockchain/preuves logistiques, service séparé.
 */
export const KERNEL_AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_KERNEL_AUTH_BASE_URL
  ?? process.env.NEXT_PUBLIC_YOWAUTH_BASE_URL
  ?? 'https://kernel-core.yowyob.com';

/** @deprecated Utiliser KERNEL_AUTH_BASE_URL — alias rétrocompat */
export const YOWAUTH_BASE_URL = KERNEL_AUTH_BASE_URL;

/** ClientApplication Kernel (requis pour /api/auth/*) */
export const KERNEL_CLIENT_ID =
  process.env.NEXT_PUBLIC_KERNEL_CLIENT_ID ?? '';

export const KERNEL_API_KEY =
  process.env.NEXT_PUBLIC_KERNEL_API_KEY ?? '';

/** tnt-trust — preuves blockchain (lecture seule côté frontend, via agency API) */
export const TNT_TRUST_BASE_URL =
  process.env.NEXT_PUBLIC_TNT_TRUST_BASE_URL ?? 'http://localhost:8090';

/** Base publique backend (sans /v1) — ex. http://localhost:8081/agency */
export const AGENCY_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_AGENCY_PUBLIC_BASE_URL ?? 'http://localhost:8081/agency';

/** Base URL API incluant le prefix `/agency/v1` */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? `${AGENCY_PUBLIC_BASE_URL}/v1`;

/** Carte Leaflet */
export const MAP_TILE_URL =
  process.env.NEXT_PUBLIC_MAP_TILE_URL ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const MAP_ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ?? '&copy; OpenStreetMap contributors';
export const MAP_CENTER_LAT = Number(process.env.NEXT_PUBLIC_MAP_CENTER_LAT ?? '4.0511');
export const MAP_CENTER_LNG = Number(process.env.NEXT_PUBLIC_MAP_CENTER_LNG ?? '9.7022');
export const MAP_DEFAULT_CITY =
  process.env.NEXT_PUBLIC_MAP_DEFAULT_CITY ?? 'Douala, Cameroun';

/** Liens externes */
export const MAPS_PROVIDER_URL =
  process.env.NEXT_PUBLIC_MAPS_PROVIDER_URL ?? 'https://maps.google.com/?q=';
export const WHATSAPP_BASE_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL ?? 'https://wa.me/';

/** URL publique frontend agence (partage espace livreur) */
export const AGENCY_FRONTEND_URL =
  process.env.NEXT_PUBLIC_AGENCY_FRONTEND_URL ?? 'http://localhost:3001';

/** Tenant / agence publics — portail client (suivi colis, dépôt) */
export const PUBLIC_TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID ?? 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

export const PUBLIC_AGENCY_ID =
  process.env.NEXT_PUBLIC_AGENCY_ID ?? 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
