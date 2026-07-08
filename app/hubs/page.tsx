'use client'

import { useState, useRef } from 'react'
import { MapPin, Plus, Package, Clock, AlertTriangle, CheckCircle2, MoreHorizontal, Camera, LogOut, Loader2 } from 'lucide-react'
import { EMPTY_HUBS, EMPTY_HUB_PARCELS } from '@/lib/emptyDefaults'
import type { Hub, HubStatus, HubParcelStatus } from '@/lib/types'
import CreateHubForm from '@/components/forms/CreateHubForm'
import ConfigureHubDrawer from '@/components/forms/ConfigureHubDrawer'
import DepositParcelForm from '@/components/forms/DepositParcelForm'
import { hubService } from '@/lib/services/hubService'
import { useService } from '@/lib/hooks/useService'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'

function HubStatusBadge({ status }: { status: HubStatus }) {
  const map = {
    OPEN: 'bg-emerald-50 text-emerald-700',
    FULL: 'bg-red-50 text-red-700',
    TEMPORARILY_CLOSED: 'bg-orange-50 text-orange-700',
    PERMANENTLY_CLOSED: 'bg-gray-100 text-gray-500',
  }
  const labels = { OPEN: 'Ouvert', FULL: 'Plein', TEMPORARILY_CLOSED: 'Fermé temp.', PERMANENTLY_CLOSED: 'Fermé' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'OPEN' ? 'bg-emerald-500' : status === 'FULL' ? 'bg-red-500' : 'bg-orange-500'
      }`} />
      {labels[status]}
    </span>
  )
}

function ParcelStatusBadge({ status }: { status: HubParcelStatus }) {
  const map = {
    DEPOSITED: 'bg-blue-50 text-blue-700',
    WITHDRAWN: 'bg-emerald-50 text-emerald-700',
    EXPIRED: 'bg-red-50 text-red-700',
    RETURNED_TO_AGENCY: 'bg-gray-100 text-gray-600',
  }
  const labels = { DEPOSITED: 'Déposé', WITHDRAWN: 'Retiré', EXPIRED: 'Expiré', RETURNED_TO_AGENCY: 'Retourné' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

function HubCard({ hub, photoUrl, onPhotoChange, onConfigure }: {
  hub: Hub
  photoUrl: string | undefined
  onPhotoChange: (id: string, url: string) => void
  onConfigure: (hub: Hub) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const pct = Math.round((hub.currentOccupancy / hub.capacity) * 100)
  const barColor = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f97316' : '#10b981'
  const urgencyText = pct >= 90 ? 'Critique' : pct >= 70 ? 'Attention' : 'Normal'

  return (
    <div className={`bg-white border rounded-xl overflow-hidden hover:border-gray-300 transition-all group ${hub.status === 'FULL' ? 'border-red-200' : 'border-gray-200'}`}>
      {/* Cover photo */}
      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-50">
        {photoUrl ? (
          <img src={photoUrl} alt={hub.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <MapPin size={28} className={hub.status === 'OPEN' ? 'text-orange-300' : hub.status === 'FULL' ? 'text-red-300' : 'text-gray-300'} />
            <span className="text-xs text-gray-400">Aucune photo</span>
          </div>
        )}
        <div
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <Camera size={20} className="text-white" />
          <span className="text-xs text-white font-medium">{photoUrl ? 'Changer la photo' : 'Ajouter une photo'}</span>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) onPhotoChange(hub.id, URL.createObjectURL(f)) }} />
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <HubStatusBadge status={hub.status} />
          <button
            type="button"
            onClick={() => onConfigure(hub)}
            className="opacity-0 group-hover:opacity-100 p-1 bg-white/90 hover:bg-white rounded transition-all"
            title="Configurer"
          >
            <MoreHorizontal size={14} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{hub.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{hub.branchName}</p>
        </div>

        {/* Occupancy bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">Occupation</span>
            <span className="text-xs font-semibold" style={{ color: barColor }}>{pct}% · {urgencyText}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: barColor }} />
          </div>
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>{hub.currentOccupancy} colis</span>
            <span>Max {hub.capacity}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={11} className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{hub.address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={11} className="text-gray-400 flex-shrink-0" />
            <span>{hub.openingHours}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Package size={11} className="text-gray-400 flex-shrink-0" />
            <span>Rétention max : <span className="font-medium text-gray-700">{hub.maxRetentionDays} jours</span></span>
          </div>
        </div>

        {hub.managerName && (
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-[10px] font-semibold text-gray-600">
                  {hub.managerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <span className="text-xs text-gray-600">{hub.managerName}</span>
            </div>
            <span className="text-[11px] text-gray-400">{hub.managerPhone}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HubsPage() {
  const { data: hubs, refetch: refreshHubs } = useService(() => hubService.getHubs(), EMPTY_HUBS)
  const { data: parcels, refetch: refreshParcels } = useService(() => hubService.getAllParcelRecords(), EMPTY_HUB_PARCELS)
  const [activeTab, setActiveTab] = useState<'hubs' | 'parcels'>('hubs')
  const [hubFormOpen, setHubFormOpen] = useState(false)
  const [depositFormOpen, setDepositFormOpen] = useState(false)
  const [configureHub, setConfigureHub] = useState<Hub | null>(null)
  const [processingExpired, setProcessingExpired] = useState(false)
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()

  const handleProcessExpired = async () => {
    if (!window.confirm('Traiter tous les colis expirés du tenant ?')) return
    setProcessingExpired(true)
    try {
      const result = await hubService.processExpired()
      toastSuccess(`${result.processed} colis expiré(s) traité(s).`)
      refreshParcels()
      refreshHubs()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Échec du traitement des colis expirés.'))
    } finally {
      setProcessingExpired(false)
    }
  }

  const handleRefresh = () => {
    refreshHubs()
    refreshParcels()
  }

  const handleWithdraw = async (e: React.MouseEvent, hubId: string, recordId: string) => {
    e.stopPropagation()
    const recipient = window.prompt('Nom de la personne qui retire le colis :')
    if (!recipient?.trim()) return
    setWithdrawingId(recordId)
    try {
      await hubService.withdrawParcel(hubId, recordId, recipient.trim())
      toastSuccess('Retrait enregistré avec succès.')
      refreshParcels()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'enregistrer le retrait de ce colis.'))
    } finally {
      setWithdrawingId(null)
    }
  }

  const totalCapacity = hubs.reduce((s, h) => s + h.capacity, 0)
  const totalOccupancy = hubs.reduce((s, h) => s + h.currentOccupancy, 0)
  const globalPct = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">Hubs Relais Agence</h1>
              <span className="text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">NEW</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {hubs.length} hubs · {totalOccupancy}/{totalCapacity} colis ({globalPct}% occupé)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {parcels.some(p => p.status === 'EXPIRED' || p.status === 'DEPOSITED') && (
            <button
              type="button"
              onClick={handleProcessExpired}
              disabled={processingExpired}
              className="inline-flex items-center gap-2 bg-white border border-amber-200 hover:bg-amber-50 text-amber-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              {processingExpired ? <Loader2 size={15} className="animate-spin" /> : <AlertTriangle size={15} />}
              Traiter colis expirés
            </button>
          )}
          <button
            onClick={() => setDepositFormOpen(true)}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Package size={15} />
            Déposer un colis
          </button>
          <button
            onClick={() => setHubFormOpen(true)}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} />
            Nouveau hub relais
          </button>
        </div>
      </div>

      {/* Global occupancy */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-700">Occupation globale des hubs</p>
          <span className={`text-sm font-bold ${globalPct >= 85 ? 'text-red-600' : globalPct >= 60 ? 'text-orange-600' : 'text-emerald-600'}`}>
            {globalPct}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-700"
            style={{
              width: `${globalPct}%`,
              backgroundColor: globalPct >= 85 ? '#ef4444' : globalPct >= 60 ? '#f97316' : '#10b981'
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span>{totalOccupancy} colis stockés</span>
          <span>Capacité totale : {totalCapacity}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {[
            { id: 'hubs' as const, label: 'Hubs', count: hubs.length },
            { id: 'parcels' as const, label: 'Colis au hub', count: parcels.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded text-xs ${activeTab === tab.id ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Hubs grid */}
      {activeTab === 'hubs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {hubs.map(hub => (
            <HubCard
              key={hub.id}
              hub={hub}
              photoUrl={photoMap[hub.id] ?? hub.photoUrl}
              onPhotoChange={(id, url) => setPhotoMap(prev => ({ ...prev, [id]: url }))}
              onConfigure={setConfigureHub}
            />
          ))}
        </div>
      )}

      {/* Parcels table */}
      {activeTab === 'parcels' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Colis en cours dans les hubs</h2>
              <p className="text-xs text-gray-400 mt-0.5">{parcels.filter(p => p.status === 'DEPOSITED').length} en attente de retrait</p>
            </div>
            {parcels.some(p => p.status === 'EXPIRED') && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg">
                <AlertTriangle size={14} />
                <span className="text-xs font-medium">{parcels.filter(p => p.status === 'EXPIRED').length} colis expiré(s) à traiter</span>
              </div>
            )}
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Code suivi</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Hub</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Mission</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Destinataire</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Déposé le</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Expire le</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Retiré par</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {parcels.map(p => {
                const isExpired = p.status === 'EXPIRED'
                return (
                  <tr key={p.id} className={`table-row-hover cursor-pointer ${isExpired ? 'bg-red-50/30' : ''}`}>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono text-gray-700">{p.trackingCode}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-orange-400 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{p.hubName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-mono text-gray-500">{p.manifestNumber}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-gray-800">{p.recipientName}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500">
                        {new Date(p.depositedAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs ${isExpired ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                        {new Date(p.expectedWithdrawalDeadline).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {p.withdrawnBy ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span className="text-xs text-gray-600">{p.withdrawnBy}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <ParcelStatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      {p.status === 'DEPOSITED' && (
                        <button
                          onClick={e => handleWithdraw(e, p.hubId, p.id)}
                          disabled={withdrawingId === p.id}
                          className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50"
                        >
                          {withdrawingId === p.id
                            ? <Loader2 size={12} className="animate-spin" />
                            : <LogOut size={12} />
                          }
                          Retirer
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <CreateHubForm open={hubFormOpen} onClose={() => setHubFormOpen(false)} onSuccess={handleRefresh} />
      <ConfigureHubDrawer
        hub={configureHub}
        open={!!configureHub}
        onClose={() => setConfigureHub(null)}
        onSuccess={handleRefresh}
      />
      <DepositParcelForm open={depositFormOpen} onClose={() => setDepositFormOpen(false)} onSuccess={handleRefresh} />
    </div>
  )
}
