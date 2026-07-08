import { apiClient } from '@/lib/api/client';

export interface SubmitOnboardingPayload {
  agencyName: string;
  legalName: string;
  agencyCode: string;
  agencyType: string;
  registrationNumber: string;
  address: { street: string; city: string; country: string };
  contactEmail: string;
  contactPhone: string;
  website?: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerNationalId: string;
  ownerIdType: string;
  docCniKey?: string;
  docRccmKey?: string;
  docProofKey?: string;
  autoAssign: boolean;
  allowFreelancers: boolean;
  hubRetentionHours: number;
  maxFreelancers: number;
}

export interface SubmitOnboardingResult {
  agencyId: string;
  applicationId: string;
  agencyStatus: string;
  kernelBusinessActorId?: string | null;
  kernelIdentityReady: boolean;
}

export interface KernelIdentityResult {
  agencyId: string;
  applicationId: string;
  kernelBusinessActorId?: string | null;
  readyForAdminApproval: boolean;
}

export interface MyOnboardingStatus {
  applicationId: string;
  agencyId: string;
  agencyName: string;
  applicationStatus: string;
  agencyStatus: string;
  kernelBusinessActorId?: string | null;
  kernelIdentityReady: boolean;
}

const KERNEL_IDENTITY_READY_KEY = 'tnt-kernel-identity-ready';

export const registerService = {
  async submitApplication(payload: SubmitOnboardingPayload): Promise<SubmitOnboardingResult> {
    return apiClient.post<SubmitOnboardingResult>('/onboarding/applications', payload);
  },

  async getMyApplication(): Promise<MyOnboardingStatus> {
    const status = await apiClient.get<MyOnboardingStatus>('/onboarding/applications/me');
    registerService.setKernelIdentityReady(status.kernelIdentityReady);
    return status;
  },

  async completeKernelIdentity(agencyId: string): Promise<KernelIdentityResult> {
    const result = await apiClient.post<KernelIdentityResult>(
      `/onboarding/applications/${agencyId}/kernel-identity`,
      {},
    );
    registerService.setKernelIdentityReady(result.readyForAdminApproval);
    return result;
  },

  /** Retry phase 1 if submit did not complete kernel identity (candidate JWT required). */
  async ensureKernelIdentity(agencyId: string, alreadyReady = false): Promise<KernelIdentityResult | null> {
    if (alreadyReady) {
      registerService.setKernelIdentityReady(true);
      return null;
    }
    try {
      return await registerService.completeKernelIdentity(agencyId);
    } catch {
      registerService.setKernelIdentityReady(false);
      return null;
    }
  },

  isKernelIdentityReady(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(KERNEL_IDENTITY_READY_KEY) === 'true';
  },

  setKernelIdentityReady(ready: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KERNEL_IDENTITY_READY_KEY, String(ready));
  },
};
