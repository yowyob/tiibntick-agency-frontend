'use client';

import { useCallback, useEffect, useState } from 'react';
import { branchAuthService } from '@/lib/services/branchAuthService';
import { branchOperationsService, type BranchOperationalData } from '@/lib/services/branchOperationsService';

export function useBranchOperationalData() {
  const [data, setData] = useState<BranchOperationalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stale, setStale] = useState(false);

  const branchId = branchAuthService.getCurrentBranchId();
  const agencyId = branchAuthService.getAgencyId();

  const refresh = useCallback(async () => {
    if (!branchId || !agencyId) return;
    setError(null);
    try {
      const next = await branchOperationsService.loadOperationalData(branchId, agencyId);
      setData(next);
      setStale(next.source === 'cache');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [branchId, agencyId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onOnline = () => { void refresh(); };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, [refresh]);

  return { data, loading, error, refresh, branchId, agencyId, stale };
}
