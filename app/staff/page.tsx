'use client'

import { useState, useMemo } from 'react'
import {
  Users, Plus, Star, FileText, DollarSign, UserPlus, Search, Briefcase,
} from 'lucide-react'
import { EMPTY_STAFF, EMPTY_DELIVERERS, EMPTY_CONTRACTS, EMPTY_COMMISSIONS, EMPTY_FREELANCERS } from '@/lib/emptyDefaults'
import type { DelivererStatus, ContractStatus, CommissionStatus, AssociationStatus, Contract, CommissionRecord, FreelancerAssociation, StaffMember, StaffStatus } from '@/lib/types'
import { STAFF_ROLE_LABELS } from '@/lib/staff-utils'
import { staffService } from '@/lib/services/staffService'
import { contractRef } from '@/lib/displayLabels'
import { useService } from '@/lib/hooks/useService'
import CreateDelivererForm from '@/components/forms/CreateDelivererForm'
import CreateStaffMemberForm from '@/components/forms/CreateStaffMemberForm'
import CreateContractForm from '@/components/forms/CreateContractForm'
import CreateFreelancerForm from '@/components/forms/CreateFreelancerForm'
import ContractDetailDrawer from '@/components/ContractDetailDrawer'
import DelivererContractCell from '@/components/staff/DelivererContractCell'
import CommissionDetailDrawer from '@/components/CommissionDetailDrawer'
import FreelancerDetailDrawer from '@/components/FreelancerDetailDrawer'
import StaffMemberDetailDrawer from '@/components/StaffMemberDetailDrawer'
import Avatar from '@/components/Avatar'
import UploadableAvatar from '@/components/UploadableAvatar'
import { usePagination } from '@/lib/hooks/usePagination'
import Pagination from '@/components/ui/Pagination'
import LivreurAccessPanel from '@/components/LivreurAccessPanel'
import YowyobLaunchCard from '@/components/integrations/YowyobLaunchCard'

// ── Badges ─────────────────────────────────────────────────
function DelivererStatusDot({ status }: { status: DelivererStatus }) {
  const map = {
    AVAILABLE: { dot: 'bg-emerald-500', label: 'Disponible' },
    ON_MISSION: { dot: 'bg-blue-500', label: 'En mission' },
    OFFLINE: { dot: 'bg-gray-300', label: 'Hors ligne' },
    SUSPENDED: { dot: 'bg-red-500', label: 'Suspendu' },
    INACTIVE: { dot: 'bg-gray-200', label: 'Inactif' },
  }
  const cfg = map[status]
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
      <span className="text-xs text-gray-600">{cfg.label}</span>
    </div>
  )
}

