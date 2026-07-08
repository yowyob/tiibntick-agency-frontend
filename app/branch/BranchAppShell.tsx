'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { branchAuthService, type BranchSession } from '@/lib/services/branchAuthService';
import { branchOperationsService } from '@/lib/services/branchOperationsService';
import BranchSidebar from './BranchSidebar';
import BranchNotificationBell from '@/components/branch/BranchNotificationBell';

export default function BranchAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<BranchSession | null>(null);
  const [agencyName, setAgencyName] = useState('TiiBnTick Agency');
  const [ready, setReady] = useState(false);

  const isLoginPage = pathname === '/branch/login';

  useEffect(() => {
    if (isLoginPage) { setReady(true); return; }
    if (!branchAuthService.isAuthenticated()) {
      router.replace('/branch/login');
      return;
    }
    const s = branchAuthService.getSession();
    setSession(s);
    if (s?.agencyId) {
      void branchOperationsService.getAgencyName(s.agencyId).then(setAgencyName);
    }
    setReady(true);
  }, [pathname, isLoginPage, router]);

  if (!ready) return null;

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <BranchSidebar branchName={session.branchName} managerName={session.managerName} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-900">{session.branchName}</p>
            <p className="text-xs text-gray-400">{agencyName}</p>
          </div>
          <div className="flex items-center gap-2">
            <BranchNotificationBell />
            <span className="text-[11px] font-semibold bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full">
              Espace Antenne
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
