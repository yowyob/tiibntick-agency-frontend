'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { onboardingAdminService, type OnboardingListItem } from '@/lib/services/onboardingAdminService'

export default function AdminOnboardingListPage() {
  const [items, setItems] = useState<OnboardingListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onboardingAdminService.listPending()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 max-w-5xl">
      <header className="mb-6">
        <h1 className="text-xl font-semibold">Validation des inscriptions</h1>
        <p className="text-sm text-slate-400 mt-1">Demandes en attente d&apos;approbation admin</p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" /></div>
      ) : items.length === 0 ? (
        <p className="text-center text-slate-400 py-20">Aucune demande en attente.</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <Link
              key={item.agencyId}
              href={`/admin/onboarding/${item.agencyId}`}
              className="block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{item.agencyName}</p>
                    {item.kernelIdentityReady ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                        <CheckCircle2 size={10} /> Kernel OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
                        <AlertCircle size={10} /> Identité en attente
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{item.ownerName} · {item.ownerEmail}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Soumis le {new Date(item.submittedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <ChevronRight size={18} className="text-slate-500" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
