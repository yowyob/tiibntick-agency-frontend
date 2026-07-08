'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Loader2, Package, MapPin, User, Truck, Receipt } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import type { MissionPriority } from '@/lib/types'
import { missionService } from '@/lib/services/missionService'
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

const initialState = {
  branchId: '',
  priority: 'NORMAL' as MissionPriority,
  senderName: '',
  recipientName: '',
  recipientPhone: '',
  pickupAddress: '',
  deliveryAddress: '',
  scheduledPickupAt: '',
  scheduledDeliveryAt: '',
  packagesCount: '1',
  totalWeightKg: '',
  distanceKm: '10',
  delivererId: '',
  vehicleId: '',
  targetHubId: '',
  deliveryMode: 'direct' as 'direct' | 'hub',
  specialInstructions: '',
}

const priorities: { value: MissionPriority; label: string; desc: string; color: string }[] = [
  { value: 'LOW', label: 'Basse', desc: 'Pas urgent', color: 'text-gray-500' },
  { value: 'NORMAL', label: 'Normale', desc: 'Standard', color: 'text-gray-700' },
  { value: 'HIGH', label: 'Haute', desc: 'Prioritaire', color: 'text-orange-600' },
  { value: 'URGENT', label: 'Urgent', desc: 'Express', color: 'text-red-600' },
]

