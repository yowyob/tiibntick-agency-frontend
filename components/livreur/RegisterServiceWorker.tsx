'use client';

import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    void navigator.serviceWorker.register('/livreur-sw.js', { scope: '/livreur/' }).catch(() => {
      /* non-blocking */
    });
  }, []);
  return null;
}
