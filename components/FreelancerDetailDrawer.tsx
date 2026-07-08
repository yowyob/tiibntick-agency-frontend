'use client'

import { useState, useRef } from 'react'
import { User, Phone, Calendar, Percent, Package, CheckCircle2, Clock, XCircle, PauseCircle, AlertCircle, Camera, Loader2 } from 'lucide-react'
import Drawer from '@/components/forms/Drawer'
import Avatar from '@/components/Avatar'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { staffService } from '@/lib/services/staffService'
import { freelancerDescription } from '@/lib/displayLabels'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { FreelancerAssociation } from '@/lib/types'

interface Props {
  freelancer: FreelancerAssociation | null
  open: boolean
  onClose: () => void
  onAction?: () => void
}

function Row({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium text-right ${highlight ? 'text-orange-600 font-bold' : 'text-gray-900'}`}>{value}</span>
    </div>
  )
}

const STATUS_CONFIG = {
  ACTIVE: { label: 'Association active', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  PENDING: { label: 'En attente de validation', color: 'bg-orange-50 text-orange-700', icon: Clock },
  PAUSED: { label: 'Association pausée', color: 'bg-yellow-50 text-yellow-700', icon: PauseCircle },
  TERMINATED: { label: 'Association terminée', color: 'bg-gray-100 text-gray-600', icon: XCircle },
}

export default function FreelancerDetailDrawer({ freelancer, open, onClose, onAction }: Props) {
  const { missions } = useAgencyLookups()
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [acting, setActing] = useState<string | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()

  if (!freelancer) return null

  const act = async (key: string, fn: () => Promise<void>, errorMsg: string) => {
    setActing(key)
    try {
      await fn()
      toastSuccess('Modification enregistrée.')
      onAction?.()
      onClose()
    } catch (err) {
      toastError(toastErrorMessage(err, errorMsg))
    } finally {
      setActing(null)
    }
  }

  const statusCfg = STATUS_CONFIG[freelancer.status]
  const StatusIcon = statusCfg.icon

  const assignedMissions = missions.filter(m => m.delivererName === freelancer.freelancerName)
  const deliveredCount = assignedMissions.filter(m => m.status === 'DELIVERED').length
  const totalEarnings = assignedMissions
    .filter(m => m.status === 'DELIVERED')
    .reduce((sum, m) => sum + Math.round(m.sellingPrice * freelancer.commissionRate / 100), 0)

  const daysSinceAssociation = Math.floor(
    (Date.now() - new Date(freelancer.associatedAt).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={freelancer.freelancerName}
      description={freelancerDescription(freelancer)}
      footer={
        freelancer.status === 'ACTIVE' ? (
          <div className="flex gap-3">
            <button
              onClick={() => act(
                'suspend',
                () => staffService.suspendFreelancer(freelancer.id),
                'Impossible de suspendre ce freelancer.',
              )}
              disabled={!!acting}
              className="flex-1 h-10 border border-yellow-200 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {acting === 'suspend' && <Loader2 size={13} className="animate-spin" />}
              Suspendre
            </button>
            <button
              onClick={() => act(
                'terminate',
                () => staffService.terminateFreelancer(freelancer.id),
                'Impossible de résilier cette association.',
              )}
              disabled={!!acting}
              className="flex-1 h-10 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {acting === 'terminate' && <Loader2 size={13} className="animate-spin" />}
              Mettre fin
            </button>
          </div>
        ) : freelancer.status === 'PENDING' ? (
          <button
            onClick={() => act(
              'cancel',
              () => staffService.cancelFreelancerInvitation(freelancer.id),
              'Impossible d\'annuler cette invitation.',
            )}
            disabled={!!acting}
            className="w-full h-10 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
          >
            {acting === 'cancel' && <Loader2 size={13} className="animate-spin" />}
            Annuler l&apos;invitation
          </button>
        ) : undefined
      }
    >
      <div>
        {/* Status */}
        <div className={`px-6 py-3 flex items-center gap-2 border-b border-gray-100 ${statusCfg.color}`}>
          <StatusIcon size={15} />
          <span className="text-sm font-medium">{statusCfg.label}</span>
        </div>

        {/* Profile hero */}
        <div className="px-6 py-6 flex items-center gap-5 border-b border-gray-100">
          <div className="relative group flex-shrink-0">
            <Avatar
              name={freelancer.freelancerName}
              photoUrl={photoPreview ?? freelancer.photoUrl}
              size="lg"
            />
            <button
              onClick={() => photoInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Camera size={18} className="text-white" />
            </button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0]
                if (!f) return
                if (photoPreview) URL.revokeObjectURL(photoPreview)
                setPhotoPreview(URL.createObjectURL(f))
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{freelancer.freelancerName}</h2>
            <p className="text-sm text-gray-500">{freelancer.phone}</p>
            <p className="text-xs text-gray-400 mt-1">{freelancer.freelancerId}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-5 grid grid-cols-3 gap-4 border-b border-gray-100 bg-gray-50">
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">{freelancer.commissionRate}%</p>
            <p className="text-xs text-gray-500 mt-0.5">Taux commission</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{freelancer.assignedMissionsCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Missions assignées</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{daysSinceAssociation}j</p>
            <p className="text-xs text-gray-500 mt-0.5">Durée association</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Association terms */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Termes de l&apos;association</h3>
            <div className="bg-white border border-gray-200 rounded-xl px-5">
              <Row label="Contact" value={freelancer.phone || '—'} />
              <Row label="Taux de commission" value={`${freelancer.commissionRate}% par mission`} highlight />
              <Row
                label="Associé le"
                value={new Date(freelancer.associatedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              />
              {freelancer.endedAt && (
                <Row
                  label="Fin d'association"
                  value={new Date(freelancer.endedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                />
              )}
              <Row label="Missions assignées" value={`${freelancer.assignedMissionsCount} missions`} />
              {deliveredCount > 0 && (
                <Row label="Commissions estimées" value={`${totalEarnings.toLocaleString('fr-FR')} XAF`} />
              )}
            </div>
          </div>

          {/* How it works */}
          {freelancer.status === 'PENDING' && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Validation en attente</p>
                  <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                    Ce freelancer a reçu une invitation d&apos;association. Il doit accepter via son application TiiBnTick Livreur
                    pour que l&apos;association devienne active.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent missions */}
          {assignedMissions.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Missions effectuées ({assignedMissions.length})
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                {assignedMissions.slice(0, 5).map(m => (
                  <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                    <Package size={13} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{m.manifestNumber}</p>
                      <p className="text-xs text-gray-400 truncate">{m.recipientName}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {m.status === 'DELIVERED' && (
                        <span className="text-xs text-emerald-600 font-medium">
                          +{Math.round(m.sellingPrice * freelancer.commissionRate / 100).toLocaleString('fr-FR')} XAF
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        m.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' :
                        m.status === 'IN_TRANSIT' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {m.status === 'DELIVERED' ? 'Livrée' : m.status === 'IN_TRANSIT' ? 'En transit' : m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Drawer>
  )
}
