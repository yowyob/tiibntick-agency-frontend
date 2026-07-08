import { livreurFetch, getLivreurSession } from '@/lib/livreur/api';
import { mapHub } from '@/lib/api/mappers';
import type { HubDto } from '@/lib/api/dto';
import type { Hub } from '@/lib/types';

export const livreurHubService = {
  async getAgencyHubs(): Promise<Hub[]> {
    const session = getLivreurSession();
    if (!session) throw new Error('Session expirée');
    const dtos = await livreurFetch<HubDto[]>(`/agencies/${session.agencyId}/hubs`);
    return dtos.map(mapHub).filter(h => h.status === 'OPEN');
  },

  async depositAtHub(missionId: string, hubId: string, trackingCode: string): Promise<void> {
    const session = getLivreurSession();
    if (!session) throw new Error('Session expirée');
    await livreurFetch(`/missions/${missionId}/deposit-hub`, {
      method: 'POST',
      body: JSON.stringify({
        delivererId: session.delivererId,
        hubId,
        trackingCode,
      }),
    });
  },
};
