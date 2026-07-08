'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, MapPin } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { hubService } from '@/lib/services/hubService'
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

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

const initialState = {
  name: '', address: '', city: 'Douala',
  branchId: '', capacity: '30', maxRetentionDays: '3',
  openingHours: 'Lun–Sam 07h00–20h00',
  managerName: '', managerPhone: '',
}

export default function CreateHubForm({ open, onClose, onSuccess }: Props) {
  const { branches } = useAgencyLookups()
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const code = form.name.toUpperCase().replace(/\s+/g, '-').slice(0, 12)
      await hubService.createHub(getAgencyId(), {
        name: form.name,
        code,
        capacityUnits: parseInt(form.capacity),
        city: form.city,
        country: 'CM',
        street: form.address,
        retentionDelayHours: parseInt(form.maxRetentionDays) * 24,
        openingHours: form.openingHours,
        ...(form.branchId ? { branchId: form.branchId } : {}),
      })
      setSubmitting(false); setSuccess(true)
      toastSuccess('Hub relais créé avec succès.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); setForm(initialState); onClose() }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de la création du hub.'))
    }
  }

  const retentionOptions = [
    { value: '1', label: '1 jour' },
    { value: '2', label: '2 jours' },
    { value: '3', label: '3 jours (recommandé)' },
    { value: '5', label: '5 jours' },
    { value: '7', label: '7 jours' },
  ]

  return (
    <Drawer open={open} onClose={onClose} title="Créer un hub relais" description="Nouveau point de dépôt/retrait géré par l'agence">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Identité */}
          <div className={cls.section}>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-semibold text-gray-800">Identité du hub</p>
              <span className="text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">NEW</span>
            </div>
            <div>
              <label className={cls.label}>Nom du hub <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="ex: Hub Relais Bonanjo" className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Antenne de rattachement</label>
              <select value={form.branchId} onChange={e => update('branchId', e.target.value)} className={cls.select}>
                <option value="">Indépendant (non rattaché)</option>
                {branches.filter(b => b.status === 'OPEN').map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">Le hub peut fonctionner de manière autonome sans antenne de référence.</p>
            </div>
          </div>

          {/* Localisation */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Localisation</p>
            <div>
              <label className={cls.label}>Adresse <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.address} onChange={e => update('address', e.target.value)}
                placeholder="ex: 5 Rue des Cocotiers, Bonanjo" className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Ville <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.city} onChange={e => update('city', e.target.value)}
                className={cls.input} />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
              <MapPin size={13} className="text-gray-400 flex-shrink-0" />
              Les coordonnées GPS seront détectées automatiquement via TiiBnTick Geo à la création.
            </div>
          </div>

          {/* Capacité & Rétention */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Capacité & Rétention</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Capacité (nb colis) <span className="text-orange-500">*</span></label>
                <input required type="number" min="1" max="500" value={form.capacity}
                  onChange={e => update('capacity', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Délai rétention max</label>
                <select value={form.maxRetentionDays} onChange={e => update('maxRetentionDays', e.target.value)} className={cls.select}>
                  {retentionOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
              <p className="text-xs text-orange-700">
                Après <strong>{form.maxRetentionDays} jour{parseInt(form.maxRetentionDays) > 1 ? 's' : ''}</strong>, les colis non retirés seront automatiquement marqués <strong>EXPIRÉS</strong> et retournés à l'agence.
              </p>
            </div>
          </div>

          {/* Horaires */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Horaires & Responsable</p>
            <div>
              <label className={cls.label}>Horaires d'ouverture <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.openingHours} onChange={e => update('openingHours', e.target.value)}
                placeholder="ex: Lun–Sam 07h00–20h00" className={cls.input} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Responsable du hub</label>
                <input type="text" value={form.managerName} onChange={e => update('managerName', e.target.value)}
                  placeholder="Nom complet" className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Téléphone du responsable</label>
                <input type="tel" value={form.managerPhone} onChange={e => update('managerPhone', e.target.value)}
                  placeholder="+237 6XX XX XX XX" className={cls.input} />
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
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-32 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`}>
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Création...</>
              : success ? <><CheckCircle2 size={14} /> Créé !</>
              : 'Créer le hub'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
