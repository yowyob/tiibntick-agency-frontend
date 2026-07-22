import type { Metadata, Viewport } from 'next'
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
    <html lang="fr" suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>
          <LayoutController>
            {children}
          </LayoutController>
        </ToastProvider>
      </body>
    </html>
  )
}
