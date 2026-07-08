'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardList, Building2, Loader2, ShieldAlert, CheckCircle2, Package } from 'lucide-react';
import { onboardingAdminService, type OnboardingListItem } from '@/lib/services/onboardingAdminService';
import { adminService } from '@/lib/services/adminService';
import { authService } from '@/lib/services/authService';
import { formatUserError } from '@/lib/errors';

export default function AdminDashboardPage() {
  const [pending, setPending] = useState<OnboardingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expiredLoading, setExpiredLoading] = useState(false);
  const [expiredMsg, setExpiredMsg] = useState('');

  useEffect(() => {
    onboardingAdminService.listPending()
      .then(setPending)
      .finally(() => setLoading(false));
  }, []);

  const kernelReady = pending.filter(p => p.kernelIdentityReady).length;
  const kernelPending = pending.length - kernelReady;

  const runExpiredJob = async () => {
    setExpiredLoading(true);
    setExpiredMsg('');
    try {
      const result = await adminService.processExpiredParcels();
      setExpiredMsg(`${result.processed} colis expiré(s) traité(s).`);
    } catch (err) {
      setExpiredMsg(formatUserError(err, 'Échec du traitement.'));
    } finally {
      setExpiredLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-xl font-semibold">Administration plateforme</h1>
        <p className="text-sm text-slate-400 mt-1">
          Connecté en tant que {authService.getRole() || 'TNT_ADMIN'}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-orange-500" />
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Demandes en attente</p>
              <p className="text-3xl font-bold mt-1">{pending.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-400" /> Kernel prêt
              </p>
              <p className="text-3xl font-bold mt-1 text-emerald-400">{kernelReady}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert size={12} className="text-amber-400" /> Identité en attente
              </p>
              <p className="text-3xl font-bold mt-1 text-amber-400">{kernelPending}</p>
            </div>
          </div>

          <section className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Package size={16} className="text-amber-400" />
              Opérations système
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Déclenche manuellement le job colis expirés (planifié toutes les heures côté backend).
            </p>
            <button
              type="button"
              onClick={runExpiredJob}
              disabled={expiredLoading}
              className="h-9 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              {expiredLoading ? <Loader2 size={14} className="animate-spin" /> : null}
              Traiter colis expirés (tenant courant)
            </button>
            {expiredMsg && <p className="text-xs text-slate-400 mt-3">{expiredMsg}</p>}
          </section>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/admin/onboarding"
              className="block bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-orange-500/40 transition-colors"
            >
              <ClipboardList size={22} className="text-orange-500 mb-3" />
              <h2 className="font-semibold">Valider les inscriptions</h2>
              <p className="text-sm text-slate-400 mt-1">
                Examiner les dossiers KYC et activer les nouvelles agences.
              </p>
            </Link>
            <Link
              href="/admin/agencies"
              className="block bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-orange-500/40 transition-colors"
            >
              <Building2 size={22} className="text-orange-500 mb-3" />
              <h2 className="font-semibold">Gérer les agences</h2>
              <p className="text-sm text-slate-400 mt-1">
                Activer, suspendre ou resynchroniser une agence avec le Kernel Core.
              </p>
            </Link>
          </div>

          {pending.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-slate-300 mb-3">Dernières demandes</h2>
              <div className="space-y-2">
                {pending.slice(0, 5).map(item => (
                  <Link
                    key={item.agencyId}
                    href={`/admin/onboarding/${item.agencyId}`}
                    className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 hover:border-slate-700"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.agencyName}</p>
                      <p className="text-xs text-slate-500">{item.ownerEmail}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                      item.kernelIdentityReady
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/15 text-amber-400'
                    }`}>
                      {item.kernelIdentityReady ? 'Kernel OK' : 'Kernel pending'}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
