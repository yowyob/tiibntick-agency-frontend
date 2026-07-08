'use client'

import Link from 'next/link'
import { Package, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-6">
          <Package size={36} className="text-orange-300" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-lg font-semibold text-gray-700 mb-2">Page introuvable</p>
        <p className="text-sm text-gray-500 mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <ArrowLeft size={15} />
          Retour au dashboard
        </Link>
      </div>
    </div>
  )
}
