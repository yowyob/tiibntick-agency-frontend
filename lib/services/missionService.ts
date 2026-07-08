import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import { mapMission } from '@/lib/api/mappers';
import type { Mission, MissionStatus } from '@/lib/types';
import type { MissionDto } from '@/lib/api/dto';

export const missionService = {
  async getMissions(agencyId?: string): Promise<Mission[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<MissionDto[]>(`/agencies/${id}/missions`);
    return dtos.map(mapMission);
  },

  async getMission(missionId: string): Promise<Mission> {
    const dto = await apiClient.get<MissionDto>(`/missions/${missionId}`);
    return mapMission(dto);
  },

  async createMission(agencyId: string, data: {
    branchId: string; senderName: string; recipientName: string; recipientPhone: string;
    pickupAddress: string; deliveryAddress: string; scheduledPickupAt: string;
    priority: string; packagesCount: number; totalWeightKg: number;
    distanceKm?: number;
    targetHubId?: string;
    delivererId?: string;
    vehicleId?: string;
    coreMissionId?: string;
  }): Promise<Mission> {
    const dto = await apiClient.post<MissionDto>(`/agencies/${agencyId}/missions`, {
      ...(data.coreMissionId ? { coreMissionId: data.coreMissionId } : {}),
      scheduledAt: data.scheduledPickupAt,
      pickupAddress: data.pickupAddress,
      deliveryAddress: data.deliveryAddress,
      senderName: data.senderName,
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
      weightKg: data.totalWeightKg,
      distanceKm: data.distanceKm ?? 10,
      ...(data.branchId ? { branchId: data.branchId } : {}),
      packagesCount: data.packagesCount,
      priority: data.priority,
      ...(data.targetHubId ? { targetHubId: data.targetHubId } : {}),
    });
    let mission = mapMission(dto);
    if (data.delivererId) {
      await this.assignMission(mission.id, data.delivererId, data.vehicleId ?? data.delivererId);
      mission = await this.getMission(mission.id);
    }
    return mission;
  },

  async assignMission(missionId: string, delivererId: string, vehicleId: string): Promise<void> {
    await apiClient.patch(`/missions/${missionId}/assign`, { delivererId, vehicleId });
  },

  async reassignMission(missionId: string, delivererId: string, vehicleId: string): Promise<void> {
    await apiClient.patch(`/missions/${missionId}/reassign`, { delivererId, vehicleId });
  },

  async cancelMission(missionId: string, reason: string): Promise<void> {
    await apiClient.patch(`/missions/${missionId}/cancel`, { reason });
  },

  async rescheduleMission(missionId: string, scheduledPickupAt: string): Promise<void> {
    await apiClient.patch(`/missions/${missionId}/reschedule`, {
      newScheduledAt: scheduledPickupAt,
    });
  },

  async depositAtHub(
    missionId: string,
    hubId: string,
    delivererId: string,
    trackingCode: string,
  ): Promise<void> {
    await apiClient.post(`/missions/${missionId}/deposit-hub`, {
      hubId,
      delivererId,
      trackingCode,
    });
  },

  async withdrawHubParcel(
    missionId: string,
    withdrawnBy: string,
    agencyId?: string,
  ): Promise<void> {
    const { hubService } = await import('@/lib/services/hubService');
    const id = agencyId ?? getAgencyId();
    const parcels = await hubService.getAllParcelRecords(id);
    const parcel = parcels.find(
      p => p.missionId === missionId && p.status === 'DEPOSITED',
    );
    if (!parcel) {
      throw new Error('Aucun colis en attente de retrait pour cette mission.');
    }
    await hubService.withdrawParcel(parcel.hubId, parcel.id, withdrawnBy);
  },

  getStatusCounts(missions: Mission[]): Record<MissionStatus, number> {
    const counts = {} as Record<MissionStatus, number>;
    for (const m of missions) {
      counts[m.status] = (counts[m.status] ?? 0) + 1;
    }
    return counts;
  },
};
