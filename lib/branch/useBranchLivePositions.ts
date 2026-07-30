'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Deliverer } from '@/lib/types';
import { subscribeCorePresence } from '@/lib/coreRealtime';
import { seedPositionsFromDeliverers, type LivePosition } from '@/lib/agency/useAgencyLivePositions';

export type { LivePosition };

export function useBranchLivePositions(delivererIds: string[], deliverers?: Deliverer[]) {
  const [positions, setPositions] = useState<Record<string, LivePosition>>({});
  const idsKey = delivererIds.sort().join(',');

  useEffect(() => {
    if (!deliverers?.length) return;
    const seeded = seedPositionsFromDeliverers(deliverers);
    setPositions(prev => ({ ...seeded, ...prev }));
  }, [deliverers]);

  const applyUpdate = useCallback((delivererId: string, lat: number, lng: number) => {
    if (!delivererIds.includes(delivererId)) return;
    setPositions(prev => ({
      ...prev,
      [delivererId]: { lat, lng, updatedAt: new Date().toISOString() },
    }));
  }, [idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof window === 'undefined' || delivererIds.length === 0) return;
    return subscribeCorePresence((update) => {
      applyUpdate(update.userId, update.latitude, update.longitude);
    });
  }, [idsKey, applyUpdate, delivererIds.length]);

  const asLatLng = (): Record<string, { lat: number; lng: number }> => {
    const out: Record<string, { lat: number; lng: number }> = {};
    for (const [id, p] of Object.entries(positions)) {
      out[id] = { lat: p.lat, lng: p.lng };
    }
    return out;
  };

  return { positions, livePositions: asLatLng(), connected: delivererIds.length > 0 };
}
