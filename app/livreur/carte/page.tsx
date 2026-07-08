'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navigation, Package } from 'lucide-react';
import { livreurAuthService, livreurMissionService } from '@/lib/services/livreurAuthService';
import { useGpsTracker } from '@/lib/livreur/gpsTracker';
import MissionMap from '@/components/livreur/MissionMap';
import GpsTrackerBanner from '@/components/livreur/GpsTrackerBanner';
import { MAPS_PROVIDER_URL, MAP_DEFAULT_CITY } from '@/lib/config';
import type { Mission } from '@/lib/types';

export default function LivreurCartePage() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  const activeMission = useMemo(
    () => missions.find(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT') ?? null,
    [missions],
  );

  const { position, tracking, error: gpsError } = useGpsTracker({
    enabled: true,
    missionId: activeMission?.id ?? null,
  });

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login');
      return;
    }
    const id = livreurAuthService.getCurrentDelivererId()!;
    livreurMissionService.getMyMissions(id).then(setMissions).finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold text-gray-900">Carte & navigation</h1>
        <p className="text-sm text-gray-500">Position GPS et itinéraire mission</p>
      </div>

      <GpsTrackerBanner
        tracking={tracking}
        error={gpsError}
        latitude={position?.latitude}
        longitude={position?.longitude}
      />

      <div className="px-5 space-y-4">
        {activeMission ? (
          <>
            <MissionMap
              pickupAddress={activeMission.pickupAddress}
              deliveryAddress={activeMission.deliveryAddress}
              delivererLat={position?.latitude}
              delivererLng={position?.longitude}
              height="280px"
            />
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-mono text-gray-400">{activeMission.manifestNumber}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{activeMission.recipientName}</p>
              <p className="text-xs text-gray-500 mt-1">{activeMission.deliveryAddress}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={`${MAPS_PROVIDER_URL}${encodeURIComponent(`${activeMission.deliveryAddress}, ${MAP_DEFAULT_CITY}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 rounded-xl bg-orange-500 text-white text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Navigation size={14} /> Google Maps
                </a>
                <Link
                  href={`/livreur/missions/${activeMission.id}`}
                  className="h-10 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Package size={14} /> Détail mission
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <Package size={32} className="text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Aucune mission active sur la carte</p>
            <Link href="/livreur/missions" className="text-xs text-orange-500 font-semibold mt-2 inline-block">
              Voir mes missions
            </Link>
          </div>
        )}

        {position && (
          <div className="bg-gray-900 text-white rounded-2xl p-4 font-mono text-xs">
            <p className="text-gray-400 mb-1">Coordonnées GPS</p>
            <p>Lat: {position.latitude.toFixed(6)}</p>
            <p>Lng: {position.longitude.toFixed(6)}</p>
            <p className="text-gray-400 mt-1">Précision: ±{Math.round(position.accuracyMeters)} m</p>
          </div>
        )}
      </div>
    </div>
  );
}
