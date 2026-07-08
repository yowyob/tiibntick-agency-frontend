'use client';

import { useEffect, useState, useCallback } from 'react';
import { getTenantId } from '@/lib/session';
import { API_BASE_URL } from '@/lib/config';

export interface LivePosition {
  lat: number;
  lng: number;
  updatedAt: string;
}

export function useAgencyLivePositions(delivererIds: string[]) {
  const [positions, setPositions] = useState<Record<string, LivePosition>>({});
  const idsKey = delivererIds.sort().join(',');

  const applyUpdate = useCallback((delivererId: string, lat: number, lng: number) => {
    if (!delivererIds.includes(delivererId)) return;
    setPositions(prev => ({
      ...prev,
      [delivererId]: { lat, lng, updatedAt: new Date().toISOString() },
    }));
  }, [idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof window === 'undefined' || delivererIds.length === 0) return;

    const tenantId = getTenantId();
    if (!tenantId) return;

    const wsBase = API_BASE_URL.replace(/^http/, 'ws');
    const ws = new WebSocket(`${wsBase}/ws/realtime?tenantId=${encodeURIComponent(tenantId)}`);

    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data as string) as {
          channel?: string;
          type?: string;
          data?: Record<string, unknown>;
        };
        if (event.channel !== 'tracking' || event.type !== 'DELIVERER_LOCATION') return;
        const data = event.data;
        if (!data) return;
        const delivererId = String(data.delivererId ?? '');
        const lat = Number(data.latitude);
        const lng = Number(data.longitude);
        if (delivererId && Number.isFinite(lat) && Number.isFinite(lng)) {
          applyUpdate(delivererId, lat, lng);
        }
      } catch { /* ignore */ }
    };

    return () => ws.close();
  }, [idsKey, applyUpdate, delivererIds.length]);

  return { positions };
}
