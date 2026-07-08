'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { staffService } from '@/lib/services/staffService'
import { getAgencyId } from '@/lib/session'

const cls = {
  input: 'w-full h-10 px-3 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
  inputError: 'border-red-300',
  inputOk: 'border-gray-200',
  select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
  label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
  error: 'text-xs text-red-500 mt-1',
  section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-3',
}

const schema = z.object({
  fullName: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  phone: z.string().regex(/^\+?[0-9\s]{8,15}$/, 'Numéro de téléphone invalide'),
  email: z.string().email('Email invalide').or(z.literal('')).optional(),
  type: z.enum(['PERMANENT', 'PART_TIME', 'FREELANCER_ASSOCIATED']),
  branchId: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

const delivererTypes = [
  { value: 'PERMANENT', label: 'Permanent', desc: 'Employé à temps plein' },
  { value: 'PART_TIME', label: 'Temps partiel', desc: 'Employé à temps partiel' },
  { value: 'FREELANCER_ASSOCIATED', label: 'Freelancer', desc: 'Freelancer associé via TiiBnTick' },
] as const

export default function CreateDelivererForm({ open, onClose, onSuccess }: Props) {
  const { branches } = useAgencyLookups()
  const { success: toastSuccess, error: toastError } = useToast()
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', phone: '', email: '', type: 'PERMANENT', branchId: '' },
  })

  const selectedType = watch('type')

  const onSubmit = async (data: FormValues) => {
    try {
      await staffService.registerDeliverer(getAgencyId(), {
        fullName: data.fullName,
        phone: data.phone,
        ...(data.email ? { email: data.email } : {}),
        delivererType: data.type,
        ...(data.branchId ? { branchId: data.branchId } : {}),
      })
      toastSuccess('Livreur enregistré avec succès.')
      onSuccess?.()
      reset()
      setTimeout(onClose, 400)
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'enregistrer le livreur. Vérifiez les informations saisies.'))
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Enregistrer un livreur" description="Nouveau livreur rattaché à l'agence">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Identité */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Informations personnelles</p>
            <div>
              <label className={cls.label}>Nom complet <span className="text-orange-500">*</span></label>
              <input
                {...register('fullName')}
                type="text"
                placeholder="ex: Bertrand Eloundou"
                className={`${cls.input} ${errors.fullName ? cls.inputError : cls.inputOk}`}
              />
              {errors.fullName && <p className={cls.error}>{errors.fullName.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cls.label}>Téléphone <span className="text-orange-500">*</span></label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+237 6XX XX XX XX"
                  className={`${cls.input} ${errors.phone ? cls.inputError : cls.inputOk}`}
                />
                {errors.phone && <p className={cls.error}>{errors.phone.message}</p>}
              </div>
              <div>
                <label className={cls.label}>Email</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="prénom.nom@agence.cm"
                  className={`${cls.input} ${errors.email ? cls.inputError : cls.inputOk}`}
                />
                {errors.email && <p className={cls.error}>{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Type de livreur */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Type de contrat</p>
            <div className="space-y-2">
              {delivererTypes.map(t => (
                <label key={t.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === t.value ? 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    {...register('type')}
                    type="radio"
                    value={t.value}
                    className="mt-0.5 accent-orange-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.label}</p>
                    <p className="text-xs text-gray-500">{t.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Affectation */}
          <div className={cls.section}>
            <p className={cls.sectionTitle}>Affectation</p>
            <div>
              <label className={cls.label}>Antenne de rattachement</label>
              <select {...register('branchId')} className={cls.select}>
                <option value="">Sélectionner une antenne (optionnel)</option>
                {branches.filter(b => b.status === 'OPEN').map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600">
              Un contrat de travail pourra être créé séparément depuis l'onglet <strong>Contrats</strong> une fois le livreur enregistré.
            </p>
          </div>

        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting || isSubmitSuccessful}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-36 justify-center ${isSubmitSuccessful ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`}>
            {isSubmitting
              ? <><Loader2 size={14} className="animate-spin" /> Enregistrement...</>
              : isSubmitSuccessful
              ? <><CheckCircle2 size={14} /> Enregistré !</>
              : 'Enregistrer'}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
