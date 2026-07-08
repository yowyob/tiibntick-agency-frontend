import type { YowyobApp } from '@/lib/services/yowyobIntegrationService';

const HRM_ROLES = new Set(['AGENCY_MANAGER', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER', 'ACCOUNTANT']);
const FINANCE_ROLES = new Set(['AGENCY_MANAGER', 'BRANCH_MANAGER', 'ACCOUNTANT']);

export function canLaunchYowyobApp(app: YowyobApp, role: string): boolean {
  const normalized = role.trim().toUpperCase();
  if (!normalized) return false;
  if (app === 'HRM') return HRM_ROLES.has(normalized);
  return FINANCE_ROLES.has(normalized);
}
