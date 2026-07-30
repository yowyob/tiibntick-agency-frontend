'use client'

import { hubAuthService } from '@/lib/services/hubAuthService'
import Link from 'next/link'
import { Inbox, Package, QrCode } from 'lucide-react'

export default function HubDashboardPage() {
  const session = hubAuthService.getSession()

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900">Bonjour{session?.operatorName ? `, ${session.operatorName}` : ''}</h1>
      <p className="text-sm text-gray-500 mt-1">
        Hub <strong>{session?.hubName}</strong>
        {session?.hubCode ? ` · ${session.hubCode}` : ''}
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <Link href="/hub/demandes" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition">
          <Inbox className="text-orange-500 mb-3" size={22} />
          <p className="font-medium text-gray-900">Demandes</p>
          <p className="text-xs text-gray-500 mt-1">Valider dépôts et retraits en attente</p>
        </Link>
        <Link href="/hub/stock" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition">
          <Package className="text-orange-500 mb-3" size={22} />
          <p className="font-medium text-gray-900">Stock</p>
          <p className="text-xs text-gray-500 mt-1">Colis présents dans votre espace</p>
        </Link>
        <Link href="/hub/qr" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition">
          <QrCode className="text-orange-500 mb-3" size={22} />
          <p className="font-medium text-gray-900">QR codes</p>
          <p className="text-xs text-gray-500 mt-1">Dépôt et retrait à afficher</p>
        </Link>
      </div>
    </div>
  )
}
