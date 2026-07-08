'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Package, Search, LayoutList, Map, RefreshCw, Zap } from 'lucide-react';
import { useBranchOperationalData } from '@/lib/branch/useBranchOperationalData';
import { useBranchLivePositions } from '@/lib/branch/useBranchLivePositions';
import type { Mission, MissionStatus } from '@/lib/types';
import MissionDetailDrawer from '@/components/MissionDetailDrawer';
import QuickDispatchModal from '@/components/branch/QuickDispatchModal';
import BranchEscalationModal from '@/components/branch/BranchEscalationModal';

const MissionsMap = dynamic(() => import('@/components/MissionsMap'), { ssr: false });

const STATUS_LABELS: Record<MissionStatus, string> = {
  DRAFT: 'Brouillon', PENDING: 'En attente', ASSIGNED: 'Assignée',
  IN_TRANSIT: 'En transit', AT_HUB: 'Au hub', DELIVERED: 'Livrée',
  FAILED: 'Échouée', CANCELLED: 'Annulée',
};
const STATUS_COLORS: Record<MissionStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-500', PENDING: 'bg-orange-50 text-orange-600',
  ASSIGNED: 'bg-indigo-50 text-indigo-700', IN_TRANSIT: 'bg-blue-50 text-blue-700',
  AT_HUB: 'bg-violet-50 text-violet-700', DELIVERED: 'bg-emerald-50 text-emerald-700',
  FAILED: 'bg-red-50 text-red-700', CANCELLED: 'bg-gray-100 text-gray-400',
};

const FILTERS: { label: string; value: MissionStatus | 'ALL' }[] = [
  { label: 'Toutes', value: 'ALL' },
  { label: 'En attente', value: 'PENDING' },
  { label: 'Assignées', value: 'ASSIGNED' },
  { label: 'En transit', value: 'IN_TRANSIT' },
  { label: 'Au hub', value: 'AT_HUB' },
  { label: 'Livrées', value: 'DELIVERED' },
  { label: 'Échouées', value: 'FAILED' },
];

const ACTIVE: MissionStatus[] = ['ASSIGNED', 'IN_TRANSIT'];

