'use client'

import { usePathname } from 'next/navigation'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import PageTransition from './PageTransition'
import AuthGuard from './AuthGuard'

const STANDALONE_PREFIXES = ['/login', '/register', '/pending', '/track', '/livreur', '/branch', '/admin', '/guide']

export default function LayoutController({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStandalone =
    pathname === '/' ||
    STANDALONE_PREFIXES.some(r => pathname === r || pathname.startsWith(r + '/'))

  if (isStandalone) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <AuthGuard>
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </div>
        </div>
      </AuthGuard>
    </ThemeProvider>
  )
}
