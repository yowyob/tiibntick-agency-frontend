import { branchPortalService, type BranchDashboard } from '@/lib/services/branchPortalService';
import { branchFetch } from '@/lib/services/branchPortalService';
import { mapAgency } from '@/lib/api/mappers';
import type { AgencyDto } from '@/lib/api/dto';
import type { Branch, Deliverer, Vehicle, Mission, Hub, HubParcelRecord } from '@/lib/types';
import { computeBranchBenchmarks, type BranchBenchmarkRow } from '@/lib/branch/branchBenchmark';

export interface BranchOperationalData {
  branch: Branch;
  dashboard: BranchDashboard | null;
  deliverers: Deliverer[];
  vehicles: Vehicle[];
  missions: Mission[];
  hubs: Hub[];
  parcels: HubParcelRecord[];
}

export const branchOperationsService = {
  async loadOperationalData(branchId: string, agencyId: string): Promise<BranchOperationalData> {
    const [branch, dashboard, deliverers, vehicles, missions, hubs] = await Promise.all([
      branchPortalService.getBranch(branchId),
      branchPortalService.getDashboard(branchId).catch(() => null),
      branchPortalService.getDeliverers(branchId, agencyId),
      branchPortalService.getVehicles(branchId, agencyId),
      branchPortalService.getMissions(branchId, agencyId),
      branchPortalService.getHubs(branchId, agencyId),
    ]);

    const hubIds = hubs.map(h => h.id);
    const parcels = hubIds.length > 0
      ? await branchPortalService.getHubParcels(hubIds)
      : [];

    return { branch, dashboard, deliverers, vehicles, missions, hubs, parcels };
  },

  async getAgencyName(agencyId: string): Promise<string> {
    try {
      const dto = await branchFetch<AgencyDto>(`/agencies/${agencyId}`);
      return mapAgency(dto).name;
    } catch {
      return 'TiiBnTick Agency';
    }
  },

  async quickAssignMission(
    missionId: string,
    delivererId: string,
    vehicleId: string,
  ): Promise<void> {
    const { missionService } = await import('@/lib/services/missionService');
    await missionService.assignMission(missionId, delivererId, vehicleId);
  },

  async loadAgencyBenchmark(agencyId: string, currentBranchId: string): Promise<BranchBenchmarkRow[]> {
    const { mapBranch, mapMission, mapDeliverer } = await import('@/lib/api/mappers');
    type BranchDto = import('@/lib/api/dto').BranchDto;
    type MissionDto = import('@/lib/api/dto').MissionDto;
    type DelivererDto = import('@/lib/api/dto').DelivererDto;

    const [branchDtos, missionDtos, delivererDtos] = await Promise.all([
      branchFetch<BranchDto[]>(`/agencies/${agencyId}/branches`),
      branchFetch<MissionDto[]>(`/agencies/${agencyId}/missions`),
      branchFetch<DelivererDto[]>(`/agencies/${agencyId}/deliverers`),
    ]);

    const branches = branchDtos.map(mapBranch);
    const missions = missionDtos.map(mapMission);
    const deliverers = delivererDtos.map(mapDeliverer);
    return computeBranchBenchmarks(branches, missions, deliverers, currentBranchId);
  },
};
