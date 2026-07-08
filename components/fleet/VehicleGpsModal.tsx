'use client';

import dynamic from 'next/dynamic';
import { Navigation, Radio } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { useAgencyLivePositions } from '@/lib/agency/useAgencyLivePositions';
import { MAP_CENTER_LAT, MAP_CENTER_LNG } from '@/lib/config';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

interface Props {
  vehicle: Vehicle;
  onClose: () => void;
}

export default function VehicleGpsModal({ vehicle, onClose }: Props) {
  const delivererId = vehicle.assignedDelivererId;
  const { positions } = useAgencyLivePositions(delivererId ? [delivererId] : []);
  const pos = delivererId ? positions[delivererId] : undefined;

  const lat = pos?.lat ?? MAP_CENTER_LAT;
  const lng = pos?.lng ?? MAP_CENTER_LNG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Navigation size={18} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Suivi GPS temps réel</p>
            <p className="text-xs text-gray-500 font-mono">{vehicle.registrationNumber} · {vehicle.model}</p>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-200 mb-4" style={{ height: 220 }}>
          {typeof window !== 'undefined' && (
            <MapContainer center={[lat, lng]} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {pos && (
                <Marker position={[pos.lat, pos.lng]}>
                  <Popup>{vehicle.assignedDelivererName ?? 'Livreur'}</Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>

        <div className="space-y-0 divide-y divide-gray-100 text-sm">
          <div className="flex justify-between py-2.5">
            <span className="text-gray-500">Livreur</span>
            <span className="font-medium text-gray-900">{vehicle.assignedDelivererName ?? '—'}</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-gray-500">Signal GPS</span>
            <span className={`font-medium flex items-center gap-1 ${pos ? 'text-emerald-600' : 'text-gray-400'}`}>
              {pos ? <><Radio size={12} className="animate-pulse" /> Live</> : 'En attente…'}
            </span>
          </div>
          {pos && (
            <div className="flex justify-between py-2.5">
              <span className="text-gray-500">Coordonnées</span>
              <span className="font-mono text-xs text-gray-700">{pos.lat.toFixed(5)}, {pos.lng.toFixed(5)}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full h-10 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
