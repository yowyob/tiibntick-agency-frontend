'use client';

import { useEffect, useState } from 'react';
import { CloudOff, RefreshCw } from 'lucide-react';
import { countOfflineActions } from '@/lib/livreur/offlineQueue';
import { livreurMissionService } from '@/lib/services/livreurMissionService';

export default function OfflineSyncBanner() {
  const [pending, setPending] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [online, setOnline] = useState(true);

  const refresh = () => {
    void countOfflineActions().then(setPending);
  };

  useEffect(() => {
    refresh();
    const onOnline = () => {
      setOnline(true);
      void handleSync();
    };
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    setOnline(navigator.onLine);
    const id = setInterval(refresh, 5000);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      clearInterval(id);
    };
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const n = await livreurMissionService.syncOfflineQueue();
      if (n > 0) refresh();
    } finally {
      setSyncing(false);
      refresh();
    }
  };

  if (!online) {
    return (
      <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5">
        <CloudOff size={14} className="text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800 flex-1">Mode hors ligne — actions mises en file d&apos;attente</p>
        {pending > 0 && (
          <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">{pending}</span>
        )}
      </div>
    );
  }

  if (pending === 0) return null;

  return (
    <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-100 px-3 py-2.5">
      <RefreshCw size={14} className={`text-blue-600 shrink-0 ${syncing ? 'animate-spin' : ''}`} />
      <p className="text-xs text-blue-800 flex-1">{pending} action(s) en attente de synchronisation</p>
      <button
        type="button"
        onClick={() => void handleSync()}
        disabled={syncing}
        className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg"
      >
        Sync
      </button>
    </div>
  );
}
