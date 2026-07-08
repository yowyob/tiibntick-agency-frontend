'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Plus, X } from 'lucide-react'
import Drawer from './Drawer'
import { billingService } from '@/lib/services/billingService'
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

interface SurchargeRule { condition: string; type: 'PERCENTAGE' | 'FIXED_AMOUNT'; value: string }

const initialState = {
  name: '', description: '', currency: 'XAF',
  basePrice: '', perKmRate: '', perKgRate: '',
  isDefault: false, validFrom: new Date().toISOString().split('T')[0], validTo: '',
  surcharges: [] as SurchargeRule[],
  hasLoyalty: false, loyaltyMinTx: '10', loyaltyDiscount: '5',
  platformCommissionPct: '3', agencyCommissionPct: '',
}

export default function CreateBillingPolicyForm({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string | boolean | SurchargeRule[]) => setForm(p => ({ ...p, [k]: v }))

  const addSurcharge = () => update('surcharges', [...form.surcharges, { condition: '', type: 'PERCENTAGE', value: '' }])
  const removeSurcharge = (i: number) => update('surcharges', form.surcharges.filter((_, idx) => idx !== i))
  const updateSurcharge = (i: number, k: keyof SurchargeRule, v: string) => {
    const updated = form.surcharges.map((s, idx) => idx === i ? { ...s, [k]: v } : s)
    update('surcharges', updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await billingService.createPolicy(getAgencyId(), {
        name: form.name,
        basePrice: parseFloat(form.basePrice),
        perKmRate: parseFloat(form.perKmRate) || 0,
        perKgRate: parseFloat(form.perKgRate) || 0,
        currency: form.currency,
        validFrom: form.validFrom,
        ...(form.validTo ? { validTo: form.validTo } : {}),
        ...(form.description ? { description: form.description } : {}),
      })
      setSubmitting(false); setSuccess(true)
      toastSuccess('Politique tarifaire créée.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); setForm(initialState); onClose() }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de la création de la politique.'))
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Nouvelle politique tarifaire" description="Définir les règles de calcul du prix de vente" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Identité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Identité</p>
            <div>
              <label className={cls.label}>Nom de la politique <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="ex: Tarif Standard 2026" className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Description</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={2}
                placeholder="Description courte de la politique..."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition resize-none" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg cursor-pointer"
              onClick={() => update('isDefault', !form.isDefault)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${form.isDefault ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                {form.isDefault && <CheckCircle2 size={13} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Définir comme politique par défaut</p>
                <p className="text-xs text-gray-500">Appliquée automatiquement à toutes les nouvelles missions</p>
              </div>
            </div>
          </div>

          {/* Tarification de base */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Tarification de base</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={cls.label}>Prix de base <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <input required type="number" min="0" value={form.basePrice}
                    onChange={e => update('basePrice', e.target.value)}
                    placeholder="1500" className={cls.input} />
                </div>
              </div>
              <div>
                <label className={cls.label}>Tarif / km</label>
                <input type="number" min="0" value={form.perKmRate}
                  onChange={e => update('perKmRate', e.target.value)}
                  placeholder="150" className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Tarif / kg</label>
                <input type="number" min="0" value={form.perKgRate}
                  onChange={e => update('perKgRate', e.target.value)}
                  placeholder="200" className={cls.input} />
              </div>
            </div>
            <div>
              <label className={cls.label}>Devise</label>
              <select value={form.currency} onChange={e => update('currency', e.target.value)} className={`${cls.select} w-40`}>
                <option value="XAF">XAF — Franc CFA</option>
                <option value="EUR">EUR — Euro</option>
                <option value="USD">USD — Dollar</option>
                <option value="NGN">NGN — Naira</option>
              </select>
            </div>
            {form.basePrice && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
                Formule : <code className="font-mono text-orange-700">Prix = {form.basePrice || 0} + ({form.perKmRate || 0} × km) + ({form.perKgRate || 0} × kg) + surcharges</code>
              </div>
            )}
          </div>

          {/* Surcharges */}
          <div className={cls.section}>
            <div className="flex items-center justify-between mb-3">
              <p className={cls.sectionTitle} style={{ margin: 0 }}>Surcharges conditionnelles</p>
              <button type="button" onClick={addSurcharge}
                className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium">
                <Plus size={13} /> Ajouter
              </button>
            </div>
            {form.surcharges.length === 0 ? (
              <p className="text-sm text-gray-400 italic">Aucune surcharge définie. Ex: +20% pour livraison de nuit, +500 XAF pour colis fragile...</p>
            ) : (
              <div className="space-y-3">
                {form.surcharges.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Condition</label>
                        <input type="text" value={s.condition} onChange={e => updateSurcharge(i, 'condition', e.target.value)}
                          placeholder="ex: colis_fragile, heure_nuit..." className={cls.input} />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Type</label>
                        <select value={s.type} onChange={e => updateSurcharge(i, 'type', e.target.value)} className={cls.select}>
                          <option value="PERCENTAGE">%</option>
                          <option value="FIXED_AMOUNT">Fixe</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Valeur</label>
                        <input type="number" min="0" value={s.value} onChange={e => updateSurcharge(i, 'value', e.target.value)}
                          placeholder={s.type === 'PERCENTAGE' ? '20' : '500'} className={cls.input} />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeSurcharge(i)}
                      className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors mt-5 flex-shrink-0">
                      <X size={14} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fidélité */}
          <div className={cls.section}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-800">Règle de fidélité</p>
              <button type="button" onClick={() => update('hasLoyalty', !form.hasLoyalty)}
                className={`relative w-9 h-5 rounded-full transition-colors ${form.hasLoyalty ? 'bg-orange-500' : 'bg-gray-200'}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${form.hasLoyalty ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
            {form.hasLoyalty && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cls.label}>Nb min. de livraisons</label>
                  <input type="number" min="1" value={form.loyaltyMinTx}
                    onChange={e => update('loyaltyMinTx', e.target.value)} className={cls.input} />
                </div>
                <div>
                  <label className={cls.label}>Réduction (%)</label>
                  <input type="number" min="1" max="50" value={form.loyaltyDiscount}
                    onChange={e => update('loyaltyDiscount', e.target.value)} className={cls.input} />
                </div>
              </div>
            )}
          </div>

          {/* Commission plateforme */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Commission Plateforme</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Commission TiiBnTick (%)</label>
                <input type="number" min="0" max="30" step="0.5" value={form.platformCommissionPct}
                  onChange={e => update('platformCommissionPct', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Commission Agence (%)</label>
                <input type="number" min="0" max="30" step="0.5" value={form.agencyCommissionPct}
                  onChange={e => update('agencyCommissionPct', e.target.value)}
                  placeholder="Optionnel" className={cls.input} />
              </div>
            </div>
          </div>

          {/* Validité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Période de validité</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Valide depuis <span className="text-orange-500">*</span></label>
                <input required type="date" value={form.validFrom} onChange={e => update('validFrom', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Expire le</label>
                <input type="date" value={form.validTo} min={form.validFrom}
                  onChange={e => update('validTo', e.target.value)} className={cls.input} />
                <p className="text-xs text-gray-400 mt-1">Laisser vide = sans expiration</p>
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
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Création...</>
              : success ? <><CheckCircle2 size={14} /> Créée !</>
              : 'Créer la politique'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
