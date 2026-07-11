'use client'

import { useState, useRef } from 'react'
import {
  Package, Building2, MapPin, Phone, Mail, Globe, Hash, FileText,
  Shield, User, CheckCircle2, ChevronRight, ArrowLeft, Loader2,
  AlertCircle, Eye, EyeOff, Upload, Zap, Users, DollarSign, X
} from 'lucide-react'
import Link from 'next/link'
import { authService } from '@/lib/services/authService'
import { registerService } from '@/lib/services/registerService'
import { mediaService } from '@/lib/services/mediaService'
import { formatUserError } from '@/lib/errors'

type Step = 1 | 2 | 3 | 4 | 5

interface FormData {
  // Step 1 — Identity
  agencyName: string
  legalName: string
  registrationNumber: string
  agencyType: string
  // Step 2 — Contact
  address: string
  city: string
  country: string
  phone: string
  email: string
  website: string
  // Step 3 — Owner / Verification
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  ownerNationalId: string
  ownerIdType: string
  // Step 4 — Operations
  defaultCurrency: string
  autoAssign: boolean
  allowFreelancers: boolean
  maxFreelancers: string
  hubRetentionHours: string
  // Step 5 — Security
  password: string
  confirmPassword: string
  acceptCgu: boolean
  acceptPrivacy: boolean
}

