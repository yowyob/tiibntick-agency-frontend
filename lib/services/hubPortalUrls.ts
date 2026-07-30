import { publicAppOrigin } from '@/lib/services/intakeService'

/** QR URLs for hub deposit / withdraw scans (same pattern as accueil client QR). */
export function hubDepositScanUrl(hubId: string, agencyId: string): string {
  const base = publicAppOrigin()
  return `${base}/hub/scan?hubId=${encodeURIComponent(hubId)}&agencyId=${encodeURIComponent(agencyId)}&action=deposit`
}

export function hubWithdrawScanUrl(hubId: string, agencyId: string): string {
  const base = publicAppOrigin()
  return `${base}/hub/scan?hubId=${encodeURIComponent(hubId)}&agencyId=${encodeURIComponent(agencyId)}&action=withdraw`
}

export function hubClientConfirmUrl(handoffId: string, agencyId: string): string {
  const base = publicAppOrigin()
  return `${base}/track/hub-confirm?handoffId=${encodeURIComponent(handoffId)}&agencyId=${encodeURIComponent(agencyId)}`
}
