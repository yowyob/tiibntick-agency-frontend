import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import { mapDeliverer, mapContract, mapCommission, mapFreelancer, toApiCommissionRate } from '@/lib/api/mappers';
import type { Deliverer, Contract, CommissionRecord, FreelancerAssociation, StaffMember, StaffRole } from '@/lib/types';
import type { DelivererDto, ContractDto, CommissionRecordDto, FreelancerAssociationDto } from '@/lib/api/dto';

export const staffService = {
  async getStaffMembers(agencyId?: string): Promise<StaffMember[]> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<StaffMember[]>(`/agencies/${id}/staff`);
  },

  async registerStaffMember(agencyId: string, data: {
    fullName: string;
    phone: string;
    email?: string;
    role: StaffRole;
    branchId?: string;
  }): Promise<StaffMember> {
    return apiClient.post<StaffMember>(`/agencies/${agencyId}/staff`, data);
  },

  async updateStaffMember(memberId: string, data: {
    fullName?: string;
    phone?: string;
    email?: string;
    role?: StaffRole;
    branchId?: string;
  }): Promise<void> {
    await apiClient.patch(`/staff/${memberId}`, data);
  },

  async suspendStaffMember(memberId: string): Promise<void> {
    await apiClient.patch(`/staff/${memberId}/suspend`, {});
  },

  async reactivateStaffMember(memberId: string): Promise<void> {
    await apiClient.patch(`/staff/${memberId}/reactivate`, {});
  },

  async getDeliverers(agencyId?: string): Promise<Deliverer[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<DelivererDto[]>(`/agencies/${id}/deliverers`);
    return dtos.map(mapDeliverer);
  },

  async registerDeliverer(agencyId: string, data: {
    fullName: string; phone: string; email?: string;
    delivererType: string; branchId?: string;
    actorId?: string;
  }): Promise<Deliverer> {
    const dto = await apiClient.post<DelivererDto>(`/agencies/${agencyId}/deliverers`, {
      ...(data.actorId ? { actorId: data.actorId } : {}),
      fullName: data.fullName,
      phone: data.phone,
      ...(data.email ? { email: data.email } : {}),
    });
    const deliverer = mapDeliverer(dto);
    if (data.branchId) {
      await this.attachToBranch(deliverer.id, data.branchId);
    }
    return deliverer;
  },

  async suspendDeliverer(delivererId: string): Promise<void> {
    await apiClient.patch(`/deliverers/${delivererId}/suspend`, {});
  },

  async reactivateDeliverer(delivererId: string): Promise<void> {
    await apiClient.patch(`/deliverers/${delivererId}/reactivate`, {});
  },

  async attachToBranch(delivererId: string, branchId: string): Promise<void> {
    await apiClient.patch(`/deliverers/${delivererId}/branch`, { branchId });
  },

  async getContracts(agencyId?: string): Promise<Contract[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<ContractDto[]>(`/agencies/${id}/contracts`);
    return dtos.map(mapContract);
  },

  async createContract(delivererId: string, data: {
    agencyId: string;
    contractType: string; startDate: string; endDate?: string;
    remunerationModel: string; baseSalary?: number; commissionRate?: number; currency: string;
  }): Promise<Contract> {
    const dto = await apiClient.post<ContractDto>(`/deliverers/${delivererId}/contracts`, {
      agencyId: data.agencyId,
      contractType: data.contractType,
      startDate: data.startDate,
      endDate: data.endDate,
      remunerationModel: data.remunerationModel,
      baseSalary: data.baseSalary,
      commissionRate: data.commissionRate,
    });
    return mapContract(dto);
  },

  async terminateContract(delivererId: string): Promise<void> {
    await apiClient.delete(`/deliverers/${delivererId}/contracts/active`);
  },

  async renewContract(contractId: string, data: { endDate?: string }): Promise<void> {
    await apiClient.post(`/contracts/${contractId}/renew`, {
      endDate: data.endDate,
    });
  },

  async getActiveContract(delivererId: string): Promise<Contract | null> {
    try {
      const dto = await apiClient.get<ContractDto>(`/deliverers/${delivererId}/contracts/active`);
      return mapContract(dto);
    } catch {
      return null;
    }
  },

  async updateRemuneration(
    contractId: string,
    data: { baseSalary?: number; commissionRate?: number },
  ): Promise<Contract> {
    const dto = await apiClient.patch<ContractDto>(`/contracts/${contractId}/remuneration`, data);
    return mapContract(dto);
  },

  async getCommissions(agencyId?: string): Promise<CommissionRecord[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<CommissionRecordDto[]>(
      `/agencies/${id}/commissions`,
    );
    return dtos.map(mapCommission);
  },

  async createCommission(data: {
    agencyId: string;
    delivererId: string;
    missionId: string;
    amount: number;
    currency: string;
  }): Promise<CommissionRecord> {
    const dto = await apiClient.post<CommissionRecordDto>('/commissions', {
      agencyId: data.agencyId,
      delivererId: data.delivererId,
      missionId: data.missionId,
      amount: data.amount,
      currency: data.currency,
    });
    return mapCommission(dto);
  },

  async payCommission(commissionId: string): Promise<void> {
    await apiClient.patch(`/commissions/${commissionId}/pay`, {});
  },

  async disputeCommission(commissionId: string, reason: string): Promise<void> {
    await apiClient.post(`/commissions/${commissionId}/dispute`, { reason });
  },

  async getFreelancers(agencyId?: string): Promise<FreelancerAssociation[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<FreelancerAssociationDto[]>(
      `/agencies/${id}/freelancers`,
    );
    return dtos.map(mapFreelancer);
  },

  async searchFreelancerCandidates(query: string): Promise<Array<{
    id: string;
    name: string;
    snippet: string;
  }>> {
    const { searchService } = await import('@/lib/services/searchService');
    const result = await searchService.search(query, 'freelancer', 10);
    if (result.hits.length > 0) {
      return result.hits.map(h => ({
        id: h.entityId,
        name: h.title,
        snippet: h.snippet,
      }));
    }
    const fallback = await searchService.search(query, undefined, 10);
    return fallback.hits
      .filter(h => ['FREELANCER', 'DELIVERER', 'freelancer', 'deliverer'].includes(h.entityType))
      .map(h => ({ id: h.entityId, name: h.title, snippet: h.snippet }));
  },

  async associateFreelancer(agencyId: string, data: {
    freelancerActorId: string; commissionRate: number; startDate: string;
  }): Promise<FreelancerAssociation> {
    const dto = await apiClient.post<FreelancerAssociationDto>(
      `/agencies/${agencyId}/freelancers`,
      {
        freelancerActorId: data.freelancerActorId,
        commissionRate: toApiCommissionRate(data.commissionRate),
        startDate: data.startDate,
      },
    );
    return mapFreelancer(dto);
  },

  async terminateFreelancer(associationId: string, endDate?: string): Promise<void> {
    await apiClient.patch(`/freelancers/associations/${associationId}/end`, {
      endDate: endDate ?? new Date().toISOString().slice(0, 10),
    });
  },

  async suspendFreelancer(associationId: string): Promise<void> {
    await apiClient.patch(`/freelancers/associations/${associationId}/pause`, {});
  },

  async cancelFreelancerInvitation(associationId: string): Promise<void> {
    await apiClient.patch(`/freelancers/associations/${associationId}/cancel`, {});
  },
};
