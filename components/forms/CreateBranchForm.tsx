'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { agencyService } from '@/lib/services/agencyService'
import { branchService } from '@/lib/services/branchService'
import { getEligibleBranchManagers } from '@/lib/staff-utils'
import { getAgencyId } from '@/lib/session'
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
}

const initialState = {
  name: '',
  address: '',
  city: 'Douala',
  openingHours: 'Lun–Sam 07h00–20h00',
  managerId: '',
  isHeadquarters: false,
  status: 'OPEN',
}

export default function CreateBranchForm({ open, onClose, onSuccess }: Props) {
  const { staff } = useAgencyLookups()
  const [form, setForm] = useState(initialState)
  const [agencyName, setAgencyName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  useEffect(() => {
    if (!open) return
    agencyService.getAgency(getAgencyId())
      .then(a => setAgencyName(a.name))
      .catch(() => setAgencyName(''))
  }, [open])

  const update = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const code = form.name.toUpperCase().replace(/\s+/g, '-').slice(0, 12)
      await branchService.createBranch(getAgencyId(), {
        name: form.name,
        code,
        city: form.city,
        country: 'CM',
        street: form.address,
        openingHours: form.openingHours,
        managerId: form.managerId || undefined,
        isHeadquarters: form.isHeadquarters,
        status: form.status as 'OPEN' | 'TEMPORARILY_CLOSED',
      })
      setSubmitting(false)
      setSuccess(true)
      toastSuccess('Antenne créée avec succès.')
      onSuccess?.()
      setTimeout(() => {
        setSuccess(false)
        setForm(initialState)
        onClose()
      }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, "Erreur lors de la création de l'antenne."))
    }
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Créer une antenne"
      description={agencyName
        ? `Nouvelle antenne rattachée à ${agencyName}`
        : 'Nouvelle antenne rattachée à votre agence'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Identité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Identité de l'antenne</p>
            <div>
              <label className={cls.label}>Nom de l'antenne <span className="text-orange-500">*</span></label>
              <input
                required
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="ex: Antenne Bonanjo"
                className={cls.input}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Ville <span className="text-orange-500">*</span></label>
                <input
                  required
                  type="text"
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className={cls.input}
                />
              </div>
              <div>
                <label className={cls.label}>Statut</label>
                <select value={form.status} onChange={e => update('status', e.target.value)} className={cls.select}>
                  <option value="OPEN">Ouverte</option>
                  <option value="TEMPORARILY_CLOSED">Fermée temp.</option>
                </select>
              </div>
            </div>

            <div>
              <label className={cls.label}>Adresse complète <span className="text-orange-500">*</span></label>
              <input
                required
                type="text"
                value={form.address}
                onChange={e => update('address', e.target.value)}
                placeholder="ex: 12 Rue du Commerce, Bonanjo"
                className={cls.input}
              />
            </div>
          </div>

          {/* Opérationnel */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Opérationnel</p>
            <div>
              <label className={cls.label}>Horaires d'ouverture</label>
              <input
                type="text"
                value={form.openingHours}
                onChange={e => update('openingHours', e.target.value)}
                placeholder="ex: Lun–Sam 07h00–20h00"
                className={cls.input}
              />
              <p className="text-xs text-gray-400 mt-1">Format libre — ex: Lun–Ven 08h00–18h00</p>
            </div>

            <div>
              <label className={cls.label}>Responsable de l&apos;antenne</label>
              <select value={form.managerId} onChange={e => update('managerId', e.target.value)} className={cls.select}>
                <option value="">Sélectionner un responsable (optionnel)</option>
                {getEligibleBranchManagers(staff).map(m => (
                  <option key={m.id} value={m.id}>
                    {m.fullName}
                    {m.branchName ? ` — ${m.branchName}` : ' — Non assigné'}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Managers et responsables administratifs — ajoutez-en depuis Personnel → Managers
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg cursor-pointer"
              onClick={() => update('isHeadquarters', !form.isHeadquarters)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.isHeadquarters ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                {form.isHeadquarters && <CheckCircle2 size={13} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Définir comme siège social</p>
                <p className="text-xs text-gray-500">Cette antenne sera le siège principal de l'agence</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={submitting || success}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-28 justify-center ${
              success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'
            } disabled:opacity-70`}
          >
            {submitting ? (
              <><Loader2 size={14} className="animate-spin" /> Création...</>
            ) : success ? (
              <><CheckCircle2 size={14} /> Créée !</>
            ) : (
              'Créer l\'antenne'
            )}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
