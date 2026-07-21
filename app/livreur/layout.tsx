import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { ToastProvider } from '@/contexts/ToastContext';
import LivreurNav from './LivreurNav';
import RegisterServiceWorker from '@/components/livreur/RegisterServiceWorker';

export const metadata: Metadata = {
  title: 'Espace Livreur — TiiBnTick',
  description: 'Application terrain livreur — missions, GPS, preuves de livraison, gains',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  manifest: '/livreur-manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TiiBnTick Livreur',
  },
  icons: {
    icon: '/icons/livreur-192.svg',
    apple: '/icons/livreur-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function LivreurLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <RegisterServiceWorker />
      <div className="min-h-screen bg-gray-50 livreur-app">
        <div className="mx-auto max-w-md min-h-screen flex flex-col relative">
          {children}
          <LivreurNav />
        </div>
      </div>
    </ToastProvider>
  );
}
