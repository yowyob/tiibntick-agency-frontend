'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, Settings } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { hubService } from '@/lib/services/hubService'
import HubReportPanel from '@/components/hubs/HubReportPanel'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { Hub, HubStatus } from '@/lib/types'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 bg-white cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
}

interface Props {
  hub: Hub | null
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function ConfigureHubDrawer({ hub, open, onClose, onSuccess }: Props) {
  const { branches } = useAgencyLookups()
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('30')
  const [retentionDays, setRetentionDays] = useState('3')
  const [openingHours, setOpeningHours] = useState('')
  const [branchId, setBranchId] = useState('')
  const [status, setStatus] = useState<HubStatus>('OPEN')
  const [occupancy, setOccupancy] = useState<{ current: number; capacity: number; available: number } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  useEffect(() => {
    if (!hub || !open) return
    setName(hub.name)
    setCapacity(String(hub.capacity))
    setRetentionDays(String(hub.maxRetentionDays))
    setOpeningHours(hub.openingHours)
    setBranchId(hub.branchId ?? '')
    setStatus(hub.status === 'FULL' ? 'OPEN' : hub.status)
    void hubService.getOccupancy(hub.id).then(o => {
      setOccupancy({ current: o.currentOccupancy, capacity: o.capacityUnits, available: o.availableSpace })
    }).catch(() => setOccupancy(null))
  }, [hub, open])

  if (!hub) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await hubService.configureHub(hub.id, {
        name: name.trim(),
        capacityUnits: parseInt(capacity, 10),
        retentionDelayHours: parseInt(retentionDays, 10) * 24,
        openingHours: openingHours.trim(),
      })
      if (branchId && branchId !== hub.branchId) {
        await hubService.attachToBranch(hub.id, branchId)
      }
      if (status !== hub.status && status !== 'FULL') {
        await hubService.updateHubStatus(hub.id, status === 'OPEN' ? 'OPEN' : 'TEMPORARILY_CLOSED')
      }
      setSubmitting(false)
      setSuccess(true)
      toastSuccess('Hub mis à jour.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); onClose() }, 1000)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Impossible de mettre à jour le hub.'))
    }
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Configurer le hub"
      description={hub.code ? `${hub.name} · ${hub.code}` : hub.name}
      size="md"
    >
      {success ? (
        <div className="p-8 flex flex-col items-center gap-3 text-emerald-600">
          <CheckCircle2 size={40} />
          <p className="font-semibold">Hub mis à jour</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {occupancy && (
            <div className="bg-orange-50 border border-orange-100 rounded-lg px-4 py-3 text-sm">
              <p className="font-semibold text-orange-800 flex items-center gap-2">
                <Settings size={14} /> Occupation temps réel
              </p>
              <p className="text-orange-700 text-xs mt-1">
                {occupancy.current}/{occupancy.capacity} colis · {occupancy.available} places libres
              </p>
            </div>
          )}

          <HubReportPanel hubId={hub.id} open={open} />

          <div>
            <label className={cls.label}>Nom</label>
            <input required value={name} onChange={e => setName(e.target.value)} className={cls.input} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={cls.label}>Capacité (colis)</label>
              <input required type="number" min={1} value={capacity} onChange={e => setCapacity(e.target.value)} className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Rétention (jours)</label>
              <input required type="number" min={1} value={retentionDays} onChange={e => setRetentionDays(e.target.value)} className={cls.input} />
            </div>
          </div>

          <div>
            <label className={cls.label}>Horaires</label>
            <input value={openingHours} onChange={e => setOpeningHours(e.target.value)} className={cls.input} />
          </div>

          <div>
            <label className={cls.label}>Antenne rattachée</label>
            <select value={branchId} onChange={e => setBranchId(e.target.value)} className={cls.select}>
              <option value="">— Aucune —</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={cls.label}>Statut</label>
            <select value={status} onChange={e => setStatus(e.target.value as HubStatus)} className={cls.select}>
              <option value="OPEN">Ouvert</option>
              <option value="TEMPORARILY_CLOSED">Fermé temporairement</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            Enregistrer
          </button>
        </form>
      )}
    </Drawer>
  )
}
