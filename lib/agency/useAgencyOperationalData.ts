'use client';

import { useCallback, useEffect, useState } from 'react';
import { getAgencyId } from '@/lib/session';
import { subscribeRealtime } from '@/lib/realtime';
import { agencyOperationsService, type AgencyOperationalData } from '@/lib/services/agencyOperationsService';

export function useAgencyOperationalData() {
  const [data, setData] = useState<AgencyOperationalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const agencyId = getAgencyId();

  const refresh = useCallback(async () => {
    if (!agencyId) return;
    setError(null);
    try {
      const next = await agencyOperationsService.loadOperationalData(agencyId);
      setData(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [agencyId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!agencyId) return;
    return subscribeRealtime(event => {
      if (event.channel === 'tracking' && event.type === 'DELIVERER_LOCATION') return;
      if (['missions', 'notifications', 'tracking'].includes(event.channel)) {
        void refresh();
      }
    });
  }, [agencyId, refresh]);

  return { data, loading, error, refresh, agencyId };
}
