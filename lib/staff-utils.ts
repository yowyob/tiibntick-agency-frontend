import type { StaffMember, StaffRole } from '@/lib/types'

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  AGENCY_MANAGER: 'Directeur d\'agence',
  BRANCH_MANAGER: 'Responsable d\'antenne',
  OPERATIONS_MANAGER: 'Responsable opérations',
  ACCOUNTANT: 'Comptable',
  DISPATCHER: 'Dispatcher',
}

/** Rôles éligibles comme responsable d'une antenne */
export const BRANCH_MANAGER_ROLES: StaffRole[] = [
  'AGENCY_MANAGER',
  'BRANCH_MANAGER',
  'OPERATIONS_MANAGER',
]

export function getEligibleBranchManagers(members: StaffMember[]): StaffMember[] {
  return members.filter(
    m => m.status === 'ACTIVE' && BRANCH_MANAGER_ROLES.includes(m.role),
  )
}

export function staffMemberToManagerFields(member: StaffMember | undefined) {
  if (!member) {
    return { managerId: undefined, managerName: undefined, managerEmail: undefined, managerPhone: undefined }
  }
  return {
    managerId: member.id,
    managerName: member.fullName,
    managerEmail: member.email,
    managerPhone: member.phone,
  }
}
