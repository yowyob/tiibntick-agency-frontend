'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft, Phone, Package, CheckCircle, AlertCircle,
  ScanLine, Warehouse, MessageCircle, Navigation,
} from 'lucide-react';
import { livreurAuthService, livreurMissionService } from '@/lib/services/livreurAuthService';
import { MAP_DEFAULT_CITY, MAPS_PROVIDER_URL, WHATSAPP_BASE_URL } from '@/lib/config';
import { useToast } from '@/contexts/ToastContext';
import { toastErrorMessage } from '@/lib/toastError';
import { useGpsTracker } from '@/lib/livreur/gpsTracker';
import MissionMap from '@/components/livreur/MissionMap';
import QrCapture from '@/components/livreur/QrCapture';
import ProofOfDeliverySheet from '@/components/livreur/ProofOfDeliverySheet';
import DepositHubSheet from '@/components/livreur/DepositHubSheet';
import GpsTrackerBanner from '@/components/livreur/GpsTrackerBanner';
import type { Mission } from '@/lib/types';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente', ASSIGNED: 'Assignée', IN_TRANSIT: 'En transit',
  AT_HUB: 'Au hub', DELIVERED: 'Livrée', FAILED: 'Échouée', CANCELLED: 'Annulée',
};
const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600', ASSIGNED: 'bg-blue-100 text-blue-700',
  IN_TRANSIT: 'bg-orange-100 text-orange-700', AT_HUB: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700', FAILED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

function mapsUrl(address: string) {
  return `${MAPS_PROVIDER_URL}${encodeURIComponent(`${address}, ${MAP_DEFAULT_CITY}`)}`;
}

function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '');
  return `${WHATSAPP_BASE_URL}${digits}?text=${encodeURIComponent(message)}`;
}

