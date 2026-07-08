'use client';

import { ClipboardList, Download } from 'lucide-react';
import type { BranchShiftSummary } from '@/lib/branch/actionQueue';
import type { Mission } from '@/lib/types';
import { downloadShiftReport } from '@/lib/branch/shiftExport';

interface Props {
  summary: BranchShiftSummary;
  branchName: string;
  missions?: Mission[];
}

export default function BranchShiftSummaryCard({ summary, branchName, missions = [] }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList size={16} className="text-orange-500" />
        <p className="text-sm font-semibold text-gray-900 flex-1">Bilan opérationnel — {branchName}</p>
        <button
          type="button"
          onClick={() => downloadShiftReport(branchName, summary, missions)}
          className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1.5 rounded-lg"
        >
          <Download size={12} />
          Export shift
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-900">{summary.active}</p>
          <p className="text-[10px] text-gray-500">En cours</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-emerald-700">{summary.delivered}</p>
          <p className="text-[10px] text-emerald-600">Livrées</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-orange-600">{summary.pending}</p>
          <p className="text-[10px] text-orange-500">En attente</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-red-600">{summary.failed}</p>
          <p className="text-[10px] text-red-500">Échouées</p>
        </div>
        <div className="bg-violet-50 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
          <p className="text-lg font-bold text-violet-700">{summary.revenueXaf.toLocaleString('fr-FR')}</p>
          <p className="text-[10px] text-violet-600">XAF livrées</p>
        </div>
      </div>
    </div>
  );
}
