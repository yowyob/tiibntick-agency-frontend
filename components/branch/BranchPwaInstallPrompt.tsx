'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function BranchPwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches
      || (navigator as Navigator & { standalone?: boolean }).standalone === true,
    );
    if (localStorage.getItem('tnt-branch-pwa-dismissed')) setDismissed(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (isStandalone || dismissed || !deferred) return null;

  return (
    <div className="mx-3 mb-3 flex flex-col gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3 py-3">
      <div className="flex items-start gap-2">
        <Download size={16} className="text-orange-500 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-orange-800">Installer Antenne</p>
          <p className="text-[10px] text-orange-600">App bureau sans barre d&apos;adresse</p>
        </div>
        <button type="button" onClick={() => { localStorage.setItem('tnt-branch-pwa-dismissed', '1'); setDismissed(true); }} className="p-0.5 text-orange-400 hover:text-orange-600">
          <X size={14} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => void deferred.prompt()}
        className="w-full text-[11px] font-bold bg-orange-500 text-white py-1.5 rounded-lg hover:bg-orange-600"
      >
        Installer
      </button>
    </div>
  );
}
