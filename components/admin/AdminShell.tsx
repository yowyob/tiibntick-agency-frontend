'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  ClipboardList,
  Building2,
  LogOut,
} from 'lucide-react';
import { authService } from '@/lib/services/authService';

const NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/onboarding', label: 'Inscriptions', icon: ClipboardList },
  { href: '/admin/agencies', label: 'Agences', icon: Building2 },
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-56 shrink-0 border-r border-slate-800 flex flex-col">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-orange-500" />
            <div>
              <p className="font-semibold text-sm">TiiBnTick Admin</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Plateforme</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(item => {
            const active =
              'exact' in item && item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-orange-500/15 text-orange-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => authService.logout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
