import { livreurFetch } from '@/lib/livreur/api';
import { mapCommission } from '@/lib/api/mappers';
import type { CommissionRecordDto } from '@/lib/api/dto';
import type { CommissionRecord } from '@/lib/types';

export interface CommissionSummary {
  totalPending: number;
  totalValidated: number;
  totalPaid: number;
  currency: string;
  records: CommissionRecord[];
}

export const livreurCommissionService = {
  async getMyCommissions(delivererId: string): Promise<CommissionSummary> {
    const dtos = await livreurFetch<CommissionRecordDto[]>(`/deliverers/${delivererId}/commissions`);
    const records = dtos.map(mapCommission);
    const currency = records[0]?.currency ?? 'XAF';

    const sum = (status: CommissionRecord['status']) =>
      records.filter(r => r.status === status).reduce((acc, r) => acc + r.amount, 0);

    return {
      totalPending: sum('CALCULATED'),
      totalValidated: sum('VALIDATED'),
      totalPaid: sum('PAID'),
      currency,
      records: records.sort((a, b) => b.calculatedAt.localeCompare(a.calculatedAt)),
    };
  },

  async disputeCommission(commissionId: string, reason: string): Promise<void> {
    await livreurFetch(`/commissions/${commissionId}/dispute`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },
};
