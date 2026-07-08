import { apiClient } from '@/lib/api/client';

export interface OnboardingListItem {
  applicationId: string;
  agencyId: string;
  tenantId: string;
  agencyName: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  applicationStatus: string;
  agencyStatus: string;
  kernelBusinessActorId?: string | null;
  kernelIdentityReady: boolean;
  submittedAt: string;
}

export interface OnboardingDetail {
  summary: OnboardingListItem;
  agency: {
    id: string;
    name: string;
    agencyCode: string;
    status: string;
    contactEmail: string;
    contactPhone: string;
    registrationNumber: string;
  };
  legalName: string;
  ownerNationalId: string;
  ownerIdType: string;
  docCniKey?: string;
  docRccmKey?: string;
  docProofKey?: string;
  rejectionReason?: string;
}

export const onboardingAdminService = {
  async listPending(): Promise<OnboardingListItem[]> {
    return apiClient.get<OnboardingListItem[]>('/admin/onboarding/requests');
  },

  async getDetail(agencyId: string): Promise<OnboardingDetail> {
    return apiClient.get<OnboardingDetail>(`/admin/onboarding/requests/${agencyId}`);
  },

  async approve(agencyId: string): Promise<void> {
    await apiClient.patch(`/admin/onboarding/requests/${agencyId}/approve`, {});
  },

  async reject(agencyId: string, reason: string): Promise<void> {
    await apiClient.patch(`/admin/onboarding/requests/${agencyId}/reject`, { reason });
  },
};
