import { isUuid } from '@/lib/errors';
import { STAFF_ROLE_LABELS } from '@/lib/staff-utils';
import type {
  Agency, Branch, Contract, CommissionRecord, Mission,
  StaffMember, FreelancerAssociation, BillingPolicy,
} from '@/lib/types';

/** Ne jamais afficher un UUID brut — renvoie une étiquette de secours. */
export function safeLabel(value: string | undefined | null, fallback: string): string {
  if (!value || isUuid(value)) return fallback;
  return value;
}

export function agencySubtitle(agency: Agency): string {
  if (agency.registrationNumber) return agency.registrationNumber;
  return [agency.city, agency.country].filter(Boolean).join(', ') || agency.name;
}

export function branchCardMeta(branch: Branch): string {
  return [branch.city, branch.openingHours].filter(Boolean).join(' · ');
}

export function branchDrawerDescription(branch: Branch): string {
  return branch.city || branch.address || 'Antenne';
}

export function missionSubtitle(mission: Mission): string {
  const date = mission.createdAt
    ? new Date(mission.createdAt).toLocaleDateString('fr-FR')
    : '';
  return [mission.branchName, date].filter(Boolean).join(' · ') || 'Mission';
}

export function contractTitle(contract: Contract): string {
  return contract.delivererName
    ? `Contrat — ${contract.delivererName}`
    : 'Contrat de travail';
}

export function contractRef(contract: Contract): string {
  const date = contract.startDate
    ? new Date(contract.startDate).toLocaleDateString('fr-FR')
    : '';
  if (contract.delivererName && date) return `${contract.delivererName} · ${date}`;
  return contract.delivererName || 'Contrat';
}

export function commissionTitle(commission: CommissionRecord): string {
  if (commission.manifestNumber) return `Commission — ${commission.manifestNumber}`;
  return commission.delivererName
    ? `Commission — ${commission.delivererName}`
    : 'Commission';
}

export function staffDescription(member: StaffMember): string {
  const role = STAFF_ROLE_LABELS[member.role] ?? member.role;
  return member.branchName ? `${role} · ${member.branchName}` : role;
}

export function freelancerDescription(f: FreelancerAssociation): string {
  return f.phone ? `Freelancer · ${f.phone}` : 'Freelancer associé';
}

export function policyMeta(policy: BillingPolicy): string {
  const parts: string[] = [];
  if (policy.validFrom) {
    parts.push(`Active depuis le ${new Date(policy.validFrom).toLocaleDateString('fr-FR')}`);
  }
  if (policy.validTo) {
    parts.push(`Expire le ${new Date(policy.validTo).toLocaleDateString('fr-FR')}`);
  }
  return parts.join(' · ');
}

export function delivererDisplayName(name: string | undefined): string {
  return safeLabel(name, 'Livreur');
}

export function manifestDisplay(manifest: string | undefined): string {
  return safeLabel(manifest, 'Bordereau en cours');
}

const PARCEL_STATUS_LABELS: Record<string, string> = {
  DEPOSITED: 'Déposé au hub — en attente de retrait',
  WITHDRAWN: 'Retiré par le destinataire',
  EXPIRED: 'Délai de retrait dépassé',
  RETURNED_TO_AGENCY: 'Retourné à l\'agence',
};

export function parcelStatusLabel(status: string): string {
  return PARCEL_STATUS_LABELS[status] ?? 'Statut inconnu';
}

const MISSION_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Mission enregistrée',
  ASSIGNED: 'Livreur assigné',
  IN_TRANSIT: 'En cours de livraison',
  AT_HUB: 'Arrivé au point relais',
  DELIVERED: 'Livré au destinataire',
  FAILED: 'Livraison échouée',
  CANCELLED: 'Mission annulée',
  DRAFT: 'Brouillon',
};

export function missionStatusLabel(status: string): string {
  return MISSION_STATUS_LABELS[status] ?? 'Étape logistique';
}

