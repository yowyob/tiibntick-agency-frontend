'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck, Package, MapPin, AlertTriangle, Info } from 'lucide-react';
import { subscribeBranchRealtime, openBranchNotificationStream } from '@/lib/branch/branchRealtime';
import { useToast } from '@/contexts/ToastContext';

type NotifType = 'mission' | 'tracking' | 'alert' | 'info';

interface BranchNotif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  href: string;
  time: string;
  read: boolean;
}

function eventToType(channel: string, type: string): NotifType {
  if (channel === 'missions') return 'mission';
  if (channel === 'tracking') return 'tracking';
  if (type.includes('ALERT') || type.includes('FAILED')) return 'alert';
  return 'info';
}

const ICONS: Record<NotifType, React.ElementType> = {
  mission: Package,
  tracking: MapPin,
  alert: AlertTriangle,
  info: Info,
};

export default function BranchNotificationBell() {
  const { info: toastInfo, success: toastSuccess } = useToast();
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<BranchNotif[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const prepend = useCallback((n: BranchNotif) => {
    setNotifs(prev => [n, ...prev].slice(0, 30));
  }, []);

  useEffect(() => {
    const es = openBranchNotificationStream((n) => {
      const item: BranchNotif = {
        id: String(n.id ?? crypto.randomUUID()),
        type: 'info',
        title: String(n.title ?? 'Notification'),
        body: String(n.body ?? ''),
        href: String(n.href ?? '/branch'),
        time: "À l'instant",
        read: false,
      };
      prepend(item);
      toastInfo(`${item.title} — ${item.body}`);
    });

    const unsub = subscribeBranchRealtime((event) => {
      if (event.channel === 'tracking' && event.type === 'DELIVERER_LOCATION') return;

      const href = event.channel === 'missions'
        ? '/branch/missions'
        : event.channel === 'tracking'
          ? '/branch/missions'
          : '/branch';

      const item: BranchNotif = {
        id: crypto.randomUUID(),
        type: eventToType(event.channel, event.type),
        title: event.title || 'Événement temps réel',
        body: event.body || event.type,
        href,
        time: "À l'instant",
        read: false,
      };
      prepend(item);

      if (event.channel === 'missions') {
        toastSuccess(`${item.title} — ${item.body}`);
      } else if (event.channel !== 'tracking') {
        toastInfo(`${item.title} — ${item.body}`);
      }
    });

    return () => {
      es?.close();
      unsub();
    };
  }, [prepend, toastInfo, toastSuccess]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unread = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`relative p-2 rounded-lg transition-colors ${open ? 'bg-orange-50' : 'hover:bg-gray-50'}`}
        title="Notifications temps réel"
      >
        <Bell size={18} className={open ? 'text-orange-500' : 'text-gray-500'} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-[360px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Temps réel</p>
            {unread > 0 && (
              <button type="button" onClick={markAllRead} className="text-[11px] text-orange-600 font-semibold flex items-center gap-1">
                <CheckCheck size={12} /> Tout lire
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {notifs.length === 0 ? (
              <p className="px-4 py-8 text-sm text-gray-400 text-center">Aucune notification pour le moment</p>
            ) : notifs.map(n => {
              const Icon = ICONS[n.type];
              return (
                <Link
                  key={n.id}
                  href={n.href}
                  onClick={() => {
                    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
                    setOpen(false);
                  }}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-orange-50 transition-colors ${!n.read ? 'bg-orange-50/40' : ''}`}
                >
                  <Icon size={14} className="text-orange-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{n.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{n.body}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
