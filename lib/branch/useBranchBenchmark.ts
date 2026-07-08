'use client';

import { useEffect, useState } from 'react';
import { branchAuthService } from '@/lib/services/branchAuthService';
import { branchOperationsService } from '@/lib/services/branchOperationsService';
import { computeBranchBenchmarks, type BranchBenchmarkRow } from '@/lib/branch/branchBenchmark';

export function useBranchBenchmark(currentBranchId: string | null, agencyId: string | null) {
  const [rows, setRows] = useState<BranchBenchmarkRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentBranchId || !agencyId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    void branchOperationsService.loadAgencyBenchmark(agencyId, currentBranchId)
      .then(data => { if (!cancelled) setRows(data); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [currentBranchId, agencyId]);

  return { rows, loading };
}

export function useBranchBenchmarkFromSession() {
  const branchId = branchAuthService.getCurrentBranchId();
  const agencyId = branchAuthService.getAgencyId();
  return useBranchBenchmark(branchId, agencyId);
}
