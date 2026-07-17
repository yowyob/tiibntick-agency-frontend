import { formatUserError } from '@/lib/errors';
import { API_BASE_URL } from '@/lib/config';
import { unwrapApiData } from '@/lib/api/envelope';
import { apiClient } from '@/lib/api/client';
import { mapDeliverer, mapMission, mapVehicle, mapHub, mapHubParcelRecord } from '@/lib/api/mappers';
import { staffService } from '@/lib/services/staffService';
import { fleetService } from '@/lib/services/fleetService';
import { missionService } from '@/lib/services/missionService';
import { hubService } from '@/lib/services/hubService';
import { branchService } from '@/lib/services/branchService';
import type { Branch, Deliverer, Vehicle, Mission, Hub, HubParcelRecord } from '@/lib/types';

export interface BranchDashboard {
  branchId: string;
  agencyId: string;
  branchName: string;
  status: string;
  deliverersCount: number;
  hubsCount: number;
}

function missionsForBranch(missions: Mission[], deliverers: Deliverer[], branchId: string): Mission[] {
  const delivererIds = new Set(deliverers.map(d => d.id));
  return missions.filter(
    m => m.branchId === branchId || (m.delivererId != null && delivererIds.has(m.delivererId)),
  );
}

function sessionAgencyId(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('tnt-branch-agency-id') ?? '';
}

export const branchPortalService = {
  async getBranch(branchId: string): Promise<Branch> {
    return branchService.getBranch(branchId);
  },

  async getDashboard(branchId: string): Promise<BranchDashboard> {
    return apiClient.get<BranchDashboard>(`/branches/${branchId}/dashboard`);
  },

  async getDeliverers(branchId: string, agencyId?: string): Promise<Deliverer[]> {
    const aid = agencyId ?? sessionAgencyId();
    const all = await staffService.getDeliverers(aid);
    return all.filter(d => d.branchId === branchId);
  },

  async getVehicles(branchId: string, agencyId?: string): Promise<Vehicle[]> {
    const aid = agencyId ?? sessionAgencyId();
    const all = await fleetService.getVehicles(aid);
    return all.filter(v => v.branchId === branchId);
  },

  async getMissions(branchId: string, agencyId?: string): Promise<Mission[]> {
    const aid = agencyId ?? sessionAgencyId();
    const [missions, deliverers] = await Promise.all([
      missionService.getMissions(aid),
      this.getDeliverers(branchId, aid),
    ]);
    return missionsForBranch(missions, deliverers, branchId);
  },

  async getHubs(branchId: string, agencyId?: string): Promise<Hub[]> {
    const aid = agencyId ?? sessionAgencyId();
    const all = await hubService.getHubs(aid);
    return all.filter(h => h.branchId === branchId);
  },

  async getHubParcels(hubIds: string[]): Promise<HubParcelRecord[]> {
    const records = await Promise.all(hubIds.map(id => hubService.getParcelRecords(id)));
    return records.flat();
  },
};

export function getBranchSessionHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const tenantId = localStorage.getItem('tnt-branch-tenant-id') ?? '';
  const agencyId = localStorage.getItem('tnt-branch-agency-id') ?? '';
  return {
    'Content-Type': 'application/json',
    'X-Tenant-Id': tenantId,
    'X-Agency-Id': agencyId,
  };
}

export async function branchFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${normalized}`, {
      ...options,
      headers: { ...getBranchSessionHeaders(), ...(options.headers as Record<string, string> | undefined) },
    });
  } catch {
    throw new Error(formatUserError(null, 'Impossible de joindre le serveur.'));
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(formatUserError(
      { status: res.status, message: body?.message ?? '' },
      'Une erreur est survenue.',
    ));
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json();
  return unwrapApiData<T>(body);
}
