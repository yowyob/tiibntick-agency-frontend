/**
 * Types des réponses brutes du backend tnt-agency.
 * Ces types reflètent exactement ce que l'API Spring Boot retourne en JSON.
 */

export interface AddressDto {
  street?: string;
  landmark?: string;
  quarter?: string;
  city: string;
  region?: string;
  country: string;
  postalCode?: string;
  lat?: number;
  lon?: number;
}

export interface AgencySettingsDto {
  id: string;
  autoAssignMissions: boolean;
  allowFreelancerAssociation: boolean;
  hubRetentionDelayHours: number;
  defaultCurrency: string;
  defaultCommissionRate: number;
  maxActiveBranches: number;
  timezone: string;
}

export interface AgencyDto {
  id: string;
  tenantId: string;
  name: string;
  agencyCode: string;
  type: string;           // AgencyType backend enum
  status: string;         // AgencyStatus backend enum
  registrationNumber: string;
  address: AddressDto;
  contactEmail: string;
  contactPhone: string;
  logoUrl?: string;
  website?: string;
  settings?: AgencySettingsDto;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface BranchDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  name: string;
  code: string;
  managerId?: string;
  managerName?: string;
  status: string;
  address?: AddressDto;
  /** BranchResponse backend (city/country only) */
  city?: string;
  country?: string;
  deliverersCount?: number;
  openingHours?: string;
  createdAt: string;
  updatedAt?: string;
  version?: number;
}

export interface DelivererDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  branchId?: string;
  branchName?: string;
  actorId?: string;
  status: string;
  joinedAt: string;
  suspendedAt?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  delivererType?: string;
  rating?: number;
  totalMissions?: number;
  vehicleId?: string;
  vehiclePlate?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface ContractDto {
  id: string;
  tenantId: string;
  agencyId: string;
  delivererId: string;
  delivererName: string;
  contractType: string;       // ContractType enum
  startDate: string;
  endDate?: string;
  remunerationModel: string;  // RemunerationModel enum (maps to RemunerationType)
  baseSalary?: number;
  commissionRate?: number;
  status: string;             // ContractStatus
  currency: string;
  terms?: string;
  signedAt: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface VehicleDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  registrationNumber?: string;
  licensePlate?: string;
  brand?: string;
  model: string;
  year?: number;
  vehicleType: string;
  status: string;
  maxWeightKg?: number;
  maxVolumeM3?: number;
  assignedDelivererId?: string;
  assignedDelivererName?: string;
  branchId?: string;
  branchName?: string;
  lastMaintenanceDate?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  photoUrl?: string;
  source?: string;
  fleetmanVehicleId?: string;
}

export interface MissionDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  branchId?: string;
  branchName?: string;
  coreMissionId?: string;
  manifestNumber?: string;
  assignedDelivererId?: string;
  assignedDelivererName?: string;
  assignedVehicleId?: string;
  vehiclePlate?: string;
  status: string;
  priority?: string;
  senderName?: string;
  recipientName?: string;
  recipientPhone?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  scheduledPickupAt?: string;
  scheduledAt?: string;
  scheduledDeliveryAt?: string;
  actualPickupAt?: string;
  startedAt?: string;
  actualDeliveryAt?: string;
  completedAt?: string;
  packagesCount?: number;
  totalWeightKg?: number;
  weightKg?: number;
  distanceKm?: number;
  sellingPrice?: number;
  currency?: string;
  targetHubId?: string;
  targetHubName?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  cancellationReason?: string;
}

export interface HubDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  branchId?: string;
  branchName?: string;
  name: string;
  code?: string;
  status: string;
  capacityUnits?: number;
  capacity?: number;
  currentOccupancy?: number;
  availableSpace?: number;
  retentionDelayHours?: number;
  openingHours?: string;
  address?: AddressDto;
  city?: string;
  managerName?: string;
  managerPhone?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface HubParcelRecordDto {
  id: string;
  tenantId: string;
  hubId: string;
  hubName: string;
  missionId: string;
  manifestNumber: string;
  packageId: string;
  trackingCode: string;
  recipientName: string;
  depositedAt: string;
  withdrawalDeadline: string;
  withdrawnAt?: string;
  withdrawnBy?: string;
  status: string;             // DEPOSITED|WITHDRAWN|EXPIRED|RETURNED_TO_AGENCY
  identityVerified: boolean;
  blockchainTxHash?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface BillingPolicyDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  name: string;
  description?: string;
  isDefault?: boolean;
  status: string;
  validFrom?: string;
  validTo?: string;
  basePrice?: number;
  perKmRate?: number;
  perKgRate?: number;
  pricePerKm?: number;
  pricePerKg?: number;
  minPrice?: number;
  currency: string;
  rulesCount?: number;
  promotionsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface InvoiceDto {
  id: string;
  tenantId?: string;
  agencyId: string;
  missionId: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface CommissionRecordDto {
  id: string;
  tenantId: string;
  agencyId: string;
  delivererId: string;
  delivererName: string;
  missionId?: string;
  manifestNumber?: string;
  amount: number;
  currency: string;
  status: string;             // CommissionStatus
  disputeReason?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface FreelancerAssociationDto {
  id: string;
  tenantId: string;
  agencyId: string;
  freelancerActorId: string;
  freelancerName: string;
  phone: string;
  commissionRate: number;
  startDate: string;
  endDate?: string;
  status: string;             // AssociationStatus
  assignedMissionsCount?: number;
  associatedAt: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface DashboardDto {
  missionsToday: number;
  missionsInProgress: number;
  missionsDelivered: number;
  activeDeliverers: number;
  totalDeliverers: number;
  availableVehicles: number;
  totalVehicles: number;
  revenueThisMonth: number;
  currency: string;
  missionStatusCounts: Record<string, number>;
}

export interface NotificationDto {
  id: string;
  type: string;
  eventType: string;
  title: string;
  body: string;
  href: string;
  read: boolean;
  createdAt: string;
}
