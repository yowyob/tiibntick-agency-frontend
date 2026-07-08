'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { authService } from '@/lib/services/authService';

const LOGIN_PATH = '/admin/login';

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === LOGIN_PATH) {
      setReady(true);
      return;
    }

    void authService.refreshSession().then(session => {
      if (!session || !authService.isAdmin()) {
        router.replace(`${LOGIN_PATH}?from=${encodeURIComponent(pathname)}`);
        return;
      }
      setReady(true);
    });
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return <>{children}</>;
}
