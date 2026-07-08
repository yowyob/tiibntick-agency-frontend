import { apiClient } from '@/lib/api/client';
import { mapAgency } from '@/lib/api/mappers';
import { agencyService } from '@/lib/services/agencyService';
import { hubService } from '@/lib/services/hubService';
import {
  adminActionRateLimit,
  assertUuid,
  sanitizeReason,
} from '@/lib/admin/security';
import type { Agency } from '@/lib/types';
import type { AgencyDto } from '@/lib/api/dto';

export interface AdminAgencyView {
  agency: Agency;
  tenantId: string;
}

export interface AdminAgencyListItem {
  id: string;
  tenantId: string;
  name: string;
  agencyCode: string;
  status: string;
  contactEmail: string;
  contactPhone: string | null;
  createdAt: string;
}

export interface AdminAgencyPage {
  items: AdminAgencyListItem[];
  page: number;
  size: number;
  total: number;
}

export const adminService = {
  async listAgencies(tenantId: string, page = 0, size = 20): Promise<AdminAgencyPage> {
    adminActionRateLimit('agency:list');
    const tid = assertUuid(tenantId, 'Identifiant tenant');
    const result = await apiClient.get<{
      items: AgencyDto[];
      page: number;
      size: number;
      total: number;
    }>(`/admin/agencies?page=${page}&size=${size}`, tid);
    return {
      items: result.items.map(a => ({
        id: a.id,
        tenantId: a.tenantId,
        name: a.name,
        agencyCode: a.agencyCode,
        status: a.status,
        contactEmail: a.contactEmail,
        contactPhone: a.contactPhone ?? null,
        createdAt: a.createdAt,
      })),
      page: result.page,
      size: result.size,
      total: result.total,
    };
  },

  async loadAgency(agencyId: string, tenantId: string): Promise<AdminAgencyView> {
    adminActionRateLimit('agency:load');
    const id = assertUuid(agencyId, 'Identifiant agence');
    const tid = assertUuid(tenantId, 'Identifiant tenant');
    const dto = await apiClient.get<AgencyDto>(`/agencies/${id}`, tid);
    return { agency: mapAgency(dto), tenantId: tid };
  },

  async activateAgency(agencyId: string, tenantId: string): Promise<void> {
    adminActionRateLimit('agency:activate');
    assertUuid(agencyId, 'Identifiant agence');
    assertUuid(tenantId, 'Identifiant tenant');
    await apiClient.patch(`/agencies/${agencyId}/activate`, {}, tenantId);
  },

  async suspendAgency(agencyId: string, tenantId: string, reason: string): Promise<void> {
    adminActionRateLimit('agency:suspend');
    assertUuid(agencyId, 'Identifiant agence');
    assertUuid(tenantId, 'Identifiant tenant');
    const safeReason = sanitizeReason(reason);
    await apiClient.patch(
      `/agencies/${agencyId}/suspend?reason=${encodeURIComponent(safeReason)}`,
      {},
      tenantId,
    );
  },

  async syncCore(agencyId: string, tenantId: string): Promise<Agency> {
    adminActionRateLimit('agency:sync-core');
    const id = assertUuid(agencyId, 'Identifiant agence');
    const tid = assertUuid(tenantId, 'Identifiant tenant');
    const dto = await apiClient.post<AgencyDto>(`/admin/agencies/${id}/sync-core`, {}, tid);
    return mapAgency(dto);
  },

  /** Re-export for profile/settings parity outside admin lookup flow. */
  getAgencyProfile: agencyService.getAgency.bind(agencyService),

  async processExpiredParcels(): Promise<{ processed: number; message: string }> {
    adminActionRateLimit('hubs:expired');
    return hubService.processExpired();
  },
};
