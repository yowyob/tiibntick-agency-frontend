'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { livreurLocationService } from '@/lib/services/livreurLocationService';
import { getLivreurSession } from '@/lib/livreur/api';

export interface GpsPosition {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
}

interface UseGpsTrackerOptions {
  enabled?: boolean;
  missionId?: string | null;
  intervalMs?: number;
}

export function useGpsTracker({ enabled = true, missionId = null, intervalMs = 20000 }: UseGpsTrackerOptions) {
  const [position, setPosition] = useState<GpsPosition | null>(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastSentRef = useRef(0);

  const sendLocation = useCallback(async (pos: GpsPosition) => {
    const session = getLivreurSession();
    if (!session) return;
    const now = Date.now();
    if (now - lastSentRef.current < intervalMs - 1000) return;
    lastSentRef.current = now;
    try {
      await livreurLocationService.updateLocation(
        session.delivererId,
        pos.latitude,
        pos.longitude,
        pos.accuracyMeters,
        missionId ?? undefined,
      );
    } catch {
      /* offline queue handled in service */
    }
  }, [intervalMs, missionId]);

  useEffect(() => {
    if (!enabled || typeof navigator === 'undefined' || !navigator.geolocation) {
      setTracking(false);
      return;
    }

    setError(null);
    setTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (geo) => {
        const pos: GpsPosition = {
          latitude: geo.coords.latitude,
          longitude: geo.coords.longitude,
          accuracyMeters: geo.coords.accuracy,
        };
        setPosition(pos);
        void sendLocation(pos);
      },
      (err) => {
        setError(err.message || 'GPS indisponible');
        setTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    );

    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setTracking(false);
    };
  }, [enabled, sendLocation]);

  return { position, tracking, error };
}
