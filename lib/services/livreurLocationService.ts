import { livreurFetch, getLivreurSession } from '@/lib/livreur/api';
import { enqueueOfflineAction } from '@/lib/livreur/offlineQueue';

export const livreurLocationService = {
  async updateLocation(
    delivererId: string,
    latitude: number,
    longitude: number,
    accuracyMeters: number,
    missionId?: string,
  ): Promise<void> {
    const body = {
      latitude,
      longitude,
      accuracyMeters,
      missionId: missionId ?? null,
    };

    try {
      await livreurFetch<void>(`/deliverers/${delivererId}/location`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        await enqueueOfflineAction({
          type: 'location',
          path: `/deliverers/${delivererId}/location`,
          method: 'PATCH',
          body,
        });
        return;
      }
      throw err;
    }
  },

  isGpsSupported(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
  },

  getSessionDelivererId(): string | null {
    return getLivreurSession()?.delivererId ?? null;
  },
};
