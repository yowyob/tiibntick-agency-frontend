import { livreurFetch, getLivreurSession } from '@/lib/livreur/api'
import { mapHub } from '@/lib/api/mappers'
import type { HubDto } from '@/lib/api/dto'
import type { Hub } from '@/lib/types'
import { enqueueOfflineAction, scopeKey, type OfflineScope } from '@/lib/livreur/offlineQueue'
import { livreurReadModel } from '@/lib/offline/readModel'

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

function isOfflineError(err: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true
  if (err instanceof TypeError) return true
  if (err instanceof Error && /connexion|network|fetch|Failed to fetch/i.test(err.message)) return true
  return false
}

export const livreurHubService = {
  async getAgencyHubs(): Promise<Hub[]> {
    const session = getLivreurSession()
    if (!session) throw new Error('Session expirée')
    const scope = currentScope()
    try {
      const dtos = await livreurFetch<HubDto[]>(`/agencies/${session.agencyId}/hubs`)
      const hubs = dtos.map(mapHub).filter(h => h.status === 'OPEN')
      if (scope) await livreurReadModel.saveHubs(scopeKey(scope), hubs)
      return hubs
    } catch (err) {
      if (scope && isOfflineError(err)) {
        const cached = await livreurReadModel.getHubs(scopeKey(scope))
        if (cached.length > 0) return cached.filter(h => h.status === 'OPEN')
      }
      throw err
    }
  },

  async depositAtHub(missionId: string, hubId: string, trackingCode: string): Promise<void> {
    const session = getLivreurSession()
    if (!session) throw new Error('Session expirée')
    const body = {
      delivererId: session.delivererId,
      hubId,
      trackingCode,
    }
    try {
      await livreurFetch(`/missions/${missionId}/deposit-hub`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    } catch (err) {
      if (isOfflineError(err)) {
        const scope = currentScope()
        if (!scope) throw err
        await enqueueOfflineAction({
          type: 'deposit-hub',
          path: `/missions/${missionId}/deposit-hub`,
          method: 'POST',
          body,
          aggregateId: missionId,
        }, scope)
        return
      }
      throw err
    }
  },
}
