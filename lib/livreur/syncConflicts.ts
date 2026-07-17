import type { SyncPushConflict } from '@/lib/livreur/syncService'

const STORAGE_KEY = 'tnt-livreur-sync-conflicts'
export const LIVREUR_SYNC_CONFLICTS_EVENT = 'livreur-sync-conflicts'

export interface SyncConflictSnapshot {
  at: string
  conflicts: SyncPushConflict[]
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
}

export function publishSyncConflicts(conflicts: SyncPushConflict[]): void {
  if (!canUseStorage()) return
  const snapshot: SyncConflictSnapshot = {
    at: new Date().toISOString(),
    conflicts: Array.isArray(conflicts) ? conflicts : [],
  }
  if (snapshot.conflicts.length === 0) {
    sessionStorage.removeItem(STORAGE_KEY)
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }
  window.dispatchEvent(new CustomEvent(LIVREUR_SYNC_CONFLICTS_EVENT, { detail: snapshot }))
}

export function clearSyncConflicts(): void {
  publishSyncConflicts([])
}

export function readSyncConflicts(): SyncConflictSnapshot | null {
  if (!canUseStorage()) return null
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as SyncConflictSnapshot
    if (!parsed || !Array.isArray(parsed.conflicts)) return null
    return parsed
  } catch {
    return null
  }
}
