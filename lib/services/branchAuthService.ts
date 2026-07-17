import { yowAuthService, challengeToTokens, isMfaRequiredError, type AuthChallenge } from '@/lib/yowauthService';
import { API_BASE_URL } from '@/lib/config';
import { formatUserError } from '@/lib/errors';
import { unwrapApiData } from '@/lib/api/envelope';
import type { Branch } from '@/lib/types';

const TOKEN_KEY = 'tnt-branch-token';
const TENANT_KEY = 'tnt-branch-tenant-id';
const AGENCY_KEY = 'tnt-branch-agency-id';
const BRANCH_ID_KEY = 'tnt-branch-id';
const MANAGER_ID_KEY = 'tnt-branch-manager-id';
const MANAGER_NAME_KEY = 'tnt-branch-manager-name';
const BRANCH_NAME_KEY = 'tnt-branch-name';
const EMAIL_KEY = 'tnt-branch-email';

export interface BranchSession {
  branchId: string;
  managerId: string;
  managerName: string;
  branchName: string;
  agencyId: string;
  tenantId: string;
}

export const branchAuthService = {
  async login(email: string, password: string): Promise<Branch> {
    const challenge = await yowAuthService.login(email, password);
    return branchAuthService.completeLogin(challenge, email);
  },

  async confirmMfa(mfaToken: string, code: string, email: string): Promise<Branch> {
    const challenge = await yowAuthService.confirmMfa(mfaToken, code);
    return branchAuthService.completeLogin(challenge, email);
  },

  async completeLogin(challenge: AuthChallenge, email: string): Promise<Branch> {
    const tokens = challengeToTokens(challenge, email);
    const role = tokens.role.replace(/^ROLE_/, '');
    if (role !== 'BRANCH_MANAGER' && role !== 'AGENCY_MANAGER') {
      throw new Error('Ce compte n\'a pas les droits responsable d\'antenne.');
    }

    const res = await fetch(`${API_BASE_URL}/auth/branch/session`, {
      headers: {
        'X-Tenant-Id': tokens.tenantId,
        'X-User-Id': tokens.userId,
        'X-User-Email': email,
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(formatUserError(
        { status: res.status, message: body?.message ?? '' },
        'Impossible de résoudre votre antenne. Contactez l\'administrateur agence.',
      ));
    }

    const data = unwrapApiData<{
      tenantId: string;
      agencyId: string;
      managerId: string;
      branchId: string;
      branchName: string;
      managerName: string;
      managerEmail: string;
    }>(await res.json());

    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem('tnt-branch-session-active', 'true');
    localStorage.setItem(TENANT_KEY, data.tenantId);
    localStorage.setItem(AGENCY_KEY, data.agencyId);
    localStorage.setItem(BRANCH_ID_KEY, data.branchId);
    localStorage.setItem(MANAGER_ID_KEY, data.managerId);
    localStorage.setItem(MANAGER_NAME_KEY, data.managerName);
    localStorage.setItem(BRANCH_NAME_KEY, data.branchName);
    localStorage.setItem(EMAIL_KEY, data.managerEmail || email);
    localStorage.setItem('tnt-branch-user-id', tokens.userId);
    localStorage.setItem('tnt-branch-user-role', 'BRANCH_MANAGER');
    localStorage.removeItem('tnt-shared-session');

    return {
      id: data.branchId,
      agencyId: data.agencyId,
      name: data.branchName,
      address: '',
      city: '',
      isHeadquarters: false,
      managerId: data.managerId,
      managerName: data.managerName,
      status: 'OPEN',
      openingHours: '',
      deliverersCount: 0,
      createdAt: '',
    };
  },

  isMfaRequiredError,

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('tnt-branch-session-active');
    localStorage.removeItem(TENANT_KEY);
    localStorage.removeItem(AGENCY_KEY);
    localStorage.removeItem(BRANCH_ID_KEY);
    localStorage.removeItem(MANAGER_ID_KEY);
    localStorage.removeItem(MANAGER_NAME_KEY);
    localStorage.removeItem(BRANCH_NAME_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem('tnt-branch-user-id');
    localStorage.removeItem('tnt-branch-user-role');
    localStorage.removeItem('tnt-shared-session');
    void fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      keepalive: true,
    });
    window.location.href = '/branch/login';
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('tnt-branch-session-active') === 'true';
  },

  getSession(): BranchSession | null {
    if (typeof window === 'undefined') return null;
    if (localStorage.getItem('tnt-branch-session-active') !== 'true') return null;
    return {
      branchId: localStorage.getItem(BRANCH_ID_KEY) ?? '',
      managerId: localStorage.getItem(MANAGER_ID_KEY) ?? '',
      managerName: localStorage.getItem(MANAGER_NAME_KEY) ?? '',
      branchName: localStorage.getItem(BRANCH_NAME_KEY) ?? '',
      agencyId: localStorage.getItem(AGENCY_KEY) ?? '',
      tenantId: localStorage.getItem(TENANT_KEY) ?? '',
    };
  },

  getCurrentBranchId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(BRANCH_ID_KEY);
  },

  getAgencyId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AGENCY_KEY);
  },
};
