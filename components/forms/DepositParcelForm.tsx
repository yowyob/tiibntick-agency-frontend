'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, Search, ExternalLink } from 'lucide-react'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { hubService } from '@/lib/services/hubService'
import type { Mission } from '@/lib/types'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
  section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
}

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

const initialState = {
  hubId: '', manifestNumber: '', trackingCode: '',
  recipientName: '', identityVerified: false, notes: '',
}

export default function DepositParcelForm({ open, onClose, onSuccess }: Props) {
  const { missions, hubs } = useAgencyLookups()
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [depositedCode, setDepositedCode] = useState('')
  const [missionSearch, setMissionSearch] = useState('')
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const filteredMissions = missions.filter(m =>
    (m.status === 'IN_TRANSIT' || m.status === 'ASSIGNED') &&
    (missionSearch === '' || m.manifestNumber.toLowerCase().includes(missionSearch.toLowerCase()) || m.recipientName.toLowerCase().includes(missionSearch.toLowerCase()))
  )

  const selectMission = (m: Mission) => {
    update('manifestNumber', m.manifestNumber)
    update('recipientName', m.recipientName)
    setMissionSearch(m.manifestNumber)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const selectedMission = missions.find(m => m.manifestNumber === form.manifestNumber)
      const record = await hubService.depositParcel(form.hubId, {
        missionId: selectedMission?.id ?? form.manifestNumber,
        packageId: form.manifestNumber,
        trackingCode: form.trackingCode || form.manifestNumber,
        recipientName: form.recipientName,
      })
      setDepositedCode(record.trackingCode)
      setSubmitting(false); setSuccess(true)
      toastSuccess('Colis déposé au hub avec succès.')
      onSuccess?.()
      setTimeout(() => {
        setSuccess(false)
        setDepositedCode('')
        setForm(initialState)
        setMissionSearch('')
        onClose()
      }, 4000)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, 'Erreur lors de l\'enregistrement du dépôt.'))
    }
  }

  const openHubs = hubs.filter(h => h.status === 'OPEN')

  return (
    <Drawer open={open} onClose={onClose} title="Enregistrer un dépôt de colis" description="Déposer un colis au hub relais agence (UC-58)">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Hub */}
          <div className={cls.section}>
            <p className="text-sm font-semibold text-gray-800 mb-3">Hub de dépôt</p>
            <div>
              <label className={cls.label}>Hub relais <span className="text-orange-500">*</span></label>
              <select required value={form.hubId} onChange={e => update('hubId', e.target.value)} className={cls.select}>
                <option value="">Sélectionner un hub</option>
                {openHubs.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.name} — {h.currentOccupancy}/{h.capacity} colis
                  </option>
                ))}
              </select>
              {form.hubId && (() => {
                const hub = hubs.find(h => h.id === form.hubId)
                if (!hub) return null
                const pct = Math.round((hub.currentOccupancy / hub.capacity) * 100)
                return (
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? '#ef4444' : '#f97316' }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{pct}% occupé · Rétention max : {hub.maxRetentionDays} jours</p>
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Mission */}
          <div className={cls.section}>
            <p className="text-sm font-semibold text-gray-800 mb-3">Mission liée</p>
            <div>
              <label className={cls.label}>Rechercher par bordereau ou destinataire</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={missionSearch}
                  onChange={e => setMissionSearch(e.target.value)}
                  placeholder="MAN-2026-... ou nom du destinataire"
                  className={`${cls.input} pl-9`}
                />
              </div>
              {missionSearch.length > 2 && (
                <div className="mt-1 border border-gray-200 rounded-lg overflow-hidden">
                  {filteredMissions.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-400 text-center">Aucune mission en transit trouvée</p>
                  ) : (
                    filteredMissions.map(m => (
                      <button key={m.id} type="button" onClick={() => selectMission(m)}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0 text-left">
                        <div>
                          <p className="text-sm font-medium text-gray-900 font-mono">{m.manifestNumber}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{m.recipientName} · {m.recipientPhone}</p>
                          <p className="text-xs text-gray-400 truncate max-w-64">{m.deliveryAddress}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {form.manifestNumber && (
              <div>
                <label className={cls.label}>Bordereau</label>
                <input type="text" value={form.manifestNumber} readOnly
                  className={`${cls.input} bg-gray-50 font-mono`} />
              </div>
            )}
          </div>

          {/* Destinataire & Vérification */}
          <div className={cls.section}>
            <p className="text-sm font-semibold text-gray-800 mb-3">Destinataire & Identité</p>
            <div>
              <label className={cls.label}>Nom du destinataire <span className="text-orange-500">*</span></label>
              <input required type="text" value={form.recipientName}
                onChange={e => update('recipientName', e.target.value)}
                placeholder="ex: Patrice Nzié" className={cls.input} />
            </div>

            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => update('identityVerified', !form.identityVerified)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${form.identityVerified ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                {form.identityVerified && <CheckCircle2 size={13} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Identité vérifiée</p>
                <p className="text-xs text-gray-500">CNI / Passeport / Permis présenté et validé</p>
              </div>
            </div>

            <div>
              <label className={cls.label}>Notes de dépôt</label>
              <input type="text" value={form.notes} onChange={e => update('notes', e.target.value)}
                placeholder="ex: Colis fragile, état de l'emballage vérifié" className={cls.input} />
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
            <p className="text-xs text-orange-700">
              Un code QR de retrait sera généré automatiquement et envoyé au destinataire par SMS. La transaction sera enregistrée sur TiiBnTick Trust (blockchain).
            </p>
          </div>

        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 bg-white">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={submitting || success}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-36 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`}>
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Enregistrement...</>
              : success ? <><CheckCircle2 size={14} /> Déposé !</>
              : 'Confirmer le dépôt'}
          </button>
          {success && depositedCode && (
            <Link
              href={`/track?code=${encodeURIComponent(depositedCode)}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              <ExternalLink size={13} />
              Voir le suivi client ({depositedCode})
            </Link>
          )}
        </div>
      </form>
    </Drawer>
  )
}
