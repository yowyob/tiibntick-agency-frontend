import type { Branch, Deliverer, Mission } from '@/lib/types';

export interface BranchBenchmarkRow {
  branchId: string;
  branchName: string;
  isCurrent: boolean;
  delivered: number;
  failed: number;
  active: number;
  pending: number;
  successRate: number;
  deliverersCount: number;
  rank: number;
}

export function computeBranchBenchmarks(
  branches: Branch[],
  missions: Mission[],
  deliverers: Deliverer[],
  currentBranchId: string,
): BranchBenchmarkRow[] {
  const rows = branches.map(branch => {
    const branchDelivererIds = new Set(
      deliverers.filter(d => d.branchId === branch.id).map(d => d.id),
    );
    const branchMissions = missions.filter(
      m => m.branchId === branch.id
        || (m.delivererId != null && branchDelivererIds.has(m.delivererId)),
    );
    const delivered = branchMissions.filter(m => m.status === 'DELIVERED').length;
    const failed = branchMissions.filter(m => m.status === 'FAILED').length;
    const closed = delivered + failed;
    const active = branchMissions.filter(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT').length;
    const pending = branchMissions.filter(m => m.status === 'PENDING').length;

    return {
      branchId: branch.id,
      branchName: branch.name,
      isCurrent: branch.id === currentBranchId,
      delivered,
      failed,
      active,
      pending,
      successRate: closed > 0 ? Math.round((delivered / closed) * 100) : 0,
      deliverersCount: deliverers.filter(d => d.branchId === branch.id).length,
      rank: 0,
    };
  });

  const sorted = [...rows].sort((a, b) => {
    if (b.successRate !== a.successRate) return b.successRate - a.successRate;
    return b.delivered - a.delivered;
  });

  sorted.forEach((row, i) => {
    const target = rows.find(r => r.branchId === row.branchId);
    if (target) target.rank = i + 1;
  });

  return rows.sort((a, b) => a.rank - b.rank);
}

export function currentBranchRank(rows: BranchBenchmarkRow[], branchId: string): number {
  return rows.find(r => r.branchId === branchId)?.rank ?? 0;
}
