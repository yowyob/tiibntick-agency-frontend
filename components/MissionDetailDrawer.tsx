'use client'

import { useState, useEffect } from 'react'
import { MapPin, User, CheckCircle2, AlertTriangle, XCircle, Loader, Loader2 } from 'lucide-react'
import type { Mission, MissionStatus, MissionPriority } from '@/lib/types'
import Drawer from '@/components/forms/Drawer'
import UploadableAvatar from '@/components/UploadableAvatar'
import UploadZone from '@/components/UploadZone'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { missionService } from '@/lib/services/missionService'
import { openMissionStream } from '@/lib/realtime'
import { missionSubtitle } from '@/lib/displayLabels'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import clsx from 'clsx'

const pipeline: { status: MissionStatus; label: string }[] = [
  { status: 'DRAFT',      label: 'Brouillon' },
  { status: 'PENDING',    label: 'En attente' },
  { status: 'ASSIGNED',   label: 'Assignée' },
  { status: 'IN_TRANSIT', label: 'En transit' },
  { status: 'AT_HUB',     label: 'Au hub' },
  { status: 'DELIVERED',  label: 'Livrée' },
]
const terminalStatuses: MissionStatus[] = ['FAILED', 'CANCELLED']

function StatusTimeline({ status }: { status: MissionStatus }) {
  const isTerminal = terminalStatuses.includes(status)
  const currentIdx = pipeline.findIndex(s => s.status === status)

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100" />
      <div className="flex justify-between relative">
        {pipeline.map((step, i) => {
          const done   = !isTerminal && i < currentIdx
          const active = !isTerminal && i === currentIdx
          return (
            <div key={step.status} className="flex flex-col items-center gap-1.5 z-10">
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                done   ? 'bg-emerald-500 border-emerald-500' :
                active ? 'bg-orange-500 border-orange-500' :
                         'bg-white border-gray-200'
              )}>
                {done   ? <CheckCircle2 size={14} className="text-white" /> :
                 active ? <div className="w-2 h-2 bg-white rounded-full" /> :
                          <div className="w-2 h-2 bg-gray-300 rounded-full" />}
              </div>
              <span className={clsx('text-[10px] font-medium text-center leading-tight max-w-14',
                done || active ? 'text-gray-800' : 'text-gray-400'
              )}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
      {isTerminal && (
        <div className="mt-3 flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {status === 'FAILED'    ? <AlertTriangle size={14} className="text-red-500" /> :
           status === 'CANCELLED' ? <XCircle size={14} className="text-gray-500" /> : null}
          <span className="text-sm font-medium text-red-700">
            {status === 'FAILED' ? 'Mission échouée' : 'Mission annulée'}
          </span>
        </div>
      )}
    </div>
  )
}

const priorityMap: Record<MissionPriority, { label: string; cls: string }> = {
  URGENT: { label: 'Urgent',  cls: 'bg-red-50 text-red-700 border border-red-200' },
  HIGH:   { label: 'Haute',   cls: 'bg-orange-50 text-orange-700 border border-orange-200' },
  NORMAL: { label: 'Normale', cls: 'bg-gray-50 text-gray-600 border border-gray-200' },
  LOW:    { label: 'Basse',   cls: 'bg-gray-50 text-gray-400 border border-gray-100' },
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 w-32 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-gray-800 flex-1">{value}</span>
    </div>
  )
}

interface Props {
  mission: Mission | null
  open: boolean
  onClose: () => void
  onAction?: () => void
}

