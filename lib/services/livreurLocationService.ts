import { livreurFetch, getLivreurSession } from '@/lib/livreur/api'
import { enqueueOfflineAction, type OfflineScope } from '@/lib/livreur/offlineQueue'

function requireScope(): OfflineScope {
  const session = getLivreurSession()
  if (!session?.tenantId || !session.agencyId || !session.userId || !session.delivererId) {
    throw new Error('Session expirée')
  }
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

export const livreurLocationService = {
  async updateLocation(
    delivererId: string,
    latitude: number,
    longitude: number,
    accuracyMeters: number,
    missionId?: string,
  ): Promise<void> {
    const body = {
      delivererId,
      latitude,
      longitude,
      accuracyMeters,
      missionId: missionId ?? null,
      recordedAt: new Date().toISOString(),
    }

    try {
      await livreurFetch<void>(`/deliverers/${delivererId}/location`, {
        method: 'PATCH',
        body: JSON.stringify({
          latitude,
          longitude,
          accuracyMeters,
          missionId: missionId ?? null,
        }),
      })
    } catch (err) {
      if (isOfflineError(err)) {
        const scope = requireScope()
        await enqueueOfflineAction({
          type: 'location',
          path: `/deliverers/${delivererId}/location`,
          method: 'PATCH',
          body,
          aggregateId: delivererId,
        }, scope)
        return
      }
      throw err
    }
  },

  isGpsSupported(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator
  },

  getSessionDelivererId(): string | null {
    return getLivreurSession()?.delivererId ?? null
  },
}
