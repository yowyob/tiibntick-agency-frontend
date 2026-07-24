// Variables publiques uniquement. Les URLs et secrets Core restent dans les
// Route Handlers Next.js (lib/server) et ne sont jamais inclus dans le bundle.

/** tnt-trust — preuves blockchain (lecture seule côté frontend, via agency API) */
export const TNT_TRUST_BASE_URL =
  process.env.NEXT_PUBLIC_TNT_TRUST_BASE_URL ?? 'http://localhost:8090';

/** Base publique du BFF Next.js (même origine par défaut). */
export const AGENCY_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_AGENCY_PUBLIC_BASE_URL ?? '/api/agency';

/**
 * Active le flux de présence Core relayé par le BFF Next.js.
 */
export const USE_CORE_REALTIME =
  process.env.NEXT_PUBLIC_USE_CORE_REALTIME !== 'false';

/** Base URL de l'API consommée par le navigateur. */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? AGENCY_PUBLIC_BASE_URL;

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

/**
 * Tenant public — portail client anonyme (suivi / dépôt).
 * L’agencyId n’est plus en env : il vient du QR / URL / session / réponse suivi.
 */
export const PUBLIC_TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID ?? 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
