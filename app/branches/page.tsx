'use client'

import { useState, useRef } from 'react'
import { GitBranch, Plus, MapPin, Clock, Users, Star, MoreHorizontal, Camera } from 'lucide-react'
import type { Branch, BranchStatus } from '@/lib/types'
import CreateBranchForm from '@/components/forms/CreateBranchForm'
import BranchDetailDrawer from '@/components/BranchDetailDrawer'
import { branchService } from '@/lib/services/branchService'
import { branchCardMeta } from '@/lib/displayLabels'
import { useService } from '@/lib/hooks/useService'
import { EMPTY_BRANCHES } from '@/lib/emptyDefaults'

function BranchStatusBadge({ status }: { status: BranchStatus }) {
  const map = {
    OPEN: 'bg-emerald-50 text-emerald-700',
    TEMPORARILY_CLOSED: 'bg-orange-50 text-orange-700',
    PERMANENTLY_CLOSED: 'bg-red-50 text-red-700',
  }
  const labels = {
    OPEN: 'Ouverte',
    TEMPORARILY_CLOSED: 'Fermée temporairement',
    PERMANENTLY_CLOSED: 'Fermée définitivement',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'OPEN' ? 'bg-emerald-500' : status === 'TEMPORARILY_CLOSED' ? 'bg-orange-500' : 'bg-red-500'}`} />
      {labels[status]}
    </span>
  )
}

function BranchCard({
  branch,
  photoUrl,
  onPhotoChange,
  onClick,
}: {
  branch: Branch
  photoUrl: string | undefined
  onPhotoChange: (id: string, url: string) => void
  onClick: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    onPhotoChange(branch.id, URL.createObjectURL(f))
  }

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 hover:shadow-sm transition-all cursor-pointer group"
    >
      {/* Cover photo */}
      <div className="relative h-32 bg-gradient-to-br from-orange-50 to-gray-100">
        {photoUrl ? (
          <img src={photoUrl} alt={branch.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <GitBranch size={28} className={branch.status === 'OPEN' ? 'text-orange-300' : 'text-gray-300'} />
            <span className="text-xs text-gray-400">Aucune photo</span>
          </div>
        )}
        {/* Upload overlay */}
        <div
          onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <Camera size={20} className="text-white" />
          <span className="text-xs text-white font-medium">
            {photoUrl ? 'Changer la photo' : 'Ajouter une photo'}
          </span>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {/* HQ badge */}
        {branch.isHeadquarters && (
          <div className="absolute top-2 left-2">
            <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
              Siège
            </span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <BranchStatusBadge status={branch.status} />
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{branch.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{branchCardMeta(branch)}</p>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onClick() }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
          >
            <MoreHorizontal size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={11} className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{branch.address}, {branch.city}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={11} className="text-gray-400 flex-shrink-0" />
            <span>{branch.openingHours}</span>
          </div>
          {branch.managerName && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Star size={11} className="text-gray-400 flex-shrink-0" />
              <span>Responsable : <span className="font-medium text-gray-700">{branch.managerName}</span></span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-gray-400" />
            <span className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{branch.deliverersCount}</span> livreur{branch.deliverersCount > 1 ? 's' : ''}
            </span>
          </div>
          <span className="text-xs text-gray-400">Créée le {new Date(branch.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  )
}

export default function BranchesPage() {
  const { data: branches, setData } = useService(() => branchService.getBranches(), EMPTY_BRANCHES)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})
  const openCount = branches.filter(b => b.status === 'OPEN').length

  const refreshBranches = () => {
    branchService.getBranches().then(updated => {
      setData(updated)
      if (selectedBranch) {
        const fresh = updated.find(b => b.id === selectedBranch.id)
        if (fresh) setSelectedBranch(fresh)
      }
    })
  }

  const openDetail = (branch: Branch) => {
    setSelectedBranch(branch)
    setDetailOpen(true)
  }

  const handlePhotoChange = (id: string, url: string) => {
    setPhotoMap(prev => ({ ...prev, [id]: url }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Antennes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {branches.length} antennes · {openCount} ouvertes
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Nouvelle antenne
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Antennes ouvertes', value: openCount, sub: `sur ${branches.length} au total`, color: 'text-emerald-600' },
          { label: 'Total livreurs', value: branches.reduce((s, b) => s + b.deliverersCount, 0), sub: 'rattachés aux antennes', color: 'text-blue-600' },
          { label: 'Siège social', value: 'Akwa', sub: '3 Rue Joss, Douala', color: 'text-orange-600' },
        ].map(c => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{c.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Branches grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {branches.map(branch => (
          <BranchCard
            key={branch.id}
            branch={branch}
            photoUrl={photoMap[branch.id] ?? branch.photoUrl}
            onPhotoChange={handlePhotoChange}
            onClick={() => openDetail(branch)}
          />
        ))}
      </div>

      <CreateBranchForm open={formOpen} onClose={() => setFormOpen(false)} onSuccess={refreshBranches} />
      <BranchDetailDrawer
        branch={selectedBranch}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onAction={refreshBranches}
      />
    </div>
  )
}
