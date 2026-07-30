import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ToastProvider } from '@/contexts/ToastContext'
import HubAppShell from './HubAppShell'

export const metadata: Metadata = {
  title: 'Espace Hub — TiiBnTick Agency',
  description: 'Portail gérant de hub relais agence',
  robots: { index: false, follow: false },
}

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <HubAppShell>{children}</HubAppShell>
    </ToastProvider>
  )
}
