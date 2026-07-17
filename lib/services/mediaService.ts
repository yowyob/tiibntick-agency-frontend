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

/** Categories that should run Kernel OCR verify on upload. */
const VERIFY_CATEGORIES = new Set([
  'onboarding-cni',
  'onboarding-rccm',
  'onboarding-proof',
  'contract',
  'vehicle-doc',
  'kyc',
  'identity',
  'national-id',
]);

export function shouldVerifyDocument(category?: string): boolean {
  if (!category) return false;
  const c = category.toLowerCase();
  if (VERIFY_CATEGORIES.has(c)) return true;
  return c.includes('onboarding') || c.includes('kyc') || c.endsWith('-doc') || c.includes('identity');
}

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
    // After signup session exists — verify then store.
    await this.verifyDocument(file);
    const result = await apiClient.upload<UploadResponse>(
      `/media/upload?category=${encodeURIComponent(category)}`,
      file,
    );
    return result.mediaId;
  },

  async uploadFile(file: File, category = 'general'): Promise<string> {
    if (shouldVerifyDocument(category)) {
      await this.verifyDocument(file);
    }
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
    if (shouldVerifyDocument(documentType)) {
      await this.verifyDocument(file);
    }
    const result = await apiClient.upload<UploadResponse>(
      `/media/upload?category=${encodeURIComponent(documentType)}&entityId=${entityId}`,
      file,
    );
    return toAbsoluteUrl(result.publicUrl || result.url);
  },

  /** OCR / validity check via Core → Kernel. */
  async verifyDocument(file: File, tenantId?: string): Promise<unknown> {
    return apiClient.upload(`/kyc/documents/verify`, file, tenantId);
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