export default function BranchMissionsPage() {
  const { data, loading, refresh, branchId } = useBranchOperationalData();
  const [filter, setFilter] = useState<MissionStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selected, setSelected] = useState<Mission | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dispatchMissionId, setDispatchMissionId] = useState<string | null>(null);
  const [escalationMissionId, setEscalationMissionId] = useState<string | null>(null);
  const [rushMode, setRushMode] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [refreshing, setRefreshing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const all = data?.missions ?? [];
  const deliverers = data?.deliverers ?? [];
  const vehicles = data?.vehicles ?? [];
  const delivererIds = useMemo(() => deliverers.map(d => d.id), [deliverers]);
  const { livePositions } = useBranchLivePositions(delivererIds);

  const doRefresh = useCallback(async () => {
    setRefreshing(true);
    setCountdown(30);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (view !== 'map') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setCountdown(30);
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          void doRefresh();
          return 30;
        }
        return c - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [view, doRefresh]);

  if (!branchId) return null;
  if (loading || !data) {
    return (
      <div className="p-6 flex justify-center min-h-[40vh] items-center">
        <span className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const active = all.filter(m => ACTIVE.includes(m.status));
  const pendingUnassigned = all.filter(m => m.status === 'PENDING' && !m.delivererId);
  const dispatchMission = all.find(m => m.id === dispatchMissionId) ?? null;
  const escalationMission = all.find(m => m.id === escalationMissionId) ?? null;

  const filtered = all.filter(m => {
    const matchStatus = filter === 'ALL' || m.status === filter;
    const matchSearch = search === '' ||
      m.manifestNumber.toLowerCase().includes(search.toLowerCase()) ||
      m.recipientName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = FILTERS.reduce<Record<string, number>>((acc, f) => {
    acc[f.value] = f.value === 'ALL' ? all.length : all.filter(m => m.status === f.value).length;
    return acc;
  }, {});

  const openDetail = (m: Mission) => { setSelected(m); setDetailOpen(true); };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Missions</h1>
          <p className="text-sm text-gray-400 mt-0.5">{all.length} missions · {active.length} en cours</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRushMode(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              rushMode ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
            }`}
          >
            <Zap size={14} />
            Mode Rush
          </button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
            <button onClick={() => setView('list')} className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}>
              <LayoutList size={15} />
            </button>
            <button onClick={() => setView('map')} className={`p-1.5 rounded-md transition-colors ${view === 'map' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-400'}`}>
              <Map size={15} />
            </button>
          </div>
        </div>
      </div>

      {rushMode && pendingUnassigned.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
          <p className="text-sm font-semibold text-orange-800">Dispatch express — {pendingUnassigned.length} mission(s) en attente</p>
          <div className="flex flex-wrap gap-2">
            {pendingUnassigned.slice(0, 6).map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setDispatchMissionId(m.id)}
                className="px-3 py-2 bg-white border border-orange-200 rounded-lg text-xs font-semibold text-orange-700 hover:bg-orange-100"
              >
                {m.manifestNumber} → Assigner
              </button>
            ))}
          </div>
        </div>
      )}

      {!rushMode && (
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                filter === f.value ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {f.label} ({counts[f.value] ?? 0})
            </button>
          ))}
        </div>
      )}

      {view === 'list' && !rushMode && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Bordereau, destinataire…"
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
          <button type="button" onClick={() => void doRefresh()} disabled={refreshing} className="p-2 rounded-lg border border-gray-200 hover:border-orange-300 text-gray-500">
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      )}

      {view === 'map' && (
        <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: 'calc(100vh - 260px)', minHeight: 480 }}>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs text-gray-600">
              GPS live · refresh <strong>{countdown}s</strong>
            </span>
            <button onClick={() => void doRefresh()} disabled={refreshing} className="p-0.5 rounded-full text-gray-400 hover:text-orange-500">
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
          {active.length > 0 && (
            <div className="absolute left-3 top-14 z-[1000] bg-white/97 border border-gray-200 rounded-xl shadow-lg w-60 overflow-hidden">
              <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-700">En cours</p>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">{active.length}</span>
              </div>
              <div className="max-h-52 overflow-y-auto divide-y divide-gray-50">
                {active.map(m => (
                  <button key={m.id} onClick={() => openDetail(m)} className="w-full flex items-start gap-2 px-3 py-2.5 hover:bg-orange-50 text-left">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.status === 'IN_TRANSIT' ? 'bg-orange-400' : 'bg-indigo-400'}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900 font-mono truncate">{m.manifestNumber}</p>
                      <p className="text-[11px] text-gray-500 truncate">{m.delivererName ?? 'Non assigné'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <MissionsMap
            missions={filtered.length > 0 ? filtered : all}
            onMissionClick={openDetail}
            livePositions={livePositions}
          />
        </div>
      )}

      {view === 'list' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Bordereau</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Destinataire</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Package size={28} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-sm text-gray-400">Aucune mission</p>
                  </td>
                </tr>
              ) : filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 cursor-pointer" onClick={() => openDetail(m)}>
                    <p className="text-sm font-semibold font-mono text-gray-900">{m.manifestNumber}</p>
                  </td>
                  <td className="px-4 py-3.5 cursor-pointer" onClick={() => openDetail(m)}>
                    <p className="text-sm font-medium text-gray-900">{m.recipientName}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-gray-700">{m.delivererName ?? <span className="italic text-gray-400">Non assigné</span>}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[m.status]}`}>{STATUS_LABELS[m.status]}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {m.status === 'PENDING' && !m.delivererId && (
                      <button
                        type="button"
                        onClick={() => setDispatchMissionId(m.id)}
                        className="text-[11px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-lg"
                      >
                        Assigner
                      </button>
                    )}
                    {(m.status === 'FAILED' || (m.status === 'IN_TRANSIT' && m.delivererId)) && (
                      <button
                        type="button"
                        onClick={() => setEscalationMissionId(m.id)}
                        className="text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg ml-1"
                      >
                        Escalader
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MissionDetailDrawer mission={selected} open={detailOpen} onClose={() => setDetailOpen(false)} />

      <QuickDispatchModal
        open={!!dispatchMission}
        mission={dispatchMission}
        deliverers={deliverers}
        vehicles={vehicles}
        onClose={() => setDispatchMissionId(null)}
        onAssigned={() => void doRefresh()}
      />

      <BranchEscalationModal
        open={!!escalationMission}
        mission={escalationMission}
        branchName={data.branch.name}
        onClose={() => setEscalationMissionId(null)}
      />
    </div>
  );
}
