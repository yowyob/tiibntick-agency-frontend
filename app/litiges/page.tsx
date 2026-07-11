'use client';

import { useState, useCallback } from 'react';
import { AlertTriangle, Loader2, RefreshCw, Scale, ShieldAlert } from 'lucide-react';
import ComplianceDetailDrawer from '@/components/compliance/ComplianceDetailDrawer';
import {
  complianceService,
  type DisputeDetail,
  type DisputeItem,
  type IncidentDetail,
  type IncidentItem,
} from '@/lib/services/complianceService';
import { useService } from '@/lib/hooks/useService';
import { formatUserError } from '@/lib/errors';
import { disputeCategoryLabel, incidentTypeLabel } from '@/lib/displayLabels';

const DISPUTE_STATUS_LABELS: Record<string, string> = {
  OPEN: 'Ouvert',
  INVESTIGATING: 'Enquête',
  MEDIATION: 'Médiation',
  RESOLVED: 'Résolu',
  CLOSED: 'Clôturé',
  WITHDRAWN: 'Retiré',
};

const INCIDENT_STATUS_LABELS: Record<string, string> = {
  REPORTED: 'Signalé',
  TRIAGED: 'Trié',
  IN_PROGRESS: 'En cours',
  RESOLVED: 'Résolu',
  CLOSED: 'Clôturé',
  CANCELLED: 'Annulé',
};

function StatusBadge({ status, labels }: { status: string; labels: Record<string, string> }) {
  const label = labels[status] ?? status;
  const tone = status.includes('CLOSED') || status.includes('RESOLVED')
    ? 'bg-emerald-50 text-emerald-700'
    : status.includes('OPEN') || status.includes('REPORTED')
      ? 'bg-orange-50 text-orange-700'
      : 'bg-blue-50 text-blue-700';
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${tone}`}>
      {label}
    </span>
  );
}

export default function LitigesPage() {
  const [tab, setTab] = useState<'disputes' | 'incidents'>('disputes');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'dispute' | 'incident'>('dispute');
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [disputeDetail, setDisputeDetail] = useState<DisputeDetail | null>(null);
  const [incidentDetail, setIncidentDetail] = useState<IncidentDetail | null>(null);

  const { data: disputePage, loading: disputesLoading, error: disputesError, refetch: refetchDisputes } =
    useService(() => complianceService.listDisputes(), { items: [], page: 0, size: 20, total: 0, projectedFromCore: false });
  const { data: incidents, loading: incidentsLoading, error: incidentsError, refetch: refetchIncidents } =
    useService(() => complianceService.listIncidents(), []);

  const loading = tab === 'disputes' ? disputesLoading : incidentsLoading;
  const error = tab === 'disputes' ? disputesError : incidentsError;

  const refetch = () => {
    if (tab === 'disputes') refetchDisputes();
    else refetchIncidents();
  };

  const openDispute = useCallback(async (item: DisputeItem) => {
    setDrawerMode('dispute');
    setDrawerOpen(true);
    setDrawerLoading(true);
    setDisputeDetail(null);
    setIncidentDetail(null);
    try {
      const detail = await complianceService.getDispute(item.id);
      setDisputeDetail(detail);
    } catch {
      setDisputeDetail({ ...item, evidenceCount: 0, projectedFromCore: false });
    } finally {
      setDrawerLoading(false);
    }
  }, []);

  const openIncident = useCallback(async (item: IncidentItem) => {
    setDrawerMode('incident');
    setDrawerOpen(true);
    setDrawerLoading(true);
    setDisputeDetail(null);
    setIncidentDetail(null);
    try {
      const detail = await complianceService.getIncident(item.id);
      setIncidentDetail(detail);
    } catch {
      setIncidentDetail({
        ...item,
        slaBreached: false,
        projectedFromCore: false,
      });
    } finally {
      setDrawerLoading(false);
    }
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Scale size={24} className="text-orange-500" />
            Litiges & incidents
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Réclamations clients et anomalies livreurs synchronisées depuis Core.
          </p>
        </div>
        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="inline-flex items-center gap-2 h-10 px-4 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          Actualiser
        </button>
      </div>

      {!disputePage.projectedFromCore && !disputesLoading && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>
            Les litiges et incidents sont affichés en mode local. Contactez un administrateur
            pour activer la synchronisation avec TiiBnTick Core.
          </p>
        </div>
      )}

      <div className="flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab('disputes')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === 'disputes'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Litiges clients ({disputePage.total})
        </button>
        <button
          type="button"
          onClick={() => setTab('incidents')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === 'incidents'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Incidents livraison ({incidents.length})
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {formatUserError(error, 'Impossible de charger les données compliance.')}
        </div>
      )}

      {tab === 'disputes' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3">Référence</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Colis / mission</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Déposé le</th>
              </tr>
            </thead>
            <tbody>
              {disputePage.items.length === 0 && !disputesLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                    Aucun litige client pour le moment.
                  </td>
                </tr>
              ) : (
                disputePage.items.map(d => (
                  <tr
                    key={d.id}
                    onClick={() => void openDispute(d)}
                    className="border-b border-gray-100 hover:bg-orange-50/50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-900">{d.reference}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} labels={DISPUTE_STATUS_LABELS} /></td>
                    <td className="px-4 py-3 text-sm text-gray-600">{disputeCategoryLabel(d.category)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{d.trackingCode ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{d.description}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {d.filedAt ? new Date(d.filedAt).toLocaleString('fr-FR') : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'incidents' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3">Référence</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Mission</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Signalé le</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 && !incidentsLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                    <ShieldAlert size={20} className="mx-auto mb-2 text-gray-300" />
                    Aucun incident signalé.
                  </td>
                </tr>
              ) : (
                incidents.map(i => (
                  <tr
                    key={i.id}
                    onClick={() => void openIncident(i)}
                    className="border-b border-gray-100 hover:bg-orange-50/50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-900">{i.referenceCode}</td>
                    <td className="px-4 py-3"><StatusBadge status={i.status} labels={INCIDENT_STATUS_LABELS} /></td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {incidentTypeLabel(i.type)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{i.referenceCode ? 'Liée' : '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{i.description}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {i.reportedAt ? new Date(i.reportedAt).toLocaleString('fr-FR') : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <ComplianceDetailDrawer
        mode={drawerMode}
        dispute={disputeDetail}
        incident={incidentDetail}
        open={drawerOpen}
        loading={drawerLoading}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
