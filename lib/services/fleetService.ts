import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import { mapVehicle, toBackendVehicleType } from '@/lib/api/mappers';
import type { Vehicle, VehicleType } from '@/lib/types';
import type { VehicleDto } from '@/lib/api/dto';

export const fleetService = {
  async getVehicles(agencyId?: string): Promise<Vehicle[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<VehicleDto[]>(`/agencies/${id}/vehicles`);
    return dtos.map(mapVehicle);
  },

  async addVehicle(agencyId: string, data: {
    registrationNumber: string; model: string; vehicleType: VehicleType;
    maxWeightKg: number; maxVolumeM3: number; branchId?: string;
    brand?: string; year?: number;
  }): Promise<Vehicle> {
    const dto = await apiClient.post<VehicleDto>(`/agencies/${agencyId}/vehicles`, {
      branchId: data.branchId,
      licensePlate: data.registrationNumber,
      brand: data.brand ?? data.model,
      model: data.model,
      year: data.year ?? new Date().getFullYear(),
      vehicleType: toBackendVehicleType(data.vehicleType),
    });
    return mapVehicle(dto);
  },

  async assignDeliverer(vehicleId: string, delivererId: string): Promise<void> {
    await apiClient.patch(`/vehicles/${vehicleId}/assign`, { delivererId });
  },

  async unassignDeliverer(vehicleId: string): Promise<void> {
    await apiClient.patch(`/vehicles/${vehicleId}/unassign`, {});
  },

  async sendToMaintenance(vehicleId: string): Promise<void> {
    await apiClient.patch(`/vehicles/${vehicleId}/maintenance`, {});
  },

  async returnFromMaintenance(vehicleId: string): Promise<void> {
    await apiClient.patch(`/vehicles/${vehicleId}/maintenance/return`, {});
  },

  async retireVehicle(vehicleId: string): Promise<void> {
    await apiClient.patch(`/vehicles/${vehicleId}/retire`, {});
  },
};
