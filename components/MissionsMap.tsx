'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Mission, MissionStatus } from '@/lib/types'
import { MAP_CENTER_LAT, MAP_CENTER_LNG, MAP_ATTRIBUTION, MAP_TILE_URL } from '@/lib/config'

const MARKER_COLORS: Partial<Record<MissionStatus, string>> = {
  PENDING:    '#9ca3af',
  ASSIGNED:   '#6366f1',
  IN_TRANSIT: '#f97316',
  AT_HUB:     '#8b5cf6',
  DELIVERED:  '#10b981',
  FAILED:     '#ef4444',
  CANCELLED:  '#9ca3af',
  DRAFT:      '#d1d5db',
}

const STATUS_LABELS: Partial<Record<MissionStatus, string>> = {
  PENDING:    'En attente',
  ASSIGNED:   'Assignée',
  IN_TRANSIT: 'En transit',
  AT_HUB:     'Au hub',
  DELIVERED:  'Livrée',
  FAILED:     'Échouée',
  CANCELLED:  'Annulée',
  DRAFT:      'Brouillon',
}

function missionPosition(
  mission: Mission,
  livePositions?: Record<string, { lat: number; lng: number }>,
): [number, number] {
  if (mission.delivererId && livePositions?.[mission.delivererId]) {
    const p = livePositions[mission.delivererId]
    return [p.lat, p.lng]
  }
  let hash = 0
  for (let i = 0; i < mission.id.length; i++) {
    hash = ((hash << 5) - hash) + mission.id.charCodeAt(i)
    hash |= 0
  }
  const lat = MAP_CENTER_LAT + ((hash & 0xff) / 255 - 0.5) * 0.08
  const lng = MAP_CENTER_LNG + (((hash >> 8) & 0xff) / 255 - 0.5) * 0.08
  return [lat, lng]
}

function createIcon(status: MissionStatus): L.DivIcon {
  const color = MARKER_COLORS[status] ?? '#9ca3af'
  const isActive = status === 'IN_TRANSIT' || status === 'ASSIGNED'

  const html = isActive
    ? `<div style="position:relative;width:26px;height:26px">
         <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.25;animation:mping 1.6s ease-out infinite"></div>
         <div style="position:absolute;inset:5px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>
       </div>`
    : `<div style="width:13px;height:13px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`

  return L.divIcon({
    html,
    className: '',
    iconSize:   isActive ? [26, 26] : [13, 13],
    iconAnchor: isActive ? [13, 13] : [6.5, 6.5],
    popupAnchor: [0, -14],
  })
}

interface Props {
  missions: Mission[]
  onMissionClick: (mission: Mission) => void
  livePositions?: Record<string, { lat: number; lng: number }>
}

export default function MissionsMap({ missions, onMissionClick, livePositions }: Props) {
  useEffect(() => {
    const id = 'mping-style'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `@keyframes mping { 0% { transform:scale(1); opacity:.25; } 70% { transform:scale(2.2); opacity:0; } 100% { opacity:0; } }`
    document.head.appendChild(style)
  }, [])

  return (
    <MapContainer
      center={[MAP_CENTER_LAT, MAP_CENTER_LNG]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      zoomControl
    >
      <TileLayer
        attribution={MAP_ATTRIBUTION}
        url={MAP_TILE_URL}
      />

      {missions.map(mission => {
        const pos = missionPosition(mission, livePositions)

        return (
          <Marker
            key={mission.id}
            position={pos}
            icon={createIcon(mission.status)}
            eventHandlers={{ click: () => onMissionClick(mission) }}
          >
            <Popup>
              <div style={{ fontFamily: 'sans-serif', minWidth: 190 }}>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{mission.manifestNumber}</p>
                <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>
                  {STATUS_LABELS[mission.status]}
                  {mission.delivererName ? ` · ${mission.delivererName}` : ''}
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 2 }}>
                  {mission.recipientName || 'Destinataire'}
                </p>
                <p style={{ fontSize: 11, color: '#9ca3af' }}>{mission.deliveryAddress || 'Adresse — TiiBnTick Core'}</p>
                <button
                  onClick={() => onMissionClick(mission)}
                  style={{
                    marginTop: 8, width: '100%', padding: '5px 0',
                    background: '#f97316', color: 'white', border: 'none',
                    borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Voir le détail
                </button>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
