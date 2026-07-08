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
