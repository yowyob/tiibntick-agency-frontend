'use client'

import { useState, useEffect } from 'react'
import { User, Calendar, DollarSign, FileText, CheckCircle2, XCircle, Clock, Briefcase, Loader2 } from 'lucide-react'
import Drawer from '@/components/forms/Drawer'
import UploadableAvatar from '@/components/UploadableAvatar'
import UploadZone from '@/components/UploadZone'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { staffService } from '@/lib/services/staffService'
import { toApiCommissionRate } from '@/lib/api/mappers'
import { contractTitle } from '@/lib/displayLabels'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { Contract } from '@/lib/types'

interface Props {
  contract: Contract | null
  open: boolean
  onClose: () => void
  onAction?: () => void
}

function Row({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium text-right ${highlight ? 'text-orange-600 font-bold' : 'text-gray-900'}`}>{value}</span>
    </div>
  )
}

const CONTRACT_TYPE_LABELS: Record<string, string> = {
  PERMANENT_EMPLOYEE: 'Employé Permanent (CDI)',
  PART_TIME_EMPLOYEE: 'Employé Temps Partiel',
  FREELANCER_AGREEMENT: 'Convention Prestation Freelance',
  INTERNSHIP: 'Stage / Apprentissage',
}

const REMUN_LABELS: Record<string, string> = {
  MONTHLY_SALARY: 'Salaire mensuel fixe',
  FIXED_PER_DELIVERY: 'Rémunération fixe par livraison',
  PERCENTAGE_PER_DELIVERY: 'Pourcentage par livraison',
  MIXED_SALARY_BONUS: 'Salaire fixe + Prime de performance',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  ACTIVE: { label: 'Contrat actif', color: 'text-emerald-700 bg-emerald-50', icon: CheckCircle2 },
  SIGNED: { label: 'Signé, en attente', color: 'text-blue-700 bg-blue-50', icon: FileText },
  DRAFT: { label: 'Brouillon', color: 'text-gray-600 bg-gray-100', icon: Clock },
  TERMINATED: { label: 'Résilié', color: 'text-red-700 bg-red-50', icon: XCircle },
  EXPIRED: { label: 'Expiré', color: 'text-gray-500 bg-gray-100', icon: XCircle },
}

export default function ContractDetailDrawer({ contract, open, onClose, onAction }: Props) {
  const { deliverers } = useAgencyLookups()
  const [acting, setActing] = useState<string | null>(null)
  const [renewEndDate, setRenewEndDate] = useState('')
  const [editingRemuneration, setEditingRemuneration] = useState(false)
  const [remunerationValue, setRemunerationValue] = useState('')
  const { success: toastSuccess, error: toastError } = useToast()

  useEffect(() => {
    if (!contract) return
    setEditingRemuneration(false)
    setRemunerationValue(String(contract.rate))
    if (contract.endDate) {
      const d = new Date(contract.endDate)
      d.setFullYear(d.getFullYear() + 1)
      setRenewEndDate(d.toISOString().slice(0, 10))
    } else {
      const d = new Date()
      d.setFullYear(d.getFullYear() + 1)
      setRenewEndDate(d.toISOString().slice(0, 10))
    }
  }, [contract?.id, contract?.endDate])

  if (!contract) return null

  const statusCfg = STATUS_CONFIG[contract.status]
  const StatusIcon = statusCfg.icon

  const isActive = contract.status === 'ACTIVE'

  const act = async (key: string, fn: () => Promise<void>, errorMsg: string) => {
    setActing(key)
    try {
      await fn()
      toastSuccess('Modification enregistrée.')
      onAction?.()
      onClose()
    } catch (err) {
      toastError(toastErrorMessage(err, errorMsg))
    } finally {
      setActing(null)
    }
  }
  const duration = contract.endDate
    ? (() => {
        const start = new Date(contract.startDate)
        const end = new Date(contract.endDate)
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        return `${months} mois`
      })()
    : 'Indéterminée'

  const rateLabel = contract.remunerationType === 'MONTHLY_SALARY'
    ? `${contract.rate.toLocaleString('fr-FR')} ${contract.currency} / mois`
    : contract.remunerationType === 'FIXED_PER_DELIVERY'
    ? `${contract.rate.toLocaleString('fr-FR')} ${contract.currency} / livraison`
    : `${contract.rate} % par livraison`

  const isPercentage = contract.remunerationType === 'PERCENTAGE_PER_DELIVERY'

  const saveRemuneration = async () => {
    const parsed = parseFloat(remunerationValue)
    if (Number.isNaN(parsed) || parsed < 0) {
      toastError('Montant ou pourcentage invalide.')
      return
    }
    setActing('remuneration')
    try {
      await staffService.updateRemuneration(contract.id, isPercentage
        ? { commissionRate: toApiCommissionRate(parsed) }
        : { baseSalary: parsed },
      )
      toastSuccess('Rémunération mise à jour.')
      setEditingRemuneration(false)
      onAction?.()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de mettre à jour la rémunération.'))
    } finally {
      setActing(null)
    }
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={contractTitle(contract)}
      description={`${contract.delivererName} · ${CONTRACT_TYPE_LABELS[contract.type] ?? contract.type}`}
      footer={isActive ? (
        <div className="space-y-3">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nouvelle date de fin</label>
              <input
                type="date"
                value={renewEndDate}
                onChange={e => setRenewEndDate(e.target.value)}
                className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg"
              />
            </div>
            <button
              onClick={() => act(
                'renew',
                () => staffService.renewContract(contract.id, { endDate: renewEndDate }),
                'Impossible de renouveler ce contrat.',
              )}
              disabled={!!acting || !renewEndDate}
              className="h-9 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium rounded-lg flex items-center gap-2"
            >
              {acting === 'renew' && <Loader2 size={13} className="animate-spin" />}
              Renouveler
            </button>
          </div>
          <div className="flex gap-3">
          <button
            type="button"
            disabled={!!acting}
            onClick={() => setEditingRemuneration(v => !v)}
            className="flex-1 h-9 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors"
          >
            {editingRemuneration ? 'Annuler' : 'Modifier rémunération'}
          </button>
          <button
            onClick={() => act(
              'terminate',
              () => staffService.terminateContract(contract.delivererId),
              'Impossible de résilier ce contrat.',
            )}
            disabled={!!acting}
            className="flex-1 h-9 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
          >
            {acting === 'terminate' && <Loader2 size={13} className="animate-spin" />}
            Résilier
          </button>
          </div>
        </div>
      ) : undefined}
    >
      <div>
        {/* Status */}
        <div className={`px-6 py-3 flex items-center gap-2 border-b border-gray-100 ${statusCfg.color}`}>
          <StatusIcon size={15} />
          <span className="text-sm font-medium">{statusCfg.label}</span>
        </div>

        <div className="p-6 space-y-6">
          {/* Parties */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Parties au contrat</h3>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Employeur</p>
                  <p className="text-sm font-semibold text-gray-900">Rapid Express Douala</p>
                  <p className="text-xs text-gray-400">Rapid Express SARL · AGN-001</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <UploadableAvatar
                  name={contract.delivererName}
                  photoUrl={deliverers.find(d => d.id === contract.delivererId)?.photoUrl}
                  size="md"
                />
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Employé</p>
                  <p className="text-sm font-semibold text-gray-900">{contract.delivererName}</p>
                  <p className="text-xs text-gray-400">
                    {CONTRACT_TYPE_LABELS[contract.type] ?? 'Employé'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Détails du contrat</h3>
            <div className="bg-white border border-gray-200 rounded-xl px-5">
              <Row label="Type de contrat" value={CONTRACT_TYPE_LABELS[contract.type] ?? contract.type} />
              <Row label="Type de rémunération" value={REMUN_LABELS[contract.remunerationType] ?? contract.remunerationType} />
              {editingRemuneration ? (
                <div className="py-3 border-b border-gray-100">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                    {isPercentage ? 'Nouveau pourcentage (%)' : 'Nouveau montant (XAF)'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      step={isPercentage ? '0.1' : '1'}
                      value={remunerationValue}
                      onChange={e => setRemunerationValue(e.target.value)}
                      className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      disabled={acting === 'remuneration'}
                      onClick={() => void saveRemuneration()}
                      className="h-9 px-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium rounded-lg flex items-center gap-1"
                    >
                      {acting === 'remuneration' && <Loader2 size={13} className="animate-spin" />}
                      Enregistrer
                    </button>
                  </div>
                </div>
              ) : (
                <Row label="Taux / Rémunération" value={rateLabel} highlight />
              )}
              <Row label="Date de début" value={new Date(contract.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <Row
                label="Date de fin"
                value={contract.endDate
                  ? new Date(contract.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                  : <span className="text-gray-400 italic">Indéterminée (CDI)</span>
                }
              />
              <Row label="Durée" value={duration} />
              <Row label="Devise" value={contract.currency} />
            </div>
          </div>

          {/* Document contractuel */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Document contractuel</h3>
            <UploadZone
              label=""
              hint="Contrat signé — PDF ou image scan"
              accept="image/*,.pdf"
              category="contract"
              entityId={contract.id}
            />
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Cycle de vie</h3>
            <div className="space-y-3">
              {[
                { label: 'Contrat créé', date: contract.startDate, done: true, icon: FileText },
                { label: 'Contrat signé', date: contract.startDate, done: contract.status !== 'DRAFT', icon: CheckCircle2 },
                { label: 'Contrat actif', date: contract.startDate, done: isActive, icon: User },
                ...(contract.status === 'TERMINATED' || contract.status === 'EXPIRED'
                  ? [{ label: 'Contrat clôturé', date: contract.endDate ?? '', done: true, icon: XCircle }]
                  : []),
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                    <step.icon size={13} className={step.done ? 'text-emerald-600' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className={`text-sm font-medium ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                    {step.date && <p className="text-xs text-gray-400">{new Date(step.date).toLocaleDateString('fr-FR')}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Drawer>
  )
}
