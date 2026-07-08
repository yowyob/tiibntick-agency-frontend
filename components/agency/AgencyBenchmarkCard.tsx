'use client';

import type { BranchBenchmarkRow } from '@/lib/branch/branchBenchmark';
import { Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Props {
  rows: BranchBenchmarkRow[];
}

export default function AgencyBenchmarkCard({ rows }: Props) {
  if (rows.length === 0) return null;

  const leader = rows[0];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
        <Trophy size={16} className="text-orange-500" />
        <p className="text-sm font-semibold text-gray-900">Performance des antennes</p>
        <Link href="/branches" className="ml-auto text-xs font-semibold text-orange-600 hover:underline">
          Voir antennes
        </Link>
      </div>

      {rows.length > 1 && leader && (
        <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-100 flex items-center gap-2 text-xs text-amber-800">
          <TrendingUp size={14} />
          Meilleure antenne : <strong>{leader.branchName}</strong> ({leader.successRate}% · {leader.delivered} livrées)
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-2 text-[10px] font-semibold text-gray-400 uppercase">Rang</th>
              <th className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase">Antenne</th>
              <th className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase">Livrées</th>
              <th className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase">En cours</th>
              <th className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase">Réussite</th>
              <th className="px-5 py-2 text-[10px] font-semibold text-gray-400 uppercase">Livreurs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(row => (
              <tr key={row.branchId} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-sm font-bold text-gray-700">#{row.rank}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.branchName}</td>
                <td className="px-4 py-3 text-sm text-emerald-700 font-semibold">{row.delivered}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{row.active}</td>
                <td className="px-4 py-3 text-sm font-semibold text-orange-600">{row.successRate}%</td>
                <td className="px-5 py-3 text-sm text-gray-600">{row.deliverersCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
