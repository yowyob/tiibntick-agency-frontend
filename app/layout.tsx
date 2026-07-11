import type { Metadata } from 'next'
import { Inter, Outfit, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import LayoutController from '@/components/LayoutController'
import { ToastProvider } from '@/contexts/ToastContext'

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
  title: 'TiiBnTick Agency',
  description: 'Plateforme de gestion pour agences de livraison TiiBnTick',
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
