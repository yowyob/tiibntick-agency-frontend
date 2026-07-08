import type { Agency, Branch, Deliverer, Vehicle, Hub, Mission, BillingPolicy, CommissionRecord, StaffMember, Contract, FreelancerAssociation, HubParcelRecord } from '@/lib/types';
import type { AgencyDashboard, AgencyReport } from '@/lib/services/analyticsService';

export const EMPTY_MISSIONS: Mission[] = [];
export const EMPTY_DELIVERERS: Deliverer[] = [];
export const EMPTY_VEHICLES: Vehicle[] = [];
export const EMPTY_HUBS: Hub[] = [];
export const EMPTY_BRANCHES: Branch[] = [];
export const EMPTY_STAFF: StaffMember[] = [];
export const EMPTY_POLICIES: BillingPolicy[] = [];
export const EMPTY_COMMISSIONS: CommissionRecord[] = [];
export const EMPTY_CONTRACTS: Contract[] = [];
export const EMPTY_FREELANCERS: FreelancerAssociation[] = [];
export const EMPTY_HUB_PARCELS: HubParcelRecord[] = [];

export const EMPTY_AGENCY: Agency = {
  id: '',
  name: '',
  legalName: '',
  registrationNumber: '',
  type: 'SME',
  status: 'ACTIVE',
  phone: '',
  email: '',
  address: '',
  city: '',
  country: '',
  defaultCurrency: 'XAF',
  autoAssignMissions: false,
  allowFreelancerAssociation: false,
  maxAssociatedFreelancers: 0,
  hubRetentionDelayHours: 72,
  createdAt: '',
};

export const EMPTY_DASHBOARD: AgencyDashboard = {
  agencyId: '',
  branchesCount: 0,
  deliverersCount: 0,
  hubsCount: 0,
  vehiclesCount: 0,
  activeMissionsCount: 0,
  pendingCommissionsCount: 0,
};

export const EMPTY_REPORT: AgencyReport = {
  agencyId: '',
  missionsByStatus: {},
  commissionsByStatus: {},
};
