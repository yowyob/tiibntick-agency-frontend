'use client'

import { useState, useEffect } from 'react'
import {
  Package, MapPin, User, Phone, Truck, Calendar,
  Clock, CheckCircle2, Hash, Building2, ArrowRight, DollarSign, Printer, Loader2, FileText,
} from 'lucide-react'
import Drawer from '@/components/forms/Drawer'
import UploadableAvatar from '@/components/UploadableAvatar'
import UploadZone from '@/components/UploadZone'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { missionSubtitle } from '@/lib/displayLabels'
import { billingService } from '@/lib/services/billingService'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import type { Mission } from '@/lib/types'
import type { InvoiceDto } from '@/lib/api/dto'

interface Props {
  mission: Mission | null
  open: boolean
  onClose: () => void
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-xs text-gray-400 uppercase tracking-wide flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">{value}</span>
    </div>
  )
}

const PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Standard',
  NORMAL: 'Normal',
  HIGH: 'Prioritaire',
  URGENT: 'Urgent',
}

export default function InvoiceDetailDrawer({ mission, open, onClose }: Props) {
  const { deliverers } = useAgencyLookups()
  const { error: toastError } = useToast()
  const [exporting, setExporting] = useState(false)
  const [invoice, setInvoice] = useState<InvoiceDto | null>(null)
  const [loadingInvoice, setLoadingInvoice] = useState(false)

  useEffect(() => {
    if (!open || !mission) {
      setInvoice(null)
      return
    }
    setLoadingInvoice(true)
    const load = async () => {
      try {
        if (mission.invoiceId) {
          setInvoice(await billingService.getInvoice(mission.invoiceId))
          return
        }
        const invoices = await billingService.getInvoices()
        const found = invoices.find(i => i.missionId === mission.id)
        if (found) {
          setInvoice(await billingService.getInvoice(found.id))
        } else {
          setInvoice(null)
        }
      } catch {
        setInvoice(null)
      } finally {
        setLoadingInvoice(false)
      }
    }
    void load()
  }, [open, mission?.id, mission?.invoiceId])

  const handleExportPdf = async () => {
    setExporting(true)
    try {
      let invoiceId = invoice?.id ?? mission?.invoiceId
      if (!invoiceId) {
        const invoices = await billingService.getInvoices()
        invoiceId = invoices.find(i => i.missionId === mission?.id)?.id
      }
      if (!invoiceId) {
        toastError('Facture introuvable pour cette mission. Générez-la d\'abord.')
        return
      }
      const pdfUrl = await billingService.downloadInvoice(invoiceId)
      if (pdfUrl) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer')
      } else {
        toastError('Le PDF n\'est pas encore disponible (TiiBnTick Billing Invoice).')
      }
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible de télécharger la facture PDF.'))
    } finally {
      setExporting(false)
    }
  }

  if (!mission) return null

  const deliveryDuration = mission.actualPickupAt && mission.actualDeliveryAt
    ? (() => {
        const diff = new Date(mission.actualDeliveryAt).getTime() - new Date(mission.actualPickupAt).getTime()
        const mins = Math.floor(diff / 60000)
        return mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, '0')}`
      })()
    : null

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`Facture — ${mission.manifestNumber}`}
      description={missionSubtitle(mission)}
      size="lg"
      footer={
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 h-10 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={15} />
            Imprimer
          </button>
          <button
            onClick={handleExportPdf}
            disabled={exporting}
            className="flex-1 h-10 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {exporting ? <Loader2 size={15} className="animate-spin" /> : null}
            Exporter PDF
          </button>
        </div>
      }
    >
      <div>
        {/* Status bar */}
        <div className="px-6 py-3 bg-emerald-50 border-b border-gray-100 flex items-center gap-2">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">
            {invoice ? `Facture ${invoice.reference} · ${invoice.status}` : 'Livraison confirmée — Facturée'}
          </span>
          {loadingInvoice && <Loader2 size={14} className="animate-spin text-emerald-600 ml-auto" />}
          {!loadingInvoice && invoice?.createdAt && (
            <span className="ml-auto text-xs text-emerald-600">
              {new Date(invoice.createdAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {!loadingInvoice && !invoice?.createdAt && mission.actualDeliveryAt && (
            <span className="ml-auto text-xs text-emerald-600">
              {new Date(mission.actualDeliveryAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Invoice amount hero */}
        <div className="px-6 py-8 text-center bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Montant facturé</p>
          <p className="text-5xl font-bold text-gray-900">
            {(invoice ? Number(invoice.amount) : mission.sellingPrice).toLocaleString('fr-FR')}
          </p>
          <p className="text-lg text-gray-400 font-medium mt-1">{invoice?.currency ?? mission.currency}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>{mission.packagesCount} colis</span>
            <span>·</span>
            <span>{mission.totalWeightKg} kg</span>
            <span>·</span>
            <span className={`px-2 py-0.5 rounded font-medium ${
              mission.priority === 'URGENT' ? 'bg-red-50 text-red-600' :
              mission.priority === 'HIGH' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {PRIORITY_LABELS[mission.priority]}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Parties */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Parties</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-2">Expéditeur</p>
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400 flex-shrink-0" />
                  <p className="text-sm font-semibold text-gray-900">{mission.senderName}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-5">{mission.pickupAddress}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-2">Destinataire</p>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-400 flex-shrink-0" />
                  <p className="text-sm font-semibold text-gray-900">{mission.recipientName}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 ml-5">
                  <p className="text-xs text-gray-500">{mission.recipientPhone}</p>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 ml-5">{mission.deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Route */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Trajet</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <div className="w-0.5 h-8 bg-gray-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase">Enlèvement</p>
                    <p className="text-sm font-medium text-gray-900">{mission.pickupAddress}</p>
                    {mission.actualPickupAt && (
                      <p className="text-xs text-gray-400">
                        {new Date(mission.actualPickupAt).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase">Livraison</p>
                    <p className="text-sm font-medium text-gray-900">{mission.deliveryAddress}</p>
                    {mission.actualDeliveryAt && (
                      <p className="text-xs text-gray-400">
                        {new Date(mission.actualDeliveryAt).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
                {deliveryDuration && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">Durée</p>
                    <p className="text-sm font-semibold text-gray-900">{deliveryDuration}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Livreur */}
          {mission.delivererName && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Livreur</h3>
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                <UploadableAvatar
                  name={mission.delivererName}
                  photoUrl={deliverers.find(d => d.id === mission.delivererId)?.photoUrl}
                  size="md"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{mission.delivererName}</p>
                  {mission.vehiclePlate && (
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{mission.vehiclePlate}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Billing breakdown */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Détail de facturation</h3>
            <div className="bg-white border border-gray-200 rounded-xl px-5">
              <Row label="Bordereau" value={<span className="font-mono">{mission.manifestNumber}</span>} />
              {invoice && (
                <>
                  <Row label="Référence facture" value={<span className="font-mono">{invoice.reference}</span>} />
                  <Row label="Statut facture" value={invoice.status} />
                </>
              )}
              <Row label="Nombre de colis" value={`${mission.packagesCount} colis`} />
              <Row label="Poids total" value={`${mission.totalWeightKg} kg`} />
              <Row label="Priorité" value={PRIORITY_LABELS[mission.priority]} />
              <Row
                label="Date de création"
                value={new Date(mission.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              />
            </div>
            <div className="mt-2 bg-orange-50 border border-orange-100 rounded-xl px-5 py-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-orange-800">Total facturé</span>
              <span className="text-xl font-bold text-orange-900">
                {mission.sellingPrice.toLocaleString('fr-FR')} {mission.currency}
              </span>
            </div>
          </div>

          {/* Preuve de paiement */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Preuve de paiement client</h3>
            <UploadZone
              label=""
              hint="Reçu de paiement, capture d'écran — image ou PDF"
              accept="image/*,.pdf"
            />
          </div>

        </div>
      </div>
    </Drawer>
  )
}
