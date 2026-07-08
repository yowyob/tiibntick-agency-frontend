'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import type { Hub } from '@/lib/types';
import { isHubSaturated, hubOccupancyPct } from '@/lib/branch/actionQueue';

interface Props {
  hubs: Hub[];
  href?: string;
}

export default function HubAlertBanner({ hubs, href = '/branch/hubs' }: Props) {
  const saturated = hubs.filter(isHubSaturated);
  if (saturated.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-start gap-3">
      <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-800">
          {saturated.length} hub{saturated.length > 1 ? 's' : ''} proche{saturated.length > 1 ? 's' : ''} de la saturation
        </p>
        <ul className="mt-1 space-y-0.5">
          {saturated.map(h => (
            <li key={h.id} className="text-xs text-red-700">
              {h.name} — {hubOccupancyPct(h)}% ({h.currentOccupancy}/{h.capacity} colis)
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={href}
        className="text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg shrink-0"
      >
        Voir hubs
      </Link>
    </div>
  );
}
