'use client';

import { useEffect, useState, useCallback } from 'react';
import { subscribeCorePresence } from '@/lib/coreRealtime';
import type { Deliverer } from '@/lib/types';

export interface LivePosition {
  lat: number;
  lng: number;
  updatedAt: string;
}

export function seedPositionsFromDeliverers(
  deliverers: Deliverer[],
): Record<string, LivePosition> {
  const out: Record<string, LivePosition> = {};
  for (const d of deliverers) {
    if (
      typeof d.lastLatitude === 'number' &&
      typeof d.lastLongitude === 'number' &&
      Number.isFinite(d.lastLatitude) &&
      Number.isFinite(d.lastLongitude)
    ) {
      out[d.id] = {
        lat: d.lastLatitude,
        lng: d.lastLongitude,
        updatedAt: d.lastLocationAt ?? new Date().toISOString(),
      };
    }
  }
  return out;
}

export function useAgencyLivePositions(delivererIds: string[], seed?: Record<string, LivePosition>) {
  const [positions, setPositions] = useState<Record<string, LivePosition>>(seed ?? {});
  const idsKey = delivererIds.sort().join(',');

  useEffect(() => {
    if (!seed) return;
    setPositions(prev => ({ ...seed, ...prev }));
  }, [seed]);

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

  return { positions };
}
