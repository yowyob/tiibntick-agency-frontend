import { formatUserError } from '@/lib/errors';
import { publicFetchJson, publicClientHeaders, publicClientJsonHeaders } from '@/lib/api/publicFetch';
import { API_BASE_URL, AGENCY_FRONTEND_URL, PUBLIC_AGENCY_ID } from '@/lib/config';

export type IntakeStatus = 'SUBMITTED' | 'APPROVED' | 'REJECTED';
export type IntakeDeliveryMode = 'DIRECT' | 'HUB';

export interface IntakeContext {
  agencyId: string;
  agencyName: string;
  branchId: string;
  branchName: string;
  branchAddress?: string;
}

export interface IntakeSubmitPayload {
  agencyId: string;
  branchId: string;
  senderName: string;
  senderPhone?: string;
  recipientName: string;
  recipientPhone?: string;
  pickupAddress: string;
  deliveryAddress: string;
  weightKg?: number;
  packagesCount?: number;
  deliveryMode: IntakeDeliveryMode;
  targetHubId?: string;
  notes?: string;
}

export interface IntakeStatusResult {
  id: string;
  referenceCode: string;
  status: IntakeStatus;
  source: string;
  senderName: string;
  recipientName: string;
  deliveryAddress?: string;
  deliveryMode: IntakeDeliveryMode;
  trackingCode?: string;
  missionId?: string;
  agencyName?: string;
  branchName?: string;
  rejectionReason?: string;
  reviewedAt?: string;
  createdAt?: string;
}

export interface IntakeSubmitResult {
  id: string;
  referenceCode: string;
  status: string;
  createdAt?: string;
}

function trackUrl(code: string): string {
  const base = AGENCY_FRONTEND_URL.replace(/\/$/, '');
  return `${base}/track?code=${encodeURIComponent(code)}`;
}

export function intakeTrackUrl(trackingCode?: string): string | null {
  if (!trackingCode) return null;
  return trackUrl(trackingCode);
}

export function intakeDepositUrl(agencyId = PUBLIC_AGENCY_ID, branchId?: string): string {
  const base = AGENCY_FRONTEND_URL.replace(/\/$/, '');
  const params = new URLSearchParams({ agencyId });
  if (branchId) params.set('branchId', branchId);
  return `${base}/track/deposit?${params.toString()}`;
}

export const intakeService = {
  async getContext(agencyId: string, branchId: string): Promise<IntakeContext> {
    const params = new URLSearchParams({ branchId });
    return publicFetchJson<IntakeContext>(
      `${API_BASE_URL}/agencies/${agencyId}/intake-context?${params}`,
      { headers: publicClientHeaders() },
    );
  },

  async submit(payload: IntakeSubmitPayload): Promise<IntakeSubmitResult> {
    try {
      return await publicFetchJson<IntakeSubmitResult>(
        `${API_BASE_URL}/intake-requests`,
        {
          method: 'POST',
          headers: publicClientJsonHeaders(),
          body: JSON.stringify(payload),
        },
      );
    } catch (err) {
      throw {
        status: 0,
        message: formatUserError(err, 'Impossible d\'envoyer votre demande.'),
      };
    }
  },

  async getStatus(referenceCode: string): Promise<IntakeStatusResult> {
    try {
      return await publicFetchJson<IntakeStatusResult>(
        `${API_BASE_URL}/intake-requests/${encodeURIComponent(referenceCode.trim())}`,
        { headers: publicClientHeaders() },
      );
    } catch (err) {
      throw { status: 404, message: 'Demande introuvable.' };
    }
  },

  async listPending(agencyId: string): Promise<IntakeStatusResult[]> {
    const { apiClient } = await import('@/lib/api/client');
    return apiClient.get<IntakeStatusResult[]>(`/agencies/${agencyId}/intake-requests`);
  },

  async approve(intakeId: string, data?: {
    delivererId?: string;
    vehicleId?: string;
    deliveryMode?: IntakeDeliveryMode;
    targetHubId?: string;
  }): Promise<IntakeStatusResult> {
    const { apiClient } = await import('@/lib/api/client');
    return apiClient.post<IntakeStatusResult>(`/intake-requests/${intakeId}/approve`, data ?? {});
  },

  async reject(intakeId: string, reason: string): Promise<IntakeStatusResult> {
    const { apiClient } = await import('@/lib/api/client');
    return apiClient.post<IntakeStatusResult>(`/intake-requests/${intakeId}/reject`, { reason });
  },

  async walkIn(agencyId: string, payload: Omit<IntakeSubmitPayload, 'agencyId'> & {
    delivererId?: string;
    vehicleId?: string;
  }): Promise<IntakeStatusResult> {
    const { apiClient } = await import('@/lib/api/client');
    const { branchId, senderName, senderPhone, recipientName, recipientPhone,
      pickupAddress, deliveryAddress, weightKg, packagesCount,
      deliveryMode, targetHubId, notes, delivererId, vehicleId } = payload;
    return apiClient.post<IntakeStatusResult>(
      `/agencies/${agencyId}/intake-requests/walk-in`,
      {
        branchId, senderName, senderPhone, recipientName, recipientPhone,
        pickupAddress, deliveryAddress, weightKg, packagesCount,
        deliveryMode, targetHubId, notes, delivererId, vehicleId,
      },
    );
  },
};
