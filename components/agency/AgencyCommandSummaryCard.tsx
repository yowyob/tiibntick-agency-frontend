'use client';

import { ClipboardList, RefreshCw } from 'lucide-react';
import type { AgencyCommandSummary } from '@/lib/agency/actionQueue';

interface Props {
  summary: AgencyCommandSummary;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function AgencyCommandSummaryCard({ summary, onRefresh, refreshing }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList size={16} className="text-orange-500" />
        <p className="text-sm font-semibold text-gray-900 flex-1">Vue opérationnelle réseau</p>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="p-1.5 rounded-lg border border-gray-200 hover:border-orange-300 text-gray-500"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Cell label="En cours" value={summary.active} />
        <Cell label="Livrées" value={summary.delivered} accent="emerald" />
        <Cell label="En attente" value={summary.pending} accent="orange" />
        <Cell label="Échouées" value={summary.failed} accent="red" />
        <Cell label="Antennes" value={summary.branchesCount} />
        <Cell label="Hubs saturés" value={summary.hubsSaturated} accent={summary.hubsSaturated > 0 ? 'red' : undefined} />
      </div>
      <p className="text-xs text-gray-400 mt-3 text-right">
        CA livré : <strong className="text-violet-700">{summary.revenueXaf.toLocaleString('fr-FR')} XAF</strong>
      </p>
    </div>
  );
}

function Cell({ label, value, accent }: { label: string; value: number; accent?: 'emerald' | 'orange' | 'red' }) {
  const color = accent === 'emerald' ? 'text-emerald-700' : accent === 'orange' ? 'text-orange-600' : accent === 'red' ? 'text-red-600' : 'text-gray-900';
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}
