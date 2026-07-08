'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, Plus } from 'lucide-react'
import Drawer from './Drawer'
import { billingService } from '@/lib/services/billingService'
import { staffService } from '@/lib/services/staffService'
import { missionService } from '@/lib/services/missionService'
import { getAgencyId } from '@/lib/session'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { Deliverer, Mission } from '@/lib/types'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 bg-white cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
}

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

export default function CreateCommissionForm({ open, onClose, onSuccess }: Props) {
  const [delivererId, setDelivererId] = useState('')
  const [missionId, setMissionId] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('XAF')
  const [deliverers, setDeliverers] = useState<Deliverer[]>([])
  const [missions, setMissions] = useState<Mission[]>([])
  const [loadingLookups, setLoadingLookups] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  useEffect(() => {
    if (!open) return
    setLoadingLookups(true)
    const agencyId = getAgencyId()
    Promise.all([
      staffService.getDeliverers(agencyId),
      missionService.getMissions(agencyId),
    ])
      .then(([d, m]) => {
        setDeliverers(d)
        setMissions(m.filter(x => x.status === 'DELIVERED' || x.status === 'IN_TRANSIT'))
      })
      .finally(() => setLoadingLookups(false))
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await billingService.createCommission({
        delivererId,
        missionId,
        amount: parseFloat(amount),
        currency,
      })
      setSubmitting(false)
      setSuccess(true)
      toastSuccess('Commission créée.')
      onSuccess?.()
      setTimeout(() => {
        setSuccess(false)
        setDelivererId('')
        setMissionId('')
        setAmount('')
        onClose()
      }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de la création de la commission.'))
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Nouvelle commission" description="Ajustement manuel ou commission hors flux automatique" size="md">
      {success ? (
        <div className="p-8 flex flex-col items-center gap-3 text-emerald-600">
          <CheckCircle2 size={40} />
          <p className="font-semibold">Commission enregistrée</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {loadingLookups ? (
            <div className="flex justify-center py-8">
              <Loader2 size={24} className="animate-spin text-orange-500" />
            </div>
          ) : (
            <>
              <div>
                <label className={cls.label}>Livreur <span className="text-orange-500">*</span></label>
                <select required value={delivererId} onChange={e => setDelivererId(e.target.value)} className={cls.select}>
                  <option value="">— Sélectionner —</option>
                  {deliverers.map(d => (
                    <option key={d.id} value={d.id}>{d.fullName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={cls.label}>Mission <span className="text-orange-500">*</span></label>
                <select required value={missionId} onChange={e => setMissionId(e.target.value)} className={cls.select}>
                  <option value="">— Sélectionner —</option>
                  {missions.map(m => (
                    <option key={m.id} value={m.id}>{m.manifestNumber} · {m.recipientName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={cls.label}>Montant <span className="text-orange-500">*</span></label>
                  <input required type="number" min={0} step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className={cls.input} />
                </div>
                <div>
                  <label className={cls.label}>Devise</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)} className={cls.select}>
                    <option value="XAF">XAF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-11 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Créer la commission
              </button>
            </>
          )}
        </form>
      )}
    </Drawer>
  )
}
