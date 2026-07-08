'use client';

import { useEffect } from 'react';

export default function BranchRegisterServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    void navigator.serviceWorker.register('/branch-sw.js', { scope: '/branch/' }).catch(() => {
      /* non-blocking */
    });
  }, []);
  return null;
}
