'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Phone, Mail, Calendar, GitBranch, Briefcase, CheckCircle2, XCircle,
  Camera, Loader2, Pencil, Eye, MapPin,
} from 'lucide-react'
import Drawer from '@/components/forms/Drawer'
import Avatar from '@/components/Avatar'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { staffService } from '@/lib/services/staffService'
import { STAFF_ROLE_LABELS } from '@/lib/staff-utils'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { staffDescription } from '@/lib/displayLabels'
import type { StaffMember, StaffRole, StaffStatus } from '@/lib/types'

interface Props {
  member: StaffMember | null
  open: boolean
  onClose: () => void
  onAction?: () => void
}

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
}

const STATUS_CONFIG: Record<StaffStatus, { label: string; color: string; icon: React.ElementType }> = {
  ACTIVE: { label: 'Actif', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  INACTIVE: { label: 'Inactif', color: 'bg-gray-100 text-gray-600', icon: XCircle },
  SUSPENDED: { label: 'Suspendu', color: 'bg-red-50 text-red-700', icon: XCircle },
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

export default function StaffMemberDetailDrawer({ member, open, onClose, onAction }: Props) {
  const { branches } = useAgencyLookups()
  const [tab, setTab] = useState<DrawerTab>('overview')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [acting, setActing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'BRANCH_MANAGER' as StaffRole,
    branchId: '',
  })

  useEffect(() => {
    if (member) {
      setEditForm({
        fullName: member.fullName,
        phone: member.phone,
        email: member.email ?? '',
        role: member.role,
        branchId: member.branchId ?? '',
      })
      setTab('overview')
      setPhotoPreview(null)
    }
  }, [member])

  if (!member) return null

  const statusCfg = STATUS_CONFIG[member.status]
  const StatusIcon = statusCfg.icon
  const branch = member.branchId ? branches.find(b => b.id === member.branchId) : undefined
  const currentPhoto = photoPreview ?? member.photoUrl ?? null

  const act = async (key: string, fn: () => Promise<void>) => {
    setActing(key)
    try {
      await fn()
      toastSuccess('Modification enregistrée.')
      onAction?.()
      onClose()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'effectuer cette action. Réessayez.'))
    } finally {
      setActing(null)
    }
  }

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
      await staffService.updateStaffMember(member.id, {
        fullName: editForm.fullName,
        phone: editForm.phone,
        email: editForm.email || undefined,
        role: editForm.role,
        branchId: editForm.branchId,
      })
      toastSuccess('Profil mis à jour.')
      onAction?.()
      setTab('overview')
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de mettre à jour ce profil. Vérifiez les informations saisies.'))
    } finally {
      setSaving(false)
    }
  }

  const statusFooter = member.status === 'ACTIVE' ? (
    <button
      onClick={() => act('suspend', () => staffService.suspendStaffMember(member.id))}
      disabled={!!acting}
      className="w-full h-9 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
    >
      {acting === 'suspend' && <Loader2 size={13} className="animate-spin" />}
      Suspendre le membre
    </button>
  ) : member.status === 'SUSPENDED' ? (
    <button
      onClick={() => act('reactivate', () => staffService.reactivateStaffMember(member.id))}
      disabled={!!acting}
      className="w-full h-9 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
    >
      {acting === 'reactivate' && <Loader2 size={13} className="animate-spin" />}
      Réactiver le membre
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
        form="staff-edit-form"
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
      title={member.fullName}
      description={staffDescription(member)}
      footer={tab === 'edit' ? editFooter : statusFooter}
    >
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
        <form id="staff-edit-form" onSubmit={handleSaveEdit} className="p-6 space-y-5">
          <div>
            <label className={cls.label}>Nom complet <span className="text-orange-500">*</span></label>
            <input
              required
              type="text"
              value={editForm.fullName}
              onChange={e => setEditForm(f => ({ ...f, fullName: e.target.value }))}
              className={cls.input}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={cls.label}>Téléphone <span className="text-orange-500">*</span></label>
              <input
                required
                type="tel"
                value={editForm.phone}
                onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                className={cls.input}
              />
            </div>
            <div>
              <label className={cls.label}>Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                className={cls.input}
              />
            </div>
          </div>

          <div>
            <label className={cls.label}>Fonction <span className="text-orange-500">*</span></label>
            <select
              value={editForm.role}
              onChange={e => setEditForm(f => ({ ...f, role: e.target.value as StaffRole }))}
              className={cls.select}
            >
              {(Object.keys(STAFF_ROLE_LABELS) as StaffRole[]).map(role => (
                <option key={role} value={role}>{STAFF_ROLE_LABELS[role]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={cls.label}>Antenne de rattachement</label>
            <select
              value={editForm.branchId}
              onChange={e => setEditForm(f => ({ ...f, branchId: e.target.value }))}
              className={cls.select}
            >
              <option value="">Non assigné</option>
              {branches.filter(b => b.status === 'OPEN').map(b => (
                <option key={b.id} value={b.id}>
                  {b.name}
                  {b.managerId && b.managerId !== member.id ? ` (resp. : ${b.managerName})` : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Si ce membre est responsable d&apos;antenne, l&apos;antenne sera mise à jour automatiquement
            </p>
          </div>
        </form>
      ) : (
        <div>
          <div className={`px-6 py-3 flex items-center gap-2 border-b border-gray-100 ${statusCfg.color}`}>
            <StatusIcon size={15} />
            <span className="text-sm font-medium">{statusCfg.label}</span>
          </div>

          <div className="px-6 py-6 flex items-center gap-5 border-b border-gray-100">
            <div className="relative group flex-shrink-0">
              <Avatar name={member.fullName} photoUrl={currentPhoto ?? undefined} size="lg" />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Camera size={18} className="text-white" />
              </button>
              <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{member.fullName}</p>
              <p className="text-sm text-orange-600 font-medium mt-0.5">{STAFF_ROLE_LABELS[member.role]}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Coordonnées</h3>
              <div className="bg-white border border-gray-200 rounded-xl px-5">
                <InfoRow label="Téléphone" value={member.phone} icon={Phone} />
                <InfoRow label="Email" value={member.email || '—'} icon={Mail} />
                <InfoRow
                  label="Membre depuis"
                  value={new Date(member.joinedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  icon={Calendar}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Rattachement</h3>
              <div className="bg-white border border-gray-200 rounded-xl px-5">
                <InfoRow label="Fonction" value={STAFF_ROLE_LABELS[member.role]} icon={Briefcase} />
                {member.branchName ? (
                  <>
                    <InfoRow label="Antenne" value={member.branchName} icon={GitBranch} />
                    {branch && (
                      <InfoRow label="Adresse antenne" value={`${branch.address}, ${branch.city}`} icon={MapPin} />
                    )}
                  </>
                ) : (
                  <InfoRow label="Antenne" value="Non assigné" icon={GitBranch} />
                )}
              </div>
            </div>

            {branch && branch.managerId === member.id && (
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <p className="text-sm font-medium text-orange-800">Responsable de l&apos;antenne</p>
                <p className="text-xs text-orange-600 mt-1">
                  Ce membre est désigné responsable de {branch.name} dans la gestion des antennes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Drawer>
  )
}
