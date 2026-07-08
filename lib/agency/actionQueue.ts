import type { Branch, CommissionRecord, Deliverer, Hub, HubParcelRecord, Mission } from '@/lib/types';
import { isHubSaturated, isParcelExpiringSoon, hubOccupancyPct } from '@/lib/branch/actionQueue';

export type AgencyActionType =
  | 'MISSION_UNASSIGNED'
  | 'MISSION_FAILED'
  | 'HUB_SATURATED'
  | 'HUB_PARCEL_EXPIRING'
  | 'DELIVERER_OFFLINE_ON_MISSION'
  | 'COMMISSION_PENDING';

export type AgencyActionPriority = 'high' | 'medium' | 'low';

export interface AgencyAction {
  id: string;
  type: AgencyActionType;
  priority: AgencyActionPriority;
  title: string;
  description: string;
  href: string;
  missionId?: string;
  hubId?: string;
  delivererId?: string;
  commissionId?: string;
}

const PRIORITY_ORDER: Record<AgencyActionPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export interface AgencyCommandSummary {
  delivered: number;
  failed: number;
  pending: number;
  active: number;
  revenueXaf: number;
  branchesCount: number;
  hubsSaturated: number;
}

export function buildAgencyCommandSummary(
  missions: Mission[],
  branches: Branch[],
  hubs: Hub[],
): AgencyCommandSummary {
  const delivered = missions.filter(m => m.status === 'DELIVERED');
  return {
    delivered: delivered.length,
    failed: missions.filter(m => m.status === 'FAILED').length,
    pending: missions.filter(m => m.status === 'PENDING').length,
    active: missions.filter(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT').length,
    revenueXaf: delivered.reduce((s, m) => s + (m.sellingPrice ?? 0), 0),
    branchesCount: branches.length,
    hubsSaturated: hubs.filter(isHubSaturated).length,
  };
}

export function buildAgencyActions(
  missions: Mission[],
  hubs: Hub[],
  parcels: HubParcelRecord[],
  deliverers: Deliverer[],
  commissions: CommissionRecord[],
): AgencyAction[] {
  const actions: AgencyAction[] = [];

  missions
    .filter(m => m.status === 'PENDING' && !m.delivererId)
    .forEach(m => {
      actions.push({
        id: `unassigned-${m.id}`,
        type: 'MISSION_UNASSIGNED',
        priority: m.priority === 'URGENT' || m.priority === 'HIGH' ? 'high' : 'medium',
        title: 'Mission sans livreur',
        description: `${m.manifestNumber} · ${m.branchName ?? 'Antenne'} → ${m.recipientName}`,
        href: '/missions',
        missionId: m.id,
      });
    });

  missions
    .filter(m => m.status === 'FAILED')
    .slice(0, 5)
    .forEach(m => {
      actions.push({
        id: `failed-${m.id}`,
        type: 'MISSION_FAILED',
        priority: 'high',
        title: 'Mission échouée',
        description: `${m.manifestNumber} — ${m.recipientName}`,
        href: '/missions',
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
          href: '/staff',
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
      href: '/hubs',
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
      href: '/hubs',
      hubId: p.hubId,
    });
  });

  commissions
    .filter(c => c.status === 'CALCULATED')
    .slice(0, 5)
    .forEach(c => {
      actions.push({
        id: `comm-${c.id}`,
        type: 'COMMISSION_PENDING',
        priority: 'medium',
        title: 'Commission à valider',
        description: `${c.delivererName} — ${c.amount.toLocaleString('fr-FR')} ${c.currency}`,
        href: '/billing',
        commissionId: c.id,
      });
    });

  return actions.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
}
