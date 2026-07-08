import { livreurUpload } from '@/lib/livreur/api';

export interface ProofOfDeliveryPayload {
  photoBlob?: Blob;
  signatureDataUrl?: string;
  otpCode?: string;
}

export const livreurMediaService = {
  async uploadDeliveryPhoto(blob: Blob, missionId: string): Promise<string> {
    const result = await livreurUpload(blob, `pod-${missionId}-${Date.now()}.jpg`, 'delivery-proof');
    return result.publicUrl || result.url;
  },

  async uploadSignature(dataUrl: string, missionId: string): Promise<string> {
    const blob = await dataUrlToBlob(dataUrl);
    const result = await livreurUpload(blob, `signature-${missionId}-${Date.now()}.png`, 'delivery-proof');
    return result.publicUrl || result.url;
  },

  buildProofReference(parts: { photoUrl?: string; signatureUrl?: string; otpCode?: string }): string {
    const tokens = [
      parts.photoUrl ? `photo:${parts.photoUrl}` : null,
      parts.signatureUrl ? `sig:${parts.signatureUrl}` : null,
      parts.otpCode ? `otp:${parts.otpCode}` : null,
    ].filter(Boolean);
    return tokens.join('|') || `POD-${Date.now()}`;
  },
};

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}