export default function LivreurMissionDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { success: toastSuccess, error: toastError } = useToast();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [showPod, setShowPod] = useState(false);
  const [showHub, setShowHub] = useState(false);
  const [scannedPickup, setScannedPickup] = useState(false);

  const isActive = mission?.status === 'ASSIGNED' || mission?.status === 'IN_TRANSIT';
  const { position, tracking, error: gpsError } = useGpsTracker({
    enabled: isActive,
    missionId: mission?.id ?? null,
  });

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login');
      return;
    }
    livreurMissionService.getMission(id).then(setMission).catch((err) => {
      toastError(toastErrorMessage(err, 'Cette mission est introuvable ou plus accessible.'));
      router.back();
    }).finally(() => setLoading(false));
  }, [id, router, toastError]);

  const handlePickup = async () => {
    if (!mission) return;
    setActing('pickup');
    try {
      await livreurMissionService.confirmPickup(mission.id);
      toastSuccess('Enlèvement confirmé !');
      setMission(m => m ? { ...m, status: 'IN_TRANSIT', actualPickupAt: new Date().toISOString() } : m);
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de confirmer l\'enlèvement.'));
    } finally {
      setActing(null);
    }
  };

  const handleDeliverWithProof = async (proof: { photoBlob?: Blob; signatureDataUrl?: string; otpCode?: string }) => {
    if (!mission) return;
    setActing('deliver');
    try {
      const proofRef = await livreurMissionService.confirmDeliveryWithProof(mission.id, proof);
      toastSuccess('Livraison confirmée — preuve enregistrée');
      setMission(m => m ? { ...m, status: 'DELIVERED', actualDeliveryAt: new Date().toISOString() } : m);
      void proofRef;
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de confirmer la livraison.'));
      throw err;
    } finally {
      setActing(null);
    }
  };

  const handleIssue = async () => {
    if (!mission) return;
    const reason = window.prompt('Décrivez le problème rencontré :');
    if (!reason?.trim()) return;
    setActing('issue');
    try {
      await livreurMissionService.reportIssue(mission.id, reason.trim());
      toastSuccess('Problème signalé.');
      setMission(m => m ? { ...m, status: 'FAILED' } : m);
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'envoyer le signalement.'));
    } finally {
      setActing(null);
    }
  };

  if (loading || !mission) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasActions = mission.status === 'ASSIGNED' || mission.status === 'IN_TRANSIT';

  return (
    <div className={`flex-1 ${hasActions ? 'pb-44' : 'pb-24'}`}>
      <div className="px-5 pt-10 pb-4 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-mono truncate">{mission.manifestNumber}</p>
          <h1 className="text-sm font-bold text-gray-900">Détail mission</h1>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLORS[mission.status]}`}>
          {STATUS_LABELS[mission.status]}
        </span>
      </div>

      {isActive && (
        <GpsTrackerBanner
          tracking={tracking}
          error={gpsError}
          latitude={position?.latitude}
          longitude={position?.longitude}
        />
      )}

      <div className="px-5 space-y-4">
        <MissionMap
          pickupAddress={mission.pickupAddress}
          deliveryAddress={mission.deliveryAddress}
          delivererLat={position?.latitude}
          delivererLng={position?.longitude}
          height="200px"
        />

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Enlèvement</p>
            <p className="text-sm font-semibold text-gray-800">{mission.senderName}</p>
            <a href={mapsUrl(mission.pickupAddress)} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 flex items-center gap-1 mt-1">
              <Navigation size={12} /> {mission.pickupAddress}
            </a>
          </div>
          <div className="border-t border-gray-50 pt-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Livraison</p>
            <p className="text-sm font-semibold text-gray-800">{mission.recipientName}</p>
            <a href={mapsUrl(mission.deliveryAddress)} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 flex items-center gap-1 mt-1">
              <Navigation size={12} /> {mission.deliveryAddress}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {mission.recipientPhone && (
            <a href={`tel:${mission.recipientPhone}`} className="flex items-center justify-center gap-2 h-11 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700">
              <Phone size={16} /> Appeler
            </a>
          )}
          {mission.recipientPhone && (
            <a
              href={whatsappUrl(mission.recipientPhone, `Bonjour ${mission.recipientName}, je suis en route pour votre livraison TiiBnTick.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
          <Package size={18} className="text-orange-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{mission.packagesCount} colis · {mission.totalWeightKg} kg</p>
            <p className="text-xs text-gray-500">{mission.sellingPrice.toLocaleString('fr-FR')} {mission.currency}</p>
          </div>
        </div>
      </div>

      {hasActions && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-2 pt-3 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent space-y-2">
          {mission.status === 'ASSIGNED' && (
            <>
              <button
                type="button"
                onClick={() => setShowQr(true)}
                className="w-full h-11 rounded-xl border border-orange-200 bg-white text-orange-600 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ScanLine size={16} />
                {scannedPickup ? 'Colis scanné ✓' : 'Scanner le colis'}
              </button>
              <button
                type="button"
                disabled={acting === 'pickup' || !scannedPickup}
                onClick={() => void handlePickup()}
                className="w-full h-12 rounded-xl bg-orange-500 text-white font-semibold text-sm disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                {acting === 'pickup' ? 'Confirmation…' : 'Confirmer enlèvement'}
              </button>
            </>
          )}

          {mission.status === 'IN_TRANSIT' && (
            <>
              <button
                type="button"
                onClick={() => setShowPod(true)}
                disabled={!!acting}
                className="w-full h-12 rounded-xl bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Confirmer livraison (POD)
              </button>
              <button
                type="button"
                onClick={() => setShowHub(true)}
                className="w-full h-11 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Warehouse size={16} />
                Dépôt au hub relais
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => void handleIssue()}
            disabled={!!acting}
            className="w-full h-10 rounded-xl border border-red-200 text-red-500 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <AlertCircle size={16} />
            Signaler un problème
          </button>
        </div>
      )}

      <QrCapture
        open={showQr}
        onClose={() => setShowQr(false)}
        expectedCode={mission.manifestNumber}
        title="Scanner le colis"
        onScan={(code) => {
          const ok = code.includes(mission.manifestNumber) || mission.manifestNumber.includes(code);
          if (ok) {
            setScannedPickup(true);
            toastSuccess('Colis vérifié');
          } else {
            toastError('Code colis incorrect');
          }
        }}
      />

      <ProofOfDeliverySheet
        open={showPod}
        onClose={() => setShowPod(false)}
        recipientName={mission.recipientName}
        onConfirm={handleDeliverWithProof}
      />

      <DepositHubSheet
        open={showHub}
        missionId={mission.id}
        manifestNumber={mission.manifestNumber}
        onClose={() => setShowHub(false)}
        onDeposited={() => {
          toastSuccess('Colis déposé au hub');
          setMission(m => m ? { ...m, status: 'AT_HUB' } : m);
        }}
      />
    </div>
  );
}
