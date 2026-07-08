'use client';

import Link from 'next/link';
import {
  AlertTriangle, Package, MapPin, UserX, ChevronRight, Zap, XCircle, Receipt,
} from 'lucide-react';
import type { AgencyAction } from '@/lib/agency/actionQueue';

const ICONS: Record<AgencyAction['type'], React.ElementType> = {
  MISSION_UNASSIGNED: Package,
  MISSION_FAILED: XCircle,
  HUB_SATURATED: MapPin,
  HUB_PARCEL_EXPIRING: AlertTriangle,
  DELIVERER_OFFLINE_ON_MISSION: UserX,
  COMMISSION_PENDING: Receipt,
};

const PRIORITY_STYLES: Record<AgencyAction['priority'], string> = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-orange-200 bg-orange-50',
  low: 'border-amber-200 bg-amber-50',
};

interface Props {
  actions: AgencyAction[];
  onDispatch?: (missionId: string) => void;
  maxItems?: number;
}

export default function AgencyActionQueue({ actions, onDispatch, maxItems = 10 }: Props) {
  const visible = actions.slice(0, maxItems);

  if (actions.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 flex items-center gap-3">
        <Zap size={18} className="text-emerald-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-800">Réseau sous contrôle</p>
          <p className="text-xs text-emerald-600">Aucune action urgente à l&apos;échelle agence.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
        <AlertTriangle size={16} className="text-orange-500" />
        <p className="text-sm font-semibold text-gray-900">Centre de commandement — À traiter</p>
        <span className="ml-auto text-xs font-bold text-white bg-orange-500 px-2 py-0.5 rounded-full">
          {actions.length}
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {visible.map(action => {
          const Icon = ICONS[action.type];
          return (
            <div
              key={action.id}
              className={`px-5 py-3 flex items-center gap-3 ${PRIORITY_STYLES[action.priority]}`}
            >
              <Icon size={16} className="text-gray-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-600 truncate">{action.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {action.missionId && onDispatch && action.type === 'MISSION_UNASSIGNED' && (
                  <button
                    type="button"
                    onClick={() => onDispatch(action.missionId!)}
                    className="text-[11px] font-bold text-white bg-orange-500 hover:bg-orange-600 px-2.5 py-1 rounded-lg"
                  >
                    Assigner
                  </button>
                )}
                <Link href={action.href} className="p-1 text-gray-400 hover:text-orange-500">
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {actions.length > maxItems && (
        <p className="px-5 py-2 text-xs text-gray-400 text-center border-t border-gray-50">
          + {actions.length - maxItems} autres actions
        </p>
      )}
    </div>
  );
}
