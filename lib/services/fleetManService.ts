import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';

export interface FleetManStatus {
  linked: boolean;
  email: string | null;
  fleetmanFleetId: string | null;
}

export interface FleetManConnectResult {
  email: string;
  redirectUrl: string;
  linked: boolean;
  syncedPlates: string[];
  failedPlates: string[];
}

export interface FleetManLaunchResult {
  email: string;
  redirectUrl: string;
  linked: boolean;
}

export interface FleetManSyncResult {
  created: number;
  linked: number;
  failed: string[];
}

export const fleetManService = {
  async getStatus(agencyId?: string): Promise<FleetManStatus> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<FleetManStatus>(`/agencies/${id}/fleetman/status`);
  },

  async connect(password: string, email?: string, agencyId?: string): Promise<FleetManConnectResult> {
    const id = agencyId ?? getAgencyId();
    return apiClient.post<FleetManConnectResult>(`/agencies/${id}/fleetman/connect`, {
      password,
      email,
    });
  },

  async launch(agencyId?: string): Promise<FleetManLaunchResult> {
    const id = agencyId ?? getAgencyId();
    return apiClient.post<FleetManLaunchResult>(`/agencies/${id}/fleetman/launch`, {});
  },

  async sync(agencyId?: string): Promise<FleetManSyncResult> {
    const id = agencyId ?? getAgencyId();
    return apiClient.post<FleetManSyncResult>(`/agencies/${id}/fleetman/sync`, {});
  },
};
