'use client';

import { useState } from 'react';
import { X, Loader2, Truck, User } from 'lucide-react';
import type { Deliverer, Mission, Vehicle } from '@/lib/types';
import { branchOperationsService } from '@/lib/services/branchOperationsService';
import { useToast } from '@/contexts/ToastContext';
import { toastErrorMessage } from '@/lib/toastError';

interface Props {
  open: boolean;
  mission: Mission | null;
  deliverers: Deliverer[];
  vehicles: Vehicle[];
  onClose: () => void;
  onAssigned: () => void;
}

export default function QuickDispatchModal({
  open,
  mission,
  deliverers,
  vehicles,
  onClose,
  onAssigned,
}: Props) {
  const { success: toastSuccess, error: toastError } = useToast();
  const [delivererId, setDelivererId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open || !mission) return null;

  const availableDeliverers = deliverers.filter(d =>
    d.status === 'AVAILABLE' || d.status === 'ON_MISSION',
  );
  const availableVehicles = vehicles.filter(v => v.status === 'AVAILABLE');

  const handleAssign = async () => {
    if (!delivererId || !vehicleId) return;
    setSubmitting(true);
    try {
      await branchOperationsService.quickAssignMission(mission.id, delivererId, vehicleId);
      toastSuccess(`Mission ${mission.manifestNumber} assignée`);
      onAssigned();
      onClose();
    } catch (err) {
      toastError(toastErrorMessage(err, 'Assignation impossible.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Dispatch rapide</p>
            <h3 className="text-sm font-bold text-gray-900 font-mono">{mission.manifestNumber}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">
            {mission.recipientName} — {mission.deliveryAddress}
          </p>

          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-1">
              <User size={12} /> Livreur
            </label>
            <select
              value={delivererId}
              onChange={e => setDelivererId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm"
            >
              <option value="">Choisir un livreur</option>
              {availableDeliverers.map(d => (
                <option key={d.id} value={d.id}>
                  {d.fullName} ({d.status === 'AVAILABLE' ? 'Dispo' : 'En mission'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-1">
              <Truck size={12} /> Véhicule
            </label>
            <select
              value={vehicleId}
              onChange={e => setVehicleId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm"
            >
              <option value="">Choisir un véhicule</option>
              {availableVehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.registrationNumber} — {v.model}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled={submitting || !delivererId || !vehicleId}
            onClick={() => void handleAssign()}
            className="w-full h-12 rounded-xl bg-orange-500 text-white font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Confirmer l\'assignation'}
          </button>
        </div>
      </div>
    </div>
  );
}
