'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Camera, Plus, X, FileText, CheckCircle2, AlertTriangle,
  Clock, Upload, Truck, MapPin, User, Wrench, Package,
} from 'lucide-react'
import Drawer from '@/components/forms/Drawer'
import Avatar from '@/components/Avatar'
import type { Vehicle, VehicleType, VehicleStatus } from '@/lib/types'
import { useToast } from '@/contexts/ToastContext'
import { mediaService } from '@/lib/services/mediaService'

const TYPE_LABELS: Record<VehicleType, string> = {
  MOTORCYCLE: 'Moto', CAR: 'Voiture', TRUCK_LIGHT: 'Camion léger',
  TRUCK_HEAVY: 'Camion lourd', TRICYCLE: 'Tricycle', BICYCLE: 'Vélo', ON_FOOT: 'À pied',
}
const STATUS_LABELS: Record<VehicleStatus, string> = {
  AVAILABLE: 'Disponible', IN_USE: 'En service', IN_MAINTENANCE: 'En maintenance', RETIRED: 'Retiré',
}
const STATUS_COLORS: Record<VehicleStatus, string> = {
  AVAILABLE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  IN_USE: 'bg-blue-50 text-blue-700 border-blue-200',
  IN_MAINTENANCE: 'bg-orange-50 text-orange-700 border-orange-200',
  RETIRED: 'bg-gray-100 text-gray-500 border-gray-200',
}

const MOCK_DOCS = [
  { id: 'carte-grise',  name: 'Carte grise',             desc: "Certificat d'immatriculation",      uploaded: true,  uploadDate: '2026-01-15', expiresAt: null },
  { id: 'assurance',    name: 'Assurance',                desc: 'Couverture tous risques / tiers',   uploaded: true,  uploadDate: '2026-01-01', expiresAt: '2026-12-31' },
  { id: 'visite-tech',  name: 'Visite technique',         desc: 'Contrôle périodique obligatoire',   uploaded: false, uploadDate: null,         expiresAt: null },
  { id: 'permis',       name: 'Permis du livreur',        desc: 'Copie du permis de conduire',       uploaded: true,  uploadDate: '2025-11-30', expiresAt: '2027-11-30' },
]

type Tab = 'info' | 'photos' | 'docs'
type Doc = typeof MOCK_DOCS[0] & { localUploaded?: boolean }

function docStatus(doc: Doc): 'ok' | 'expired' | 'missing' {
  if (!doc.uploaded && !doc.localUploaded) return 'missing'
  if (doc.expiresAt && new Date(doc.expiresAt) < new Date()) return 'expired'
  return 'ok'
}

function SectionTitle({ label }: { label: string }) {
  return <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">{label}</p>
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <Icon size={15} className="text-gray-400 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
        <div className="text-sm font-medium text-gray-900">{value}</div>
      </div>
    </div>
  )
}

interface Props {
  vehicle: Vehicle | null
  open: boolean
  onClose: () => void
  onPhotoChange?: (vehicleId: string, url: string) => void
}

