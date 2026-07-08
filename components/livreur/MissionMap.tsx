'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MAP_CENTER_LAT, MAP_CENTER_LNG } from '@/lib/config';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });

interface Props {
  pickupAddress: string;
  deliveryAddress: string;
  delivererLat?: number;
  delivererLng?: number;
  height?: string;
}

function useLeafletIcons() {
  useEffect(() => {
    void import('leaflet').then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    });
  }, []);
}

/** Approximate geocoding fallback — centres on Douala with slight offsets for demo routing */
function pseudoCoords(seed: string, baseLat: number, baseLng: number): [number, number] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  const latOff = ((hash % 100) - 50) / 2000;
  const lngOff = (((hash >> 8) % 100) - 50) / 2000;
  return [baseLat + latOff, baseLng + lngOff];
}

export default function MissionMap({
  pickupAddress,
  deliveryAddress,
  delivererLat,
  delivererLng,
  height = '220px',
}: Props) {
  useLeafletIcons();

  const pickup = useMemo(() => pseudoCoords(pickupAddress, MAP_CENTER_LAT + 0.02, MAP_CENTER_LNG - 0.01), [pickupAddress]);
  const delivery = useMemo(() => pseudoCoords(deliveryAddress, MAP_CENTER_LAT - 0.01, MAP_CENTER_LNG + 0.02), [deliveryAddress]);
  const center: [number, number] = delivererLat != null && delivererLng != null
    ? [delivererLat, delivererLng]
    : pickup;

  const route: [number, number][] = delivererLat != null && delivererLng != null
    ? [[delivererLat, delivererLng], delivery]
    : [pickup, delivery];

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100" style={{ height }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pickup}>
          <Popup>Enlèvement<br />{pickupAddress}</Popup>
        </Marker>
        <Marker position={delivery}>
          <Popup>Livraison<br />{deliveryAddress}</Popup>
        </Marker>
        {delivererLat != null && delivererLng != null && (
          <Marker position={[delivererLat, delivererLng]}>
            <Popup>Votre position</Popup>
          </Marker>
        )}
        <Polyline positions={route} pathOptions={{ color: '#f97316', weight: 4, opacity: 0.8 }} />
      </MapContainer>
    </div>
  );
}
