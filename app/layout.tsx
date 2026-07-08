import type { Metadata } from 'next'
import './globals.css'
import LayoutController from '@/components/LayoutController'
import { ToastProvider } from '@/contexts/ToastContext'

export const metadata: Metadata = {
  title: 'TiiBnTick Agency',
  description: 'Plateforme de gestion pour agences de livraison TiiBnTick',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
