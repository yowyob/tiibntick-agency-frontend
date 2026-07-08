import type { Deliverer, Hub, HubParcelRecord, Mission } from '@/lib/types';

export type BranchActionType =
  | 'MISSION_UNASSIGNED'
  | 'HUB_SATURATED'
  | 'HUB_PARCEL_EXPIRING'
  | 'DELIVERER_OFFLINE_ON_MISSION';

export type BranchActionPriority = 'high' | 'medium' | 'low';

export interface BranchAction {
  id: string;
  type: BranchActionType;
  priority: BranchActionPriority;
  title: string;
  description: string;
  href: string;
  missionId?: string;
  hubId?: string;
  delivererId?: string;
}

const PRIORITY_ORDER: Record<BranchActionPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function hubOccupancyPct(hub: Hub): number {
  if (hub.capacity <= 0) return 0;
  return Math.round((hub.currentOccupancy / hub.capacity) * 100);
}

export function isHubSaturated(hub: Hub, thresholdPct = 80): boolean {
  return hub.capacity > 0 && hubOccupancyPct(hub) >= thresholdPct;
}

export function isParcelExpiringSoon(parcel: HubParcelRecord, withinHours = 24): boolean {
  if (parcel.status !== 'DEPOSITED') return false;
  const deadline = new Date(parcel.expectedWithdrawalDeadline).getTime();
  const limit = Date.now() + withinHours * 60 * 60 * 1000;
  return deadline <= limit;
}

export function buildBranchActions(
  missions: Mission[],
  hubs: Hub[],
  parcels: HubParcelRecord[],
  deliverers: Deliverer[],
): BranchAction[] {
  const actions: BranchAction[] = [];

  missions
    .filter(m => m.status === 'PENDING' && !m.delivererId)
    .forEach(m => {
      actions.push({
        id: `unassigned-${m.id}`,
        type: 'MISSION_UNASSIGNED',
        priority: m.priority === 'URGENT' || m.priority === 'HIGH' ? 'high' : 'medium',
        title: 'Mission sans livreur',
        description: `${m.manifestNumber} → ${m.recipientName}`,
        href: '/branch/missions',
        missionId: m.id,
      });
    });

  deliverers
    .filter(d => d.status === 'OFFLINE')
    .forEach(d => {
      const active = missions.find(
        m => m.delivererId === d.id && (m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT'),
      );
      if (active) {
        actions.push({
          id: `offline-${d.id}`,
          type: 'DELIVERER_OFFLINE_ON_MISSION',
          priority: 'high',
          title: 'Livreur hors ligne en mission',
          description: `${d.fullName} — ${active.manifestNumber}`,
          href: '/branch/staff',
          delivererId: d.id,
          missionId: active.id,
        });
      }
    });

  hubs.filter(h => isHubSaturated(h)).forEach(h => {
    actions.push({
      id: `hub-sat-${h.id}`,
      type: 'HUB_SATURATED',
      priority: hubOccupancyPct(h) >= 95 ? 'high' : 'medium',
      title: 'Hub proche de la saturation',
      description: `${h.name} — ${hubOccupancyPct(h)}% (${h.currentOccupancy}/${h.capacity})`,
      href: '/branch/hubs',
      hubId: h.id,
    });
  });

  parcels.filter(p => isParcelExpiringSoon(p)).forEach(p => {
    actions.push({
      id: `parcel-exp-${p.id}`,
      type: 'HUB_PARCEL_EXPIRING',
      priority: 'medium',
      title: 'Colis proche de l\'expiration',
      description: `${p.trackingCode} — ${p.recipientName}`,
      href: '/branch/hubs',
      hubId: p.hubId,
    });
  });

  return actions.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
}

export interface BranchShiftSummary {
  delivered: number;
  failed: number;
  pending: number;
  active: number;
  revenueXaf: number;
}

export function buildShiftSummary(missions: Mission[]): BranchShiftSummary {
  const delivered = missions.filter(m => m.status === 'DELIVERED');
  return {
    delivered: delivered.length,
    failed: missions.filter(m => m.status === 'FAILED').length,
    pending: missions.filter(m => m.status === 'PENDING').length,
    active: missions.filter(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT').length,
    revenueXaf: delivered.reduce((s, m) => s + (m.sellingPrice ?? 0), 0),
  };
}
