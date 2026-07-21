import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'
import JsonLd from '@/components/seo/JsonLd'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
} from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: '/',
  keywords: [
    'TiiBnTick Agency',
    'logiciel agence livraison',
    'dispatch livreurs',
    'hubs relais Cameroun',
    'suivi colis',
    'gestion antennes',
  ],
})

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/icons/livreur-192.svg'),
  description: SITE_DESCRIPTION,
  areaServed: {
    '@type': 'Country',
    name: 'Cameroon',
  },
}

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'XAF',
    description: 'Inscription agence — validation admin',
  },
  featureList: [
    'Centre de commandement multi-antennes',
    'Missions et dispatch livreurs',
    'Hubs relais et suivi colis',
    'Flotte et commissions',
    'Portails livreur et antenne (PWA)',
  ],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'fr-FR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/track?code={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd, softwareLd, websiteLd]} />
      <LandingPage />
    </>
  )
}
