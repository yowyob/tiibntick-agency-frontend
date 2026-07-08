'use client'

import { Clock, GitBranch, MapPin, Navigation, Package } from 'lucide-react'
import { MAPS_PROVIDER_URL } from '@/lib/config'
import type { TrackingHubInfo } from '@/lib/services/trackingService'

interface Props {
  hub: TrackingHubInfo
}

export default function TrackHubCard({ hub }: Props) {
  const mapsQuery = hub.hubLatitude != null && hub.hubLongitude != null
    ? `${hub.hubLatitude},${hub.hubLongitude}`
    : encodeURIComponent([hub.hubAddress, hub.hubCity].filter(Boolean).join(', '))

  const occupancyPct = hub.hubCapacity > 0
    ? Math.round(((hub.hubCapacity - hub.hubAvailableSpace) / hub.hubCapacity) * 100)
    : 0

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
          <GitBranch size={18} className="text-orange-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Point relais</p>
          <p className="text-base font-bold text-gray-900">{hub.hubName}</p>
          {hub.hubCode && (
            <p className="text-xs text-gray-500 font-mono mt-0.5">{hub.hubCode}</p>
          )}
        </div>
      </div>

      <div className="px-6 py-4 space-y-3">
        {hub.hubAddress && (
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400">Adresse</p>
              <p className="text-sm text-gray-800 leading-relaxed">{hub.hubAddress}</p>
            </div>
          </div>
        )}

        {hub.hubOpeningHours && (
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400">Horaires</p>
              <p className="text-sm text-gray-800">{hub.hubOpeningHours}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Package size={16} className="text-gray-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-gray-400">Capacité du hub</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-orange-400"
                  style={{ width: `${occupancyPct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {hub.hubAvailableSpace} place{hub.hubAvailableSpace > 1 ? 's' : ''} libre{hub.hubAvailableSpace > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {mapsQuery && (
          <a
            href={`${MAPS_PROVIDER_URL}${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Navigation size={14} />
            Itinéraire vers le point relais
          </a>
        )}
      </div>
    </div>
  )
}
