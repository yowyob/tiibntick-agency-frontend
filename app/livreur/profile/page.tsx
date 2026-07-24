'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, Package, LogOut, Phone, Mail, MapPin, Calendar, Truck, Sun, Moon, Wallet } from 'lucide-react'
import { livreurAuthService } from '@/lib/services/livreurAuthService'
import { livreurMissionService } from '@/lib/services/livreurMissionService'
import { useTheme } from '@/contexts/ThemeContext'
import type { Deliverer } from '@/lib/types'

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: 'Disponible',
  ON_MISSION: 'En mission',
  OFFLINE: 'Hors ligne',
  SUSPENDED: 'Suspendu',
  INACTIVE: 'Inactif',
}

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'bg-emerald-100 text-emerald-700',
  ON_MISSION: 'bg-orange-100 text-orange-700',
  OFFLINE: 'bg-gray-100 text-gray-500',
  SUSPENDED: 'bg-red-100 text-red-700',
  INACTIVE: 'bg-gray-100 text-gray-500',
}

const TYPE_LABELS: Record<string, string> = {
  PERMANENT: 'Permanent',
  PART_TIME: 'Mi-temps',
  SEASONAL: 'Saisonnier',
}

export default function LivreurProfilePage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [deliverer, setDeliverer] = useState<Deliverer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login')
      return
    }
    const id = livreurAuthService.getCurrentDelivererId()!
    livreurMissionService.getMyProfile(id).then(setDeliverer).finally(() => setLoading(false))
  }, [router])

  if (loading || !deliverer) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const initials = deliverer.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const joinDate = new Date(deliverer.joinedAt).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Mon profil</h1>

        <div className="flex items-center gap-4">
          {deliverer.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={deliverer.photoUrl}
              alt={deliverer.fullName}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-orange-500">{initials}</span>
            </div>
          )}
          <div>
            <p className="text-lg font-bold text-gray-900">{deliverer.fullName}</p>
            <p className="text-xs text-gray-500">{TYPE_LABELS[deliverer.type] ?? deliverer.type}</p>
            <span className={`inline-flex mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[deliverer.status]}`}>
              {STATUS_LABELS[deliverer.status]}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Package size={16} className="text-orange-500" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{deliverer.totalMissions}</p>
              <p className="text-[10px] text-gray-500">Total missions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Star size={16} className="text-orange-500 fill-orange-500" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{deliverer.rating}<span className="text-sm text-gray-400">/5</span></p>
              <p className="text-[10px] text-gray-500">Note moyenne</p>
            </div>
          </div>
        </div>

        {/* Contact details */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
          <a href={`tel:${deliverer.phone}`} className="flex items-center gap-3 p-4">
            <Phone size={16} className="text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400">Téléphone</p>
              <p className="text-sm font-medium text-gray-900">{deliverer.phone}</p>
            </div>
          </a>
          {deliverer.email && (
            <div className="flex items-center gap-3 p-4">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900">{deliverer.email}</p>
              </div>
            </div>
          )}
          {deliverer.branchName && (
            <div className="flex items-center gap-3 p-4">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400">Antenne rattachée</p>
                <p className="text-sm font-medium text-gray-900">{deliverer.branchName}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 p-4">
            <Calendar size={16} className="text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400">Membre depuis</p>
              <p className="text-sm font-medium text-gray-900">{joinDate}</p>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        {deliverer.vehiclePlate && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <Truck size={16} className="text-gray-500" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Véhicule assigné</p>
              <p className="text-sm font-semibold text-gray-900">{deliverer.vehiclePlate}</p>
            </div>
          </div>
        )}

        <Link
          href="/livreur/gains"
          className="w-full flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Wallet size={16} className="text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-400">Finance</p>
              <p className="text-sm font-medium text-gray-900">Mes gains</p>
            </div>
          </div>
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              {theme === 'dark'
                ? <Moon size={16} className="text-orange-400" />
                : <Sun size={16} className="text-gray-500" />
              }
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-400">Apparence</p>
              <p className="text-sm font-medium text-gray-900">{theme === 'dark' ? 'Mode sombre' : 'Mode clair'}</p>
            </div>
          </div>
          {/* Toggle switch */}
          <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${theme === 'dark' ? 'bg-orange-500' : 'bg-gray-200'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={() => livreurAuthService.logout()}
          className="w-full flex items-center justify-center gap-2 h-12 border border-red-200 text-red-500 font-semibold text-sm rounded-xl hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
