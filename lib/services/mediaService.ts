import { API_BASE_URL, AGENCY_PUBLIC_BASE_URL } from '@/lib/config';
import { apiClient } from '@/lib/api/client';

interface UploadResponse {
  mediaId: string;
  storageKey: string;
  url: string;
  publicUrl: string;
}

interface DownloadUrlResponse {
  url: string;
  ttlSeconds: number;
}

export type KycDocumentCategory = 'onboarding-cni' | 'onboarding-rccm' | 'onboarding-proof';

function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const origin = API_BASE_URL.replace(/\/v1\/?$/, '') || AGENCY_PUBLIC_BASE_URL;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export const mediaService = {
  /**
   * Upload a KYC document during onboarding.
   * Returns the Core mediaId stored in onboarding_applications.doc_*_key.
   */
  async uploadKycDocument(file: File, category: KycDocumentCategory): Promise<string> {
    const result = await apiClient.upload<UploadResponse>(
      `/media/upload?category=${encodeURIComponent(category)}`,
      file,
    );
    return result.mediaId;
  },

  async uploadFile(file: File, category = 'general'): Promise<string> {
    const result = await apiClient.upload<UploadResponse>(
      `/media/upload?category=${encodeURIComponent(category)}`,
      file,
    );
    return toAbsoluteUrl(result.publicUrl || result.url);
  },

  async uploadDeliveryProof(missionId: string, file: File): Promise<string> {
    const result = await apiClient.upload<UploadResponse>(
      `/media/upload?category=delivery-proof&missionId=${missionId}`,
      file,
    );
    return toAbsoluteUrl(result.publicUrl || result.url);
  },

  async uploadDocument(entityId: string, documentType: string, file: File): Promise<string> {
    const result = await apiClient.upload<UploadResponse>(
      `/media/upload?category=${encodeURIComponent(documentType)}&entityId=${entityId}`,
      file,
    );
    return toAbsoluteUrl(result.publicUrl || result.url);
  },

  /** Pre-signed URL for admin KYC review (TNT_ADMIN). */
  async getDownloadUrl(mediaId: string, ttlSeconds = 3600): Promise<DownloadUrlResponse> {
    return apiClient.get<DownloadUrlResponse>(
      `/media/${encodeURIComponent(mediaId)}/download-url?ttlSeconds=${ttlSeconds}`,
    );
  },

  isMediaId(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  },
};
