'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Map, Wallet, User } from 'lucide-react';

const navItems = [
  { href: '/livreur', label: 'Accueil', icon: Home, exact: true },
  { href: '/livreur/missions', label: 'Missions', icon: Package },
  { href: '/livreur/carte', label: 'Carte', icon: Map },
  { href: '/livreur/gains', label: 'Gains', icon: Wallet },
  { href: '/livreur/profile', label: 'Profil', icon: User },
];

export default function LivreurNav() {
  const pathname = usePathname();
  if (pathname === '/livreur/login') return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 safe-bottom">
      <div className="flex">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
