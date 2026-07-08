'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
    const dismissedKey = localStorage.getItem('tnt-livreur-pwa-dismissed');
    if (dismissedKey) setDismissed(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (isStandalone || dismissed || !deferred) return null;

  const install = async () => {
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === 'accepted') setDeferred(null);
  };

  const dismiss = () => {
    localStorage.setItem('tnt-livreur-pwa-dismissed', '1');
    setDismissed(true);
  };

  return (
    <div className="mx-5 mb-4 flex items-center gap-3 rounded-2xl bg-orange-500 text-white px-4 py-3 shadow-lg">
      <Download size={20} className="shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">Installer l&apos;app Livreur</p>
        <p className="text-[11px] text-orange-100">Accès rapide depuis votre écran d&apos;accueil</p>
      </div>
      <button type="button" onClick={() => void install()} className="text-xs font-bold bg-white text-orange-600 px-3 py-1.5 rounded-lg shrink-0">
        Installer
      </button>
      <button type="button" onClick={dismiss} className="p-1 shrink-0 opacity-80 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}
