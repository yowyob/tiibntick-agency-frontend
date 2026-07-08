'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  onPage: (p: number) => void;
}

export default function Pagination({ page, pageCount, total, pageSize, onPage }: Props) {
  if (pageCount <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages: (number | '…')[] = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) pages.push(i);
    if (page < pageCount - 2) pages.push('…');
    pages.push(pageCount);
  }

  return (
    <div className="flex items-center justify-between px-1 pt-3 border-t border-gray-100 dark:border-gray-700">
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {from}–{to} sur {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={15} />
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p as number)}
              className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                p === page
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === pageCount}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