export default function MissionDetailDrawer({ mission, open, onClose, onAction }: Props) {
  const { deliverers, vehicles, hubs } = useAgencyLookups()
  const [acting, setActing] = useState<string | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()
  const [assignDelivererId, setAssignDelivererId] = useState('')
  const [assignVehicleId, setAssignVehicleId] = useState('')

  useEffect(() => {
    if (mission) {
      setAssignDelivererId(mission.delivererId ?? '')
      const matched = vehicles.find(v => v.registrationNumber === mission.vehiclePlate)
      setAssignVehicleId(matched?.id ?? '')
    }
  }, [mission, vehicles])

  useEffect(() => {
    if (!open || !mission) return
    const es = openMissionStream(mission.id, (data) => {
      if (typeof data.status === 'string') {
        onAction?.()
      }
    })
    return () => es?.close()
  }, [open, mission, onAction])

  if (!mission) return null

  const priority = priorityMap[mission.priority]

  const branchDeliverers = deliverers.filter(d =>
    d.status !== 'SUSPENDED' && d.status !== 'INACTIVE'
    && (!mission.branchId || d.branchId === mission.branchId),
  )
  const branchVehicles = vehicles.filter(v =>
    v.status === 'AVAILABLE' && (!mission.branchId || v.branchId === mission.branchId),
  )

  const assignFields = (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <select
        value={assignDelivererId}
        onChange={e => setAssignDelivererId(e.target.value)}
        className="h-9 px-2 text-sm border border-gray-200 rounded-lg bg-white"
      >
        <option value="">Livreur…</option>
        {branchDeliverers.map(d => (
          <option key={d.id} value={d.id}>{d.fullName}</option>
        ))}
      </select>
      <select
        value={assignVehicleId}
        onChange={e => setAssignVehicleId(e.target.value)}
        className="h-9 px-2 text-sm border border-gray-200 rounded-lg bg-white"
      >
        <option value="">Véhicule (opt.)</option>
        {branchVehicles.map(v => (
          <option key={v.id} value={v.id}>{v.registrationNumber}</option>
        ))}
      </select>
    </div>
  )

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

  const Spinner = ({ k }: { k: string }) =>
    acting === k ? <Loader2 size={14} className="animate-spin" /> : null

  const footer = (
    <>
      {['PENDING', 'DRAFT'].includes(mission.status) && (
        <div className="flex flex-col gap-3">
          {assignFields}
          <div className="flex gap-3">
          <button
            onClick={() => act(
              'assign',
              () => missionService.assignMission(mission.id, assignDelivererId, assignVehicleId),
              'Impossible d\'assigner cette mission. Vérifiez le livreur et le véhicule.',
            )}
            disabled={!!acting || !assignDelivererId}
            className="flex-1 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Spinner k="assign" />
            Assigner un livreur
          </button>
          <button
            onClick={() => act(
              'cancel',
              () => missionService.cancelMission(mission.id, 'Annulation manuelle'),
              'Impossible d\'annuler cette mission.',
            )}
            disabled={!!acting}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Spinner k="cancel" />
            Annuler
          </button>
        </div>
        </div>
      )}
      {mission.status === 'ASSIGNED' && (
        <div className="flex flex-col gap-3">
          {assignFields}
          <div className="flex gap-3">
          <button
            onClick={() => act(
              'reassign',
              () => missionService.reassignMission(mission.id, assignDelivererId, assignVehicleId),
              'Impossible de réassigner cette mission.',
            )}
            disabled={!!acting || !assignDelivererId}
            className="flex-1 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Spinner k="reassign" />
            Réassigner
          </button>
          <button
            onClick={() => act(
              'cancel',
              () => missionService.cancelMission(mission.id, 'Annulation manuelle'),
              'Impossible d\'annuler cette mission.',
            )}
            disabled={!!acting}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Spinner k="cancel" />
            Annuler
          </button>
        </div>
        </div>
      )}
      {['DELIVERED', 'FAILED', 'CANCELLED'].includes(mission.status) && (
        <p className="text-xs text-gray-400 text-center py-1">Mission terminée · Aucune action disponible</p>
      )}
      {mission.status === 'IN_TRANSIT' && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-blue-600 text-center flex items-center justify-center gap-1.5">
            <Loader size={12} className="animate-spin" /> Mission en cours de livraison
          </p>
          <button
            onClick={() => {
              const hubId = mission.targetHubId
                ?? hubs.find(h => h.status === 'OPEN' || h.status === 'FULL')?.id
              if (!hubId) {
                toastError('Aucun hub disponible pour le dépôt.')
                return
              }
              if (!mission.delivererId) {
                toastError('Aucun livreur assigné à cette mission.')
                return
              }
              const trackingCode = mission.manifestNumber.replace(/\s/g, '-').toUpperCase()
              act(
                'deposit',
                () => missionService.depositAtHub(
                  mission.id,
                  hubId,
                  mission.delivererId!,
                  trackingCode,
                ),
                'Impossible d\'enregistrer le dépôt au hub.',
              )
            }}
            disabled={!!acting}
            className="w-full py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Spinner k="deposit" />
            Dépôt au hub relais
          </button>
        </div>
      )}
      {mission.status === 'AT_HUB' && (
        <button
          onClick={() => {
            const recipient = window.prompt('Nom du destinataire qui retire le colis :')
            if (!recipient?.trim()) return
            act(
              'withdraw',
              () => missionService.withdrawHubParcel(mission.id, recipient.trim()),
              'Impossible d\'enregistrer le retrait au hub.',
            )
          }}
          disabled={!!acting}
          className="w-full py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Spinner k="withdraw" />
          Enregistrer le retrait
        </button>
      )}
    </>
  )

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={mission.manifestNumber}
      description={missionSubtitle(mission)}
      footer={footer}
    >
      {/* Priority badge next to title — injected via description slot substitute */}
      <div className="px-6 pt-0 pb-0">
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-0 mb-0 ${priority.cls}`}>
          {priority.label}
        </span>
      </div>

      {/* Timeline */}
      <div className="px-6 py-5 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Progression</p>
        <StatusTimeline status={mission.status} />
      </div>

      {/* Parties */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Expéditeur → Destinataire</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <User size={12} className="text-gray-400" />
              <span className="text-xs text-gray-400">Expéditeur</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{mission.senderName}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{mission.pickupAddress}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <User size={12} className="text-orange-400" />
              <span className="text-xs text-orange-500">Destinataire</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{mission.recipientName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{mission.recipientPhone}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{mission.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Logistique */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Logistique</p>
        <Row label="Livreur" value={
          mission.delivererName
            ? <div className="flex items-center gap-2">
                <UploadableAvatar
                  name={mission.delivererName}
                  photoUrl={deliverers.find(d => d.id === mission.delivererId)?.photoUrl}
                  size="xs"
                />
                {mission.delivererName}
              </div>
            : <span className="text-gray-400 italic">Non assigné</span>
        } />
        <Row label="Véhicule" value={
          mission.vehiclePlate
            ? <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{mission.vehiclePlate}</span>
            : <span className="text-gray-400 italic">—</span>
        } />
        {mission.targetHubName && (
          <Row label="Hub cible" value={
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-violet-400" />
              <span className="text-violet-700">{mission.targetHubName}</span>
            </div>
          } />
        )}
      </div>

      {/* Colis & Planning */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Colis & Planification</p>
        <Row label="Colis" value={`${mission.packagesCount} colis · ${mission.totalWeightKg} kg`} />
        <Row label="Collecte prévue" value={new Date(mission.scheduledPickupAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} />
        {mission.scheduledDeliveryAt && (
          <Row label="Livraison prévue" value={new Date(mission.scheduledDeliveryAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} />
        )}
        {mission.actualPickupAt && (
          <Row label="Collecte effective" value={<span className="text-emerald-700">{new Date(mission.actualPickupAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>} />
        )}
        {mission.actualDeliveryAt && (
          <Row label="Livraison effective" value={<span className="text-emerald-700 font-semibold">{new Date(mission.actualDeliveryAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>} />
        )}
      </div>

      {/* Facturation */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Facturation</p>
        <Row label="Prix de vente" value={
          <span className="font-bold text-gray-900">{mission.sellingPrice.toLocaleString('fr-FR')} {mission.currency}</span>
        } />
        <Row label="Créée le" value={new Date(mission.createdAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />
      </div>

      {/* Preuve de livraison */}
      {mission.status === 'DELIVERED' && (
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Preuve de livraison</p>
          <UploadZone
            label=""
            hint="Photo signature, photo dépôt — image ou PDF"
            accept="image/*,.pdf"
            category="delivery-proof"
            entityId={mission.id}
          />
        </div>
      )}

      {/* Anomalie / Rapport */}
      {(mission.status === 'FAILED') && (
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Rapport d&apos;anomalie</p>
          <UploadZone
            label=""
            hint="Photo ou document justificatif de l'échec"
            accept="image/*,.pdf"
            category="anomaly-proof"
            entityId={mission.id}
          />
        </div>
      )}
    </Drawer>
  )
}
