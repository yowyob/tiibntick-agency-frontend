/**
 * Mappers: DTO backend → types frontend
 *
 * Divergences enum à gérer :
 *   VehicleStatus : backend ASSIGNED  → frontend IN_USE
 *   VehicleType   : backend VAN       → frontend TRUCK_LIGHT
 *                   backend TRUCK     → frontend TRUCK_HEAVY
 *   HubStatus     : backend ACTIVE    → frontend OPEN
 */

import type {
  AgencyDto, BranchDto, DelivererDto, ContractDto, VehicleDto,
  MissionDto, HubDto, HubParcelRecordDto, BillingPolicyDto,
  CommissionRecordDto, FreelancerAssociationDto,
} from './dto';
import type {
  Agency, Branch, Deliverer, Contract, Vehicle, Mission,
  Hub, HubParcelRecord, BillingPolicy, CommissionRecord, FreelancerAssociation,
  VehicleStatus, VehicleType, HubStatus,
} from '@/lib/types';
import { delivererDisplayName, manifestDisplay } from '@/lib/displayLabels';

/**
 * Normalise un taux API vers un pourcentage affichable (15 = « 15 % »).
 * Gère 0.15 (décimal) et 15 (points) — voir CommissionCalculationService (÷ 100).
 */
export function normalizePercentRate(raw: number | string | undefined | null): number {
  if (raw == null || raw === '') return 0;
  const n = Number(raw);
  if (Number.isNaN(n)) return 0;
  return n > 0 && n <= 1 ? n * 100 : n;
}

/** Envoie le % UI tel que le backend le consomme (points, ex. 15 pour 15 %). */
export function toApiCommissionRate(displayPercent: number): number {
  return displayPercent;
}

// ── Enum mappers ──────────────────────────────────────────

function mapVehicleStatus(s: string): VehicleStatus {
  if (s === 'ASSIGNED') return 'IN_USE';
  return s as VehicleStatus;
}

function mapVehicleType(t: string): VehicleType {
  if (t === 'VAN')   return 'TRUCK_LIGHT';
  if (t === 'TRUCK') return 'TRUCK_HEAVY';
  return t as VehicleType;
}

function mapHubStatus(s: string): HubStatus {
  if (s === 'ACTIVE') return 'OPEN';
  return s as HubStatus;
}

// Reverse mappers (frontend → backend) pour les mutations

export function toBackendVehicleStatus(s: VehicleStatus): string {
  if (s === 'IN_USE') return 'ASSIGNED';
  return s;
}

export function toBackendVehicleType(t: VehicleType): string {
  if (t === 'TRUCK_LIGHT') return 'VAN';
  if (t === 'TRUCK_HEAVY') return 'TRUCK';
  return t;
}

export function toBackendHubStatus(s: HubStatus): string {
  if (s === 'OPEN') return 'OPEN';
  if (s === 'TEMPORARILY_CLOSED' || s === 'PERMANENTLY_CLOSED') return 'CLOSED';
  return s;
}

// ── Entity mappers ────────────────────────────────────────

export function mapAgency(dto: AgencyDto): Agency {
  const addr = dto.address;
  return {
    id: dto.id,
    name: dto.name,
    legalName: dto.name,
    registrationNumber: dto.registrationNumber,
    type: dto.type as Agency['type'],
    status: dto.status as Agency['status'],
    phone: dto.contactPhone,
    email: dto.contactEmail,
    address: addr
      ? [addr.street, addr.quarter].filter(Boolean).join(', ') || addr.city
      : '',
    city: addr?.city ?? '',
    country: addr?.country ?? 'CM',
    createdAt: dto.createdAt?.slice?.(0, 10) ?? String(dto.createdAt),
    defaultCurrency: dto.settings?.defaultCurrency ?? 'XAF',
    autoAssignMissions: dto.settings?.autoAssignMissions ?? false,
    maxAssociatedFreelancers: 20,
    maxActiveBranches: dto.settings?.maxActiveBranches ?? 10,
    defaultCommissionRate: normalizePercentRate(dto.settings?.defaultCommissionRate ?? 10),
    hubRetentionDelayHours: dto.settings?.hubRetentionDelayHours ?? 72,
    allowFreelancerAssociation: dto.settings?.allowFreelancerAssociation ?? false,
  };
}

