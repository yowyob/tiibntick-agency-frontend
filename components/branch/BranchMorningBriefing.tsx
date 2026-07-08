'use client';

import { useEffect, useState } from 'react';
import { Megaphone, Save, Loader2 } from 'lucide-react';
import { getBranchBriefing, saveBranchBriefing, type BranchBriefing } from '@/lib/branch/briefing';
import { useToast } from '@/contexts/ToastContext';

interface Props {
  branchId: string;
  authorName?: string;
}

export default function BranchMorningBriefing({ branchId, authorName }: Props) {
  const { success: toastSuccess } = useToast();
  const [briefing, setBriefing] = useState<BranchBriefing | null>(null);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existing = getBranchBriefing(branchId);
    setBriefing(existing);
    setDraft(existing?.message ?? '');
  }, [branchId]);

  const handleSave = async () => {
    if (!draft.trim()) return;
    setSaving(true);
    try {
      const next = saveBranchBriefing(branchId, draft, authorName);
      setBriefing(next);
      toastSuccess('Briefing du jour publié pour l\'équipe');
    } finally {
      setSaving(false);
    }
  };

  const updatedLabel = briefing
    ? new Date(briefing.updatedAt).toLocaleString('fr-FR', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
      })
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
        <Megaphone size={16} className="text-orange-500" />
        <p className="text-sm font-semibold text-gray-900">Briefing du jour</p>
        {updatedLabel && (
          <span className="ml-auto text-[10px] text-gray-400">Mis à jour {updatedLabel}</span>
        )}
      </div>
      <div className="p-5 space-y-3">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          rows={3}
          placeholder="Consignes du matin pour les livreurs : zones prioritaires, véhicules indisponibles, alertes météo…"
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-400 resize-none"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400">
            Visible par l&apos;équipe terrain sur cette antenne
          </p>
          <button
            type="button"
            disabled={saving || !draft.trim()}
            onClick={() => void handleSave()}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-40 px-3 py-2 rounded-lg"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Publier
          </button>
        </div>
      </div>
    </div>
  );
}
