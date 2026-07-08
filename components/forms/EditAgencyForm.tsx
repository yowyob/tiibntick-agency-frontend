'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import Drawer from './Drawer'
import { EMPTY_AGENCY } from '@/lib/emptyDefaults'
import { agencyService } from '@/lib/services/agencyService'
import { getAgencyId } from '@/lib/session'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { Agency } from '@/lib/types'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
  section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-3',
}

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

function agencyToForm(a: Agency) {
  return {
    name: a.name,
    legalName: a.legalName,
    registrationNumber: a.registrationNumber,
    phone: a.phone,
    email: a.email,
    address: a.address,
    city: a.city,
    country: a.country,
    defaultCurrency: a.defaultCurrency,
    autoAssignMissions: a.autoAssignMissions,
    allowFreelancerAssociation: a.allowFreelancerAssociation,
    maxAssociatedFreelancers: String(a.maxAssociatedFreelancers),
    hubRetentionDelayHours: String(a.hubRetentionDelayHours),
  }
}

export default function EditAgencyForm({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState(agencyToForm(EMPTY_AGENCY))
  const [loadingAgency, setLoadingAgency] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  useEffect(() => {
    if (!open) return
    setLoadingAgency(true)
    agencyService.getAgency(getAgencyId())
      .then(a => setForm(agencyToForm(a)))
      .catch(() => toastError('Impossible de charger le profil agence.'))
      .finally(() => setLoadingAgency(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const update = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await agencyService.updateProfile(getAgencyId(), {
        name: form.name,
        legalName: form.legalName,
        registrationNumber: form.registrationNumber,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        country: form.country,
      })
      await agencyService.updateSettings(getAgencyId(), {
        autoAssignMissions: form.autoAssignMissions,
        allowFreelancerAssociation: form.allowFreelancerAssociation,
        maxAssociatedFreelancers: parseInt(form.maxAssociatedFreelancers),
        hubRetentionDelayHours: parseInt(form.hubRetentionDelayHours),
      })
      setSubmitting(false); setSuccess(true)
      toastSuccess('Profil agence mis à jour.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); onClose() }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de la mise à jour du profil.'))
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Modifier le profil agence" description="Mettre à jour les informations de Rapid Express Douala">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {loadingAgency && (
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Chargement du profil…
            </p>
          )}

          {/* Identité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Identité & Légal</p>
            <div>
              <label className={cls.label}>Nom commercial <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.name} onChange={e => update('name', e.target.value)}
                className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Raison sociale <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.legalName} onChange={e => update('legalName', e.target.value)}
                className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>N° RCCM</label>
              <input type="text" value={form.registrationNumber} onChange={e => update('registrationNumber', e.target.value)}
                placeholder="RC/DLA/XXXX/B/XXXX" className={cls.input} />
            </div>
          </div>

          {/* Contact */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Contact</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Téléphone <span className="text-orange-500">*</span></label>
                <input required type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                  placeholder="+237 2XX XX XX XX" className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Email <span className="text-orange-500">*</span></label>
                <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                  className={cls.input} />
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Localisation</p>
            <div>
              <label className={cls.label}>Adresse du siège <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.address} onChange={e => update('address', e.target.value)}
                className={cls.input} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Ville <span className="text-orange-500">*</span></label>
                <input required type="text" value={form.city} onChange={e => update('city', e.target.value)}
                  className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Pays <span className="text-orange-500">*</span></label>
                <input required type="text" value={form.country} onChange={e => update('country', e.target.value)}
                  className={cls.input} />
              </div>
            </div>
          </div>

          {/* Paramètres opérationnels */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Paramètres opérationnels</p>
            <div>
              <label className={cls.label}>Devise par défaut</label>
              <select value={form.defaultCurrency} onChange={e => update('defaultCurrency', e.target.value)} className={`${cls.select} w-40`}>
                <option value="XAF">XAF — Franc CFA</option>
                <option value="EUR">EUR — Euro</option>
                <option value="USD">USD — Dollar</option>
                <option value="NGN">NGN — Naira</option>
              </select>
            </div>

            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => update('autoAssignMissions', !form.autoAssignMissions)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${form.autoAssignMissions ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                {form.autoAssignMissions && <CheckCircle2 size={13} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Auto-assignation des missions</p>
                <p className="text-xs text-gray-500">Assigner automatiquement les livreurs disponibles</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => update('allowFreelancerAssociation', !form.allowFreelancerAssociation)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${form.allowFreelancerAssociation ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                {form.allowFreelancerAssociation && <CheckCircle2 size={13} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Association de freelancers</p>
                <p className="text-xs text-gray-500">Autoriser l&apos;association avec des freelancers TiiBnTick</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Max freelancers associés</label>
                <input type="number" min="0" max="100" value={form.maxAssociatedFreelancers}
                  onChange={e => update('maxAssociatedFreelancers', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Rétention hub (heures)</label>
                <input type="number" min="24" step="24" value={form.hubRetentionDelayHours}
                  onChange={e => update('hubRetentionDelayHours', e.target.value)} className={cls.input} />
                <p className="text-xs text-gray-400 mt-1">
                  = {Math.round(Number(form.hubRetentionDelayHours) / 24)} jour{Number(form.hubRetentionDelayHours) / 24 > 1 ? 's' : ''} avant retour agence
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={submitting || success}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-36 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`}>
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Enregistrement...</>
              : success ? <><CheckCircle2 size={14} /> Enregistré !</>
              : 'Enregistrer'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
