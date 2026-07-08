'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[page error]', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Quelque chose s'est mal passé
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-sm">
          Une erreur inattendue s'est produite lors du chargement de cette page.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
        >
          <RefreshCw size={14} />
          Réessayer
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm rounded-lg transition-colors text-gray-700 dark:text-gray-300"
        >
          <Home size={14} />
          Tableau de bord
        </Link>
      </div>
    </div>
  );
}
