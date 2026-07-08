import { getAgencyId } from '@/lib/session';
import { analyticsService, type AgencyDashboard, type AgencyReport } from '@/lib/services/analyticsService';
import { missionService } from '@/lib/services/missionService';
import { staffService } from '@/lib/services/staffService';
import { fleetService } from '@/lib/services/fleetService';
import { hubService } from '@/lib/services/hubService';
import { branchService } from '@/lib/services/branchService';
import { billingService } from '@/lib/services/billingService';
import { computeBranchBenchmarks, type BranchBenchmarkRow } from '@/lib/branch/branchBenchmark';
import type { Branch, CommissionRecord, Deliverer, Hub, HubParcelRecord, Mission, Vehicle } from '@/lib/types';

export interface AgencyOperationalData {
  dashboard: AgencyDashboard;
  reports: AgencyReport;
  missions: Mission[];
  deliverers: Deliverer[];
  vehicles: Vehicle[];
  branches: Branch[];
  hubs: Hub[];
  parcels: HubParcelRecord[];
  commissions: CommissionRecord[];
}

export const agencyOperationsService = {
  async loadOperationalData(agencyId?: string): Promise<AgencyOperationalData> {
    const id = agencyId ?? getAgencyId();
    const [dashboard, reports, missions, deliverers, vehicles, branches, hubs, commissions] = await Promise.all([
      analyticsService.getDashboard(id),
      analyticsService.getReports(id),
      missionService.getMissions(id),
      staffService.getDeliverers(id),
      fleetService.getVehicles(id),
      branchService.getBranches(id),
      hubService.getHubs(id),
      staffService.getCommissions(id),
    ]);

    const hubIds = hubs.map(h => h.id);
    const parcels = hubIds.length > 0
      ? (await Promise.all(hubIds.map(hid => hubService.getParcelRecords(hid)))).flat()
      : [];

    return { dashboard, reports, missions, deliverers, vehicles, branches, hubs, parcels, commissions };
  },

  async loadBranchBenchmark(agencyId?: string): Promise<BranchBenchmarkRow[]> {
    const id = agencyId ?? getAgencyId();
    const [branches, missions, deliverers] = await Promise.all([
      branchService.getBranches(id),
      missionService.getMissions(id),
      staffService.getDeliverers(id),
    ]);
    const hq = branches.find(b => b.isHeadquarters)?.id ?? branches[0]?.id ?? '';
    return computeBranchBenchmarks(branches, missions, deliverers, hq);
  },

  async quickAssignMission(missionId: string, delivererId: string, vehicleId: string): Promise<void> {
    await missionService.assignMission(missionId, delivererId, vehicleId);
  },
};
