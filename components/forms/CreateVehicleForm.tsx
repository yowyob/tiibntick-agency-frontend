'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Truck, Bike, Car } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { fleetService } from '@/lib/services/fleetService'
import { getAgencyId } from '@/lib/session'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { VehicleType } from '@/lib/types'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
  section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-3',
}

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

const vehicleTypes = [
  { value: 'MOTORCYCLE', label: 'Moto', icon: Bike, maxW: 50, maxV: 0.3 },
  { value: 'CAR', label: 'Voiture', icon: Car, maxW: 700, maxV: 5 },
  { value: 'TRUCK_LIGHT', label: 'Camion léger', icon: Truck, maxW: 3000, maxV: 20 },
  { value: 'TRUCK_HEAVY', label: 'Camion lourd', icon: Truck, maxW: 10000, maxV: 60 },
  { value: 'TRICYCLE', label: 'Tricycle', icon: Bike, maxW: 200, maxV: 1.5 },
  { value: 'BICYCLE', label: 'Vélo', icon: Bike, maxW: 30, maxV: 0.2 },
]

const initialState = {
  registrationNumber: '', model: '', type: 'MOTORCYCLE',
  maxWeightKg: '50', maxVolumeM3: '0.3',
  branchId: '', assignedDelivererId: '',
  lastMaintenanceDate: '',
}

export default function CreateVehicleForm({ open, onClose, onSuccess }: Props) {
  const { branches, deliverers } = useAgencyLookups()
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const selectType = (type: typeof vehicleTypes[0]) => {
    setForm(p => ({ ...p, type: type.value, maxWeightKg: String(type.maxW), maxVolumeM3: String(type.maxV) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const vehicle = await fleetService.addVehicle(getAgencyId(), {
        registrationNumber: form.registrationNumber,
        model: form.model,
        vehicleType: form.type as VehicleType,
        maxWeightKg: parseFloat(form.maxWeightKg),
        maxVolumeM3: parseFloat(form.maxVolumeM3),
        ...(form.branchId ? { branchId: form.branchId } : {}),
      })
      if (form.assignedDelivererId) {
        await fleetService.assignDeliverer(vehicle.id, form.assignedDelivererId)
      }
      setSubmitting(false); setSuccess(true)
      toastSuccess('Véhicule ajouté à la flotte.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); setForm(initialState); onClose() }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, "Erreur lors de l'ajout du véhicule."))
    }
  }

  const availableDeliverers = deliverers.filter(d =>
    !d.vehicleId && d.status !== 'SUSPENDED' && d.status !== 'INACTIVE'
  )

  return (
    <Drawer open={open} onClose={onClose} title="Ajouter un véhicule" description="Nouveau véhicule à la flotte de l'agence">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Type */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Type de véhicule <span className="text-orange-500">*</span></p>
            <div className="grid grid-cols-3 gap-2">
              {vehicleTypes.map(t => {
                const Icon = t.icon
                const selected = form.type === t.value
                return (
                  <button key={t.value} type="button" onClick={() => selectType(t)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-colors ${
                      selected ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                    <Icon size={18} className={selected ? 'text-orange-500' : 'text-gray-400'} />
                    <span className={`text-xs font-medium ${selected ? 'text-orange-700' : 'text-gray-600'}`}>{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Identité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Identification</p>
            <div>
              <label className={cls.label}>Immatriculation <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.registrationNumber}
                onChange={e => update('registrationNumber', e.target.value.toUpperCase())}
                placeholder="ex: LT-1234-A" className={`${cls.input} font-mono uppercase`} />
            </div>
            <div>
              <label className={cls.label}>Modèle / Marque <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.model} onChange={e => update('model', e.target.value)}
                placeholder="ex: Yamaha FZ25, Toyota HiAce" className={cls.input} />
            </div>
          </div>

          {/* Capacité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Capacité de charge</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Charge max (kg) <span className="text-orange-500">*</span></label>
                <input required type="number" min="1" value={form.maxWeightKg}
                  onChange={e => update('maxWeightKg', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Volume max (m³) <span className="text-orange-500">*</span></label>
                <input required type="number" min="0.01" step="0.01" value={form.maxVolumeM3}
                  onChange={e => update('maxVolumeM3', e.target.value)} className={cls.input} />
              </div>
            </div>
          </div>

          {/* Affectation */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Affectation</p>
            <div>
              <label className={cls.label}>Antenne <span className="text-orange-500">*</span></label>
              <select required value={form.branchId} onChange={e => update('branchId', e.target.value)} className={cls.select}>
                <option value="">Sélectionner une antenne</option>
                {branches.filter(b => b.status === 'OPEN').map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={cls.label}>Livreur assigné</label>
              <select value={form.assignedDelivererId} onChange={e => update('assignedDelivererId', e.target.value)} className={cls.select}>
                <option value="">Sans affectation (optionnel)</option>
                {availableDeliverers.map(d => (
                  <option key={d.id} value={d.id}>{d.fullName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Maintenance */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Entretien</p>
            <div>
              <label className={cls.label}>Date du dernier entretien</label>
              <input type="date" value={form.lastMaintenanceDate}
                onChange={e => update('lastMaintenanceDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]} className={cls.input} />
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
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Ajout...</>
              : success ? <><CheckCircle2 size={14} /> Ajouté !</>
              : 'Ajouter à la flotte'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
