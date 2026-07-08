import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { ToastProvider } from '@/contexts/ToastContext';
import BranchRegisterServiceWorker from '@/components/branch/BranchRegisterServiceWorker';
import BranchAppShell from './BranchAppShell';

export const metadata: Metadata = {
  title: 'Espace Antenne — TiiBnTick',
  description: 'Portail opérationnel antenne — dispatch, supervision GPS, hubs relais',
  manifest: '/branch-manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TiiBnTick Antenne',
  },
  icons: {
    icon: '/icons/branch-192.svg',
    apple: '/icons/branch-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
};

export default function BranchLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <BranchRegisterServiceWorker />
      <BranchAppShell>{children}</BranchAppShell>
    </ToastProvider>
  );
}