const DISPUTE_STATUS_LABELS: Record<string, string> = {
  OPEN: 'Ouvert',
  INVESTIGATING: 'Enquête en cours',
  MEDIATION: 'Médiation',
  RESOLVED: 'Résolu',
  CLOSED: 'Clôturé',
  WITHDRAWN: 'Retiré',
};

const DISPUTE_CATEGORY_LABELS: Record<string, string> = {
  DELAY: 'Retard de livraison',
  DAMAGE: 'Colis endommagé',
  LOSS: 'Colis perdu',
  BILLING: 'Facturation',
  SERVICE: 'Qualité de service',
  OTHER: 'Autre',
};

const DISPUTE_PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Basse',
  NORMAL: 'Normale',
  MEDIUM: 'Moyenne',
  HIGH: 'Haute',
  URGENT: 'Urgente',
};

const INCIDENT_STATUS_LABELS: Record<string, string> = {
  REPORTED: 'Signalé',
  TRIAGED: 'Trié',
  IN_PROGRESS: 'En cours',
  RESOLVED: 'Résolu',
  CLOSED: 'Clôturé',
  CANCELLED: 'Annulé',
};

const INCIDENT_TYPE_LABELS: Record<string, string> = {
  ACCIDENT: 'Accident',
  THEFT: 'Vol',
  DAMAGE: 'Dommage',
  DELAY: 'Retard',
  CUSTOMER_COMPLAINT: 'Plainte client',
  VEHICLE_BREAKDOWN: 'Panne véhicule',
  OTHER: 'Autre',
};

const INCIDENT_SEVERITY_LABELS: Record<string, string> = {
  LOW: 'Faible',
  MEDIUM: 'Moyenne',
  HIGH: 'Élevée',
  CRITICAL: 'Critique',
};

const INVOICE_STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Brouillon',
  ISSUED: 'Émise',
  SENT: 'Envoyée',
  PAID: 'Payée',
  OVERDUE: 'En retard',
  CANCELLED: 'Annulée',
  VOID: 'Annulée',
};

const AGENCY_STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  ACTIVE: 'Active',
  SUSPENDED: 'Suspendue',
  REJECTED: 'Refusée',
  CLOSED: 'Fermée',
};

export function disputeStatusLabel(status: string): string {
  return DISPUTE_STATUS_LABELS[status] ?? safeLabel(status, 'Statut inconnu');
}

export function disputeCategoryLabel(category: string): string {
  return DISPUTE_CATEGORY_LABELS[category] ?? safeLabel(category, 'Catégorie');
}

export function disputePriorityLabel(priority: string): string {
  return DISPUTE_PRIORITY_LABELS[priority] ?? safeLabel(priority, 'Priorité');
}

export function incidentStatusLabel(status: string): string {
  return INCIDENT_STATUS_LABELS[status] ?? safeLabel(status, 'Statut inconnu');
}

export function incidentTypeLabel(type: string): string {
  return INCIDENT_TYPE_LABELS[type] ?? safeLabel(type, 'Type d\'incident');
}

export function incidentSeverityLabel(severity: string): string {
  return INCIDENT_SEVERITY_LABELS[severity] ?? safeLabel(severity, 'Sévérité');
}

export function invoiceStatusLabel(status: string): string {
  return INVOICE_STATUS_LABELS[status] ?? safeLabel(status, 'Statut facture');
}

export function agencyStatusLabel(status: string): string {
  return AGENCY_STATUS_LABELS[status] ?? safeLabel(status, 'Statut');
}

/** Référence mission lisible — jamais un UUID tronqué. */
export function missionRefLabel(opts: {
  trackingCode?: string | null;
  manifestNumber?: string | null;
  reference?: string | null;
}): string {
  return (
    safeLabel(opts.trackingCode, '') ||
    safeLabel(opts.manifestNumber, '') ||
    safeLabel(opts.reference, '') ||
    'Mission liée'
  );
}
