import { livreurFetch, getLivreurSession } from '@/lib/livreur/api'
import {
  corePayloadFor,
  getOrCreateDeviceId,
  getSyncToken,
  listOfflineActions,
  saveSyncToken,
  type OfflineAction,
  type OfflineScope,
  scopeKey,
} from '@/lib/livreur/offlineQueue'

export interface SyncChange {
  aggregateType: string
  aggregateId: string
  operation: string
  payload?: string
  serverVersion?: number
  serverTimestamp?: string | null
}

export interface SyncPullResult {
  nextSyncToken: string
  changes: SyncChange[]
}

export interface SyncPushConflict {
  aggregateType: string
  aggregateId: string
  resolution: string
  resolvedValue?: string | null
}

export interface SyncPushResult {
  nextSyncToken: string
  operationsSubmitted: number
  operationsApplied: number
  conflictsDetected: number
  discarded: number
  conflicts: SyncPushConflict[]
}

function requireScope(scope?: OfflineScope): OfflineScope {
  if (scope) return scope
  const session = getLivreurSession()
  if (!session?.tenantId || !session.agencyId || !session.userId || !session.delivererId) {
    throw new Error('Session livreur incomplète pour la synchronisation.')
  }
  return {
    tenantId: session.tenantId,
    agencyId: session.agencyId,
    userId: session.userId,
    delivererId: session.delivererId,
  }
}

function syncBase(agencyId: string): string {
  return `/agencies/${encodeURIComponent(agencyId)}/sync`
}

export function offlineActionToOperation(
  action: OfflineAction,
  sequenceNumber: number,
): Record<string, unknown> {
  return {
    id: action.idempotencyKey || action.id,
    type: action.coreType || 'MISSION_STATUS_UPDATE',
    aggregateType: action.aggregateType || 'MISSION',
    aggregateId: action.aggregateId,
    payload: JSON.stringify(corePayloadFor(action)),
    localTimestampMs: new Date(action.createdAt).getTime(),
    sequenceNumber: action.sequenceNumber || sequenceNumber,
  }
}

export const livreurSyncService = {
  scopeKey,

  offlineActionToOperation,

  async pull(filter?: string[], scope?: OfflineScope): Promise<SyncPullResult | null> {
    const current = requireScope(scope)
    const params = new URLSearchParams()
    const token = await getSyncToken(current)
    if (token) params.set('syncToken', token)
    if (filter?.length) params.set('filter', filter.join(','))
    const qs = params.toString()
    try {
      const deviceId = await getOrCreateDeviceId(current)
      const result = await livreurFetch<SyncPullResult>(
        `${syncBase(current.agencyId)}/pull${qs ? `?${qs}` : ''}`,
        { headers: { 'X-Device-Id': deviceId } },
      )
      await saveSyncToken(current, result.nextSyncToken)
      return {
        nextSyncToken: result.nextSyncToken,
        changes: Array.isArray(result.changes) ? result.changes : [],
      }
    } catch {
      return null
    }
  },

  async bootstrap(filter?: string[], scope?: OfflineScope): Promise<SyncPullResult | null> {
    const current = requireScope(scope)
    const params = new URLSearchParams()
    if (filter?.length) params.set('filter', filter.join(','))
    const qs = params.toString()
    try {
      const deviceId = await getOrCreateDeviceId(current)
      const result = await livreurFetch<SyncPullResult>(
        `${syncBase(current.agencyId)}/bootstrap${qs ? `?${qs}` : ''}`,
        { headers: { 'X-Device-Id': deviceId } },
      )
      await saveSyncToken(current, result.nextSyncToken)
      return {
        nextSyncToken: result.nextSyncToken,
        changes: Array.isArray(result.changes) ? result.changes : [],
      }
    } catch {
      return null
    }
  },

  async push(operations: Record<string, unknown>[], scope?: OfflineScope): Promise<SyncPushResult | null> {
    if (operations.length === 0) {
      const current = requireScope(scope)
      const token = await getSyncToken(current)
      return token
        ? {
            nextSyncToken: token,
            operationsSubmitted: 0,
            operationsApplied: 0,
            conflictsDetected: 0,
            discarded: 0,
            conflicts: [],
          }
        : null
    }
    const current = requireScope(scope)
    try {
      const deviceId = await getOrCreateDeviceId(current)
      const syncToken = await getSyncToken(current)
      const query = syncToken ? `?syncToken=${encodeURIComponent(syncToken)}` : ''
      const result = await livreurFetch<{
        newSyncToken?: string
        nextSyncToken?: string
        operationsSubmitted?: number
        operationsApplied?: number
        conflictsDetected?: number
        discarded?: number
        conflicts?: SyncPushConflict[]
      }>(`${syncBase(current.agencyId)}/push${query}`, {
        method: 'POST',
        headers: { 'X-Device-Id': deviceId },
        body: JSON.stringify({ operations }),
      })
      const nextSyncToken = result.nextSyncToken || result.newSyncToken || ''
      if (nextSyncToken) await saveSyncToken(current, nextSyncToken)
      return {
        nextSyncToken,
        operationsSubmitted: result.operationsSubmitted ?? operations.length,
        operationsApplied: result.operationsApplied ?? 0,
        conflictsDetected: result.conflictsDetected ?? 0,
        discarded: result.discarded ?? 0,
        conflicts: result.conflicts ?? [],
      }
    } catch {
      return null
    }
  },

  async pendingOperations(scope?: OfflineScope): Promise<OfflineAction[]> {
    return listOfflineActions(requireScope(scope))
  },
}
