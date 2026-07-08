'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Loader2 } from 'lucide-react'
import { hubService } from '@/lib/services/hubService'

const STATUS_LABELS: Record<string, string> = {
  DEPOSITED: 'Déposés',
  WITHDRAWN: 'Retirés',
  EXPIRED: 'Expirés',
  RETURNED_TO_AGENCY: 'Retournés',
}

interface Props {
  hubId: string | null
  open: boolean
}

export default function HubReportPanel({ hubId, open }: Props) {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<{
    currentOccupancy: number
    capacityUnits: number
    parcelsByStatus: Record<string, number>
  } | null>(null)

  useEffect(() => {
    if (!hubId || !open) {
      setReport(null)
      return
    }
    setLoading(true)
    void hubService.getReports(hubId)
      .then(r => setReport({
        currentOccupancy: r.currentOccupancy,
        capacityUnits: r.capacityUnits,
        parcelsByStatus: r.parcelsByStatus,
      }))
      .catch(() => setReport(null))
      .finally(() => setLoading(false))
  }, [hubId, open])

  if (!hubId || !open) return null

  const entries = report
    ? Object.entries(report.parcelsByStatus).filter(([, count]) => count > 0)
    : []
  const total = entries.reduce((s, [, c]) => s + c, 0)

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
      <p className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
        <BarChart3 size={14} className="text-orange-500" />
        Rapport hub (API)
      </p>
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 size={18} className="animate-spin text-orange-500" />
        </div>
      ) : !report ? (
        <p className="text-xs text-slate-500 mt-2">Rapport indisponible</p>
      ) : (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-slate-600">
            Occupation {report.currentOccupancy}/{report.capacityUnits} colis
          </p>
          {entries.length === 0 ? (
            <p className="text-xs text-slate-500">Aucun colis enregistré</p>
          ) : (
            <div className="space-y-1.5">
              {entries.map(([status, count]) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0
                return (
                  <div key={status}>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                      <span>{STATUS_LABELS[status] ?? status}</span>
                      <span className="font-semibold">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-orange-500 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