export function mapBranch(dto: BranchDto): Branch {
  const city = dto.address?.city ?? dto.city ?? '';
  const country = dto.address?.country ?? dto.country ?? 'CM';
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    name: dto.name,
    address: [dto.address?.street, dto.address?.quarter].filter(Boolean).join(', ') || city,
    city,
    isHeadquarters: false,
    managerId: dto.managerId,
    managerName: dto.managerName,
    status: dto.status as Branch['status'],
    openingHours: dto.openingHours ?? '08:00–18:00',
    deliverersCount: dto.deliverersCount ?? 0,
    createdAt: dto.createdAt?.slice(0, 10) ?? '',
  };
}

export function mapDeliverer(dto: DelivererDto): Deliverer {
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    branchId: dto.branchId,
    branchName: dto.branchName,
    fullName: dto.fullName ? delivererDisplayName(dto.fullName) : 'Livreur sans nom',
    phone: dto.phone ?? '',
    email: dto.email ?? '',
    type: (dto.delivererType ?? 'PERMANENT') as Deliverer['type'],
    status: dto.status as Deliverer['status'],
    rating: dto.rating ?? 0,
    totalMissions: dto.totalMissions ?? 0,
    vehicleId: dto.vehicleId,
    vehiclePlate: dto.vehiclePlate,
    joinedAt: dto.joinedAt?.slice(0, 10) ?? '',
  };
}

export function mapContract(dto: ContractDto): Contract {
  const rate = dto.baseSalary != null
    ? Number(dto.baseSalary)
    : normalizePercentRate(dto.commissionRate);
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    delivererId: dto.delivererId,
    delivererName: dto.delivererName ?? '',
    type: dto.contractType as Contract['type'],
    status: dto.status as Contract['status'],
    startDate: dto.startDate,
    endDate: dto.endDate,
    remunerationType: dto.remunerationModel as Contract['remunerationType'],
    rate,
    currency: dto.currency ?? 'XAF',
    terms: dto.terms,
  };
}

export function mapVehicle(dto: VehicleDto): Vehicle {
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    registrationNumber: dto.registrationNumber ?? dto.licensePlate ?? '',
    model: dto.model ?? dto.brand ?? '',
    type: mapVehicleType(dto.vehicleType),
    status: mapVehicleStatus(dto.status),
    maxWeightKg: dto.maxWeightKg ?? 0,
    maxVolumeM3: dto.maxVolumeM3 ?? 0,
    assignedDelivererId: dto.assignedDelivererId,
    assignedDelivererName: dto.assignedDelivererName,
    branchId: dto.branchId,
    branchName: dto.branchName,
    lastMaintenanceDate: dto.lastMaintenanceDate,
    photoUrl: dto.photoUrl,
    source: dto.source === 'FLEETMAN' ? 'FLEETMAN' : 'AGENCY',
    fleetmanVehicleId: dto.fleetmanVehicleId,
  };
}

export function mapMission(dto: MissionDto): Mission {
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    branchId: dto.branchId ?? '',
    branchName: dto.branchName ?? '',
    manifestNumber: manifestDisplay(dto.manifestNumber),
    delivererId: dto.assignedDelivererId,
    delivererName: dto.assignedDelivererName,
    vehiclePlate: dto.vehiclePlate,
    status: dto.status as Mission['status'],
    priority: (dto.priority ?? 'NORMAL') as Mission['priority'],
    senderName: dto.senderName ?? '',
    recipientName: dto.recipientName ?? '',
    recipientPhone: dto.recipientPhone ?? '',
    pickupAddress: dto.pickupAddress ?? '',
    deliveryAddress: dto.deliveryAddress ?? '',
    scheduledPickupAt: dto.scheduledPickupAt ?? dto.scheduledAt ?? '',
    scheduledDeliveryAt: dto.scheduledDeliveryAt,
    actualPickupAt: dto.actualPickupAt ?? dto.startedAt,
    actualDeliveryAt: dto.actualDeliveryAt ?? dto.completedAt,
    packagesCount: dto.packagesCount ?? 1,
    totalWeightKg: dto.totalWeightKg ?? dto.weightKg ?? 0,
    sellingPrice: dto.sellingPrice ?? (dto as { quotedAmount?: number }).quotedAmount ?? 0,
    currency: dto.currency ?? 'XAF',
    targetHubId: dto.targetHubId,
    targetHubName: dto.targetHubName,
    createdAt: dto.createdAt?.slice(0, 10) ?? '',
  };
}