export default function VehicleDetailDrawer({ vehicle, open, onClose, onPhotoChange }: Props) {
  const { success: toastSuccess, error: toastError } = useToast()
  const [tab, setTab] = useState<Tab>('info')
  const [mainPhotoUrl, setMainPhotoUrl] = useState<string | null>(null)
  const [gallery, setGallery] = useState<string[]>([])
  const [docs, setDocs] = useState<Doc[]>(MOCK_DOCS.map(d => ({ ...d })))
  const mainPhotoInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  // Reset state when switching vehicles
  useEffect(() => {
    if (!vehicle) return
    setTab('info')
    setMainPhotoUrl(null)
    setGallery([])
    setDocs(MOCK_DOCS.map(d => ({ ...d })))
  }, [vehicle?.id])

  if (!vehicle) return null

  const currentPhoto = mainPhotoUrl ?? vehicle.photoUrl

  const handleMainPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      const url = await mediaService.uploadFile(f, 'vehicle-photo')
      setMainPhotoUrl(url)
      onPhotoChange?.(vehicle.id, url)
      toastSuccess('Photo principale mise à jour.')
    } catch {
      toastError('Impossible d\'envoyer la photo. Réessayez avec un fichier plus léger.')
    }
  }

  const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    const urls = files.map(f => URL.createObjectURL(f))
    setGallery(prev => [...prev, ...urls].slice(0, 8))
    toastSuccess(`${urls.length} photo${urls.length > 1 ? 's ajoutées' : ' ajoutée'} à la galerie.`)
  }

  const handleDocUpload = (docId: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      await mediaService.uploadDocument(vehicle.id, 'vehicle-doc', file)
      const today = new Date().toISOString().split('T')[0]
      setDocs(prev => prev.map(d => d.id === docId ? { ...d, uploaded: true, localUploaded: true, uploadDate: today } : d))
      toastSuccess('Document uploadé avec succès.')
    } catch {
      toastError('Impossible d\'envoyer le document. Vérifiez le format (PDF, JPG, PNG).')
    }
    e.target.value = ''
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'info', label: 'Informations' },
    { key: 'photos', label: 'Photos' },
    { key: 'docs', label: 'Documents' },
  ]

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`${vehicle.registrationNumber} · ${vehicle.model}`}
      description={`${TYPE_LABELS[vehicle.type]}`}
      size="lg"
    >
      {/* Status + tab bar */}
      <div className="sticky top-[73px] z-10 bg-white border-b border-gray-100">
        {/* Status strip */}
        <div className="px-6 py-2.5 flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[vehicle.status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {STATUS_LABELS[vehicle.status]}
          </span>
          {vehicle.branchName && (
            <span className="text-xs text-gray-500">{vehicle.branchName}</span>
          )}
        </div>
        {/* Tabs */}
        <div className="flex border-t border-gray-50">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                tab === t.key
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">

        {/* ── INFORMATIONS ── */}
        {tab === 'info' && (
          <div className="space-y-6">
            <div>
              <SectionTitle label="Identification" />
              <div className="bg-gray-50 rounded-xl px-4">
                <InfoRow icon={Truck} label="Immatriculation" value={<span className="font-mono">{vehicle.registrationNumber}</span>} />
                <InfoRow icon={Truck} label="Modèle" value={vehicle.model} />
                <InfoRow icon={Package} label="Type de véhicule" value={TYPE_LABELS[vehicle.type]} />
                {vehicle.branchName && (
                  <InfoRow icon={MapPin} label="Antenne" value={vehicle.branchName} />
                )}
              </div>
            </div>

            <div>
              <SectionTitle label="Capacité" />
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[11px] text-gray-400 mb-1">Charge maximale</p>
                  <p className="text-xl font-bold text-gray-900">{vehicle.maxWeightKg}<span className="text-sm font-normal text-gray-500 ml-1">kg</span></p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[11px] text-gray-400 mb-1">Volume maximum</p>
                  <p className="text-xl font-bold text-gray-900">{vehicle.maxVolumeM3}<span className="text-sm font-normal text-gray-500 ml-1">m³</span></p>
                </div>
              </div>
            </div>

            <div>
              <SectionTitle label="Livreur assigné" />
              {vehicle.assignedDelivererName ? (
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <Avatar name={vehicle.assignedDelivererName} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{vehicle.assignedDelivererName}</p>
                    <p className="text-xs text-gray-400">Livreur assigné</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-2 text-gray-400">
                  <User size={15} />
                  <p className="text-sm">Aucun livreur assigné</p>
                </div>
              )}
            </div>

            <div>
              <SectionTitle label="Maintenance" />
              <div className="bg-gray-50 rounded-xl px-4">
                <InfoRow
                  icon={Wrench}
                  label="Dernier entretien"
                  value={vehicle.lastMaintenanceDate
                    ? new Date(vehicle.lastMaintenanceDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                    : <span className="text-gray-400 font-normal">Non renseigné</span>
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* ── PHOTOS ── */}
        {tab === 'photos' && (
          <div className="space-y-6">
            {/* Main photo */}
            <div>
              <SectionTitle label="Photo principale" />
              <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-100 mb-3">
                {currentPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentPhoto} alt={vehicle.model} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Truck size={36} className="text-gray-300" />
                    <p className="text-xs text-gray-400">Aucune photo</p>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  onClick={() => mainPhotoInputRef.current?.click()}
                >
                  <Camera size={24} className="text-white" />
                </div>
              </div>
              <input ref={mainPhotoInputRef} type="file" accept="image/*" className="hidden" onChange={handleMainPhoto} />
              <button
                onClick={() => mainPhotoInputRef.current?.click()}
                className="w-full h-10 border border-gray-200 hover:border-orange-300 text-sm font-medium text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors hover:text-orange-600"
              >
                <Camera size={14} />
                {currentPhoto ? 'Changer la photo principale' : 'Ajouter une photo principale'}
              </button>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <SectionTitle label={`Galerie (${gallery.length}/8)`} />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((url, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Galerie ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setGallery(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {gallery.length < 8 && (
                  <button
                    onClick={() => galleryInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-orange-300 flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>
              <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryAdd} />
              {gallery.length < 8 && (
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  className="mt-3 w-full h-10 border border-gray-200 hover:border-orange-300 text-sm font-medium text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors hover:text-orange-600"
                >
                  <Plus size={14} />
                  Ajouter des photos à la galerie
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── DOCUMENTS ── */}
        {tab === 'docs' && (
          <div className="space-y-3">
            <SectionTitle label="Documents réglementaires" />
            {docs.map(doc => {
              const status = docStatus(doc)
              return (
                <div key={doc.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        status === 'ok' ? 'bg-emerald-50' : status === 'expired' ? 'bg-red-50' : 'bg-gray-100'
                      }`}>
                        <FileText size={16} className={
                          status === 'ok' ? 'text-emerald-500' : status === 'expired' ? 'text-red-400' : 'text-gray-400'
                        } />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-400">{doc.desc}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    {status === 'ok' && (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={10} /> Valide
                      </span>
                    )}
                    {status === 'expired' && (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        <AlertTriangle size={10} /> Expiré
                      </span>
                    )}
                    {status === 'missing' && (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        <Clock size={10} /> Manquant
                      </span>
                    )}
                  </div>

                  {/* Dates */}
                  {(doc.uploaded || doc.localUploaded) && (
                    <div className="flex gap-4 mb-3">
                      {doc.uploadDate && (
                        <p className="text-[11px] text-gray-400">
                          Uploadé le <span className="text-gray-600">{new Date(doc.uploadDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </p>
                      )}
                      {doc.expiresAt && (
                        <p className={`text-[11px] ${status === 'expired' ? 'text-red-500' : 'text-gray-400'}`}>
                          Expire le <span className="font-medium">{new Date(doc.expiresAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Upload button */}
                  <label className="flex items-center justify-center gap-1.5 h-8 w-full border border-gray-200 hover:border-orange-300 text-xs font-medium text-gray-600 hover:text-orange-600 rounded-lg cursor-pointer transition-colors">
                    <Upload size={12} />
                    {doc.uploaded || doc.localUploaded ? 'Ré-uploader' : 'Uploader'}
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleDocUpload(doc.id)} />
                  </label>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Drawer>
  )
}
