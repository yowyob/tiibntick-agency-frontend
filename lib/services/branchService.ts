import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import { mapBranch } from '@/lib/api/mappers';
import type { Branch } from '@/lib/types';
import type { BranchDto } from '@/lib/api/dto';

export const branchService = {
  async getBranches(agencyId?: string): Promise<Branch[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<BranchDto[]>(`/agencies/${id}/branches`);
    return dtos.map(mapBranch);
  },

  async getBranch(branchId: string): Promise<Branch> {
    const dto = await apiClient.get<BranchDto>(`/branches/${branchId}`);
    return mapBranch(dto);
  },

  async createBranch(agencyId: string, data: {
    name: string; code: string; city: string; country: string;
    street?: string; region?: string;
    openingHours?: string;
    managerId?: string;
    isHeadquarters?: boolean;
    status?: Branch['status'];
  }): Promise<Branch> {
    const dto = await apiClient.post<BranchDto>(`/agencies/${agencyId}/branches`, {
      name: data.name,
      code: data.code,
      address: {
        city: data.city,
        country: data.country,
        street: data.street,
        region: data.region,
      },
    });
    const branch = mapBranch(dto);
    if (data.managerId) {
      await this.assignManager(branch.id, data.managerId);
      return this.getBranch(branch.id);
    }
    return branch;
  },

  async updateBranch(branchId: string, data: Partial<Branch>): Promise<void> {
    await apiClient.patch(`/branches/${branchId}`, {
      name: data.name,
      address: {
        city: data.city,
        country: 'CM',
        street: data.address,
      },
    });
  },

  async assignManager(branchId: string, managerId: string): Promise<void> {
    await apiClient.patch(
      `/branches/${branchId}/manager?managerId=${encodeURIComponent(managerId)}`,
      {},
    );
  },

  async clearManager(branchId: string): Promise<void> {
    await apiClient.delete(`/branches/${branchId}/manager`);
  },

  async closeBranch(branchId: string): Promise<void> {
    await apiClient.delete(`/branches/${branchId}`);
  },

  async temporarilyCloseBranch(branchId: string): Promise<void> {
    await apiClient.patch(
      `/branches/${branchId}/status?status=TEMPORARILY_CLOSED`,
      {},
    );
  },

  async reopenBranch(branchId: string): Promise<void> {
    await apiClient.patch(`/branches/${branchId}/status?status=OPEN`, {});
  },
};
