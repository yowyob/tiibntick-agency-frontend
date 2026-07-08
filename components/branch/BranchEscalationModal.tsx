'use client';

import { useState } from 'react';
import { X, Loader2, Mail, Copy, AlertTriangle } from 'lucide-react';
import type { Mission } from '@/lib/types';
import { buildEscalationMessage, copyEscalationMessage, openEscalationEmail } from '@/lib/branch/escalation';
import { useToast } from '@/contexts/ToastContext';

interface Props {
  open: boolean;
  mission: Mission | null;
  branchName: string;
  agencyName?: string;
  onClose: () => void;
}

const REASONS = [
  'Livreur injoignable',
  'Retard critique SLA',
  'Incident client',
  'Problème véhicule / hub',
  'Autre',
];

export default function BranchEscalationModal({
  open, mission, branchName, agencyName, onClose,
}: Props) {
  const { success: toastSuccess, error: toastError } = useToast();
  const [reason, setReason] = useState(REASONS[0]);
  const [customReason, setCustomReason] = useState('');
  const [busy, setBusy] = useState(false);

  if (!open || !mission) return null;

  const finalReason = reason === 'Autre' ? customReason.trim() || 'Autre' : reason;
  const ctx = { branchName, agencyName, mission, reason: finalReason };
  const preview = buildEscalationMessage(ctx);

  const handleCopy = async () => {
    setBusy(true);
    try {
      await copyEscalationMessage(ctx);
      toastSuccess('Message d\'escalade copié');
    } catch {
      toastError('Impossible de copier le message');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            <div>
              <p className="text-xs text-gray-400">Escalade vers l&apos;agence</p>
              <h3 className="text-sm font-bold text-gray-900 font-mono">{mission.manifestNumber}</h3>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
              Motif
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm"
            >
              {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {reason === 'Autre' && (
            <input
              type="text"
              value={customReason}
              onChange={e => setCustomReason(e.target.value)}
              placeholder="Précisez le motif…"
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm"
            />
          )}

          <pre className="text-[11px] text-gray-600 bg-gray-50 border border-gray-100 rounded-xl p-3 whitespace-pre-wrap max-h-40 overflow-y-auto">
            {preview}
          </pre>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleCopy()}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-orange-300 flex items-center justify-center gap-2"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Copy size={16} />}
              Copier
            </button>
            <button
              type="button"
              onClick={() => openEscalationEmail(ctx)}
              className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Envoyer email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
