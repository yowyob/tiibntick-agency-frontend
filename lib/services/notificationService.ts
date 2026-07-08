import { getAgencyId } from '@/lib/session';
import { apiClient } from '@/lib/api/client';
import type { NotificationDto } from '@/lib/api/dto';

export type NotifType = 'alert' | 'warning' | 'success' | 'info';

export interface AppNotification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  href: string;
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hier';
  return `Il y a ${days}j`;
}

function mapNotification(dto: NotificationDto): AppNotification {
  return {
    id: dto.id,
    type: (dto.type as NotifType) ?? 'info',
    title: dto.title,
    body: dto.body,
    time: formatRelativeTime(dto.createdAt),
    read: dto.read,
    href: dto.href ?? '/',
  };
}

export const notificationService = {
  async getNotifications(agencyId?: string, limit = 50): Promise<AppNotification[]> {
    const id = agencyId ?? getAgencyId();
    const dtos = await apiClient.get<NotificationDto[]>(
      `/agencies/${id}/notifications?limit=${limit}`,
    );
    return dtos.map(mapNotification);
  },

  async markRead(notificationId: string): Promise<AppNotification> {
    const dto = await apiClient.patch<NotificationDto>(
      `/notifications/${notificationId}/read`,
      {},
    );
    return mapNotification(dto);
  },

  async markAllRead(agencyId?: string): Promise<void> {
    const id = agencyId ?? getAgencyId();
    await apiClient.patch(`/agencies/${id}/notifications/read-all`, {});
  },
};
