'use client';

import type { Contract } from '@/lib/types';

interface Props {
  contract?: Contract | null;
  loading?: boolean;
  onOpenContract?: (contract: Contract) => void;
}

export default function DelivererContractCell({
  contract = null,
  loading = false,
  onOpenContract,
}: Props) {
  if (loading) {
    return <span className="text-xs text-gray-400">…</span>;
  }

  const label = contract ? 'Actif' : 'Aucun';

  if (!contract || !onOpenContract) {
    return (
      <span className={`text-xs font-medium ${contract ? 'text-emerald-600' : 'text-gray-400'}`}>
        {label}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        onOpenContract(contract);
      }}
      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline-offset-2 hover:underline"
      title="Voir le contrat"
    >
      {label}
    </button>
  );
}