export default function CreateMissionForm({ open, onClose, onSuccess }: Props) {
  const { branches, deliverers, vehicles, hubs } = useAgencyLookups()
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [priceEstimate, setPriceEstimate] = useState<{ amount: number; currency: string; policyName: string } | null>(null)
  const [estimating, setEstimating] = useState(false)
  const estimateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  useEffect(() => {
    const weight = parseFloat(form.totalWeightKg)
    const distance = parseFloat(form.distanceKm)
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(distance) || distance <= 0) {
      setPriceEstimate(null)
      return
    }
    if (estimateTimer.current) clearTimeout(estimateTimer.current)
    estimateTimer.current = setTimeout(() => {
      setEstimating(true)
      void billingService.estimatePrice(distance, weight)
        .then(setPriceEstimate)
        .catch(() => setPriceEstimate(null))
        .finally(() => setEstimating(false))
    }, 400)
    return () => { if (estimateTimer.current) clearTimeout(estimateTimer.current) }
  }, [form.totalWeightKg, form.distanceKm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await missionService.createMission(getAgencyId(), {
        branchId: form.branchId,
        senderName: form.senderName,
        recipientName: form.recipientName,
        recipientPhone: form.recipientPhone,
        pickupAddress: form.pickupAddress,
        deliveryAddress: form.deliveryAddress,
        scheduledPickupAt: form.scheduledPickupAt,
        priority: form.priority,
        packagesCount: parseInt(form.packagesCount),
        totalWeightKg: parseFloat(form.totalWeightKg),
        distanceKm: parseFloat(form.distanceKm) || 10,
        ...(form.deliveryMode === 'hub' && form.targetHubId ? { targetHubId: form.targetHubId } : {}),
        ...(form.delivererId ? { delivererId: form.delivererId } : {}),
        ...(form.vehicleId ? { vehicleId: form.vehicleId } : {}),
      })
      setSubmitting(false); setSuccess(true)
      toastSuccess('Mission créée avec succès.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); setForm(initialState); onClose() }, 1400)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de la création de la mission.'))
    }
  }

  const availableDeliverers = deliverers.filter(d =>
    d.status === 'AVAILABLE' && (!form.branchId || d.branchId === form.branchId)
  )
  const availableVehicles = vehicles.filter(v =>
    v.status === 'AVAILABLE' && (!form.branchId || v.branchId === form.branchId)
  )
  const openHubs = hubs.filter(h => h.status === 'OPEN' || h.status === 'FULL')

  return (
    <Drawer open={open} onClose={onClose} title="Créer une mission" description="Nouveau bordereau de livraison" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Général */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Informations générales</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Antenne émettrice <span className="text-orange-500">*</span></label>
                <select required value={form.branchId} onChange={e => { update('branchId', e.target.value); update('delivererId', ''); update('vehicleId', '') }} className={cls.select}>
                  <option value="">Sélectionner une antenne</option>
                  {branches.filter(b => b.status === 'OPEN').map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={cls.label}>Mode de livraison</label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden h-10">
                  <button type="button" onClick={() => update('deliveryMode', 'direct')}
                    className={`flex-1 text-sm font-medium transition-colors ${form.deliveryMode === 'direct' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                    Livraison directe
                  </button>
                  <button type="button" onClick={() => update('deliveryMode', 'hub')}
                    className={`flex-1 text-sm font-medium transition-colors ${form.deliveryMode === 'hub' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                    Via hub relais
                  </button>
                </div>
              </div>
            </div>

            {/* Priority selector */}
            <div>
              <label className={cls.label}>Priorité <span className="text-orange-500">*</span></label>
              <div className="grid grid-cols-4 gap-2">
                {priorities.map(p => (
                  <button key={p.value} type="button" onClick={() => setForm(prev => ({ ...prev, priority: p.value }))}
                    className={`py-2.5 px-2 rounded-lg border text-center transition-all ${
                      form.priority === p.value
                        ? p.value === 'URGENT' ? 'border-red-400 bg-red-50'
                          : p.value === 'HIGH' ? 'border-orange-400 bg-orange-50'
                          : 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                    <p className={`text-xs font-semibold ${form.priority === p.value ? p.color : 'text-gray-600'}`}>{p.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Expéditeur */}
          <div className={cls.section}>
            <div className="flex items-center gap-2 mb-3">
              <User size={14} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-800">Expéditeur</p>
            </div>
            <div>
              <label className={cls.label}>Nom / Raison sociale <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.senderName} onChange={e => update('senderName', e.target.value)}
                placeholder="ex: CFAO Motors, Jean-Baptiste Nkeng..." className={cls.input} />
            </div>
          </div>

          {/* Destinataire */}
          <div className={cls.section}>
            <div className="flex items-center gap-2 mb-3">
              <User size={14} className="text-orange-400" />
              <p className="text-sm font-semibold text-gray-800">Destinataire</p>
            </div>
            <div>
              <label className={cls.label}>Nom complet <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.recipientName} onChange={e => update('recipientName', e.target.value)}
                placeholder="ex: Marie-Claire Mbida" className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Téléphone <span className="text-orange-500">*</span></label>
              <input required type="tel" value={form.recipientPhone} onChange={e => update('recipientPhone', e.target.value)}
                placeholder="+237 6XX XX XX XX" className={cls.input} />
            </div>
          </div>

          {/* Adresses */}
          <div className={cls.section}>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-800">Adresses</p>
            </div>
            <div>
              <label className={cls.label}>Adresse de collecte (enlèvement) <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.pickupAddress} onChange={e => update('pickupAddress', e.target.value)}
                placeholder="ex: Supermarché Jumbo, Rue Joss, Akwa" className={cls.input} />
            </div>
            <div>
              <label className={cls.label}>Adresse de livraison <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.deliveryAddress} onChange={e => update('deliveryAddress', e.target.value)}
                placeholder="ex: Résidence Les Palmiers, Bali" className={cls.input} />
            </div>
            {form.deliveryMode === 'hub' && (
              <div>
                <label className={cls.label}>Hub relais cible</label>
                <select value={form.targetHubId} onChange={e => update('targetHubId', e.target.value)} className={cls.select}>
                  <option value="">Sélectionner un hub (optionnel)</option>
                  {openHubs.map(h => (
                    <option key={h.id} value={h.id} disabled={h.status === 'FULL'}>
                      {h.name} — {h.currentOccupancy}/{h.capacity} {h.status === 'FULL' ? '(PLEIN)' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Le colis sera déposé au hub si le destinataire est absent.</p>
              </div>
            )}
          </div>

          {/* Horaires */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Planification</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Collecte prévue <span className="text-orange-500">*</span></label>
                <input required type="datetime-local" value={form.scheduledPickupAt}
                  onChange={e => update('scheduledPickupAt', e.target.value)}
                  min={new Date().toISOString().slice(0, 16)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Livraison prévue</label>
                <input type="datetime-local" value={form.scheduledDeliveryAt}
                  onChange={e => update('scheduledDeliveryAt', e.target.value)}
                  min={form.scheduledPickupAt} className={cls.input} />
              </div>
            </div>
          </div>

          {/* Colis */}
          <div className={cls.section}>
            <div className="flex items-center gap-2 mb-3">
              <Package size={14} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-800">Colis</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Nombre de colis <span className="text-orange-500">*</span></label>
                <input required type="number" min="1" max="100" value={form.packagesCount}
                  onChange={e => update('packagesCount', e.target.value)} className={cls.input} />
              </div>
              <div>
                <label className={cls.label}>Poids total (kg) <span className="text-orange-500">*</span></label>
                <input required type="number" min="0.1" step="0.1" value={form.totalWeightKg}
                  onChange={e => update('totalWeightKg', e.target.value)}
                  placeholder="ex: 4.5" className={cls.input} />
              </div>
            </div>
            <div>
              <label className={cls.label}>Distance estimée (km)</label>
              <input type="number" min="0.5" step="0.5" value={form.distanceKm}
                onChange={e => update('distanceKm', e.target.value)} className={cls.input} />
            </div>
            {(priceEstimate || estimating) && (
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 flex items-start gap-3">
                <Receipt size={18} className="text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-violet-800 uppercase tracking-wide">Estimation tarifaire</p>
                  {estimating ? (
                    <p className="text-sm text-violet-600 mt-1 flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" /> Calcul en cours…
                    </p>
                  ) : priceEstimate && (
                    <>
                      <p className="text-lg font-bold text-violet-900 mt-1">
                        {priceEstimate.amount.toLocaleString('fr-FR')} {priceEstimate.currency}
                      </p>
                      <p className="text-xs text-violet-600">Politique : {priceEstimate.policyName}</p>
                    </>
                  )}
                </div>
              </div>
            )}
            <div>
              <label className={cls.label}>Instructions spéciales</label>
              <input type="text" value={form.specialInstructions} onChange={e => update('specialInstructions', e.target.value)}
                placeholder="ex: Fragile, tenir à l'abri de la chaleur, ne pas retourner..."
                className={cls.input} />
            </div>
          </div>

          {/* Assignation */}
          <div className={cls.section}>
            <div className="flex items-center gap-2 mb-1">
              <Truck size={14} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-800">Assignation</p>
              <span className="text-xs text-gray-400">(optionnel — peut être fait après)</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Livreur</label>
                <select value={form.delivererId} onChange={e => update('delivererId', e.target.value)} className={cls.select}>
                  <option value="">Auto-assignation ou plus tard</option>
                  {availableDeliverers.length === 0 ? (
                    <option disabled>Aucun livreur disponible dans cette antenne</option>
                  ) : (
                    availableDeliverers.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.fullName} · ★ {d.rating.toFixed(1)}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label className={cls.label}>Véhicule</label>
                <select value={form.vehicleId} onChange={e => update('vehicleId', e.target.value)} className={cls.select}>
                  <option value="">Sélection automatique</option>
                  {availableVehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.registrationNumber} — {v.model} ({v.maxWeightKg}kg)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {form.branchId === '' && (
              <p className="text-xs text-orange-600">Sélectionnez une antenne pour filtrer les livreurs et véhicules disponibles.</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Un bordereau unique sera généré automatiquement (MAN-2026-XXXX)
            </p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button type="submit" disabled={submitting || success}
                className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-36 justify-center ${
                  success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'
                } disabled:opacity-70`}>
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Création...</>
                  : success ? <><CheckCircle2 size={14} /> Mission créée !</>
                  : 'Créer la mission'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Drawer>
  )
}
