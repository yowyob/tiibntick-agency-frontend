'use client'

import { usePathname } from 'next/navigation'
import { Bell, CheckCheck, AlertTriangle, CheckCircle2, Info, X, Moon, Sun } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { openNotificationStream, subscribeRealtime } from '@/lib/realtime'
import { getAuthToken } from '@/lib/session'
import {
  notificationService,
  type AppNotification,
  type NotifType,
} from '@/lib/services/notificationService'
import AgencyGlobalSearch from '@/components/agency/AgencyGlobalSearch'

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/profile': 'Profil Agence',
  '/branches': 'Antennes',
  '/missions': 'Missions',
  '/fleet': 'Flotte',
  '/hubs': 'Hubs Relais',
  '/staff': 'Personnel',
  '/billing': 'Facturation',
  '/settings': 'Paramètres',
}

const cfg: Record<NotifType, { icon: React.ElementType; iconCls: string; bg: string }> = {
  alert:   { icon: AlertTriangle, iconCls: 'text-red-500',     bg: 'bg-red-50' },
  warning: { icon: AlertTriangle, iconCls: 'text-orange-500',  bg: 'bg-orange-50' },
  success: { icon: CheckCircle2,  iconCls: 'text-emerald-500', bg: 'bg-emerald-50' },
  info:    { icon: Info,          iconCls: 'text-blue-500',    bg: 'bg-blue-50' },
}

function eventTypeToNotifType(eventType: string): NotifType {
  if (eventType === 'HUB_ALERT' || eventType === 'PARCEL_EXPIRED') return 'warning'
  if (eventType === 'DELIVERY_CONFIRMED' || eventType === 'BRANCH_CREATED') return 'success'
  return 'info'
}

function prependNotif(prev: AppNotification[], item: AppNotification): AppNotification[] {
  if (prev.some(n => n.id === item.id)) return prev
  return [item, ...prev]
}

function useDynamicDate(): string {
  const [label, setLabel] = useState('')
  useEffect(() => {
    const fmt = () => {
      const now = new Date()
      return now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
        .replace(/^./, c => c.toUpperCase())
    }
    setLabel(fmt())
    const id = setInterval(() => setLabel(fmt()), 60_000)
    return () => clearInterval(id)
  }, [])
  return label
}

export default function Header() {
  const pathname = usePathname()
  const pageTitle = breadcrumbMap[pathname] ?? 'Page'
  const { theme, toggleTheme } = useTheme()
  const today = useDynamicDate()

  const [open, setOpen] = useState(false)
  const [notifs, setNotifs] = useState<AppNotification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const ref = useRef<HTMLDivElement>(null)

  const unread = notifs.filter(n => !n.read).length
  const displayed = filter === 'unread' ? notifs.filter(n => !n.read) : notifs

  const markAll = useCallback(async () => {
    try {
      await notificationService.markAllRead()
      setNotifs(ns => ns.map(n => ({ ...n, read: true })))
    } catch {
      setNotifs(ns => ns.map(n => ({ ...n, read: true })))
    }
  }, [])

  const markOne = useCallback(async (id: string) => {
    setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
    try {
      await notificationService.markRead(id)
    } catch {
      /* optimistic UI */
    }
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    if (open) document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    const token = getAuthToken()
    if (!token) return

    let cancelled = false
    notificationService.getNotifications()
      .then(items => { if (!cancelled) setNotifs(items) })
      .catch(() => { if (!cancelled) setNotifs([]) })

    const es = openNotificationStream(token, (n) => {
      setNotifs(prev => prependNotif(prev, {
        id: String(n.id ?? crypto.randomUUID()),
        type: (n.type as NotifType) ?? 'info',
        title: String(n.title ?? 'Notification'),
        body: String(n.body ?? ''),
        time: String(n.time ?? "À l'instant"),
        read: false,
        href: String(n.href ?? '/'),
      }))
    })

    const unsubWs = subscribeRealtime((event) => {
      if (event.channel !== 'notifications') return
      setNotifs(prev => prependNotif(prev, {
        id: crypto.randomUUID(),
        type: eventTypeToNotifType(event.type),
        title: event.title,
        body: event.body,
        time: "À l'instant",
        read: false,
        href: event.href ?? '/',
      }))
    })

    return () => {
      cancelled = true
      es.close()
      unsubWs()
    }
  }, [])

  return (
    <header className="h-16 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6 relative z-30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400 dark:text-slate-500">TiiBnTick Agency</span>
        <span className="text-gray-300 dark:text-slate-700">/</span>
        <span className="text-gray-900 dark:text-slate-100 font-medium">{pageTitle}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <AgencyGlobalSearch />

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Bell */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(v => !v)}
            className={`relative p-2 rounded-md transition-colors ${open ? 'bg-orange-50 dark:bg-orange-500/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}`}
          >
            <Bell size={18} className={open ? 'text-orange-500' : 'text-gray-500 dark:text-slate-400'} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                {unread}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-12 w-[380px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Notifications</p>
                  {unread > 0 && (
                    <span className="bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                      {unread} non lues
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unread > 0 && (
                    <button onClick={markAll} className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium px-2 py-1 rounded transition-colors">
                      <CheckCheck size={12} /> Tout lire
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors">
                    <X size={14} className="text-gray-400 dark:text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex border-b border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60">
                {(['all', 'unread'] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`flex-1 py-2 text-xs font-medium transition-colors border-b-2 ${filter === f ? 'text-orange-600 border-orange-500 bg-white dark:bg-slate-900' : 'text-gray-500 dark:text-slate-500 border-transparent hover:text-gray-700'}`}>
                    {f === 'all' ? `Toutes (${notifs.length})` : `Non lues (${unread})`}
                  </button>
                ))}
              </div>

              {/* Items */}
              <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800">
                {displayed.length === 0 ? (
                  <div className="py-10 text-center">
                    <Bell size={28} className="mx-auto text-gray-200 dark:text-slate-700 mb-2" />
                    <p className="text-sm text-gray-400 dark:text-slate-500">Aucune notification</p>
                  </div>
                ) : displayed.map(n => {
                  const { icon: Icon, iconCls, bg } = cfg[n.type]
                  return (
                    <Link key={n.id} href={n.href}
                      onClick={() => { markOne(n.id); setOpen(false) }}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/60 ${!n.read ? 'bg-orange-50/20 dark:bg-orange-500/5' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon size={14} className={iconCls} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-snug ${!n.read ? 'font-semibold text-gray-900 dark:text-slate-100' : 'font-normal text-gray-700 dark:text-slate-300'}`}>
                            {n.title}
                          </p>
                          {!n.read && <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                        <p className="text-[11px] text-gray-400 dark:text-slate-600 mt-1">{n.time}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 dark:border-slate-800 px-4 py-2.5 bg-gray-50/80 dark:bg-slate-800/40">
                <p className="text-xs text-center text-gray-400 dark:text-slate-600">
                  Synchronisé avec le serveur
                </p>
              </div>
            </div>
          )}
        </div>

        {today && (
          <span className="hidden lg:block text-xs text-gray-400 dark:text-slate-600 border-l border-gray-200 dark:border-slate-700 pl-3">
            {today}
          </span>
        )}
      </div>
    </header>
  )
}
