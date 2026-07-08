'use client';

import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], pageSize = 10) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));

  const safePage = Math.min(page, pageCount);

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, safePage, pageSize]);

  function goTo(p: number) {
    setPage(Math.max(1, Math.min(p, pageCount)));
  }

  return { page: safePage, setPage: goTo, pageCount, pageSize, paginatedData, total: data.length };
}