function ContractStatusBadge({ status }: { status: ContractStatus }) {
  const map = {
    ACTIVE: 'bg-emerald-50 text-emerald-700',
    SIGNED: 'bg-blue-50 text-blue-700',
    DRAFT: 'bg-gray-100 text-gray-600',
    TERMINATED: 'bg-red-50 text-red-700',
    EXPIRED: 'bg-gray-100 text-gray-500',
  }
  const labels = { ACTIVE: 'Actif', SIGNED: 'Signé', DRAFT: 'Brouillon', TERMINATED: 'Résilié', EXPIRED: 'Expiré' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

function CommissionStatusBadge({ status }: { status: CommissionStatus }) {
  const map = {
    CALCULATED: 'bg-gray-100 text-gray-600',
    VALIDATED: 'bg-blue-50 text-blue-700',
    PAID: 'bg-emerald-50 text-emerald-700',
    DISPUTED: 'bg-orange-50 text-orange-700',
  }
  const labels = { CALCULATED: 'Calculée', VALIDATED: 'Validée', PAID: 'Payée', DISPUTED: 'Litige' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

function AssociationStatusBadge({ status }: { status: AssociationStatus }) {
  const map = {
    ACTIVE: 'bg-emerald-50 text-emerald-700',
    PENDING: 'bg-orange-50 text-orange-700',
    PAUSED: 'bg-yellow-50 text-yellow-700',
    TERMINATED: 'bg-gray-100 text-gray-500',
  }
  const labels = { ACTIVE: 'Active', PENDING: 'En attente', PAUSED: 'Pausée', TERMINATED: 'Terminée' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

function StaffStatusBadge({ status }: { status: StaffStatus }) {
  const map = {
    ACTIVE: 'bg-emerald-50 text-emerald-700',
    INACTIVE: 'bg-gray-100 text-gray-500',
    SUSPENDED: 'bg-red-50 text-red-700',
  }
  const labels = { ACTIVE: 'Actif', INACTIVE: 'Inactif', SUSPENDED: 'Suspendu' }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{labels[status]}</span>
}

type Tab = 'managers' | 'deliverers' | 'contracts' | 'commissions' | 'freelancers'

export default function StaffPage() {
  const { data: allStaffMembers, setData: setStaffMembers } = useService(() => staffService.getStaffMembers(), EMPTY_STAFF)
  const { data: allDeliverers } = useService(() => staffService.getDeliverers(), EMPTY_DELIVERERS)
  const { data: allContracts, refetch: refetchContracts }  = useService(() => staffService.getContracts(), EMPTY_CONTRACTS)
  const { data: allCommissions } = useService(() => staffService.getCommissions(), EMPTY_COMMISSIONS)
  const { data: allFreelancers } = useService(() => staffService.getFreelancers(), EMPTY_FREELANCERS)
  const [activeTab, setActiveTab] = useState<Tab>('managers')
  const [search, setSearch] = useState('')
  const [staffFormOpen, setStaffFormOpen] = useState(false)
  const [delivererFormOpen, setDelivererFormOpen] = useState(false)
  const [contractFormOpen, setContractFormOpen] = useState(false)
  const [freelancerFormOpen, setFreelancerFormOpen] = useState(false)

  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [contractDetailOpen, setContractDetailOpen] = useState(false)
  const [selectedCommission, setSelectedCommission] = useState<CommissionRecord | null>(null)
  const [commissionDetailOpen, setCommissionDetailOpen] = useState(false)
  const [selectedFreelancer, setSelectedFreelancer] = useState<FreelancerAssociation | null>(null)
  const [freelancerDetailOpen, setFreelancerDetailOpen] = useState(false)
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null)
  const [staffDetailOpen, setStaffDetailOpen] = useState(false)

  const q = search.toLowerCase()
  const filteredStaffMembers = allStaffMembers.filter(m =>
    !q || m.fullName.toLowerCase().includes(q) || m.phone.toLowerCase().includes(q) ||
    (m.email ?? '').toLowerCase().includes(q) || (m.branchName ?? '').toLowerCase().includes(q)
  )
  const filteredDeliverers = allDeliverers.filter(d =>
    !q || d.fullName.toLowerCase().includes(q) || d.phone.toLowerCase().includes(q) || (d.branchName ?? '').toLowerCase().includes(q)
  )
  const filteredContracts = allContracts.filter(c =>
    !q || c.delivererName.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)
  )
  const filteredCommissions = allCommissions.filter(c =>
    !q || c.delivererName.toLowerCase().includes(q) || c.manifestNumber.toLowerCase().includes(q)
  )
  const filteredFreelancers = allFreelancers.filter(f =>
    !q || f.freelancerName.toLowerCase().includes(q) || f.phone.toLowerCase().includes(q)
  )

  const staffPag  = usePagination(filteredStaffMembers, 8)
  const delivPag  = usePagination(filteredDeliverers, 8)
  const contPag   = usePagination(filteredContracts, 8)
  const commPag   = usePagination(filteredCommissions, 8)
  const freePag   = usePagination(filteredFreelancers, 8)

  const activeContractByDelivererId = useMemo(() => {
    const map = new Map<string, Contract>();
    for (const c of allContracts) {
      if (c.status === 'ACTIVE') map.set(c.delivererId, c);
    }
    return map;
  }, [allContracts]);

  function switchTab(tab: Tab) { setActiveTab(tab); setSearch('') }

  const tabs: { id: Tab; label: string; count: number; icon: React.ElementType }[] = [
    { id: 'managers', label: 'Managers & Admin', count: allStaffMembers.length, icon: Briefcase },
    { id: 'deliverers', label: 'Livreurs', count: allDeliverers.length, icon: Users },
    { id: 'contracts', label: 'Contrats', count: allContracts.length, icon: FileText },
    { id: 'commissions', label: 'Commissions', count: allCommissions.length, icon: DollarSign },
    { id: 'freelancers', label: 'Freelancers Associés', count: allFreelancers.length, icon: UserPlus },
  ]

  const refreshStaff = () => {
    staffService.getStaffMembers().then(updated => {
      setStaffMembers(updated)
      if (selectedStaffMember) {
        const fresh = updated.find(m => m.id === selectedStaffMember.id)
        if (fresh) setSelectedStaffMember(fresh)
      }
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Personnel</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {allStaffMembers.length} managers &amp; admin · {allDeliverers.length} livreurs · {allContracts.filter(c => c.status === 'ACTIVE').length} contrats actifs
          </p>
        </div>
        {activeTab === 'managers' && (
          <button onClick={() => setStaffFormOpen(true)} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Ajouter un membre
          </button>
        )}
        {activeTab === 'deliverers' && (
          <button onClick={() => setDelivererFormOpen(true)} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Enregistrer un livreur
          </button>
        )}
        {activeTab === 'contracts' && (
          <button onClick={() => setContractFormOpen(true)} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Nouveau contrat
          </button>
        )}
        {activeTab === 'freelancers' && (
          <button onClick={() => setFreelancerFormOpen(true)} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Associer un freelancer
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <YowyobLaunchCard
          app="HRM"
          title="Gestion du Personnel (YowYob HRM)"
          description="Paie CNPS, contrats de travail, congés, organigramme — vue complète RH."
          accent="emerald"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded text-xs ${
                activeTab === tab.id ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400 transition"
        />
      </div>

      {/* Tab content */}
      {activeTab === 'managers' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Personnel administratif</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Directeurs, responsables d&apos;antennes, comptables, dispatchers — distincts des livreurs
            </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Membre</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Fonction</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Antenne</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Depuis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staffPag.paginatedData.map(m => (
                <tr
                  key={m.id}
                  onClick={() => { setSelectedStaffMember(m); setStaffDetailOpen(true) }}
                  className="table-row-hover cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <UploadableAvatar name={m.fullName} photoUrl={m.photoUrl} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{m.fullName}</p>
                        <p className="text-xs text-gray-400">{m.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium text-gray-700">{STAFF_ROLE_LABELS[m.role]}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-gray-600">{m.branchName ?? '—'}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <StaffStatusBadge status={m.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-gray-500">{new Date(m.joinedAt).toLocaleDateString('fr-FR')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3">
            <Pagination page={staffPag.page} pageCount={staffPag.pageCount} total={staffPag.total} pageSize={staffPag.pageSize} onPage={staffPag.setPage} />
          </div>
        </div>
      )}

      {activeTab === 'deliverers' && <LivreurAccessPanel />}
      {activeTab === 'deliverers' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Antenne</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Contrat</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Missions</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Véhicule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {delivPag.paginatedData.map(d => (
                <tr key={d.id} className="table-row-hover cursor-pointer group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <UploadableAvatar name={d.fullName} photoUrl={d.photoUrl} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{d.fullName}</p>
                        <p className="text-xs text-gray-400">{d.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-600">
                      {d.type === 'PERMANENT' ? 'Permanent' : d.type === 'PART_TIME' ? 'Partiel' : 'Freelancer'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-gray-600">{d.branchName ?? '—'}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <DelivererStatusDot status={d.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <DelivererContractCell
                      contract={activeContractByDelivererId.get(d.id) ?? null}
                      onOpenContract={c => { setSelectedContract(c); setContractDetailOpen(true) }}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-orange-400 fill-orange-400" />
                      <span className="text-sm font-medium text-gray-700">{d.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-gray-700">{d.totalMissions}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {d.vehiclePlate ? (
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{d.vehiclePlate}</span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Aucun</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3">
            <Pagination page={delivPag.page} pageCount={delivPag.pageCount} total={delivPag.total} pageSize={delivPag.pageSize} onPage={delivPag.setPage} />
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Livreur</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Rémunération</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Taux</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Début</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Fin</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contPag.paginatedData.map(c => (
                <tr
                  key={c.id}
                  onClick={() => { setSelectedContract(c); setContractDetailOpen(true) }}
                  className="table-row-hover cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono text-gray-500">{contractRef(c)}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{c.delivererName}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-600">
                      {c.type === 'PERMANENT_EMPLOYEE' ? 'Employé Permanent' :
                       c.type === 'PART_TIME_EMPLOYEE' ? 'Temps Partiel' :
                       c.type === 'FREELANCER_AGREEMENT' ? 'Prestation' : 'Stage'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-600">
                      {c.remunerationType === 'MONTHLY_SALARY' ? 'Salaire mensuel' :
                       c.remunerationType === 'FIXED_PER_DELIVERY' ? 'Fixe/livraison' :
                       c.remunerationType === 'PERCENTAGE_PER_DELIVERY' ? '% par livraison' : 'Mixte + prime'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-gray-900">
                      {c.rate.toLocaleString('fr-FR')} {c.currency}
                      <span className="text-xs font-normal text-gray-400 ml-0.5">
                        {c.remunerationType === 'MONTHLY_SALARY' ? '/mois' : '/livr.'}
                      </span>
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-600">{new Date(c.startDate).toLocaleDateString('fr-FR')}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500">{c.endDate ? new Date(c.endDate).toLocaleDateString('fr-FR') : <span className="text-gray-300">Indéterminée</span>}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ContractStatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3">
            <Pagination page={contPag.page} pageCount={contPag.pageCount} total={contPag.total} pageSize={contPag.pageSize} onPage={contPag.setPage} />
          </div>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Registre des commissions</h2>
              <p className="text-xs text-gray-400 mt-0.5">{allCommissions.length} enregistrements · Cliquer pour détails</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Total versé :</span>
              <span className="text-sm font-semibold text-emerald-600">
                {allCommissions.filter(c => c.status === 'PAID').reduce((s, c) => s + c.amount, 0).toLocaleString('fr-FR')} XAF
              </span>
            </div>
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
              {commPag.paginatedData.map(c => (
                <tr
                  key={c.id}
                  onClick={() => { setSelectedCommission(c); setCommissionDetailOpen(true) }}
                  className="table-row-hover cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{c.delivererName}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs font-mono text-gray-600">{c.manifestNumber}</p>
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
          <div className="px-5 py-3">
            <Pagination page={commPag.page} pageCount={commPag.pageCount} total={commPag.total} pageSize={commPag.pageSize} onPage={commPag.setPage} />
          </div>
        </div>
      )}

      {activeTab === 'freelancers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Actifs', count: allFreelancers.filter(f => f.status === 'ACTIVE').length, color: 'text-emerald-600' },
              { label: 'En attente', count: allFreelancers.filter(f => f.status === 'PENDING').length, color: 'text-orange-600' },
              { label: 'Terminés', count: allFreelancers.filter(f => f.status === 'TERMINATED').length, color: 'text-gray-400' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Freelancer</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Commission</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Missions assignées</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Associé le</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {freePag.paginatedData.map(f => (
                  <tr
                    key={f.id}
                    onClick={() => { setSelectedFreelancer(f); setFreelancerDetailOpen(true) }}
                    className="table-row-hover cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <UploadableAvatar name={f.freelancerName} photoUrl={f.photoUrl} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{f.freelancerName}</p>
                          <p className="text-xs text-gray-400">{f.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-orange-600">{f.commissionRate}%</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-gray-700">{f.assignedMissionsCount}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500">{new Date(f.associatedAt).toLocaleDateString('fr-FR')}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <AssociationStatusBadge status={f.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3">
              <Pagination page={freePag.page} pageCount={freePag.pageCount} total={freePag.total} pageSize={freePag.pageSize} onPage={freePag.setPage} />
            </div>
          </div>
        </div>
      )}

      <CreateStaffMemberForm open={staffFormOpen} onClose={() => setStaffFormOpen(false)} onSuccess={refreshStaff} />
      <StaffMemberDetailDrawer
        member={selectedStaffMember}
        open={staffDetailOpen}
        onClose={() => setStaffDetailOpen(false)}
        onAction={refreshStaff}
      />
      <CreateDelivererForm open={delivererFormOpen} onClose={() => setDelivererFormOpen(false)} />
      <CreateContractForm
        open={contractFormOpen}
        onClose={() => setContractFormOpen(false)}
        onSuccess={refetchContracts}
        hasActiveContract={id => activeContractByDelivererId.has(id)}
      />
      <CreateFreelancerForm open={freelancerFormOpen} onClose={() => setFreelancerFormOpen(false)} />
      <ContractDetailDrawer contract={selectedContract} open={contractDetailOpen} onClose={() => setContractDetailOpen(false)} onAction={refetchContracts} />
      <CommissionDetailDrawer commission={selectedCommission} open={commissionDetailOpen} onClose={() => setCommissionDetailOpen(false)} />
      <FreelancerDetailDrawer freelancer={selectedFreelancer} open={freelancerDetailOpen} onClose={() => setFreelancerDetailOpen(false)} />
    </div>
  )
}