const STEPS = [
  { id: 1, label: 'Identité', icon: Building2 },
  { id: 2, label: 'Contact', icon: MapPin },
  { id: 3, label: 'Vérification', icon: Shield },
  { id: 4, label: 'Opérations', icon: Zap },
  { id: 5, label: 'Finalisation', icon: CheckCircle2 },
]

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
      {children}{required && <span className="text-orange-500 ml-1">*</span>}
    </label>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-11 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition ${className ?? ''}`}
    />
  )
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full h-11 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-700 transition"
    >
      {children}
    </select>
  )
}

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm text-gray-800 font-medium">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${value ? 'bg-orange-500' : 'bg-gray-200'}`}
      >
        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${value ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

function DocUploadZone({ label, hint, accept = 'image/*,.pdf', onFile }: {
  label: string; hint: string; accept?: string
  onFile?: (file: File | null) => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const applyFile = (f: File) => {
    if (f.size > 5 * 1024 * 1024) return
    setFile(f)
    onFile?.(f)
    if (f.type.startsWith('image/')) {
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(f))
    } else {
      setPreview(null)
    }
  }

  const remove = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    onFile?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) applyFile(f) }}
      />
      {file ? (
        <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 bg-white">
          {preview ? (
            <img src={preview} alt="" className="w-12 h-12 object-cover rounded flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-gray-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} Ko</p>
          </div>
          <button type="button" onClick={remove} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) applyFile(f) }}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
        >
          <Upload size={24} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Glisser-déposer ou <span className="text-orange-500 font-medium">choisir un fichier</span></p>
          <p className="text-xs text-gray-400 mt-1">{hint}</p>
        </div>
      )}
    </div>
  )
}

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [kernelIdentityReady, setKernelIdentityReady] = useState(true)

  const [form, setForm] = useState<FormData>({
    agencyName: '', legalName: '', registrationNumber: '', agencyType: 'ENTERPRISE',
    address: '', city: 'Douala', country: 'Cameroun', phone: '', email: '', website: '',
    ownerName: '', ownerPhone: '', ownerEmail: '', ownerNationalId: '', ownerIdType: 'CNI',
    defaultCurrency: 'XAF', autoAssign: true, allowFreelancers: false,
    maxFreelancers: '10', hubRetentionHours: '72',
    password: '', confirmPassword: '', acceptCgu: false, acceptPrivacy: false,
  })

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }))

  const setBool = (field: keyof FormData) => (v: boolean) =>
    setForm(p => ({ ...p, [field]: v }))

  const [submitError, setSubmitError] = useState('')
  const [docCniFile, setDocCniFile] = useState<File | null>(null)
  const [docRccmFile, setDocRccmFile] = useState<File | null>(null)
  const [docProofFile, setDocProofFile] = useState<File | null>(null)

  const canContinue = (): boolean => {
    switch (step) {
      case 1:
        return !!(form.agencyName.trim() && form.registrationNumber.trim() && form.agencyType)
      case 2:
        return !!(form.address.trim() && form.city.trim() && form.phone.trim() && form.email.trim())
      case 3:
        return !!(
          form.ownerName.trim() &&
          form.ownerNationalId.trim() &&
          form.ownerPhone.trim() &&
          form.ownerEmail.trim() &&
          docCniFile &&
          docRccmFile &&
          docProofFile
        )
      case 4:
        return true
      case 5:
        return !!(
          form.password.length >= 10 &&
          /[A-Z]/.test(form.password) &&
          /[a-z]/.test(form.password) &&
          /\d/.test(form.password) &&
          /[^A-Za-z0-9]/.test(form.password) &&
          form.password === form.confirmPassword &&
          form.acceptCgu &&
          form.acceptPrivacy
        )
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!canContinue()) return
    setLoading(true)
    setSubmitError('')
    try {
      const [firstName, ...rest] = form.ownerName.trim().split(/\s+/)
      const lastName = rest.join(' ') || firstName

      await authService.signup({
        email: form.email,
        password: form.password,
        firstName,
        lastName,
        organizationName: form.agencyName,
      })

      const [docCniKey, docRccmKey, docProofKey] = await Promise.all([
        docCniFile ? mediaService.uploadKycDocument(docCniFile, 'onboarding-cni') : Promise.resolve(undefined),
        docRccmFile ? mediaService.uploadKycDocument(docRccmFile, 'onboarding-rccm') : Promise.resolve(undefined),
        docProofFile ? mediaService.uploadKycDocument(docProofFile, 'onboarding-proof') : Promise.resolve(undefined),
      ])

      const agencyCode = form.agencyName
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 20) || 'AGENCE'

      const result = await registerService.submitApplication({
        agencyName: form.agencyName,
        legalName: form.legalName || form.agencyName,
        agencyCode,
        agencyType: form.agencyType,
        registrationNumber: form.registrationNumber,
        address: {
          street: form.address,
          city: form.city,
          country: 'CM',
        },
        contactEmail: form.email,
        contactPhone: form.phone,
        website: form.website || undefined,
        ownerName: form.ownerName,
        ownerEmail: form.ownerEmail || form.email,
        ownerPhone: form.ownerPhone || form.phone,
        ownerNationalId: form.ownerNationalId,
        ownerIdType: form.ownerIdType,
        docCniKey,
        docRccmKey,
        docProofKey,
        autoAssign: form.autoAssign,
        allowFreelancers: form.allowFreelancers,
        hubRetentionHours: Number(form.hubRetentionHours) || 72,
        maxFreelancers: Number(form.maxFreelancers) || 10,
      })

      localStorage.setItem('tnt-agency-id', result.agencyId)
      localStorage.setItem('tnt-agency-status', result.agencyStatus)
      localStorage.setItem('tnt-agency-active', 'false')

      let identityReady = result.kernelIdentityReady
      registerService.setKernelIdentityReady(identityReady)
      if (!identityReady) {
        const identity = await registerService.ensureKernelIdentity(result.agencyId, false)
        identityReady = identity?.readyForAdminApproval ?? false
      }
      setKernelIdentityReady(identityReady)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(formatUserError(
        err,
        'Impossible d\'envoyer votre demande d\'inscription. Vérifiez les informations et réessayez.',
      ))
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Demande envoyée !</h1>
          <p className="text-gray-500 mt-3 leading-relaxed">
            Votre demande d&apos;inscription a bien été transmise. L&apos;équipe TiiBnTick va examiner
            votre dossier sous <strong>24–48h</strong> et vous contacter par email.
          </p>
          {!kernelIdentityReady && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-sm text-amber-900">
              <p className="font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-600" />
                Vérification d&apos;identité en attente
              </p>
              <p className="mt-2 text-amber-800 leading-relaxed">
                Votre dossier est enregistré, mais la liaison avec la plateforme d&apos;identité
                n&apos;a pas pu être finalisée. Vous pourrez réessayer depuis la page de suivi.
              </p>
            </div>
          )}
          <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Prochaines étapes</p>
            {[
              'Vérification des documents légaux',
              'Validation de l\'identité du responsable',
              'Activation de votre espace agence',
              'Onboarding avec un conseiller TiiBnTick',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-orange-800">
                <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-700 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <Link href="/pending" className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors">
            Suivre ma demande
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[380px] bg-gradient-to-br from-orange-500 to-orange-600 flex-col p-10 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">TiiBnTick</p>
            <p className="text-orange-100 text-xs">Agency Platform</p>
          </div>
        </Link>

        <div className="mt-12">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Rejoignez la<br />plateforme.
          </h1>
          <p className="text-orange-100 mt-3 text-sm leading-relaxed">
            Créez votre agence de livraison en quelques minutes. Notre équipe valide votre dossier sous 48h.
          </p>
        </div>

        {/* Steps progress */}
        <div className="mt-10 space-y-3">
          {STEPS.map(s => {
            const done = step > s.id
            const active = step === s.id
            return (
              <div key={s.id} className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all ${active ? 'bg-white/15' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                  done ? 'bg-white text-orange-500' : active ? 'bg-orange-400 text-white' : 'bg-white/10 text-orange-200'
                }`}>
                  {done ? <CheckCircle2 size={14} /> : s.id}
                </div>
                <span className={`text-sm font-medium ${active ? 'text-white' : done ? 'text-orange-100' : 'text-orange-300'}`}>
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-auto">
          <div className="space-y-3 border-t border-orange-400/40 pt-6">
            {[
              { icon: Shield, text: 'Vérification KYC sécurisée' },
              { icon: FileText, text: 'Contrat numérique signable' },
              { icon: Users, text: 'Support dédié à l\'onboarding' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-orange-100 text-sm">
                <Icon size={14} className="text-orange-300" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-xl py-4">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">TiiBnTick Agency</span>
          </Link>

          {/* Step indicator mobile */}
          <div className="flex items-center gap-1 mb-6 lg:hidden">
            {STEPS.map(s => (
              <div key={s.id} className={`h-1 rounded-full flex-1 transition-all ${s.id <= step ? 'bg-orange-500' : 'bg-gray-200'}`} />
            ))}
          </div>

          {/* ── STEP 1 : Identité de l'agence ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Identité de l&apos;agence</h2>
                <p className="text-sm text-gray-500 mt-1">Informations légales et commerciales de votre structure</p>
              </div>

              <div>
                <FieldLabel required>Nom commercial de l&apos;agence</FieldLabel>
                <Input value={form.agencyName} onChange={set('agencyName')} placeholder="ex : Rapid Express Douala" />
              </div>

              <div>
                <FieldLabel required>Raison sociale (dénomination légale)</FieldLabel>
                <Input value={form.legalName} onChange={set('legalName')} placeholder="ex : Rapid Express SARL" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>N° RCCM / Registre de commerce</FieldLabel>
                  <Input value={form.registrationNumber} onChange={set('registrationNumber')} placeholder="RC/DLA/2021/B/1234" />
                </div>
                <div>
                  <FieldLabel required>Type de structure</FieldLabel>
                  <Select value={form.agencyType} onChange={set('agencyType')}>
                    <option value="ENTERPRISE">Entreprise (SARL, SA…)</option>
                    <option value="SME">PME / Petite entreprise</option>
                    <option value="SOLO">Entreprise individuelle</option>
                    <option value="ORGANIZATION_MEMBER">Membre d&apos;une organisation</option>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3.5">
                <div className="flex items-start gap-2.5">
                  <AlertCircle size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Ces informations seront vérifiées avec les registres officiels du MINADER et du Centre de Formalités des Entreprises (CFE).
                    Assurez-vous qu&apos;elles correspondent exactement à vos documents officiels.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2 : Contact ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Coordonnées de l&apos;agence</h2>
                <p className="text-sm text-gray-500 mt-1">Adresse, téléphone et email de contact principal</p>
              </div>

              <div>
                <FieldLabel required>Adresse du siège social</FieldLabel>
                <Input value={form.address} onChange={set('address')} placeholder="ex : 3 Rue Joss, Akwa" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Ville</FieldLabel>
                  <Select value={form.city} onChange={set('city')}>
                    <option>Douala</option>
                    <option>Yaoundé</option>
                    <option>Bafoussam</option>
                    <option>Bamenda</option>
                    <option>Garoua</option>
                    <option>Maroua</option>
                    <option>Ngaoundéré</option>
                    <option>Bertoua</option>
                    <option>Kribi</option>
                    <option>Ebolowa</option>
                    <option>Nkongsamba</option>
                    <option>Buea</option>
                  </Select>
                </div>
                <div>
                  <FieldLabel required>Pays</FieldLabel>
                  <Select value={form.country} onChange={set('country')}>
                    <option>Cameroun</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Téléphone professionnel</FieldLabel>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input value={form.phone} onChange={set('phone')} placeholder="+237 233 00 00 00" className="pl-8" />
                  </div>
                </div>
                <div>
                  <FieldLabel required>Email professionnel</FieldLabel>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input type="email" value={form.email} onChange={set('email')} placeholder="contact@votre-agence.cm" className="pl-8" />
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel>Site web (optionnel)</FieldLabel>
                <div className="relative">
                  <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input value={form.website} onChange={set('website')} placeholder="https://votre-agence.cm" className="pl-8" />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3 : Vérification / KYC ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Identité du responsable</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Vérification KYC requise pour activer votre agence — données chiffrées et conformes au RGPD
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Nom complet du responsable</FieldLabel>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input value={form.ownerName} onChange={set('ownerName')} placeholder="Prénom NOM" className="pl-8" />
                  </div>
                </div>
                <div>
                  <FieldLabel required>Type de pièce d&apos;identité</FieldLabel>
                  <Select value={form.ownerIdType} onChange={set('ownerIdType')}>
                    <option value="CNI">Carte Nationale d&apos;Identité (CNI)</option>
                    <option value="PASSPORT">Passeport</option>
                    <option value="RESIDENCE">Titre de séjour</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>N° de la pièce d&apos;identité</FieldLabel>
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input value={form.ownerNationalId} onChange={set('ownerNationalId')} placeholder="000 000 000 0" className="pl-8" />
                  </div>
                </div>
                <div>
                  <FieldLabel required>Téléphone du responsable</FieldLabel>
                  <Input value={form.ownerPhone} onChange={set('ownerPhone')} placeholder="+237 6xx xx xx xx" />
                </div>
              </div>

              <div>
                <FieldLabel required>Email personnel du responsable</FieldLabel>
                <Input type="email" value={form.ownerEmail} onChange={set('ownerEmail')} placeholder="responsable@email.com" />
                <p className="text-xs text-gray-400 mt-1">Un code de vérification sera envoyé à cet email.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <DocUploadZone
                  label="Pièce d'identité recto"
                  hint="JPG, PNG ou PDF — max 5 Mo"
                  onFile={setDocCniFile}
                />
                <DocUploadZone
                  label="Registre de commerce (RCCM)"
                  hint="Scan du document officiel — PDF recommandé"
                  onFile={setDocRccmFile}
                />
                <DocUploadZone
                  label="Justificatif de domicile professionnel"
                  hint="Facture ou bail de moins de 3 mois"
                  onFile={setDocProofFile}
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3.5">
                <div className="flex items-start gap-2.5">
                  <Shield size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Vos documents sont chiffrés en AES-256 et ne sont accessibles qu&apos;aux équipes de conformité TiiBnTick dans le cadre de la vérification KYC.
                    Aucune donnée n&apos;est partagée avec des tiers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4 : Paramètres opérationnels ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Paramètres opérationnels</h2>
                <p className="text-sm text-gray-500 mt-1">Configuration initiale de votre agence — modifiable après activation</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Devise par défaut</FieldLabel>
                  <Select value={form.defaultCurrency} onChange={set('defaultCurrency')}>
                    <option value="XAF">XAF — Franc CFA</option>
                    <option value="USD">USD — Dollar américain</option>
                    <option value="EUR">EUR — Euro</option>
                  </Select>
                </div>
                <div>
                  <FieldLabel required>Rétention hub (heures)</FieldLabel>
                  <Select value={form.hubRetentionHours} onChange={set('hubRetentionHours')}>
                    <option value="24">24h (1 jour)</option>
                    <option value="48">48h (2 jours)</option>
                    <option value="72">72h (3 jours)</option>
                    <option value="120">120h (5 jours)</option>
                  </Select>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-0 divide-y divide-gray-100">
                <Toggle
                  value={form.autoAssign}
                  onChange={setBool('autoAssign')}
                  label="Auto-assignation des missions"
                  sub="Assigner automatiquement les livreurs disponibles aux nouvelles missions"
                />
                <Toggle
                  value={form.allowFreelancers}
                  onChange={setBool('allowFreelancers')}
                  label="Association de freelancers"
                  sub="Permettre l'association de livreurs freelancers TiiBnTick à votre agence"
                />
              </div>

              {form.allowFreelancers && (
                <div>
                  <FieldLabel>Nombre max de freelancers simultanés</FieldLabel>
                  <Select value={form.maxFreelancers} onChange={set('maxFreelancers')}>
                    {['5', '10', '15', '20', '30', '50'].map(v => (
                      <option key={v} value={v}>{v} freelancers</option>
                    ))}
                  </Select>
                </div>
              )}

              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3.5">
                <div className="flex items-start gap-2.5">
                  <Zap size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-700 leading-relaxed">
                    Ces paramètres sont pré-configurés pour optimiser vos opérations dès le départ.
                    Vous pouvez les ajuster à tout moment dans les <strong>Paramètres</strong> de votre espace agence.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5 : Compte & validation ── */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Création du compte</h2>
                <p className="text-sm text-gray-500 mt-1">Sécurisez l&apos;accès à votre espace de gestion agence</p>
              </div>

              {/* Recap */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Récapitulatif</p>
                {[
                  { label: 'Agence', value: form.agencyName || '—' },
                  { label: 'Raison sociale', value: form.legalName || '—' },
                  { label: 'RCCM', value: form.registrationNumber || '—' },
                  { label: 'Ville', value: form.city },
                  { label: 'Email', value: form.email || '—' },
                  { label: 'Devise', value: form.defaultCurrency },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-900 max-w-[200px] truncate text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div>
                <FieldLabel required>Mot de passe</FieldLabel>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    placeholder="Min. 10 car., majuscule, minuscule, chiffre, symbole"
                    className="w-full h-11 px-3 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition"
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <FieldLabel required>Confirmer le mot de passe</FieldLabel>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={set('confirmPassword')}
                    placeholder="Répétez le mot de passe"
                    className="w-full h-11 px-3 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition"
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas.</p>
                )}
              </div>

              <div className="space-y-3 pt-1">
                {[
                  {
                    key: 'acceptCgu' as const,
                    label: <>J&apos;accepte les <span className="text-orange-500 cursor-pointer hover:text-orange-600">Conditions Générales d&apos;Utilisation</span> de TiiBnTick</>,
                  },
                  {
                    key: 'acceptPrivacy' as const,
                    label: <>J&apos;accepte la <span className="text-orange-500 cursor-pointer hover:text-orange-600">Politique de confidentialité</span> et le traitement de mes données</>,
                  },
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, [item.key]: !p[item.key] }))}
                    className="flex items-start gap-3 text-left w-full"
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form[item.key] ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                      {form[item.key] && (
                        <svg viewBox="0 0 12 10" className="w-3 h-2.5 text-white" fill="none">
                          <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 leading-snug">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => (s - 1) as Step)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ArrowLeft size={16} />
                Retour
              </button>
            ) : (
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                <ArrowLeft size={16} />
                Connexion
              </Link>
            )}

            {step < 5 ? (
              <button
                type="button"
                disabled={!canContinue()}
                onClick={() => canContinue() && setStep(s => (s + 1) as Step)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Continuer
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !form.acceptCgu || !form.acceptPrivacy || !form.password || form.password !== form.confirmPassword}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Envoi en cours...</> : <>Soumettre la demande <CheckCircle2 size={15} /></>}
              </button>
            )}

            {submitError && step === 5 && (
              <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                {submitError}
              </div>
            )}
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-6">
            Étape {step} sur {STEPS.length} · Vos données sont chiffrées et sécurisées
          </p>
        </div>
      </div>
    </div>
  )
}
