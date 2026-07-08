'use client';

import { useState } from 'react';
import type { DelivererStatus } from '@/lib/types';

const OPTIONS: { value: 'AVAILABLE' | 'OFFLINE'; label: string; color: string; activeColor: string }[] = [
  { value: 'AVAILABLE', label: 'Disponible', color: 'border-emerald-200 text-emerald-700', activeColor: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'OFFLINE', label: 'Hors ligne', color: 'border-gray-200 text-gray-600', activeColor: 'bg-gray-600 text-white border-gray-600' },
];

interface Props {
  status: DelivererStatus;
  onChange: (status: 'AVAILABLE' | 'OFFLINE') => Promise<void>;
  disabled?: boolean;
}

export default function DelivererStatusToggle({ status, onChange, disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const locked = status === 'ON_MISSION' || status === 'SUSPENDED' || status === 'INACTIVE';

  const handleSelect = async (value: 'AVAILABLE' | 'OFFLINE') => {
    if (locked || disabled || loading || status === value) return;
    setLoading(true);
    try {
      await onChange(value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-800">Statut opérationnel</p>
        {status === 'ON_MISSION' && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
            En mission
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map(opt => {
          const active = status === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={locked || disabled || loading}
              onClick={() => handleSelect(opt.value)}
              className={`h-11 rounded-xl border text-sm font-semibold transition-all ${
                active ? opt.activeColor : opt.color
              } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {locked && status === 'ON_MISSION' && (
        <p className="text-[11px] text-gray-400 mt-2">Terminez votre mission pour changer de statut.</p>
      )}
    </div>
  );
}
