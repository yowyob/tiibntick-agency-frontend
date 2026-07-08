'use client'

import {
  AlertCircle, CheckCircle2, Clock, GitBranch, Package, Truck, UserCheck,
} from 'lucide-react'
import { missionStatusLabel, parcelStatusLabel } from '@/lib/displayLabels'
import type { TrackingResult } from '@/lib/services/trackingService'
import type { LucideIcon } from 'lucide-react'

type StepState = 'done' | 'active' | 'pending' | 'error' | 'warning'

interface TimelineStep {
  id: string
  label: string
  detail?: string
  icon: LucideIcon
  state: StepState
}

const MISSION_ORDER = ['PENDING', 'ASSIGNED', 'IN_TRANSIT', 'AT_HUB', 'DELIVERED'] as const

function missionIndex(status?: string): number {
  if (!status) return -1
  const idx = MISSION_ORDER.indexOf(status as typeof MISSION_ORDER[number])
  if (idx >= 0) return idx
  if (status === 'FAILED' || status === 'CANCELLED') return 2
  return -1
}

function buildSteps(parcel: TrackingResult): TimelineStep[] {
  const steps: TimelineStep[] = []
  const mission = parcel.mission
  const parcelStatus = parcel.status
  const mIdx = missionIndex(mission?.missionStatus)

  if (mission?.missionStatus) {
    const failed = mission.missionStatus === 'FAILED' || mission.missionStatus === 'CANCELLED'

    steps.push({
      id: 'mission-created',
      label: 'Demande enregistrée',
      detail: mission.missionScheduledAt
        ? formatDate(mission.missionScheduledAt)
        : undefined,
      icon: Package,
      state: mIdx >= 0 ? 'done' : 'pending',
    })

    steps.push({
      id: 'assigned',
      label: missionStatusLabel('ASSIGNED'),
      icon: UserCheck,
      state: failed ? 'error' : mIdx >= 1 ? 'done' : mIdx === 0 ? 'active' : 'pending',
    })

    steps.push({
      id: 'in-transit',
      label: missionStatusLabel('IN_TRANSIT'),
      detail: mission.missionStartedAt ? formatDate(mission.missionStartedAt) : undefined,
      icon: Truck,
      state: failed ? 'error' : mIdx >= 2 ? 'done' : mIdx === 1 ? 'active' : 'pending',
    })
  }

  const hubStepState: StepState =
    parcelStatus === 'EXPIRED' ? 'error'
    : parcelStatus === 'RETURNED_TO_AGENCY' ? 'warning'
    : parcelStatus === 'WITHDRAWN' || mIdx >= 3 || parcelStatus === 'DEPOSITED' ? (
      parcelStatus === 'DEPOSITED' ? 'active' : 'done'
    ) : mIdx === 2 ? 'active' : 'pending'

  steps.push({
    id: 'at-hub',
    label: 'Disponible au point relais',
    detail: parcel.depositedAt ? formatDate(parcel.depositedAt) : undefined,
    icon: GitBranch,
    state: hubStepState,
  })

  if (parcelStatus === 'DEPOSITED' && parcel.withdrawalDeadline) {
    steps.push({
      id: 'pickup-deadline',
      label: 'Retrait avant le',
      detail: formatDate(parcel.withdrawalDeadline),
      icon: Clock,
      state: 'active',
    })
  }

  const withdrawnState: StepState =
    parcelStatus === 'WITHDRAWN' ? 'done'
    : parcelStatus === 'EXPIRED' ? 'error'
    : parcelStatus === 'RETURNED_TO_AGENCY' ? 'warning'
    : 'pending'

  steps.push({
    id: 'withdrawn',
    label: parcelStatus === 'WITHDRAWN'
      ? parcelStatusLabel('WITHDRAWN')
      : parcelStatus === 'EXPIRED'
        ? parcelStatusLabel('EXPIRED')
        : parcelStatus === 'RETURNED_TO_AGENCY'
          ? parcelStatusLabel('RETURNED_TO_AGENCY')
          : 'En attente de retrait',
    detail: parcel.withdrawnBy
      ? `Retiré par ${parcel.withdrawnBy}`
      : parcel.updatedAt && parcelStatus === 'WITHDRAWN'
        ? formatDate(parcel.updatedAt)
        : undefined,
    icon: parcelStatus === 'EXPIRED' ? AlertCircle : CheckCircle2,
    state: withdrawnState,
  })

  return steps
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
}

function stateStyles(state: StepState) {
  switch (state) {
    case 'done':
      return { circle: 'bg-emerald-500 border-emerald-500', line: 'bg-emerald-300', text: 'text-gray-900', detail: 'text-emerald-600' }
    case 'active':
      return { circle: 'bg-orange-500 border-orange-500', line: 'bg-gray-100', text: 'text-gray-900', detail: 'text-orange-600' }
    case 'error':
      return { circle: 'bg-red-500 border-red-500', line: 'bg-red-200', text: 'text-red-800', detail: 'text-red-600' }
    case 'warning':
      return { circle: 'bg-amber-500 border-amber-500', line: 'bg-amber-200', text: 'text-amber-900', detail: 'text-amber-700' }
    default:
      return { circle: 'bg-white border-gray-200', line: 'bg-gray-100', text: 'text-gray-400', detail: 'text-gray-400' }
  }
}

interface Props {
  parcel: TrackingResult
}

export default function TrackTimeline({ parcel }: Props) {
  const steps = buildSteps(parcel)

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const styles = stateStyles(step.state)
        const Icon = step.icon
        const iconColor = step.state === 'pending' ? 'text-gray-300' : 'text-white'

        return (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${styles.circle}`}>
                <Icon size={15} className={iconColor} />
              </div>
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-8 mt-1 ${styles.line}`} />
              )}
            </div>
            <div className="pt-1.5 pb-5 min-w-0">
              <p className={`text-sm font-semibold ${styles.text}`}>{step.label}</p>
              {step.detail && (
                <p className={`text-xs mt-0.5 ${styles.detail}`}>{step.detail}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
