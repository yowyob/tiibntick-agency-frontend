export type AgencyType = 'SOLO' | 'SME' | 'ENTERPRISE' | 'ORGANIZATION_MEMBER'
export type AgencyStatus = 'PENDING_VALIDATION' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED' | 'CLOSED'
export type BranchStatus = 'OPEN' | 'TEMPORARILY_CLOSED' | 'PERMANENTLY_CLOSED'
export type HubStatus = 'OPEN' | 'FULL' | 'TEMPORARILY_CLOSED' | 'PERMANENTLY_CLOSED'
export type HubParcelStatus = 'DEPOSITED' | 'WITHDRAWN' | 'EXPIRED' | 'RETURNED_TO_AGENCY'
export type DelivererType = 'PERMANENT' | 'PART_TIME' | 'FREELANCER_ASSOCIATED'
export type DelivererStatus = 'AVAILABLE' | 'ON_MISSION' | 'OFFLINE' | 'SUSPENDED' | 'INACTIVE'
export type ContractType = 'PERMANENT_EMPLOYEE' | 'PART_TIME_EMPLOYEE' | 'FREELANCER_AGREEMENT' | 'INTERN'
export type ContractStatus = 'DRAFT' | 'SIGNED' | 'ACTIVE' | 'TERMINATED' | 'EXPIRED'
export type RemunerationType = 'PERCENTAGE_PER_DELIVERY' | 'FIXED_PER_DELIVERY' | 'MONTHLY_SALARY' | 'MIXED_SALARY_BONUS'
export type VehicleType = 'MOTORCYCLE' | 'CAR' | 'TRUCK_LIGHT' | 'TRUCK_HEAVY' | 'TRICYCLE' | 'BICYCLE' | 'ON_FOOT'
export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'IN_MAINTENANCE' | 'RETIRED'
export type MissionStatus = 'DRAFT' | 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'AT_HUB' | 'DELIVERED' | 'FAILED' | 'CANCELLED'
export type MissionPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
export type PackageStatus = 'REGISTERED' | 'PICKED_UP' | 'IN_TRANSIT' | 'AT_HUB' | 'DELIVERED' | 'RETURNED' | 'LOST'
export type PolicyStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
export type AssociationStatus = 'PENDING' | 'ACTIVE' | 'PAUSED' | 'TERMINATED'
export type CommissionStatus = 'CALCULATED' | 'VALIDATED' | 'PAID' | 'DISPUTED'
export type StaffRole = 'AGENCY_MANAGER' | 'BRANCH_MANAGER' | 'OPERATIONS_MANAGER' | 'ACCOUNTANT' | 'DISPATCHER'
export type StaffStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'

export interface Agency {
  id: string
  name: string
  legalName: string
  registrationNumber: string
  type: AgencyType
  status: AgencyStatus
  phone: string
  email: string
  address: string
  city: string
  country: string
  createdAt: string
  defaultCurrency: string
  autoAssignMissions: boolean
  maxAssociatedFreelancers: number
  maxActiveBranches?: number
  defaultCommissionRate?: number
  timezone?: string
  hubRetentionDelayHours: number
  allowFreelancerAssociation: boolean
  logoUrl?: string
  coverUrl?: string
}

export interface Branch {
  id: string
  agencyId: string
  name: string
  address: string
  city: string
  isHeadquarters: boolean
  managerId?: string
  managerName?: string
  managerEmail?: string
  managerPhone?: string
  status: BranchStatus
  openingHours: string
  deliverersCount: number
  createdAt: string
  photoUrl?: string
}

export interface Deliverer {
  id: string
  agencyId: string
  branchId?: string
  branchName?: string
  fullName: string
  phone: string
  email: string
  type: DelivererType
  status: DelivererStatus
  rating: number
  totalMissions: number
  activeMissionId?: string
  vehicleId?: string
  vehiclePlate?: string
  joinedAt: string
  photoUrl?: string
}

export interface Contract {
  id: string
  agencyId: string
  delivererId: string
  delivererName: string
  type: ContractType
  status: ContractStatus
  startDate: string
  endDate?: string
  remunerationType: RemunerationType
  rate: number
  currency: string
  terms?: string
}

export interface Vehicle {
  id: string
  agencyId: string
  registrationNumber: string
  model: string
  type: VehicleType
  status: VehicleStatus
  maxWeightKg: number
  maxVolumeM3: number
  assignedDelivererId?: string
  assignedDelivererName?: string
  branchId?: string
  branchName?: string
  lastMaintenanceDate?: string
  photoUrl?: string
}

export interface Mission {
  id: string
  agencyId: string
  branchId: string
  branchName: string
  manifestNumber: string
  delivererId?: string
  delivererName?: string
  vehiclePlate?: string
  status: MissionStatus
  priority: MissionPriority
  senderName: string
  recipientName: string
  recipientPhone: string
  pickupAddress: string
  deliveryAddress: string
  scheduledPickupAt: string
  scheduledDeliveryAt?: string
  actualPickupAt?: string
  actualDeliveryAt?: string
  packagesCount: number
  totalWeightKg: number
  sellingPrice: number
  currency: string
  targetHubId?: string
  targetHubName?: string
  invoiceId?: string
  createdAt: string
}

export interface Hub {
  id: string
  agencyId: string
  branchId?: string
  branchName?: string
  name: string
  code?: string
  address: string
  city: string
  capacity: number
  currentOccupancy: number
  maxRetentionDays: number
  status: HubStatus
  managerName?: string
  managerPhone?: string
  openingHours: string
  photoUrl?: string
}

export interface HubParcelRecord {
  id: string
  hubId: string
  hubName: string
  missionId: string
  manifestNumber: string
  trackingCode: string
  recipientName: string
  depositedAt: string
  expectedWithdrawalDeadline: string
  withdrawnAt?: string
  withdrawnBy?: string
  status: HubParcelStatus
}

export interface BillingPolicy {
  id: string
  agencyId: string
  name: string
  description?: string
  isDefault: boolean
  status: PolicyStatus
  validFrom: string
  validTo?: string
  basePrice: number
  perKmRate: number
  perKgRate: number
  currency: string
  rulesCount: number
  promotionsCount: number
}

export interface CommissionRecord {
  id: string
  agencyId: string
  delivererId: string
  delivererName: string
  missionId: string
  manifestNumber: string
  amount: number
  currency: string
  status: CommissionStatus
  calculatedAt: string
  paidAt?: string
}

export interface StaffMember {
  id: string
  agencyId: string
  branchId?: string
  branchName?: string
  fullName: string
  phone: string
  email: string
  role: StaffRole
  status: StaffStatus
  joinedAt: string
  photoUrl?: string
}

export interface FreelancerAssociation {
  id: string
  agencyId: string
  freelancerId: string
  freelancerName: string
  phone: string
  commissionRate: number
  assignedMissionsCount: number
  status: AssociationStatus
  associatedAt: string
  endedAt?: string
  photoUrl?: string
}
