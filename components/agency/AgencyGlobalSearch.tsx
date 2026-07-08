'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { searchService, searchResultHref, type SearchHit } from '@/lib/services/searchService';

export default function AgencyGlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setHits([]);
      return;
    }
    setLoading(true);
    try {
      const result = await searchService.search(q);
      setHits(result.hits);
      setOpen(true);
    } catch {
      setHits([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => void runSearch(query), 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, runSearch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectHit = (hit: SearchHit) => {
    setOpen(false);
    setQuery('');
    router.push(searchResultHref(hit));
  };

  return (
    <div ref={ref} className="relative hidden md:flex items-center">
      <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none z-10" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => hits.length > 0 && setOpen(true)}
        placeholder="Rechercher missions, livreurs…"
        className="pl-8 pr-8 py-1.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 w-52"
      />
      {loading && (
        <Loader2 size={14} className="absolute right-3 text-gray-400 animate-spin" />
      )}
      {open && hits.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
          {hits.map(hit => (
            <button
              key={`${hit.entityType}-${hit.entityId}`}
              type="button"
              onClick={() => selectHit(hit)}
              className="w-full text-left px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-slate-800 border-b border-gray-50 dark:border-slate-800 last:border-0"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{hit.title}</p>
              <p className="text-[10px] text-orange-600 uppercase font-semibold">{hit.entityType}</p>
              {hit.snippet && (
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5">{hit.snippet}</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
