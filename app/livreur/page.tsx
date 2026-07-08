'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Star, ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import { livreurAuthService, livreurMissionService } from '@/lib/services/livreurAuthService';
import { useGpsTracker } from '@/lib/livreur/gpsTracker';
import DelivererStatusToggle from '@/components/livreur/DelivererStatusToggle';
import GpsTrackerBanner from '@/components/livreur/GpsTrackerBanner';
import OfflineSyncBanner from '@/components/livreur/OfflineSyncBanner';
import PwaInstallPrompt from '@/components/livreur/PwaInstallPrompt';
import { useToast } from '@/contexts/ToastContext';
import { toastErrorMessage } from '@/lib/toastError';
import type { Deliverer, Mission } from '@/lib/types';

const MISSION_STATUS_LABELS: Record<string, string> = {
  ASSIGNED: 'Assignée',
  IN_TRANSIT: 'En transit',
};

export default function LivreurDashboard() {
  const router = useRouter();
  const { success: toastSuccess, error: toastError } = useToast();
  const [deliverer, setDeliverer] = useState<Deliverer | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  const activeMission = useMemo(
    () => missions.find(m => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT') ?? null,
    [missions],
  );

  const gpsEnabled = !!deliverer && deliverer.status !== 'OFFLINE' && deliverer.status !== 'SUSPENDED';
  const { position, tracking, error: gpsError } = useGpsTracker({
    enabled: gpsEnabled,
    missionId: activeMission?.id ?? null,
  });

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login');
      return;
    }
    const id = livreurAuthService.getCurrentDelivererId()!;
    Promise.all([
      livreurMissionService.getMyProfile(id),
      livreurMissionService.getMyMissions(id),
    ])
      .then(([d, m]) => {
        setDeliverer(d);
        setMissions(m);
      })
      .finally(() => setLoading(false));

    void livreurMissionService.syncOfflineQueue();
  }, [router]);

  useEffect(() => {
    const onSyncPull = () => {
      const id = livreurAuthService.getCurrentDelivererId();
      if (!id) return;
      void livreurMissionService.getMyMissions(id).then(setMissions);
    };
    window.addEventListener('livreur-sync-pull', onSyncPull);
    return () => window.removeEventListener('livreur-sync-pull', onSyncPull);
  }, []);

  const handleAvailability = async (status: 'AVAILABLE' | 'OFFLINE') => {
    const id = livreurAuthService.getCurrentDelivererId();
    if (!id) return;
    try {
      const updated = await livreurMissionService.setAvailability(id, status);
      setDeliverer(updated);
      toastSuccess(status === 'AVAILABLE' ? 'Vous êtes disponible' : 'Vous êtes hors ligne');
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de mettre à jour le statut.'));
    }
  };

  if (loading || !deliverer) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const deliveredCount = missions.filter(m => m.status === 'DELIVERED').length;

  return (
    <div className="flex-1 pb-24">
      <div className="px-5 pt-10 pb-4">
        <p className="text-sm text-gray-500">Bonjour,</p>
        <h1 className="text-xl font-bold text-gray-900">{deliverer.fullName}</h1>
        {(deliverer.vehiclePlate || deliverer.branchName) && (
          <p className="text-xs text-gray-400 mt-1">
            {[deliverer.vehiclePlate, deliverer.branchName].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      <PwaInstallPrompt />
      <OfflineSyncBanner />
      <GpsTrackerBanner
        tracking={tracking}
        error={gpsError}
        latitude={position?.latitude}
        longitude={position?.longitude}
      />

      <div className="px-5 mb-4">
        <DelivererStatusToggle
          status={deliverer.status}
          onChange={handleAvailability}
          disabled={deliverer.status === 'ON_MISSION'}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-lg font-bold text-gray-900">{missions.length}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Total</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-lg font-bold text-gray-900">{deliveredCount}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Livrées</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <div className="flex items-center justify-center gap-0.5">
            <p className="text-lg font-bold text-gray-900">{deliverer.rating}</p>
            <Star size={11} className="text-orange-400 fill-orange-400 mb-0.5" />
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Note</p>
        </div>
      </div>

      <div className="px-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Mission en cours</h2>
        {activeMission ? (
          <Link href={`/livreur/missions/${activeMission.id}`} className="block bg-orange-500 text-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono opacity-75">{activeMission.manifestNumber}</span>
              <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                {MISSION_STATUS_LABELS[activeMission.status]}
              </span>
            </div>
            <p className="font-semibold mb-3">{activeMission.recipientName}</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2 opacity-90">
                <MapPin size={12} className="mt-0.5 shrink-0" />
                <p className="text-xs">{activeMission.pickupAddress}</p>
              </div>
              <div className="flex items-start gap-2 opacity-60">
                <ArrowRight size={12} className="mt-0.5 shrink-0" />
                <p className="text-xs">{activeMission.deliveryAddress}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <Package size={28} className="text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Aucune mission en cours</p>
          </div>
        )}
      </div>

      {missions.length > 0 && (
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Missions récentes</h2>
            <Link href="/livreur/missions" className="text-xs text-orange-500 font-medium">Voir tout</Link>
          </div>
          <div className="space-y-2">
            {missions.slice(0, 3).map(m => (
              <Link
                key={m.id}
                href={`/livreur/missions/${m.id}`}
                className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{m.recipientName}</p>
                  <p className="text-xs text-gray-400 truncate">{m.deliveryAddress}</p>
                </div>
                <ChevronRight size={14} className="text-gray-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
