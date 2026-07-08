import { getAgencyId } from '@/lib/session';
import { toApiCommissionRate } from '@/lib/api/mappers';
import { apiClient } from '@/lib/api/client';
import { mapAgency } from '@/lib/api/mappers';
import type { Agency } from '@/lib/types';
import type { AgencyDto } from '@/lib/api/dto';

export const agencyService = {
  async getAgency(id?: string): Promise<Agency> {
    const resolved = id ?? getAgencyId();
    const dto = await apiClient.get<AgencyDto>(`/agencies/${resolved}`);
    return mapAgency(dto);
  },

  async activateAgency(id: string): Promise<void> {
    await apiClient.patch(`/agencies/${id}/activate`, {});
  },

  async suspendAgency(id: string, reason: string): Promise<void> {
    await apiClient.patch(
      `/agencies/${id}/suspend?reason=${encodeURIComponent(reason)}`,
      {},
    );
  },

  async updateProfile(id: string, data: Partial<Agency>): Promise<void> {
    await apiClient.patch(`/agencies/${id}/profile`, {
      name: data.name,
      legalName: data.legalName,
      registrationNumber: data.registrationNumber,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      country: data.country,
      ...(data.logoUrl !== undefined ? { logoUrl: data.logoUrl } : {}),
    });
  },

  async updateSettings(id: string, settings: Partial<Agency>): Promise<void> {
    await apiClient.patch(`/agencies/${id}/settings`, {
      autoAssignMissions: settings.autoAssignMissions ?? false,
      allowFreelancerAssociation: settings.allowFreelancerAssociation ?? false,
      hubRetentionDelayHours: settings.hubRetentionDelayHours ?? 72,
      defaultCommissionRate: toApiCommissionRate(settings.defaultCommissionRate ?? 10),
      maxActiveBranches: settings.maxActiveBranches ?? 10,
      timezone: settings.timezone ?? 'Africa/Douala',
    });
  },
};
