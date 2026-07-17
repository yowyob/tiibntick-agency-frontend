'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, CloudOff, RefreshCw, X } from 'lucide-react'
import { countOfflineActions, type OfflineScope } from '@/lib/livreur/offlineQueue'
import { getLivreurSession } from '@/lib/livreur/api'
import { livreurMissionService } from '@/lib/services/livreurMissionService'
import {
  clearSyncConflicts,
  LIVREUR_SYNC_CONFLICTS_EVENT,
  readSyncConflicts,
  type SyncConflictSnapshot,
} from '@/lib/livreur/syncConflicts'

function currentScope(): OfflineScope | null {
  const session = getLivreurSession()
  if (!session?.tenantId || !session.agencyId || !session.userId || !session.delivererId) return null
  return {
    tenantId: session.tenantId,
    agencyId: session.agencyId,
    userId: session.userId,
    delivererId: session.delivererId,
  }
}

export default function OfflineSyncBanner() {
  const [pending, setPending] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [online, setOnline] = useState(true)
  const [conflicts, setConflicts] = useState<SyncConflictSnapshot | null>(null)

  const refresh = () => {
    const scope = currentScope()
    if (!scope) {
      setPending(0)
      return
    }
    void countOfflineActions(scope).then(setPending)
    setConflicts(readSyncConflicts())
  }

  useEffect(() => {
    refresh()
    const onOnline = () => {
      setOnline(true)
      void handleSync()
    }
    const onOffline = () => setOnline(false)
    const onConflicts = (event: Event) => {
      const detail = (event as CustomEvent<SyncConflictSnapshot>).detail
      setConflicts(detail?.conflicts?.length ? detail : null)
    }
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    window.addEventListener(LIVREUR_SYNC_CONFLICTS_EVENT, onConflicts)
    setOnline(navigator.onLine)
    const id = setInterval(refresh, 5000)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      window.removeEventListener(LIVREUR_SYNC_CONFLICTS_EVENT, onConflicts)
      clearInterval(id)
    }
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    try {
      const n = await livreurMissionService.syncOfflineQueue()
      if (n > 0) refresh()
    } finally {
      setSyncing(false)
      refresh()
    }
  }

  if (!online) {
    return (
      <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5">
        <CloudOff size={14} className="text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800 flex-1">Mode hors ligne — actions mises en file d&apos;attente</p>
        {pending > 0 && (
          <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">{pending}</span>
        )}
      </div>
    )
  }

  if (conflicts && conflicts.conflicts.length > 0) {
    return (
      <div className="mx-5 mb-4 rounded-xl bg-rose-50 border border-rose-100 px-3 py-2.5 space-y-2">
        <div className="flex items-start gap-2">
          <AlertTriangle size={14} className="text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-rose-900 font-medium">
              {conflicts.conflicts.length} conflit(s) de synchronisation
            </p>
            <ul className="mt-1 space-y-0.5">
              {conflicts.conflicts.slice(0, 3).map((c, i) => (
                <li key={`${c.aggregateType}-${c.aggregateId}-${i}`} className="text-[10px] text-rose-800 truncate">
                  {c.aggregateType} {c.aggregateId.slice(0, 8)}… — {c.resolution}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => clearSyncConflicts()}
            className="text-rose-500 shrink-0"
          >
            <X size={14} />
          </button>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => void handleSync()}
            disabled={syncing}
            className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  if (pending === 0) return null

  return (
    <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-100 px-3 py-2.5">
      <RefreshCw size={14} className={`text-blue-600 shrink-0 ${syncing ? 'animate-spin' : ''}`} />
      <p className="text-xs text-blue-800 flex-1">{pending} action(s) en attente de synchronisation</p>
      <button
        type="button"
        onClick={() => void handleSync()}
        disabled={syncing}
        className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg"
      >
        Sync
      </button>
    </div>
  )
}
