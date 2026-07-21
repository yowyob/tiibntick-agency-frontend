import type { Metadata } from 'next'
import { AGENCY_FRONTEND_URL } from '@/lib/config'

export const SITE_NAME = 'TiiBnTick Agency'
export const SITE_TAGLINE = 'Poste de pilotage pour agences de livraison'
export const SITE_DESCRIPTION =
  'Missions, antennes, hubs relais, livreurs et facturation — la plateforme de gestion pour agences de livraison TiiBnTick.'

/** Origine publique (sans slash final). */
export const SITE_URL = (process.env.NEXT_PUBLIC_AGENCY_FRONTEND_URL ?? AGENCY_FRONTEND_URL).replace(
  /\/+$/,
  '',
)

export const OG_IMAGE_PATH = '/landing/dashboard_light.png'
export const OG_IMAGE_ALT = 'TiiBnTick Agency — centre de commandement'

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export const NO_INDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false, noimageindex: true },
}

export const INDEX_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
}

/** Metadata cohérente (title, OG, Twitter, canonical). */
export function buildPageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE_PATH,
  noIndex = false,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage = absoluteUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? NO_INDEX_ROBOTS : INDEX_ROBOTS,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: ogImage, width: 1400, height: 900, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/** Routes indexables (sitemap + robots allow). */
export const PUBLIC_SEO_ROUTES: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/track', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/track/deposit', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/login', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/register', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/livreur/login', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/branch/login', changeFrequency: 'monthly', priority: 0.5 },
]

/** Préfixes privés — X-Robots-Tag noindex (hors pages SEO publiques exactes). */
export function isSeoPublicPath(pathname: string): boolean {
  return PUBLIC_SEO_ROUTES.some(r => r.path === pathname)
}
