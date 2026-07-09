import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';

export interface DisputeItem {
  id: string;
  reference: string;
  status: string;
  category: string;
  priority: string;
  missionId?: string;
  trackingCode?: string;
  description: string;
  filedAt?: string;
}

export interface DisputePage {
  items: DisputeItem[];
  page: number;
  size: number;
  total: number;
  projectedFromCore: boolean;
}

export interface IncidentItem {
  id: string;
  referenceCode: string;
  missionId?: string;
  type: string;
  status: string;
  description: string;
  reportedAt?: string;
}

export interface DisputeDetail extends DisputeItem {
  claimantId?: string;
  assignedMediatorId?: string;
  deadline?: string;
  evidenceCount: number;
  projectedFromCore: boolean;
}

export interface IncidentDetail extends IncidentItem {
  severity?: string;
  resolvedAt?: string;
  slaBreached: boolean;
  projectedFromCore: boolean;
}

export const complianceService = {
  async listDisputes(params?: {
    agencyId?: string;
    status?: string;
    page?: number;
    size?: number;
  }): Promise<DisputePage> {
    const agencyId = params?.agencyId ?? getAgencyId();
    const search = new URLSearchParams();
    if (params?.status) search.set('status', params.status);
    search.set('page', String(params?.page ?? 0));
    search.set('size', String(params?.size ?? 20));
    const qs = search.toString();
    return apiClient.get<DisputePage>(
      `/agencies/${agencyId}/disputes${qs ? `?${qs}` : ''}`,
    );
  },

  async listIncidents(params?: {
    agencyId?: string;
    status?: string;
    page?: number;
    size?: number;
  }): Promise<IncidentItem[]> {
    const agencyId = params?.agencyId ?? getAgencyId();
    const search = new URLSearchParams();
    if (params?.status) search.set('status', params.status);
    search.set('page', String(params?.page ?? 0));
    search.set('size', String(params?.size ?? 20));
    const qs = search.toString();
    return apiClient.get<IncidentItem[]>(
      `/agencies/${agencyId}/incidents${qs ? `?${qs}` : ''}`,
    );
  },

  async getDispute(disputeId: string, agencyId?: string): Promise<DisputeDetail> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<DisputeDetail>(`/agencies/${id}/disputes/${encodeURIComponent(disputeId)}`);
  },

  async getIncident(incidentId: string, agencyId?: string): Promise<IncidentDetail> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<IncidentDetail>(`/agencies/${id}/incidents/${encodeURIComponent(incidentId)}`);
  },
};
