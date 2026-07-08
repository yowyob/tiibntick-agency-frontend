'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Loader2, UserPlus, Info } from 'lucide-react'
import Drawer from './Drawer'
import { staffService } from '@/lib/services/staffService'
import { getAgencyId } from '@/lib/session'
import { toApiCommissionRate } from '@/lib/api/mappers'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'

const cls = {
  input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
  section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-3',
}

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

const initialState = {
  freelancerName: '',
  freelancerActorId: '',
  phone: '',
  email: '',
  commissionRate: '10',
}

export default function CreateFreelancerForm({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState<'search' | 'manual'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<{ id: string; name: string; snippet: string }>>([])
  const [searching, setSearching] = useState(false)
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  useEffect(() => {
    if (searchQuery.length <= 2) {
      setSearchResults([])
      return
    }
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setSearching(true)
      void staffService.searchFreelancerCandidates(searchQuery)
        .then(setSearchResults)
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false))
    }, 350)
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current) }
  }, [searchQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.freelancerActorId) {
      toastError('Sélectionnez un freelancer via la recherche TiiBnTick.')
      return
    }
    setSubmitting(true)
    try {
      await staffService.associateFreelancer(getAgencyId(), {
        freelancerActorId: form.freelancerActorId,
        commissionRate: toApiCommissionRate(parseFloat(form.commissionRate)),
        startDate: new Date().toISOString().split('T')[0],
      })
      setSubmitting(false); setSuccess(true)
      toastSuccess('Invitation envoyée au freelancer.')
      onSuccess?.()
      setTimeout(() => { setSuccess(false); setForm(initialState); setSearchQuery(''); onClose() }, 1200)
    } catch (err) {
      setSubmitting(false)
      toastError(toastErrorMessage(err, "Erreur lors de l'association du freelancer."))
    }
  }

  const selectCandidate = (c: { id: string; name: string; snippet: string }) => {
    setForm(p => ({
      ...p,
      freelancerName: c.name,
      freelancerActorId: c.id,
      phone: c.snippet.match(/\+?\d[\d\s-]{8,}/)?.[0]?.trim() ?? p.phone,
    }))
    setMode('manual')
  }

  const commissionPct = parseInt(form.commissionRate) || 0

  return (
    <Drawer open={open} onClose={onClose} title="Associer un freelancer" description="Associer un freelancer TiiBnTick pour renforts en pic de charge">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button type="button" onClick={() => setMode('search')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'search' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              Rechercher sur TiiBnTick
            </button>
            <button type="button" onClick={() => setMode('manual')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'manual' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              Confirmer l&apos;association
            </button>
          </div>

          {mode === 'search' ? (
            <div className={cls.section}>
              <p className={cls.sectionTitle}>Recherche sur TiiBnTick Freelancer</p>
              <div>
                <label className={cls.label}>Nom ou numéro de téléphone</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un freelancer enregistré..."
                  className={cls.input}
                />
              </div>
              {searchQuery.length > 2 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {searching ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                      <Loader2 size={14} className="animate-spin" /> Recherche…
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-400">Aucun freelancer trouvé</p>
                    </div>
                  ) : (
                    searchResults.map(c => (
                      <button key={c.id} type="button"
                        onClick={() => selectCandidate(c)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-0 text-left">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-gray-600">
                            {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-500 truncate">{c.snippet}</p>
                        </div>
                        <UserPlus size={15} className="text-orange-400 flex-shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <Info size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">La recherche interroge le module TiiBnTick Freelancer via l&apos;API globale de l&apos;agence.</p>
              </div>
            </div>
          ) : (
            <div className={cls.section}>
              <p className={cls.sectionTitle}>Freelancer sélectionné</p>
              {form.freelancerActorId ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-emerald-900">{form.freelancerName}</p>
                  {form.phone && <p className="text-xs text-emerald-700 mt-0.5">{form.phone}</p>}
                  <p className="text-[10px] text-emerald-600 font-mono mt-1">{form.freelancerActorId}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Aucun freelancer sélectionné — utilisez la recherche.</p>
              )}
              <button type="button" onClick={() => setMode('search')}
                className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                ← Retour à la recherche
              </button>
            </div>
          )}

          <div className={cls.section}>
            <p className={cls.sectionTitle}>Commission</p>
            <div>
              <label className={cls.label}>Taux de commission (%) <span className="text-orange-500">*</span></label>
              <div className="flex items-center gap-3">
                <input required type="range" min="5" max="30" step="0.5"
                  value={form.commissionRate}
                  onChange={e => update('commissionRate', e.target.value)}
                  className="flex-1 accent-orange-500" />
                <div className="w-16 h-10 border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-orange-600">{commissionPct}%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Recommandé : 8% – 15%. Commission appliquée sur chaque livraison effectuée.</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
            <p className="text-xs text-orange-700">L&apos;association débutera en statut <strong>EN ATTENTE</strong> jusqu&apos;à confirmation du freelancer dans son application TiiBnTick.</p>
          </div>

        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={submitting || success || !form.freelancerActorId}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-36 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`}>
            {submitting ? <><Loader2 size={14} className="animate-spin" /> Association...</>
              : success ? <><CheckCircle2 size={14} /> Associé !</>
              : 'Envoyer la demande'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
