import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import { mapBillingPolicy, mapCommission } from '@/lib/api/mappers';
import { staffService } from '@/lib/services/staffService';
import type { BillingPolicy, CommissionRecord, Mission } from '@/lib/types';
import type { BillingPolicyDto, CommissionRecordDto, InvoiceDto } from '@/lib/api/dto';
import { missionService } from '@/lib/services/missionService';

export const billingService = {
  async getPolicies(agencyId?: string): Promise<BillingPolicy[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<BillingPolicyDto[]>(
      `/agencies/${id}/billing-policies`,
    );
    return dtos.map(mapBillingPolicy);
  },

  async createPolicy(agencyId: string, data: {
    name: string; basePrice: number; perKmRate: number; perKgRate: number; currency: string;
    validFrom: string; validTo?: string; description?: string;
  }): Promise<BillingPolicy> {
    const dto = await apiClient.post<BillingPolicyDto>(
      `/agencies/${agencyId}/billing-policies`,
      {
        name: data.name,
        description: data.description ?? '',
        currency: data.currency,
        basePrice: data.basePrice,
        pricePerKm: data.perKmRate,
        pricePerKg: data.perKgRate,
        minPrice: data.basePrice,
      },
    );
    return mapBillingPolicy(dto);
  },

  async activatePolicy(policyId: string): Promise<void> {
    await apiClient.patch(`/billing-policies/${policyId}/activate`, {});
  },

  async archivePolicy(policyId: string): Promise<void> {
    await apiClient.patch(`/billing-policies/${policyId}/archive`, {});
  },

  async getInvoicedMissions(agencyId?: string): Promise<Mission[]> {
    const id = agencyId ?? getAgencyId();
    const [invoices, missions] = await Promise.all([
      apiClient.get<InvoiceDto[]>(`/agencies/${id}/invoices`),
      missionService.getMissions(id),
    ]);
    const invoicedMissionIds = new Set(invoices.map(i => i.missionId));
    return missions
      .filter(m => invoicedMissionIds.has(m.id))
      .map(m => {
        const inv = invoices.find(i => i.missionId === m.id);
        if (inv) {
          return { ...m, sellingPrice: Number(inv.amount), currency: inv.currency, invoiceId: inv.id };
        }
        return m;
      });
  },

  async getInvoices(agencyId?: string): Promise<InvoiceDto[]> {
    const id = agencyId ?? getAgencyId();
    return apiClient.get<InvoiceDto[]>(`/agencies/${id}/invoices`);
  },

  async getInvoice(invoiceId: string): Promise<InvoiceDto> {
    return apiClient.get<InvoiceDto>(`/invoices/${invoiceId}`);
  },

  async generateInvoice(missionId: string, agencyId?: string): Promise<void> {
    const id = agencyId ?? getAgencyId();
    await apiClient.post(`/missions/${missionId}/invoice`, { agencyId: id });
  },

  async downloadInvoice(invoiceId: string): Promise<string> {
    const res = await apiClient.get<{ invoiceId: string; pdfUrl: string }>(
      `/invoices/${invoiceId}/download`,
    );
    return res.pdfUrl;
  },

  async getCommissions(agencyId?: string): Promise<CommissionRecord[]> {
    return staffService.getCommissions(agencyId);
  },

  async createCommission(data: {
    delivererId: string;
    missionId: string;
    amount: number;
    currency: string;
    agencyId?: string;
  }): Promise<CommissionRecord> {
    const id = data.agencyId ?? getAgencyId();
    return staffService.createCommission({
      agencyId: id,
      delivererId: data.delivererId,
      missionId: data.missionId,
      amount: data.amount,
      currency: data.currency,
    });
  },

  async validateCommission(commissionId: string): Promise<void> {
    await apiClient.patch(`/commissions/${commissionId}/validate`, {});
  },

  async payCommission(commissionId: string): Promise<void> {
    await apiClient.patch(`/commissions/${commissionId}/pay`, {});
  },

  async disputeCommission(commissionId: string, reason: string): Promise<void> {
    await apiClient.post(`/commissions/${commissionId}/dispute`, { reason });
  },

  async estimatePrice(
    distanceKm: number,
    weightKg: number,
    agencyId?: string,
  ): Promise<{ amount: number; currency: string; policyName: string }> {
    const id = agencyId ?? getAgencyId();
    const result = await apiClient.post<{ amount: number | string; currency: string; policyName: string }>(
      '/billing/estimate',
      { agencyId: id, distanceKm, weightKg },
    );
    return {
      amount: Number(result.amount),
      currency: result.currency,
      policyName: result.policyName,
    };
  },
};
