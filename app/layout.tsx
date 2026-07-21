import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import LayoutController from '@/components/LayoutController'
import { ToastProvider } from '@/contexts/ToastContext'
import {
  INDEX_ROBOTS,
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'TiiBnTick' }],
  creator: 'TiiBnTick',
  publisher: 'TiiBnTick',
  category: 'business',
  keywords: [
    'TiiBnTick',
    'agence de livraison',
    'gestion de flotte',
    'missions livraison',
    'hubs relais',
    'Cameroun',
    'Douala',
    'logistique',
    'suivi colis',
  ],
  robots: INDEX_ROBOTS,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: absoluteUrl('/'),
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1400,
        height: 900,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  icons: {
    icon: [{ url: '/icons/livreur-192.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icons/livreur-192.svg' }],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

/** Applique le thème stocké avant paint — défaut = clair (ignore prefers-color-scheme). */
const themeInitScript = `(function(){try{var t=localStorage.getItem('tnt-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light'}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      style={{ colorScheme: 'light' }}
      className={`${inter.variable} ${outfit.variable} ${sourceSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <LayoutController>
            {children}
          </LayoutController>
        </ToastProvider>
      </body>
    </html>
  )
}
