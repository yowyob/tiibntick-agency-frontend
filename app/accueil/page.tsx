'use client'

import { useState } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import {
  ConciergeBell, QrCode, User, Loader2, Printer, CheckCircle2,
  ClipboardList,
} from 'lucide-react'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { getAgencyId } from '@/lib/session'
import { intakeDepositUrl, intakeService } from '@/lib/services/intakeService'
import { trackingService, type PublicRelayHub } from '@/lib/services/trackingService'
import MissionReceipt, { printMissionReceipt } from '@/components/receipt/MissionReceipt'
import type { IntakeDeliveryMode, IntakeStatusResult } from '@/lib/services/intakeService'
import { formatUserError } from '@/lib/errors'
import { useToast } from '@/contexts/ToastContext'
import { useEffect } from 'react'

const inputCls =
  'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 bg-white'

type Tab = 'qr' | 'walkin'

export default function AccueilPage() {
  const { branches } = useAgencyLookups()
  const [tab, setTab] = useState<Tab>('qr')
  const [branchId, setBranchId] = useState('')
  const [hubs, setHubs] = useState<PublicRelayHub[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [approved, setApproved] = useState<IntakeStatusResult | null>(null)
  const { success: toastSuccess, error: toastError } = useToast()

  const [form, setForm] = useState({
    senderName: '', senderPhone: '',
    recipientName: '', recipientPhone: '',
    pickupAddress: '', deliveryAddress: '',
    weightKg: '', deliveryMode: 'DIRECT' as IntakeDeliveryMode,
    targetHubId: '', delivererId: '', notes: '',
  })

  const openBranches = branches.filter(b => b.status === 'OPEN')
  const agencyId = getAgencyId()
  const depositUrl = branchId ? intakeDepositUrl(agencyId, branchId) : ''

  useEffect(() => {
    if (!agencyId) return
    trackingService.listRelayHubs(agencyId).then(setHubs).catch(() => undefined)
  }, [agencyId])

  useEffect(() => {
    if (openBranches.length && !branchId) {
      setBranchId(openBranches[0].id)
    }
  }, [openBranches, branchId])

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleWalkIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!branchId) return
    setSubmitting(true)
    try {
      const result = await intakeService.walkIn(agencyId, {
        branchId,
        senderName: form.senderName.trim(),
        senderPhone: form.senderPhone.trim() || undefined,
        recipientName: form.recipientName.trim(),
        recipientPhone: form.recipientPhone.trim() || undefined,
        pickupAddress: form.pickupAddress.trim(),
        deliveryAddress: form.deliveryAddress.trim(),
        weightKg: form.weightKg ? parseFloat(form.weightKg) : undefined,
        deliveryMode: form.deliveryMode,
        targetHubId: form.deliveryMode === 'HUB' ? form.targetHubId : undefined,
        notes: form.notes.trim() || undefined,
        delivererId: form.delivererId || undefined,
      })
      setApproved(result)
      toastSuccess('Client enregistré — reçu prêt à imprimer.')
    } catch (err) {
      toastError(formatUserError(err, 'Impossible d\'enregistrer ce client.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (approved) {
    const branch = openBranches.find(b => b.id === branchId)
    return (
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-3 text-emerald-600">
          <CheckCircle2 size={24} />
          <h1 className="text-xl font-bold text-gray-900">Reçu client — {approved.referenceCode}</h1>
        </div>
        <div className="print-only-receipt border border-gray-200 rounded-2xl overflow-hidden">
          <MissionReceipt data={{
            referenceCode: approved.referenceCode,
            trackingCode: approved.trackingCode,
            agencyName: approved.agencyName ?? 'Agence',
            branchName: approved.branchName ?? branch?.name ?? '',
            senderName: approved.senderName,
            recipientName: approved.recipientName,
            deliveryAddress: approved.deliveryAddress,
            deliveryMode: approved.deliveryMode,
            createdAt: approved.reviewedAt ?? approved.createdAt,
          }} />
        </div>
        <div className="flex gap-3 print:hidden">
          <button type="button" onClick={printMissionReceipt}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg">
            <Printer size={16} /> Imprimer le reçu
          </button>
          <button type="button" onClick={() => { setApproved(null); setForm({
            senderName: '', senderPhone: '', recipientName: '', recipientPhone: '',
            pickupAddress: '', deliveryAddress: '', weightKg: '', deliveryMode: 'DIRECT',
            targetHubId: '', delivererId: '', notes: '',
          }) }}
            className="border border-gray-200 bg-white hover:bg-gray-50 font-semibold px-5 py-2.5 rounded-lg text-gray-700">
            Nouveau client
          </button>
        </div>
        <style jsx global>{`
          @media print {
            body * { visibility: hidden; }
            .print-only-receipt, .print-only-receipt * { visibility: visible; }
            .print-only-receipt { position: absolute; left: 0; top: 0; width: 100%; border: none; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ConciergeBell size={24} className="text-orange-500" />
            Accueil client
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            QR code pour les clients avec téléphone, ou enregistrement direct sans smartphone.
          </p>
        </div>
        <Link href="/accueil/demandes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 px-4 py-2 rounded-lg">
          <ClipboardList size={16} /> Demandes en attente
        </Link>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Antenne</label>
        <select value={branchId} onChange={e => setBranchId(e.target.value)} className={inputCls}>
          {openBranches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="flex rounded-xl border border-gray-200 overflow-hidden">
        <button type="button" onClick={() => setTab('qr')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
            tab === 'qr' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
          <QrCode size={16} /> Client avec téléphone
        </button>
        <button type="button" onClick={() => setTab('walkin')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
            tab === 'walkin' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
          <User size={16} /> Sans smartphone
        </button>
      </div>

      {tab === 'qr' && branchId && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-5">
          <p className="text-sm text-gray-600">
            Affichez ce QR à l&apos;accueil. Le client scanne et remplit le formulaire sur son téléphone.
          </p>
          <div className="flex justify-center">
            <QRCodeSVG value={depositUrl} size={200} level="M" />
          </div>
          <p className="text-xs text-gray-400 break-all font-mono">{depositUrl}</p>
        </div>
      )}

      {tab === 'walkin' && (
        <form onSubmit={handleWalkIn} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-800">Enregistrer un client présent au comptoir</p>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Nom expéditeur *" value={form.senderName}
              onChange={e => update('senderName', e.target.value)} className={inputCls} />
            <input placeholder="Téléphone" value={form.senderPhone}
              onChange={e => update('senderPhone', e.target.value)} className={inputCls} />
            <input required placeholder="Nom destinataire *" value={form.recipientName}
              onChange={e => update('recipientName', e.target.value)} className={inputCls} />
            <input placeholder="Tél. destinataire" value={form.recipientPhone}
              onChange={e => update('recipientPhone', e.target.value)} className={inputCls} />
          </div>
          <input required placeholder="Adresse enlèvement *" value={form.pickupAddress}
            onChange={e => update('pickupAddress', e.target.value)} className={inputCls} />
          <input required placeholder="Adresse livraison *" value={form.deliveryAddress}
            onChange={e => update('deliveryAddress', e.target.value)} className={inputCls} />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" step="0.1" placeholder="Poids (kg)" value={form.weightKg}
              onChange={e => update('weightKg', e.target.value)} className={inputCls} />
            <select value={form.deliveryMode} onChange={e => update('deliveryMode', e.target.value)} className={inputCls}>
              <option value="DIRECT">Livraison directe</option>
              <option value="HUB">Point relais</option>
            </select>
          </div>
          {form.deliveryMode === 'HUB' && (
            <select required value={form.targetHubId} onChange={e => update('targetHubId', e.target.value)} className={inputCls}>
              <option value="">Point relais</option>
              {hubs.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          )}
          <button type="submit" disabled={submitting || !branchId}
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            Valider et imprimer le reçu
          </button>
        </form>
      )}
    </div>
  )
}
