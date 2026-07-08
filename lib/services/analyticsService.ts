import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';

export interface AgencyDashboard {
  agencyId: string;
  branchesCount: number;
  deliverersCount: number;
  hubsCount: number;
  vehiclesCount: number;
  activeMissionsCount: number;
  pendingCommissionsCount: number;
}

export interface AgencyReport {
  agencyId: string;
  missionsByStatus: Record<string, number>;
  commissionsByStatus: Record<string, number>;
}

export const analyticsService = {
  async getDashboard(agencyId?: string): Promise<AgencyDashboard> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<AgencyDashboard>(`/agencies/${id}/dashboard`);
  },

  async getReports(agencyId?: string): Promise<AgencyReport> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<AgencyReport>(`/agencies/${id}/reports`);
  },
};
