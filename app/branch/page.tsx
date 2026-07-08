'use client';

import { useMemo, useState } from 'react';
import { Users, Truck, Package, MapPin, TrendingUp, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useBranchOperationalData } from '@/lib/branch/useBranchOperationalData';
import { buildBranchActions, buildShiftSummary } from '@/lib/branch/actionQueue';
import BranchActionQueue from '@/components/branch/BranchActionQueue';
import HubAlertBanner from '@/components/branch/HubAlertBanner';
import BranchShiftSummaryCard from '@/components/branch/BranchShiftSummaryCard';
import QuickDispatchModal from '@/components/branch/QuickDispatchModal';
import BranchMorningBriefing from '@/components/branch/BranchMorningBriefing';
import BranchEscalationModal from '@/components/branch/BranchEscalationModal';
import BranchBenchmarkCard from '@/components/branch/BranchBenchmarkCard';
import { useBranchBenchmarkFromSession } from '@/lib/branch/useBranchBenchmark';
import type { Mission, MissionStatus } from '@/lib/types';

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

function KpiCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: number | string; sub?: string; color: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs font-medium text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function BranchDashboard() {
  const { data, loading, refresh, branchId } = useBranchOperationalData();
  const { rows: benchmarkRows } = useBranchBenchmarkFromSession();
  const [dispatchMissionId, setDispatchMissionId] = useState<string | null>(null);
  const [escalationMissionId, setEscalationMissionId] = useState<string | null>(null);

  const actions = useMemo(() => {
    if (!data) return [];
    return buildBranchActions(data.missions, data.hubs, data.parcels, data.deliverers);
  }, [data]);

  const shiftSummary = useMemo(() => {
    if (!data) return null;
    return buildShiftSummary(data.missions);
  }, [data]);

  const dispatchMission = data?.missions.find(m => m.id === dispatchMissionId) ?? null;
  const escalationMission = data?.missions.find(m => m.id === escalationMissionId) ?? null;

  if (loading || !data) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[40vh]">
        <span className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { branch, staff, vehicles, missions, hubs } = {
    branch: data.branch,
    staff: data.deliverers,
    vehicles: data.vehicles,
    missions: data.missions,
    hubs: data.hubs,
  };

  const activeStaff = staff.filter(d => d.status === 'AVAILABLE' || d.status === 'ON_MISSION').length;
  const availableVehicles = vehicles.filter(v => v.status === 'AVAILABLE').length;
  const activeMissions = missions.filter(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT');
  const deliveredToday = missions.filter(m => m.status === 'DELIVERED').length;
  const hubOccupancy = hubs.reduce((s, h) => s + h.currentOccupancy, 0);
  const hubCapacity = hubs.reduce((s, h) => s + h.capacity, 0);

  const recentMissions = [...missions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{branch.name}</h1>
        <p className="text-sm text-gray-400 mt-0.5">{branch.address} · {branch.openingHours}</p>
        {data.dashboard && (
          <p className="text-xs text-gray-500 mt-1">
            API dashboard · {data.dashboard.deliverersCount} livreurs · {data.dashboard.hubsCount} hubs · statut {data.dashboard.status}
          </p>
        )}
      </div>

      <HubAlertBanner hubs={hubs} />

      <BranchMorningBriefing branchId={branch.id} authorName={branch.managerName} />

      <BranchActionQueue
        actions={actions}
        onDispatch={id => setDispatchMissionId(id)}
        onEscalate={id => setEscalationMissionId(id)}
      />

      {shiftSummary && (
        <BranchShiftSummaryCard summary={shiftSummary} branchName={branch.name} missions={missions} />
      )}

      {branchId && benchmarkRows.length > 1 && (
        <BranchBenchmarkCard rows={benchmarkRows} currentBranchId={branchId} />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Users} label="Personnel actif" value={activeStaff} sub={data.dashboard ? `${data.dashboard.deliverersCount} (API)` : `${staff.length} total`} color="bg-indigo-50 text-indigo-600" />
        <KpiCard icon={Truck} label="Véhicules dispo" value={availableVehicles} sub={`${vehicles.length} total`} color="bg-orange-50 text-orange-600" />
        <KpiCard icon={Package} label="Missions en cours" value={activeMissions.length} sub={`${deliveredToday} livrées`} color="bg-blue-50 text-blue-600" />
        <KpiCard icon={MapPin} label="Hubs relais" value={data.dashboard?.hubsCount ?? hubs.length} sub={hubCapacity > 0 ? `${hubOccupancy}/${hubCapacity} colis` : 'Aucun hub'} color="bg-violet-50 text-violet-600" />
      </div>

      {activeMissions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
            <TrendingUp size={15} className="text-orange-500" />
            <p className="text-sm font-semibold text-gray-900">En cours maintenant</p>
            <span className="ml-auto text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{activeMissions.length}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {activeMissions.slice(0, 5).map(m => (
              <div key={m.id} className="px-5 py-3 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.status === 'IN_TRANSIT' ? 'bg-blue-400' : 'bg-indigo-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 font-mono">{m.manifestNumber}</p>
                  <p className="text-xs text-gray-400 truncate">{m.delivererName ?? 'Non assigné'} → {m.recipientName}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[m.status]}`}>
                  {STATUS_LABELS[m.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-600 shrink-0" />
          <div>
            <p className="text-lg font-bold text-emerald-700">{deliveredToday}</p>
            <p className="text-xs text-emerald-600">Livrées</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3">
          <Clock size={20} className="text-orange-500 shrink-0" />
          <div>
            <p className="text-lg font-bold text-orange-600">{missions.filter(m => m.status === 'PENDING').length}</p>
            <p className="text-xs text-orange-500">En attente</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-500 shrink-0" />
          <div>
            <p className="text-lg font-bold text-red-600">{missions.filter(m => m.status === 'FAILED').length}</p>
            <p className="text-xs text-red-500">Échouées</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900">Missions récentes</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left">
              <th className="px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Bordereau</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Destinataire</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Livreur</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              <th className="px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Montant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentMissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">Aucune mission pour cette antenne</td>
              </tr>
            ) : recentMissions.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-sm font-semibold font-mono text-gray-900">{m.manifestNumber}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-700">{m.recipientName}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600">{m.delivererName ?? <span className="italic text-gray-400">Non assigné</span>}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[m.status]}`}>{STATUS_LABELS[m.status]}</span>
                </td>
                <td className="px-5 py-3">
                  <p className="text-sm font-semibold text-gray-900">{m.sellingPrice.toLocaleString('fr-FR')} <span className="text-xs font-normal text-gray-400">{m.currency}</span></p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickDispatchModal
        open={!!dispatchMission}
        mission={dispatchMission}
        deliverers={staff}
        vehicles={vehicles}
        onClose={() => setDispatchMissionId(null)}
        onAssigned={() => void refresh()}
      />

      <BranchEscalationModal
        open={!!escalationMission}
        mission={escalationMission}
        branchName={branch.name}
        onClose={() => setEscalationMissionId(null)}
      />
    </div>
  );
}
