'use client';

import { Navigation, WifiOff } from 'lucide-react';

interface Props {
  tracking: boolean;
  error?: string | null;
  latitude?: number;
  longitude?: number;
}

export default function GpsTrackerBanner({ tracking, error, latitude, longitude }: Props) {
  if (error) {
    return (
      <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2.5">
        <WifiOff size={14} className="text-red-500 shrink-0" />
        <p className="text-xs text-red-700">GPS : {error}</p>
      </div>
    );
  }

  if (!tracking) return null;

  return (
    <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <Navigation size={14} className="text-emerald-600 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-emerald-800">Position partagée en temps réel</p>
        {latitude != null && longitude != null && (
          <p className="text-[10px] text-emerald-600 truncate font-mono">
            {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </p>
        )}
      </div>
    </div>
  );
}
