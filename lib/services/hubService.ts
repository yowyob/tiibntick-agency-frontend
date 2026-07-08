import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import { mapHub, mapHubParcelRecord, toBackendHubStatus } from '@/lib/api/mappers';
import type { Hub, HubParcelRecord, HubStatus } from '@/lib/types';
import type { HubDto, HubParcelRecordDto } from '@/lib/api/dto';

export const hubService = {
  async getHubs(agencyId?: string): Promise<Hub[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<HubDto[]>(`/agencies/${id}/hubs`);
    return dtos.map(mapHub);
  },

  async getHub(hubId: string): Promise<Hub> {
    const dto = await apiClient.get<HubDto>(`/hubs/${hubId}`);
    return mapHub(dto);
  },

  async createHub(agencyId: string, data: {
    name: string; code: string; capacityUnits: number;
    city: string; country: string; street?: string;
    retentionDelayHours?: number; branchId?: string;
    latitude?: number; longitude?: number;
    openingHours?: string;
  }): Promise<Hub> {
    const dto = await apiClient.post<HubDto>(`/agencies/${agencyId}/hubs`, {
      branchId: data.branchId,
      name: data.name,
      code: data.code,
      addrCity: data.city,
      addrCountry: data.country,
      addrStreet: data.street,
      latitude: data.latitude,
      longitude: data.longitude,
      capacityUnits: data.capacityUnits,
      retentionDelayHours: data.retentionDelayHours ?? 72,
      openingHours: data.openingHours,
    });
    return mapHub(dto);
  },

  async updateHubStatus(hubId: string, status: HubStatus): Promise<void> {
    await apiClient.patch(`/hubs/${hubId}/status`, {
      status: toBackendHubStatus(status),
    });
  },

  async configureHub(hubId: string, data: {
    name: string;
    capacityUnits: number;
    retentionDelayHours: number;
    openingHours: string;
  }): Promise<Hub> {
    const dto = await apiClient.patch<HubDto>(`/hubs/${hubId}`, data);
    return mapHub(dto);
  },

  async attachToBranch(hubId: string, branchId: string): Promise<Hub> {
    const dto = await apiClient.patch<HubDto>(`/hubs/${hubId}/branch`, { branchId });
    return mapHub(dto);
  },

  async getOccupancy(hubId: string): Promise<{
    hubId: string;
    currentOccupancy: number;
    capacityUnits: number;
    availableSpace: number;
    hasAvailableSpace: boolean;
  }> {
    return apiClient.get(`/hubs/${hubId}/occupancy`);
  },

  async processExpired(): Promise<{ processed: number; message: string }> {
    return apiClient.post('/hubs/expired', {});
  },

  async getReports(hubId: string): Promise<{
    hubId: string;
    currentOccupancy: number;
    capacityUnits: number;
    parcelsByStatus: Record<string, number>;
  }> {
    return apiClient.get(`/hubs/${hubId}/reports`);
  },

  async getParcelRecords(hubId: string): Promise<HubParcelRecord[]> {
    const dtos = await apiClient.get<HubParcelRecordDto[]>(`/hubs/${hubId}/parcels`);
    return dtos.map(mapHubParcelRecord);
  },

  async getAllParcelRecords(agencyId?: string): Promise<HubParcelRecord[]> {
    const id = agencyId ?? getAgencyId();
    const hubs = await hubService.getHubs(id);
    const records = await Promise.all(hubs.map(h => hubService.getParcelRecords(h.id)));
    return records.flat();
  },

  async depositParcel(hubId: string, data: {
    missionId: string; packageId: string; trackingCode: string; recipientName: string;
  }): Promise<HubParcelRecord> {
    const dto = await apiClient.post<HubParcelRecordDto>(`/hubs/${hubId}/parcels`, {
      missionId: data.missionId,
      packageId: data.packageId,
      trackingCode: data.trackingCode,
    });
    return mapHubParcelRecord(dto);
  },

  async withdrawParcel(hubId: string, recordId: string, withdrawnBy: string): Promise<void> {
    await apiClient.post(`/hubs/${hubId}/parcels/${recordId}/withdraw`, {
      withdrawnBy,
      identityVerified: true,
    });
  },
};