export function mapHub(dto: HubDto): Hub {
  const city = dto.address?.city ?? dto.city ?? '';
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    branchId: dto.branchId,
    branchName: dto.branchName,
    name: dto.name,
    code: dto.code,
    address: [dto.address?.street, dto.address?.quarter].filter(Boolean).join(', ') || city,
    city,
    capacity: dto.capacityUnits ?? dto.capacity ?? 0,
    currentOccupancy: dto.currentOccupancy ?? 0,
    maxRetentionDays: dto.retentionDelayHours
      ? Math.max(1, Math.round(dto.retentionDelayHours / 24))
      : 3,
    status: mapHubStatus(dto.status),
    managerName: dto.managerName,
    managerPhone: dto.managerPhone,
    openingHours: dto.openingHours ?? '08:00–18:00',
  };
}

export function mapHubParcelRecord(dto: HubParcelRecordDto): HubParcelRecord {
  return {
    id: dto.id,
    hubId: dto.hubId,
    hubName: dto.hubName,
    missionId: dto.missionId,
    manifestNumber: dto.manifestNumber,
    trackingCode: dto.trackingCode,
    recipientName: dto.recipientName,
    depositedAt: dto.depositedAt,
    expectedWithdrawalDeadline: dto.withdrawalDeadline,
    withdrawnAt: dto.withdrawnAt,
    withdrawnBy: dto.withdrawnBy,
    status: dto.status as HubParcelRecord['status'],
  };
}

export function mapBillingPolicy(dto: BillingPolicyDto): BillingPolicy {
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    name: dto.name,
    description: dto.description,
    isDefault: dto.isDefault ?? false,
    status: dto.status as BillingPolicy['status'],
    validFrom: dto.validFrom ?? dto.createdAt?.slice(0, 10) ?? '',
    validTo: dto.validTo,
    basePrice: dto.basePrice ?? 0,
    perKmRate: dto.perKmRate ?? dto.pricePerKm ?? 0,
    perKgRate: dto.perKgRate ?? dto.pricePerKg ?? 0,
    currency: dto.currency,
    rulesCount: dto.rulesCount ?? 0,
    promotionsCount: dto.promotionsCount ?? 0,
  };
}

export function mapFreelancer(dto: FreelancerAssociationDto): FreelancerAssociation {
  const rate = normalizePercentRate(dto.commissionRate);
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    freelancerId: dto.freelancerActorId,
    freelancerName: dto.freelancerName ?? dto.phone ?? 'Freelancer associé',
    phone: dto.phone ?? '',
    commissionRate: rate,
    assignedMissionsCount: dto.assignedMissionsCount ?? 0,
    status: dto.status as FreelancerAssociation['status'],
    associatedAt: dto.associatedAt ?? dto.startDate ?? '',
  };
}

export function mapCommission(dto: CommissionRecordDto): CommissionRecord {
  return {
    id: dto.id,
    agencyId: dto.agencyId,
    delivererId: dto.delivererId,
    delivererName: dto.delivererName ?? '',
    missionId: dto.missionId ?? '',
    manifestNumber: dto.manifestNumber ?? '',
    amount: dto.amount,
    currency: dto.currency,
    status: dto.status as CommissionRecord['status'],
    calculatedAt: dto.createdAt,
    paidAt: dto.paidAt,
  };
}
