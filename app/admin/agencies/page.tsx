'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Building2,
  Loader2,
  Search,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { adminService, type AdminAgencyView, type AdminAgencyListItem } from '@/lib/services/adminService';
import { assertUuid } from '@/lib/admin/security';
import { formatUserError } from '@/lib/errors';
import type { Agency } from '@/lib/types';

export default function AdminAgenciesPage() {
  return (
    <Suspense fallback={
      <div className="p-6 flex justify-center"><Loader2 className="animate-spin text-orange-500" /></div>
    }>
      <AdminAgenciesContent />
    </Suspense>
  );
}

function AdminAgenciesContent() {
  const searchParams = useSearchParams();
  const [tenantId, setTenantId] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [list, setList] = useState<AdminAgencyListItem[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [view, setView] = useState<AdminAgencyView | null>(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    const aid = searchParams.get('agencyId');
    const tid = searchParams.get('tenantId');
    if (aid) setAgencyId(aid);
    if (tid) setTenantId(tid);
  }, [searchParams]);

  const loadList = async (nextPage = page) => {
    setError('');
    setListLoading(true);
    try {
      assertUuid(tenantId, 'Identifiant tenant');
      const result = await adminService.listAgencies(tenantId, nextPage, pageSize);
      setList(result.items);
      setTotal(result.total);
      setPage(result.page);
    } catch (err) {
      setList([]);
      setTotal(0);
      setError(formatUserError(err, 'Impossible de charger la liste des agences.'));
    } finally {
      setListLoading(false);
    }
  };

  const loadAgency = async (id: string, tid: string) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const result = await adminService.loadAgency(id, tid);
      setView(result);
      setAgencyId(id);
    } catch (err) {
      setView(null);
      setError(formatUserError(err, 'Agence introuvable ou accès refusé.'));
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (
    label: string,
    fn: () => Promise<Agency | void>,
  ) => {
    if (!view) return;
    setAction(label);
    setError('');
    setSuccess('');
    try {
      const updated = await fn();
      if (updated) {
        setView({ ...view, agency: updated });
      } else {
        const refreshed = await adminService.loadAgency(view.agency.id, view.tenantId);
        setView(refreshed);
      }
      setSuccess(`Action « ${label} » effectuée.`);
      void loadList(page);
    } catch (err) {
      setError(formatUserError(err, `Échec : ${label}.`));
    } finally {
      setAction(null);
    }
  };

  const handleListSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      assertUuid(tenantId, 'Identifiant tenant');
      void loadList(0);
    } catch (err) {
      setError(formatUserError(err, 'Identifiants invalides.'));
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      assertUuid(agencyId, 'Identifiant agence');
      assertUuid(tenantId, 'Identifiant tenant');
      void loadAgency(agencyId, tenantId);
    } catch (err) {
      setError(formatUserError(err, 'Identifiants invalides.'));
    }
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Building2 size={20} className="text-orange-500" />
          Gestion des agences
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Liste paginée par tenant ou recherche directe par UUID.
        </p>
      </header>

      <form onSubmit={handleListSearch} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tenant ID</label>
          <input
            value={tenantId}
            onChange={e => setTenantId(e.target.value)}
            placeholder="UUID tenant"
            className="w-full h-10 px-3 text-sm bg-slate-950 border border-slate-700 rounded-lg font-mono"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          type="submit"
          disabled={listLoading}
          className="h-10 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          {listLoading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Lister les agences
        </button>
      </form>

      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-300">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-sm text-emerald-300">
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
          {success}
        </div>
      )}

      {list.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <p className="text-sm font-semibold">{total} agence(s)</p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                type="button"
                disabled={page <= 0 || listLoading}
                onClick={() => void loadList(page - 1)}
                className="p-1 rounded hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span>Page {page + 1}/{totalPages}</span>
              <button
                type="button"
                disabled={page + 1 >= totalPages || listLoading}
                onClick={() => void loadList(page + 1)}
                className="p-1 rounded hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-800">
            {list.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => void loadAgency(item.id, item.tenantId)}
                className="w-full text-left px-4 py-3 hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.contactEmail} · {item.agencyCode}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {item.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleManualSearch} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase">Recherche directe</p>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Agency ID</label>
          <input
            value={agencyId}
            onChange={e => setAgencyId(e.target.value)}
            placeholder="UUID agence"
            className="w-full h-10 px-3 text-sm bg-slate-950 border border-slate-700 rounded-lg font-mono"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-10 px-4 bg-slate-700 hover:bg-slate-600 disabled:opacity-60 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Charger par UUID
        </button>
      </form>

      {view && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">{view.agency.name}</h2>
            <p className="text-sm text-slate-400">{view.agency.email} · {view.agency.phone}</p>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              {view.agency.id} · statut {view.agency.status}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              disabled={!!action || view.agency.status === 'ACTIVE'}
              onClick={() => runAction('activation', () =>
                adminService.activateAgency(view.agency.id, view.tenantId),
              )}
              className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-sm font-medium flex items-center gap-1.5"
            >
              {action === 'activation' ? <Loader2 size={14} className="animate-spin" /> : <PlayCircle size={14} />}
              Activer
            </button>
            <button
              type="button"
              disabled={!!action || view.agency.status === 'SUSPENDED'}
              onClick={() => {
                if (!suspendReason.trim()) {
                  setError('Indiquez un motif de suspension.');
                  return;
                }
                void runAction('suspension', () =>
                  adminService.suspendAgency(view.agency.id, view.tenantId, suspendReason),
                );
              }}
              className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 text-sm font-medium flex items-center gap-1.5"
            >
              {action === 'suspension' ? <Loader2 size={14} className="animate-spin" /> : <PauseCircle size={14} />}
              Suspendre
            </button>
            <button
              type="button"
              disabled={!!action}
              onClick={() => runAction('sync-core', () =>
                adminService.syncCore(view.agency.id, view.tenantId),
              )}
              className="h-9 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-sm font-medium flex items-center gap-1.5"
            >
              {action === 'sync-core' ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Sync Core
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              Motif de suspension
            </label>
            <textarea
              value={suspendReason}
              onChange={e => setSuspendReason(e.target.value)}
              rows={2}
              maxLength={1000}
              placeholder="Ex. Documents non conformes…"
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
