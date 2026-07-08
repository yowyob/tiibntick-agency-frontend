'use client';

import { useCallback, useEffect, useState } from 'react';
import { branchAuthService } from '@/lib/services/branchAuthService';
import { branchOperationsService, type BranchOperationalData } from '@/lib/services/branchOperationsService';

export function useBranchOperationalData() {
  const [data, setData] = useState<BranchOperationalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const branchId = branchAuthService.getCurrentBranchId();
  const agencyId = branchAuthService.getAgencyId();

  const refresh = useCallback(async () => {
    if (!branchId || !agencyId) return;
    setError(null);
    try {
      const next = await branchOperationsService.loadOperationalData(branchId, agencyId);
      setData(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [branchId, agencyId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh, branchId, agencyId };
}
