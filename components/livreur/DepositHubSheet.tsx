'use client';

import { useEffect, useState } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { livreurHubService } from '@/lib/services/livreurHubService';
import type { Hub } from '@/lib/types';
import QrCapture from './QrCapture';

interface Props {
  open: boolean;
  missionId: string;
  manifestNumber: string;
  onClose: () => void;
  onDeposited: () => void;
}

export default function DepositHubSheet({ open, missionId, manifestNumber, onClose, onDeposited }: Props) {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    livreurHubService.getAgencyHubs()
      .then(setHubs)
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  const handleDeposit = async (code: string) => {
    if (!selectedHub) return;
    setSubmitting(true);
    try {
      await livreurHubService.depositAtHub(missionId, selectedHub, code);
      onDeposited();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/60 flex items-end justify-center">
        <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">Dépôt au hub relais</h3>
            <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-4 pb-8">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-orange-500" size={24} />
              </div>
            ) : hubs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">Aucun hub disponible</p>
            ) : (
              <div className="space-y-2">
                {hubs.map(h => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHub(h.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      selectedHub === h.id ? 'border-orange-400 bg-orange-50' : 'border-gray-100 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{h.name}</p>
                        <p className="text-xs text-gray-500">{h.address}, {h.city}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {h.currentOccupancy}/{h.capacity} colis
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedHub && (
              <>
                <input
                  value={trackingCode}
                  onChange={e => setTrackingCode(e.target.value)}
                  placeholder="Code de suivi"
                  className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQr(true)}
                    className="h-11 rounded-xl border border-orange-200 text-orange-600 text-sm font-semibold"
                  >
                    Scanner QR
                  </button>
                  <button
                    type="button"
                    disabled={submitting || !trackingCode.trim()}
                    onClick={() => void handleDeposit(trackingCode.trim())}
                    className="h-11 rounded-xl bg-orange-500 text-white text-sm font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {submitting && <Loader2 size={14} className="animate-spin" />}
                    Confirmer dépôt
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <QrCapture
        open={showQr}
        onClose={() => setShowQr(false)}
        expectedCode={manifestNumber}
        title="Scanner le colis au hub"
        onScan={code => {
          setTrackingCode(code);
          void handleDeposit(code);
        }}
      />
    </>
  );
}
