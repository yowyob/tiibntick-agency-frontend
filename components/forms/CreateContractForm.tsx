'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { getAgencyId } from '@/lib/session'
import { toApiCommissionRate } from '@/lib/api/mappers'
import { staffService } from '@/lib/services/staffService'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
  section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-3',
}

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  /** Évite GET /contracts/active si la liste est déjà chargée (ex. page staff). */
  hasActiveContract?: (delivererId: string) => boolean
}

const initialState = {
  delivererId: '', contractType: 'PERMANENT_EMPLOYEE',
  remunerationType: 'MONTHLY_SALARY', rate: '', currency: 'XAF',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '', terms: '',
}

export default function CreateContractForm({ open, onClose, onSuccess, hasActiveContract }: Props) {
  const { deliverers } = useAgencyLookups()
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const alreadyActive = hasActiveContract
        ? hasActiveContract(form.delivererId)
        : !!(await staffService.getActiveContract(form.delivererId))
      if (alreadyActive) {
        toastError('Ce livreur a déjà un contrat actif. Résiliez-le ou modifiez-le avant d\'en créer un nouveau.')
        setSubmitting(false)
        return
      }
      const isPercentage = form.remunerationType === 'PERCENTAGE_PER_DELIVERY'
      await staffService.createContract(form.delivererId, {
        agencyId: getAgencyId(),
        contractType: form.contractType,
        startDate: form.startDate,
        ...(form.endDate ? { endDate: form.endDate } : {}),
        remunerationModel: form.remunerationType,
        ...(isPercentage ? { commissionRate: toApiCommissionRate(parseFloat(form.rate)) } : { baseSalary: parseFloat(form.rate) }),
        currency: form.currency,
      })
      setSubmitting(false); setSuccess(true)
      toastSuccess('Contrat créé avec succès.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); setForm(initialState); onClose() }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de la création du contrat.'))
    }
  }

  const rateLabel: Record<string, string> = {
    MONTHLY_SALARY: 'Salaire mensuel (XAF)',
    FIXED_PER_DELIVERY: 'Montant fixe par livraison (XAF)',
    PERCENTAGE_PER_DELIVERY: 'Pourcentage par livraison (%)',
    MIXED_SALARY_BONUS: 'Salaire de base mensuel (XAF)',
  }

  return (
    <Drawer open={open} onClose={onClose} title="Nouveau contrat" description="Créer un contrat de travail ou de prestation">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Livreur */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Parties contractantes</p>
            <div>
              <label className={cls.label}>Livreur <span className="text-orange-500">*</span></label>
              <select required value={form.delivererId} onChange={e => update('delivererId', e.target.value)} className={cls.select}>
                <option value="">Sélectionner un livreur</option>
                {deliverers.map(d => (
                  <option key={d.id} value={d.id}>{d.fullName} — {d.type === 'PERMANENT' ? 'Permanent' : d.type === 'PART_TIME' ? 'Temps partiel' : 'Freelancer'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={cls.label}>Type de contrat <span className="text-orange-500">*</span></label>
              <select value={form.contractType} onChange={e => update('contractType', e.target.value)} className={cls.select}>
                <option value="PERMANENT_EMPLOYEE">Employé Permanent (CDI)</option>
                <option value="PART_TIME_EMPLOYEE">Employé Temps Partiel (CDD)</option>
                <option value="FREELANCER_AGREEMENT">Convention Prestataire</option>
                <option value="INTERN">Stagiaire</option>
              </select>
            </div>
          </div>

          {/* Rémunération */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Rémunération</p>
            <div>
              <label className={cls.label}>Modèle de rémunération <span className="text-orange-500">*</span></label>
              <select value={form.remunerationType} onChange={e => update('remunerationType', e.target.value)} className={cls.select}>
                <option value="MONTHLY_SALARY">Salaire Mensuel Fixe</option>
                <option value="FIXED_PER_DELIVERY">Montant Fixe par Livraison</option>
                <option value="PERCENTAGE_PER_DELIVERY">Pourcentage par Livraison</option>
                <option value="MIXED_SALARY_BONUS">Mixte (Salaire + Prime)</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className={cls.label}>{rateLabel[form.remunerationType]} <span className="text-orange-500">*</span></label>
                <input required type="number" min="0" value={form.rate}
                  onChange={e => update('rate', e.target.value)}
                  placeholder="ex: 120000" className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Devise</label>
                <select value={form.currency} onChange={e => update('currency', e.target.value)} className={cls.select}>
                  <option value="XAF">XAF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
            {form.remunerationType === 'MIXED_SALARY_BONUS' && (
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                <p className="text-xs text-orange-700">Les règles de prime seront définies après la création du contrat via les règles de rémunération.</p>
              </div>
            )}
          </div>

          {/* Durée */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Durée du contrat</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Date de début <span className="text-orange-500">*</span></label>
                <input required type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Date de fin</label>
                <input type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)}
                  min={form.startDate} className={cls.input} />
                <p className="text-xs text-gray-400 mt-1">Laisser vide pour CDI (durée indéterminée)</p>
              </div>
            </div>
          </div>

          {/* Clauses */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Clauses particulières</p>
            <div>
              <label className={cls.label}>Conditions spécifiques</label>
              <textarea
                value={form.terms}
                onChange={e => update('terms', e.target.value)}
                rows={3}
                placeholder="Clauses spécifiques, conditions particulières..."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition resize-none"
              />
            </div>
          </div>

        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={submitting || success}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-32 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`}>
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Création...</>
              : success ? <><CheckCircle2 size={14} /> Créé !</>
              : 'Créer le contrat'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
