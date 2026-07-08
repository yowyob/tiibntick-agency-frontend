'use client'

import { QRCodeSVG } from 'qrcode.react'
import { intakeTrackUrl } from '@/lib/services/intakeService'

export interface ReceiptData {
  referenceCode?: string
  trackingCode?: string
  agencyName: string
  branchName: string
  senderName: string
  recipientName: string
  recipientPhone?: string
  pickupAddress?: string
  deliveryAddress?: string
  weightKg?: number
  deliveryMode?: string
  createdAt?: string
}

interface Props {
  data: ReceiptData
  showQr?: boolean
}

export default function MissionReceipt({ data, showQr = true }: Props) {
  const trackUrl = data.trackingCode ? intakeTrackUrl(data.trackingCode) : null

  return (
    <div id="mission-receipt" className="bg-white text-gray-900 p-8 max-w-md mx-auto font-sans">
      <div className="text-center border-b border-gray-200 pb-4 mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest">TiiBnTick</p>
        <p className="text-lg font-bold mt-1">{data.agencyName}</p>
        <p className="text-sm text-gray-600">{data.branchName}</p>
        <p className="text-xs text-gray-400 mt-2">
          {data.createdAt
            ? new Date(data.createdAt).toLocaleString('fr-FR')
            : new Date().toLocaleString('fr-FR')}
        </p>
      </div>

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Récapitulatif</p>
      <div className="text-sm space-y-2 mb-4">
        {data.referenceCode && (
          <p><span className="text-gray-500">Référence · </span><span className="font-mono font-semibold">{data.referenceCode}</span></p>
        )}
        <p><span className="text-gray-500">Expéditeur · </span>{data.senderName}</p>
        <p><span className="text-gray-500">Destinataire · </span>{data.recipientName}</p>
        {data.recipientPhone && <p><span className="text-gray-500">Tél. · </span>{data.recipientPhone}</p>}
        {data.pickupAddress && <p><span className="text-gray-500">Enlèvement · </span>{data.pickupAddress}</p>}
        {data.deliveryAddress && <p><span className="text-gray-500">Livraison · </span>{data.deliveryAddress}</p>}
        {data.weightKg != null && <p><span className="text-gray-500">Poids · </span>{data.weightKg} kg</p>}
        {data.deliveryMode && (
          <p><span className="text-gray-500">Mode · </span>{data.deliveryMode === 'HUB' ? 'Point relais' : 'Livraison directe'}</p>
        )}
      </div>

      {data.trackingCode && (
        <div className="border border-orange-200 bg-orange-50 rounded-xl p-4 text-center mb-4">
          <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-1">Code de suivi</p>
          <p className="text-xl font-bold font-mono text-gray-900">{data.trackingCode}</p>
          {trackUrl && (
            <p className="text-[10px] text-gray-500 mt-2 break-all">{trackUrl}</p>
          )}
          {showQr && trackUrl && (
            <div className="flex justify-center mt-4">
              <QRCodeSVG value={trackUrl} size={140} level="M" />
            </div>
          )}
        </div>
      )}

      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
        Conservez ce reçu. Scannez le QR code pour suivre votre colis en ligne.
      </p>
    </div>
  )
}

export function printMissionReceipt() {
  window.print()
}
