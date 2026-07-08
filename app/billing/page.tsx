'use client'

import { useState } from 'react'
import {
  Receipt, Plus, CheckCircle2, Tag, Star, ChevronRight,
  Info, BookOpen, ChevronDown, ChevronUp, Zap, Percent, Box, MapPin, FileText, Loader2
} from 'lucide-react'
import { EMPTY_POLICIES, EMPTY_MISSIONS, EMPTY_COMMISSIONS } from '@/lib/emptyDefaults'
import type { PolicyStatus, CommissionStatus, Mission, CommissionRecord } from '@/lib/types'
import CreateBillingPolicyForm from '@/components/forms/CreateBillingPolicyForm'
import CreateCommissionForm from '@/components/forms/CreateCommissionForm'
import InvoiceDetailDrawer from '@/components/InvoiceDetailDrawer'
import CommissionDetailDrawer from '@/components/CommissionDetailDrawer'
import { billingService } from '@/lib/services/billingService'
import { policyMeta } from '@/lib/displayLabels'
import { useService } from '@/lib/hooks/useService'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import YowyobLaunchCard from '@/components/integrations/YowyobLaunchCard'

function PolicyStatusBadge({ status }: { status: PolicyStatus }) {
  const map = {
    ACTIVE:   'bg-emerald-50 text-emerald-700',
    DRAFT:    'bg-gray-100 text-gray-600',
    INACTIVE: 'bg-orange-50 text-orange-700',
    ARCHIVED: 'bg-gray-100 text-gray-400',
  }
  const labels = { ACTIVE: 'Active', DRAFT: 'Brouillon', INACTIVE: 'Inactive', ARCHIVED: 'Archivée' }
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

function CommissionStatusBadge({ status }: { status: CommissionStatus }) {
  const map = { CALCULATED: 'bg-gray-100 text-gray-600', VALIDATED: 'bg-blue-50 text-blue-700', PAID: 'bg-emerald-50 text-emerald-700', DISPUTED: 'bg-orange-50 text-orange-700' }
  const labels = { CALCULATED: 'Calculée', VALIDATED: 'Validée', PAID: 'Payée', DISPUTED: 'Litige' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

function BillingGuide() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-blue-100/50 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <BookOpen size={15} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-900">Guide de la tarification</p>
          <p className="text-xs text-blue-600 mt-0.5">Comment fonctionne le calcul du prix de vos livraisons ?</p>
        </div>
        {open ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} className="text-blue-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-blue-100">
          <p className="text-sm text-blue-800 mt-4 leading-relaxed">
            Chaque livraison est facturée selon une <strong>politique tarifaire</strong> active. Le prix final est calculé automatiquement
            en combinant plusieurs composantes.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Tag,
                title: 'Prix de base',
                desc: 'Montant fixe appliqué à toute livraison, quelle que soit la distance ou le poids. Couvre les frais fixes de traitement.',
                example: 'Ex : 1 500 XAF par mission',
              },
              {
                icon: MapPin,
                title: 'Tarif kilométrique',
                desc: 'Coût additionnel calculé selon la distance réelle entre le point d\'enlèvement et de livraison.',
                example: 'Ex : 150 XAF / km',
              },
              {
                icon: Box,
                title: 'Tarif au poids',
                desc: 'Supplément basé sur le poids total des colis. S\'applique à partir d\'un certain seuil défini par vos règles.',
                example: 'Ex : 200 XAF / kg',
              },
              {
                icon: Zap,
                title: 'Surcharges & règles',
                desc: 'Des règles supplémentaires peuvent s\'appliquer : livraison urgente, heure de nuit, zone difficile d\'accès, etc.',
                example: 'Ex : +50% pour urgence',
              },
              {
                icon: Percent,
                title: 'Promotions',
                desc: 'Des codes promo ou réductions automatiques peuvent être attachés à une politique pour certains clients ou volumes.',
                example: 'Ex : -10% client fidèle',
              },
              {
                icon: Receipt,
                title: 'Commission livreur',
                desc: 'Le livreur reçoit un pourcentage du prix de vente final, défini dans son contrat ou son accord de commission.',
                example: 'Ex : 10% du prix de vente',
              },
            ].map(({ icon: Icon, title, desc, example }) => (
              <div key={title} className="bg-white rounded-lg p-3.5 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center">
                    <Icon size={14} className="text-blue-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                <p className="text-xs text-blue-600 font-medium mt-2">{example}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Formule de calcul simplifiée :</p>
            <div className="bg-gray-50 rounded px-4 py-3 font-mono text-sm text-gray-800">
              Prix = Base + (km × Tarif/km) + (kg × Tarif/kg) + Surcharges − Promotions
            </div>
            <p className="text-xs text-gray-400 mt-2">
              La politique tarifaire <strong>par défaut</strong> (marquée ⭐) est automatiquement appliquée aux nouvelles missions
              si aucune politique spécifique n&apos;est sélectionnée.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

type Tab = 'policies' | 'invoices' | 'commissions'

export default function BillingPage() {
  const { data: policies, refetch: refetchPolicies } = useService(() => billingService.getPolicies(), EMPTY_POLICIES)
  const { data: invoicedMissions } = useService(() => billingService.getInvoicedMissions(), EMPTY_MISSIONS)
  const { data: commissions, refetch: refetchCommissions } = useService(() => billingService.getCommissions(), EMPTY_COMMISSIONS)
  const [activeTab, setActiveTab] = useState<Tab>('policies')
  const [policyFormOpen, setPolicyFormOpen] = useState(false)
  const [commissionFormOpen, setCommissionFormOpen] = useState(false)

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [invoiceDetailOpen, setInvoiceDetailOpen] = useState(false)
  const [selectedCommission, setSelectedCommission] = useState<CommissionRecord | null>(null)
  const [commissionDetailOpen, setCommissionDetailOpen] = useState(false)
  const [generatingInvoice, setGeneratingInvoice] = useState<string | null>(null)

  const { success: toastSuccess, error: toastError } = useToast()

  const handleGenerateInvoice = async (e: React.MouseEvent, missionId: string) => {
    e.stopPropagation()
    setGeneratingInvoice(missionId)
    try {
      await billingService.generateInvoice(missionId)
      toastSuccess('Facture générée avec succès.')
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de générer la facture pour cette mission.'))
    } finally {
      setGeneratingInvoice(null)
    }
  }

  const handleActivatePolicy = async (e: React.MouseEvent, policyId: string) => {
    e.stopPropagation()
    try {
      await billingService.activatePolicy(policyId)
      toastSuccess('Politique activée.')
      refetchPolicies()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Activation impossible.'))
    }
  }

  const handleArchivePolicy = async (e: React.MouseEvent, policyId: string) => {
    e.stopPropagation()
    try {
      await billingService.archivePolicy(policyId)
      toastSuccess('Politique archivée.')
      refetchPolicies()
    } catch (err) {
      toastError(toastErrorMessage(err, 'Archivage impossible.'))
    }
  }

  const deliveredMissions = invoicedMissions
  const totalRevenue = deliveredMissions.reduce((s, m) => s + m.sellingPrice, 0)
  const totalCommissionsPaid = commissions.filter(c => c.status === 'PAID').reduce((s, c) => s + c.amount, 0)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'policies', label: 'Politiques tarifaires' },
    { id: 'invoices', label: 'Factures & Revenus' },
    { id: 'commissions', label: 'Commissions' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Facturation</h1>
          <p className="text-sm text-gray-500 mt-0.5">Tarification, factures et commissions</p>
        </div>
        <button
          onClick={() => setPolicyFormOpen(true)}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Nouvelle politique
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <YowyobLaunchCard
          app="BILLING"
          title="Facturation avancée (KSM)"
          description="Factures clients, proforma, fournisseurs et documents commerciaux ERP."
          accent="violet"
        />
        <YowyobLaunchCard
          app="ACCOUNTING"
          title="Comptabilité (KSM)"
          description="Plan comptable OHADA, écritures, clôtures et reporting financier."
          accent="blue"
        />
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Revenus du mois</p>
          <p className="text-2xl font-bold text-gray-900">{(totalRevenue / 1000).toFixed(0)}k XAF</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 size={11} />
            {deliveredMissions.length} livraisons facturées
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Commissions versées</p>
          <p className="text-2xl font-bold text-gray-900">{totalCommissionsPaid.toLocaleString('fr-FR')} XAF</p>
          <p className="text-xs text-gray-400 mt-1">{commissions.filter(c => c.status === 'PAID').length} enregistrements payés</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Politiques actives</p>
          <p className="text-2xl font-bold text-gray-900">{policies.filter(p => p.status === 'ACTIVE').length}</p>
          <p className="text-xs text-gray-400 mt-1">{policies.length} politiques au total</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Policies */}
      {activeTab === 'policies' && (
        <div className="space-y-4">
          <BillingGuide />

          {policies.map(policy => (
            <div
              key={policy.id}
              className={`bg-white border rounded-xl p-5 cursor-pointer hover:border-gray-300 transition-colors group ${
                policy.status === 'ARCHIVED' ? 'opacity-60' : ''
              } ${policy.isDefault ? 'border-orange-200' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    policy.isDefault ? 'bg-orange-50' : 'bg-gray-50'
                  }`}>
                    <Tag size={18} className={policy.isDefault ? 'text-orange-500' : 'text-gray-400'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{policy.name}</h3>
                      {policy.isDefault && (
                        <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded uppercase tracking-wide flex items-center gap-1">
                          <Star size={9} />
                          Défaut
                        </span>
                      )}
                    </div>
                    {policy.description && (
                      <p className="text-xs text-gray-500 mt-0.5 max-w-xl">{policy.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PolicyStatusBadge status={policy.status} />
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Prix de base</p>
                  <p className="text-sm font-semibold text-gray-900">{policy.basePrice.toLocaleString('fr-FR')} {policy.currency}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Tarif / km</p>
                  <p className="text-sm font-semibold text-gray-900">{policy.perKmRate} {policy.currency}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Tarif / kg</p>
                  <p className="text-sm font-semibold text-gray-900">{policy.perKgRate} {policy.currency}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">Règles</p>
                    <p className="text-sm font-semibold text-gray-900">{policy.rulesCount}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">Promos</p>
                    <p className="text-sm font-semibold text-gray-900">{policy.promotionsCount}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {policyMeta(policy) && <span>{policyMeta(policy)}</span>}
                </div>
                <div className="flex items-center gap-2">
                  {policy.status !== 'ACTIVE' && policy.status !== 'ARCHIVED' && (
                    <button
                      type="button"
                      onClick={e => void handleActivatePolicy(e, policy.id)}
                      className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg"
                    >
                      Activer
                    </button>
                  )}
                  {policy.status !== 'ARCHIVED' && (
                    <button
                      type="button"
                      onClick={e => void handleArchivePolicy(e, policy.id)}
                      className="text-[11px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg"
                    >
                      Archiver
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoices / Revenue */}
      {activeTab === 'invoices' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Livraisons facturées</h2>
              <p className="text-xs text-gray-400 mt-0.5">Cliquer sur une ligne pour voir le détail de la facture</p>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Bordereau</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Livré le</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Colis</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">Montant</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {deliveredMissions.map(m => (
                <tr
                  key={m.id}
                  onClick={() => { setSelectedMission(m); setInvoiceDetailOpen(true) }}
                  className="table-row-hover cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-medium text-gray-900">{m.manifestNumber}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm text-gray-800">{m.recipientName}</p>
                      <p className="text-xs text-gray-400 truncate max-w-40">{m.senderName}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-gray-700">{m.delivererName ?? '—'}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500">
                      {m.actualDeliveryAt
                        ? new Date(m.actualDeliveryAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
                        : '—'
                      }
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-gray-700">{m.packagesCount}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {m.sellingPrice.toLocaleString('fr-FR')}
                      <span className="text-xs font-normal text-gray-400 ml-1">{m.currency}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={e => handleGenerateInvoice(e, m.id)}
                      disabled={generatingInvoice === m.id}
                      title="Générer la facture"
                      className="p-1.5 rounded-md text-gray-400 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-50 transition-colors"
                    >
                      {generatingInvoice === m.id
                        ? <Loader2 size={14} className="animate-spin" />
                        : <FileText size={14} />
                      }
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-orange-50 border-t-2 border-orange-200">
                <td colSpan={5} className="px-5 py-3 text-sm font-semibold text-orange-800">Total</td>
                <td className="px-5 py-3 text-right text-sm font-bold text-orange-900">
                  {totalRevenue.toLocaleString('fr-FR')} XAF
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Commissions */}
      {activeTab === 'commissions' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">Cliquer sur une commission pour voir les détails et actions</p>
            <button
              type="button"
              onClick={() => setCommissionFormOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={13} />
              Nouvelle commission
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Mission</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Calculée le</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Payée le</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {commissions.map(c => (
                <tr
                  key={c.id}
                  onClick={() => { setSelectedCommission(c); setCommissionDetailOpen(true) }}
                  className="table-row-hover cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{c.delivererName}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs font-mono text-gray-500">{c.manifestNumber}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-gray-900">{c.amount.toLocaleString('fr-FR')} {c.currency}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500">
                      {new Date(c.calculatedAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500">
                      {c.paidAt ? new Date(c.paidAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : <span className="text-gray-300">—</span>}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <CommissionStatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateBillingPolicyForm open={policyFormOpen} onClose={() => setPolicyFormOpen(false)} />
      <CreateCommissionForm
        open={commissionFormOpen}
        onClose={() => setCommissionFormOpen(false)}
        onSuccess={() => void refetchCommissions()}
      />
      <InvoiceDetailDrawer mission={selectedMission} open={invoiceDetailOpen} onClose={() => setInvoiceDetailOpen(false)} />
      <CommissionDetailDrawer commission={selectedCommission} open={commissionDetailOpen} onClose={() => setCommissionDetailOpen(false)} />
    </div>
  )
}
