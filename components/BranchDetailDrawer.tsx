'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Clock, Users, Star, GitBranch, Truck, Package, CheckCircle2, XCircle, Camera, Loader2, Pencil, Eye } from 'lucide-react'
import Drawer from '@/components/forms/Drawer'
import Avatar from '@/components/Avatar'
import { useAgencyLookups, missionsForBranch } from '@/lib/hooks/useAgencyLookups'
import { branchService } from '@/lib/services/branchService'
import { getEligibleBranchManagers } from '@/lib/staff-utils'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { branchDrawerDescription } from '@/lib/displayLabels'
import type { Branch } from '@/lib/types'

interface Props {
  branch: Branch | null
  open: boolean
  onClose: () => void
  onAction?: () => void
}

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-[11px] text-gray-400">{sub}</p>}
    </div>
  )
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  )
}

type DrawerTab = 'overview' | 'edit'

export default function BranchDetailDrawer({ branch, open, onClose, onAction }: Props) {
  const { deliverers, vehicles, missions, staff } = useAgencyLookups()
  const [tab, setTab] = useState<DrawerTab>('overview')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [acting, setActing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  const [editForm, setEditForm] = useState({
    name: '',
    address: '',
    city: '',
    openingHours: '',
    managerId: '',
  })

  useEffect(() => {
    if (branch) {
      setEditForm({
        name: branch.name,
        address: branch.address,
        city: branch.city,
        openingHours: branch.openingHours,
        managerId: branch.managerId ?? '',
      })
      setTab('overview')
      setPhotoPreview(null)
    }
  }, [branch])

  if (!branch) return null

  const act = async (key: string, fn: () => Promise<void>, successMsg: string, errorMsg: string) => {
    setActing(key)
    try {
      await fn()
      toastSuccess(successMsg)
      onAction?.()
      onClose()
    } catch (err) {
      toastError(toastErrorMessage(err, errorMsg))
    } finally {
      setActing(null)
    }
  }

  const branchDeliverers = deliverers.filter(d => d.branchId === branch.id)
  const branchVehicles = vehicles.filter(v => v.branchId === branch.id)
  const branchMissions = missionsForBranch(missions, deliverers, branch.id)
  const eligibleManagers = getEligibleBranchManagers(staff)

  const activeMissions = branchMissions.filter(m => ['IN_TRANSIT', 'ASSIGNED', 'PENDING'].includes(m.status)).length
  const deliveredToday = branchMissions.filter(m => m.status === 'DELIVERED').length

  const currentPhoto = photoPreview ?? branch.photoUrl ?? null

  const statusLabel = {
    OPEN: 'Ouverte',
    TEMPORARILY_CLOSED: 'Fermée temporairement',
    PERMANENTLY_CLOSED: 'Fermée définitivement',
  }[branch.status]

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    setPhotoPreview(URL.createObjectURL(f))
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await branchService.updateBranch(branch.id, {
        name: editForm.name,
        address: editForm.address,
        city: editForm.city,
        openingHours: editForm.openingHours,
      })

      if (editForm.managerId) {
        await branchService.assignManager(branch.id, editForm.managerId)
      } else if (branch.managerId) {
        await branchService.clearManager(branch.id)
      }

      toastSuccess('Antenne mise à jour.')
      onAction?.()
      setTab('overview')
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de mettre à jour cette antenne. Réessayez.'))
    } finally {
      setSaving(false)
    }
  }

  const statusFooter = branch.status === 'OPEN' ? (
    <div className="flex gap-3">
      <button
        onClick={() => act(
          'temp-close',
          () => branchService.temporarilyCloseBranch(branch.id),
          'Antenne fermée temporairement.',
          'Impossible de fermer temporairement cette antenne.',
        )}
        disabled={!!acting}
        className="flex-1 h-9 border border-orange-200 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {acting === 'temp-close' && <Loader2 size={13} className="animate-spin" />}
        Fermer temporairement
      </button>
      <button
        onClick={() => act(
          'close',
          () => branchService.closeBranch(branch.id),
          'Antenne fermée définitivement.',
          'Impossible de fermer cette antenne.',
        )}
        disabled={!!acting}
        className="flex-1 h-9 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {acting === 'close' && <Loader2 size={13} className="animate-spin" />}
        Fermer définitivement
      </button>
    </div>
  ) : branch.status === 'TEMPORARILY_CLOSED' ? (
    <button
      onClick={() => act(
        'reopen',
        () => branchService.reopenBranch(branch.id),
        'Antenne rouverte.',
        'Impossible de rouvrir cette antenne.',
      )}
      disabled={!!acting}
      className="w-full h-9 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
    >
      {acting === 'reopen' && <Loader2 size={13} className="animate-spin" />}
      Rouvrir l&apos;antenne
    </button>
  ) : undefined

  const editFooter = (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => setTab('overview')}
        className="flex-1 h-9 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        Annuler
      </button>
      <button
        type="submit"
        form="branch-edit-form"
        disabled={saving}
        className="flex-1 h-9 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {saving && <Loader2 size={13} className="animate-spin" />}
        Enregistrer
      </button>
    </div>
  )

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={branch.name}
      description={branchDrawerDescription(branch)}
      size="lg"
      footer={tab === 'edit' ? editFooter : statusFooter}
    >
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 px-6">
        {([
          { id: 'overview' as const, label: 'Aperçu', icon: Eye },
          { id: 'edit' as const, label: 'Édition', icon: Pencil },
        ]).map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 py-3 px-1 mr-6 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'edit' ? (
        <form id="branch-edit-form" onSubmit={handleSaveEdit} className="p-6 space-y-5">
          <div>
            <label className={cls.label}>Nom de l&apos;antenne <span className="text-orange-500">*</span></label>
            <input
              required
              type="text"
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              className={cls.input}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={cls.label}>Ville <span className="text-orange-500">*</span></label>
              <input
                required
                type="text"
                value={editForm.city}
                onChange={e => setEditForm(f => ({ ...f, city: e.target.value }))}
                className={cls.input}
              />
            </div>
            <div>
              <label className={cls.label}>Horaires</label>
              <input
                type="text"
                value={editForm.openingHours}
                onChange={e => setEditForm(f => ({ ...f, openingHours: e.target.value }))}
                placeholder="Lun–Sam 07h00–20h00"
                className={cls.input}
              />
            </div>
          </div>

          <div>
            <label className={cls.label}>Adresse complète <span className="text-orange-500">*</span></label>
            <input
              required
              type="text"
              value={editForm.address}
              onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))}
              className={cls.input}
            />
          </div>

          <div>
            <label className={cls.label}>Responsable de l&apos;antenne</label>
            <select
              value={editForm.managerId}
              onChange={e => setEditForm(f => ({ ...f, managerId: e.target.value }))}
              className={cls.select}
            >
              <option value="">Aucun responsable assigné</option>
              {eligibleManagers.map(m => (
                <option key={m.id} value={m.id}>
                  {m.fullName}
                  {m.branchId && m.branchId !== branch.id ? ` (actuellement : ${m.branchName})` : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Liste des managers et responsables administratifs de l&apos;agence
            </p>
          </div>

          {branch.managerName && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <Avatar name={branch.managerName} size="sm" />
              <div>
                <p className="text-sm font-medium text-gray-900">{branch.managerName}</p>
                <p className="text-xs text-gray-500">{branch.managerEmail ?? branch.managerPhone}</p>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div>
          {/* Cover photo */}
          <div className="relative h-44 bg-gradient-to-br from-orange-50 to-gray-100 group">
            {currentPhoto ? (
              <img src={currentPhoto} alt={branch.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <GitBranch size={36} className="text-gray-300" />
                <span className="text-sm text-gray-400">Aucune photo de l&apos;antenne</span>
              </div>
            )}
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors"
            >
              <Camera size={13} />
              {currentPhoto ? 'Changer la photo' : 'Ajouter une photo'}
            </button>
            {branch.isHeadquarters && (
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
                  Siège
                </span>
              </div>
            )}
          </div>

          {/* Status banner */}
          <div className={`px-6 py-3 flex items-center gap-3 border-b border-gray-100 ${branch.status === 'OPEN' ? 'bg-emerald-50' : 'bg-orange-50'}`}>
            <div className={`flex items-center gap-2 text-sm font-medium ${branch.status === 'OPEN' ? 'text-emerald-700' : 'text-orange-700'}`}>
              {branch.status === 'OPEN' ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
              {statusLabel}
            </div>
          </div>

          {/* Quick stats */}
          <div className="px-6 py-5 grid grid-cols-4 gap-4 border-b border-gray-100">
            <Stat label="Livreurs" value={branchDeliverers.length} />
            <Stat label="Véhicules" value={branchVehicles.length} />
            <Stat label="Missions actives" value={activeMissions} />
            <Stat label="Livrées (total)" value={deliveredToday} />
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Informations</h3>
              <div className="bg-white border border-gray-200 rounded-xl px-5">
                <InfoRow label="Adresse" value={`${branch.address}, ${branch.city}`} icon={MapPin} />
                <InfoRow label="Horaires" value={branch.openingHours} icon={Clock} />
                {branch.managerName ? (
                  <InfoRow label="Responsable" value={branch.managerName} icon={Star} />
                ) : (
                  <InfoRow label="Responsable" value="Non assigné" icon={Star} />
                )}
                <InfoRow label="Créée le" value={new Date(branch.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} icon={GitBranch} />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Livreurs rattachés ({branchDeliverers.length})</h3>
              {branchDeliverers.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucun livreur rattaché à cette antenne.</p>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                  {branchDeliverers.map(d => (
                    <div key={d.id} className="flex items-center gap-3 px-5 py-3">
                      <Avatar name={d.fullName} photoUrl={d.photoUrl} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{d.fullName}</p>
                        <p className="text-xs text-gray-400">{d.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            d.status === 'AVAILABLE' ? 'bg-emerald-500' :
                            d.status === 'ON_MISSION' ? 'bg-blue-500' :
                            d.status === 'SUSPENDED' ? 'bg-red-500' : 'bg-gray-300'
                          }`} />
                          <span className="text-gray-500">
                            {d.status === 'AVAILABLE' ? 'Disponible' :
                             d.status === 'ON_MISSION' ? 'En mission' :
                             d.status === 'OFFLINE' ? 'Hors ligne' :
                             d.status === 'SUSPENDED' ? 'Suspendu' : 'Inactif'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-orange-400 fill-orange-400" />
                          <span className="text-xs font-medium text-gray-600">{d.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Flotte de l&apos;antenne ({branchVehicles.length})</h3>
              {branchVehicles.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucun véhicule rattaché à cette antenne.</p>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                  {branchVehicles.map(v => (
                    <div key={v.id} className="flex items-center gap-3 px-5 py-3">
                      {v.photoUrl ? (
                        <img src={v.photoUrl} alt={v.model} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                      ) : (
                        <Truck size={15} className="text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{v.model}</p>
                        <p className="text-xs text-gray-400">{v.registrationNumber}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        v.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700' :
                        v.status === 'IN_USE' ? 'bg-blue-50 text-blue-700' :
                        v.status === 'IN_MAINTENANCE' ? 'bg-orange-50 text-orange-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {v.status === 'AVAILABLE' ? 'Disponible' :
                         v.status === 'IN_USE' ? 'En service' :
                         v.status === 'IN_MAINTENANCE' ? 'Maintenance' : 'Retiré'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Missions récentes</h3>
              {branchMissions.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucune mission.</p>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                  {branchMissions.slice(0, 5).map(m => (
                    <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                      <Package size={13} className="text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{m.manifestNumber}</p>
                        <p className="text-xs text-gray-400 truncate">{m.recipientName} · {m.deliveryAddress}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${
                        m.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' :
                        m.status === 'IN_TRANSIT' ? 'bg-blue-50 text-blue-700' :
                        m.status === 'CANCELLED' ? 'bg-gray-100 text-gray-500' :
                        m.status === 'FAILED' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                      }`}>
                        {m.status === 'DELIVERED' ? 'Livrée' :
                         m.status === 'IN_TRANSIT' ? 'En transit' :
                         m.status === 'PENDING' ? 'En attente' :
                         m.status === 'ASSIGNED' ? 'Assignée' :
                         m.status === 'CANCELLED' ? 'Annulée' :
                         m.status === 'FAILED' ? 'Échouée' : m.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  )
}
