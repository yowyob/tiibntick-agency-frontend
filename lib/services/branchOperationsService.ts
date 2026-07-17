import { branchPortalService, type BranchDashboard } from '@/lib/services/branchPortalService';
import { branchFetch } from '@/lib/services/branchPortalService';
import { mapAgency } from '@/lib/api/mappers';
import type { AgencyDto } from '@/lib/api/dto';
import type { Branch, Deliverer, Vehicle, Mission, Hub, HubParcelRecord } from '@/lib/types';
import { computeBranchBenchmarks, type BranchBenchmarkRow } from '@/lib/branch/branchBenchmark';
import { branchReadModel } from '@/lib/offline/readModel';
import { branchAuthService } from '@/lib/services/branchAuthService';

export interface BranchOperationalData {
  branch: Branch;
  dashboard: BranchDashboard | null;
  deliverers: Deliverer[];
  vehicles: Vehicle[];
  missions: Mission[];
  hubs: Hub[];
  parcels: HubParcelRecord[];
  source?: 'network' | 'cache';
  cachedAt?: string;
}

function branchScopeKey(branchId: string, agencyId: string): string | null {
  const session = branchAuthService.getSession();
  if (!session?.tenantId || !session.managerId) return null;
  return `branch:${session.tenantId}:${agencyId}:${session.managerId}:${branchId}`;
}

function isOfflineError(err: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true;
  if (err instanceof TypeError) return true;
  if (err instanceof Error && /connexion|network|fetch|Failed to fetch/i.test(err.message)) return true;
  return false;
}

export const branchOperationsService = {
  async loadOperationalData(branchId: string, agencyId: string): Promise<BranchOperationalData> {
    const scopeKey = branchScopeKey(branchId, agencyId);
    try {
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

      const data: BranchOperationalData = {
        branch,
        dashboard,
        deliverers,
        vehicles,
        missions,
        hubs,
        parcels,
        source: 'network',
      };
      if (scopeKey) await branchReadModel.saveSnapshot(scopeKey, data);
      return data;
    } catch (err) {
      if (scopeKey && isOfflineError(err)) {
        const cached = await branchReadModel.getSnapshot(scopeKey);
        if (cached) {
          return {
            ...cached,
            source: 'cache',
            cachedAt: (await branchReadModel.freshness(scopeKey)) ?? undefined,
          };
        }
      }
      throw err;
    }
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
