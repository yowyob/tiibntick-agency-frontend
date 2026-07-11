'use client';

import { Loader2 } from 'lucide-react';
import Drawer from '@/components/forms/Drawer';
import type { DisputeDetail, IncidentDetail } from '@/lib/services/complianceService';
import {
  disputeCategoryLabel,
  disputePriorityLabel,
  disputeStatusLabel,
  incidentSeverityLabel,
  incidentStatusLabel,
  incidentTypeLabel,
  missionRefLabel,
} from '@/lib/displayLabels';

interface Props {
  mode: 'dispute' | 'incident';
  dispute: DisputeDetail | null;
  incident: IncidentDetail | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right break-words">{value}</span>
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleString('fr-FR');
}

export default function ComplianceDetailDrawer({
  mode, dispute, incident, open, loading, onClose,
}: Props) {
  const title = mode === 'dispute' ? 'Détail litige' : 'Détail incident';
  const reference = mode === 'dispute' ? dispute?.reference : incident?.referenceCode;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      description={reference ?? ''}
      size="md"
    >
      {loading ? (
        <div className="p-12 flex justify-center text-gray-400">
          <Loader2 size={28} className="animate-spin" />
        </div>
      ) : mode === 'dispute' && dispute ? (
        <div className="p-6 space-y-2">
          <Row label="Statut" value={disputeStatusLabel(dispute.status)} />
          <Row label="Catégorie" value={disputeCategoryLabel(dispute.category)} />
          <Row label="Priorité" value={disputePriorityLabel(dispute.priority)} />
          <Row
            label="Mission"
            value={missionRefLabel({
              trackingCode: dispute.trackingCode,
              reference: dispute.reference,
            })}
          />
          <Row label="Tracking" value={dispute.trackingCode ?? '—'} />
          <Row label="Preuves" value={String(dispute.evidenceCount)} />
          <Row label="Déposé le" value={formatDate(dispute.filedAt)} />
          <Row label="Échéance SLA" value={formatDate(dispute.deadline)} />
          <div className="pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{dispute.description}</p>
          </div>
        </div>
      ) : mode === 'incident' && incident ? (
        <div className="p-6 space-y-2">
          <Row label="Statut" value={incidentStatusLabel(incident.status)} />
          <Row label="Type" value={incidentTypeLabel(incident.type)} />
          <Row
            label="Sévérité"
            value={incident.severity ? incidentSeverityLabel(incident.severity) : '—'}
          />
          <Row
            label="Mission"
            value={missionRefLabel({ reference: incident.referenceCode })}
          />
          <Row label="SLA dépassé" value={incident.slaBreached ? 'Oui' : 'Non'} />
          <Row label="Signalé le" value={formatDate(incident.reportedAt)} />
          <Row label="Résolu le" value={formatDate(incident.resolvedAt)} />
          <div className="pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{incident.description}</p>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-sm text-gray-400">Aucun détail disponible.</div>
      )}
    </Drawer>
  );
}
