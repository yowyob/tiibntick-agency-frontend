'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Drawer from './Drawer'
import { useAgencyLookups } from '@/lib/hooks/useAgencyLookups'
import { STAFF_ROLE_LABELS } from '@/lib/staff-utils'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'
import { staffService } from '@/lib/services/staffService'
import { getAgencyId } from '@/lib/session'
import type { StaffRole } from '@/lib/types'

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
  role: z.enum(['AGENCY_MANAGER', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER', 'ACCOUNTANT', 'DISPATCHER']),
  branchId: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props { open: boolean; onClose: () => void; onSuccess?: () => void }

const staffRoles: { value: StaffRole; label: string; desc: string }[] = [
  { value: 'AGENCY_MANAGER', label: STAFF_ROLE_LABELS.AGENCY_MANAGER, desc: 'Direction générale de l\'agence' },
  { value: 'BRANCH_MANAGER', label: STAFF_ROLE_LABELS.BRANCH_MANAGER, desc: 'Responsable d\'une antenne' },
  { value: 'OPERATIONS_MANAGER', label: STAFF_ROLE_LABELS.OPERATIONS_MANAGER, desc: 'Supervision des opérations' },
  { value: 'ACCOUNTANT', label: STAFF_ROLE_LABELS.ACCOUNTANT, desc: 'Comptabilité et facturation' },
  { value: 'DISPATCHER', label: STAFF_ROLE_LABELS.DISPATCHER, desc: 'Affectation et suivi des missions' },
]

export default function CreateStaffMemberForm({ open, onClose, onSuccess }: Props) {
  const { branches } = useAgencyLookups()
  const { success: toastSuccess, error: toastError } = useToast()
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', phone: '', email: '', role: 'BRANCH_MANAGER', branchId: '' },
  })

  const selectedRole = watch('role')

  const onSubmit = async (data: FormValues) => {
    try {
      await staffService.registerStaffMember(getAgencyId(), {
        fullName: data.fullName,
        phone: data.phone,
        ...(data.email ? { email: data.email } : {}),
        role: data.role,
        ...(data.branchId ? { branchId: data.branchId } : {}),
      })
      toastSuccess('Membre du personnel enregistré.')
      onSuccess?.()
      reset()
      setTimeout(onClose, 400)
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'enregistrer ce membre du personnel.'))
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Ajouter un membre du personnel" description="Manager, comptable, dispatcher…">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          <div className={cls.section}>
            <p className={cls.sectionTitle}>Informations personnelles</p>
            <div>
              <label className={cls.label}>Nom complet <span className="text-orange-500">*</span></label>
              <input
                {...register('fullName')}
                type="text"
                placeholder="ex: Pauline Nguema"
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
                  placeholder="p.nguema@rapidexpress.cm"
                  className={`${cls.input} ${errors.email ? cls.inputError : cls.inputOk}`}
                />
                {errors.email && <p className={cls.error}>{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <div className={cls.section}>
            <p className={cls.sectionTitle}>Rôle et rattachement</p>
            <div>
              <label className={cls.label}>Fonction <span className="text-orange-500">*</span></label>
              <select {...register('role')} className={cls.select}>
                {staffRoles.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                {staffRoles.find(r => r.value === selectedRole)?.desc}
              </p>
            </div>

            {(selectedRole === 'BRANCH_MANAGER' || selectedRole === 'DISPATCHER') && (
              <div>
                <label className={cls.label}>Antenne de rattachement</label>
                <select {...register('branchId')} className={cls.select}>
                  <option value="">Non assigné pour l&apos;instant</option>
                  {branches.filter(b => b.status === 'OPEN').map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isSubmitSuccessful}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-28 justify-center ${
              isSubmitSuccessful ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'
            } disabled:opacity-70`}
          >
            {isSubmitting ? (
              <><Loader2 size={14} className="animate-spin" /> Enregistrement...</>
            ) : isSubmitSuccessful ? (
              <><CheckCircle2 size={14} /> Enregistré !</>
            ) : (
              'Enregistrer'
            )}
          </button>
        </div>
      </form>
    </Drawer>
  )
}
