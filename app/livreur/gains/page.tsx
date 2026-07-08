'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Clock, CheckCircle, Banknote, AlertTriangle } from 'lucide-react';
import { livreurAuthService } from '@/lib/services/livreurAuthService';
import { livreurCommissionService, type CommissionSummary } from '@/lib/services/livreurCommissionService';
import { useToast } from '@/contexts/ToastContext';
import { toastErrorMessage } from '@/lib/toastError';

const STATUS_LABELS: Record<string, string> = {
  CALCULATED: 'En attente',
  VALIDATED: 'Validée',
  PAID: 'Payée',
  DISPUTED: 'Contestée',
};

const STATUS_COLORS: Record<string, string> = {
  CALCULATED: 'bg-amber-50 text-amber-700',
  VALIDATED: 'bg-blue-50 text-blue-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  DISPUTED: 'bg-red-50 text-red-700',
};

function KpiCard({ icon: Icon, label, amount, currency, color }: {
  icon: React.ElementType; label: string; amount: number; currency: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${color}`}>
        <Icon size={16} />
      </div>
      <p className="text-lg font-bold text-gray-900">{amount.toLocaleString('fr-FR')} <span className="text-xs font-normal text-gray-400">{currency}</span></p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}

export default function LivreurGainsPage() {
  const router = useRouter();
  const { success: toastSuccess, error: toastError } = useToast();
  const [summary, setSummary] = useState<CommissionSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    const id = livreurAuthService.getCurrentDelivererId();
    if (!id) return;
    setLoading(true);
    livreurCommissionService.getMyCommissions(id)
      .then(setSummary)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login');
      return;
    }
    load();
  }, [router]);

  const handleDispute = async (commissionId: string) => {
    const reason = window.prompt('Motif de contestation :');
    if (!reason?.trim()) return;
    try {
      await livreurCommissionService.disputeCommission(commissionId, reason.trim());
      toastSuccess('Commission contestée');
      load();
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de contester.'));
    }
  };

  if (loading || !summary) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold text-gray-900">Mes gains</h1>
        <p className="text-sm text-gray-500">Commissions et paiements MoMo</p>
      </div>

      <div className="grid grid-cols-3 gap-2 px-5 mb-6">
        <KpiCard icon={Clock} label="En attente" amount={summary.totalPending} currency={summary.currency} color="bg-amber-50 text-amber-600" />
        <KpiCard icon={CheckCircle} label="Validées" amount={summary.totalValidated} currency={summary.currency} color="bg-blue-50 text-blue-600" />
        <KpiCard icon={Banknote} label="Payées" amount={summary.totalPaid} currency={summary.currency} color="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="px-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Wallet size={16} className="text-orange-500" />
          Historique
        </h2>

        {summary.records.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-sm text-gray-400">Aucune commission pour le moment</p>
          </div>
        ) : (
          <div className="space-y-2">
            {summary.records.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {r.amount.toLocaleString('fr-FR')} {r.currency}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">Mission {r.missionId.slice(0, 8)}…</p>
                    <p className="text-[10px] text-gray-400">{new Date(r.calculatedAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[r.status]}`}>
                    {STATUS_LABELS[r.status]}
                  </span>
                </div>
                {r.status === 'CALCULATED' && (
                  <button
                    type="button"
                    onClick={() => void handleDispute(r.id)}
                    className="mt-2 text-[10px] font-semibold text-red-500 flex items-center gap-1"
                  >
                    <AlertTriangle size={12} /> Contester
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
