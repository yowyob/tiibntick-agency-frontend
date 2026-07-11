import type { Metadata } from 'next'
import './globals.css'
import LayoutController from '@/components/LayoutController'
import { ToastProvider } from '@/contexts/ToastContext'

export const metadata: Metadata = {
  title: 'TiiBnTick Agency',
  description: 'Plateforme de gestion pour agences de livraison TiiBnTick',
}

/** Applique le thème stocké avant paint — défaut = clair (ignore prefers-color-scheme). */
const themeInitScript = `(function(){try{var t=localStorage.getItem('tnt-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light'}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ToastProvider>
          <LayoutController>
            {children}
          </LayoutController>
        </ToastProvider>
      </body>
    </html>
  )
}
