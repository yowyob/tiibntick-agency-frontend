'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatUserError } from '@/lib/errors';

interface ServiceState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/** Hook générique pour charger des données via un service API. */
export function useService<T>(
  loader: () => Promise<T>,
  fallback: T,
): ServiceState<T> & { refetch: () => void; setData: (d: T) => void } {
  const [state, setState] = useState<ServiceState<T>>({
    data: fallback,
    loading: true,
    error: null,
  });

  const fetch = useCallback(() => {
    setState(s => ({ ...s, loading: true, error: null }));
    loader()
      .then(data => setState({ data, loading: false, error: null }))
      .catch(e => setState(s => ({
        ...s,
        loading: false,
        error: formatUserError(e, 'Impossible de charger les données. Réessayez.'),
      })));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetch(); }, [fetch]);

  const setData = useCallback((d: T) => setState(s => ({ ...s, data: d })), []);

  return { ...state, refetch: fetch, setData };
}
