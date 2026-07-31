'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { hubAuthService } from '@/lib/services/hubAuthService'
import { hubDepositScanUrl, hubWithdrawScanUrl } from '@/lib/services/hubPortalUrls'
import { Printer } from 'lucide-react'

export default function HubQrPage() {
  const session = hubAuthService.getSession()
  const [depositUrl, setDepositUrl] = useState('')
  const [withdrawUrl, setWithdrawUrl] = useState('')

  useEffect(() => {
    if (!session) return
    setDepositUrl(hubDepositScanUrl(session.hubId, session.agencyId))
    setWithdrawUrl(hubWithdrawScanUrl(session.hubId, session.agencyId))
  }, [session])

  if (!session) return null

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">QR codes du hub</h1>
          <p className="text-sm text-gray-500 mt-1">À afficher pour les livreurs (et retraits client).</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors"
        >
          <Printer size={14} /> Imprimer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center print:break-inside-avoid">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">QR Dépôt</p>
          <p className="text-sm text-gray-600 mb-4">Le livreur scanne pour demander un dépôt</p>
          {depositUrl && <QRCodeSVG value={depositUrl} size={180} className="mx-auto" />}
          <p className="text-[10px] text-gray-400 mt-3 break-all">{depositUrl}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center print:break-inside-avoid">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">QR Retrait</p>
          <p className="text-sm text-gray-600 mb-4">Livreur ou client scanne pour demander un retrait</p>
          {withdrawUrl && <QRCodeSVG value={withdrawUrl} size={180} className="mx-auto" />}
          <p className="text-[10px] text-gray-400 mt-3 break-all">{withdrawUrl}</p>
        </div>
      </div>
    </div>
  )
}
