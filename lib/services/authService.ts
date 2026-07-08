import { API_BASE_URL } from '@/lib/config';
import { unwrapApiData } from '@/lib/api/envelope';
import { setAuthCookie, clearAuthCookie } from '@/lib/auth-session';
import { formatUserError } from '@/lib/errors';
import { claimRoles, claimString, hasRole, isPlatformAdmin, parseJwtPayload } from '@/lib/jwt';
import { yowAuthService, type AuthChallenge } from '@/lib/yowauthService';

export interface AuthSession {
  accessToken: string;
  agencyId: string | null;
  tenantId: string;
  userId: string;
  email: string;
  displayName: string;
  role: string;
  sharedSessionToken?: string;
  agencyStatus: string;
  agencyActive: boolean;
}

export interface MfaPending {
  mfaToken: string;
  mfaChannel?: string;
  codePreview?: string | null;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
}

function persistSession(result: AuthSession): void {
  localStorage.setItem('tnt-token', result.accessToken);
  localStorage.setItem('tnt-tenant-id', result.tenantId);
  if (result.agencyId) {
    localStorage.setItem('tnt-agency-id', result.agencyId);
  } else {
    localStorage.removeItem('tnt-agency-id');
  }
  localStorage.setItem('tnt-user-id', result.userId);
  localStorage.setItem('tnt-user-email', result.email);
  localStorage.setItem('tnt-user-role', result.role);
  if (result.sharedSessionToken) {
    localStorage.setItem('tnt-shared-session', result.sharedSessionToken);
  } else {
    localStorage.removeItem('tnt-shared-session');
  }
  localStorage.setItem('tnt-agency-status', result.agencyStatus);
  localStorage.setItem('tnt-agency-active', String(result.agencyActive));
  setAuthCookie(result.accessToken);
}

function sessionFromToken(tokens: {
  accessToken: string;
  tenantId?: string;
  userId?: string;
  email?: string;
  role?: string;
  sharedSessionToken?: string;
}): AuthSession {
  const claims = parseJwtPayload(tokens.accessToken);
  const roles = claimRoles(claims);
  const primaryRole = tokens.role
    || roles.find(r => r.startsWith('ROLE_'))?.replace(/^ROLE_/, '')
    || roles[0]
    || 'AGENCY_MANAGER';

  return {
    accessToken: tokens.accessToken,
    tenantId: tokens.tenantId || claimString(claims, 'tid', 'tenantId'),
    userId: tokens.userId || claimString(claims, 'sub', 'userId'),
    email: tokens.email || claimString(claims, 'email'),
    displayName: claimString(claims, 'name', 'email') || tokens.email || '',
    role: primaryRole,
    sharedSessionToken: tokens.sharedSessionToken,
    agencyId: claimString(claims, 'aid', 'agencyId') || null,
    agencyStatus: 'PENDING_VALIDATION',
    agencyActive: false,
  };
}

async function enrichFromAgency(session: AuthSession): Promise<AuthSession> {
  const res = await fetch(`${API_BASE_URL}/auth/session`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'X-Tenant-Id': session.tenantId,
      'X-User-Id': session.userId,
      'X-Agency-Id': session.agencyId ?? '',
      'X-User-Email': session.email,
    },
  });
  if (!res.ok) return session;
  const data = unwrapApiData<{
    agencyId?: string;
    agencyStatus?: string;
    agencyActive?: boolean;
    role?: string;
  }>(await res.json());
  return {
    ...session,
    agencyId: data.agencyId ?? session.agencyId,
    agencyStatus: data.agencyStatus ?? session.agencyStatus,
    agencyActive: Boolean(data.agencyActive),
    role: data.role ?? session.role,
  };
}

function assertAuthenticated(challenge: AuthChallenge, fallbackEmail: string): AuthSession {
  if (challenge.status === 'MFA_REQUIRED') {
    const err = new Error('MFA_REQUIRED') as Error & { mfa?: MfaPending };
    err.mfa = {
      mfaToken: challenge.mfaToken ?? '',
      mfaChannel: challenge.mfaChannel,
      codePreview: challenge.codePreview,
    };
    throw err;
  }
  if (challenge.status === 'EMAIL_VERIFICATION_REQUIRED') {
    throw new Error(
      'Compte créé. Vérifiez votre email avant de vous connecter.',
    );
  }
  return sessionFromToken({
    accessToken: challenge.accessToken!,
    tenantId: challenge.tenantId,
    userId: challenge.userId,
    email: challenge.email ?? fallbackEmail,
    role: challenge.role,
  });
}

async function finalizeSession(session: AuthSession): Promise<AuthSession> {
  const enriched = await enrichFromAgency(session);
  persistSession(enriched);
  return enriched;
}

export const authService = {
  async signup(payload: SignupRequest): Promise<AuthSession> {
    const challenge = await yowAuthService.signup(payload);
    const session = assertAuthenticated(challenge, payload.email);
    return finalizeSession(session);
  },

  async login(credentials: LoginRequest): Promise<AuthSession> {
    const challenge = await yowAuthService.login(credentials.email, credentials.password);
    const session = assertAuthenticated(challenge, credentials.email);
    return finalizeSession(session);
  },

  async confirmMfa(mfaToken: string, code: string, fallbackEmail = ''): Promise<AuthSession> {
    const challenge = await yowAuthService.confirmMfa(mfaToken, code);
    const session = assertAuthenticated(challenge, fallbackEmail);
    return finalizeSession(session);
  },

  async adminConfirmMfa(mfaToken: string, code: string, email: string): Promise<AuthSession> {
    const session = await authService.confirmMfa(mfaToken, code, email);
    const roles = claimRoles(parseJwtPayload(session.accessToken));
    if (!isPlatformAdmin(roles) && session.role !== 'TNT_ADMIN') {
      throw new Error('Ce compte n\'a pas les droits administrateur TiiBnTick.');
    }
    const adminSession: AuthSession = {
      ...session,
      role: 'TNT_ADMIN',
      agencyStatus: 'ACTIVE',
      agencyActive: true,
    };
    persistSession(adminSession);
    return adminSession;
  },

  async adminLogin(credentials: LoginRequest): Promise<AuthSession> {
    let session: AuthSession;
    try {
      session = await authService.login(credentials);
    } catch (err) {
      if (err instanceof Error && err.message === 'MFA_REQUIRED') throw err;
      throw err;
    }
    const roles = claimRoles(parseJwtPayload(session.accessToken));
    if (!isPlatformAdmin(roles) && session.role !== 'TNT_ADMIN') {
      throw new Error('Ce compte n\'a pas les droits administrateur TiiBnTick.');
    }
    const adminSession: AuthSession = {
      ...session,
      role: 'TNT_ADMIN',
      agencyStatus: 'ACTIVE',
      agencyActive: true,
    };
    persistSession(adminSession);
    return adminSession;
  },

  async refreshSession(): Promise<AuthSession | null> {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('tnt-token');
    const tenantId = localStorage.getItem('tnt-tenant-id');
    const userId = localStorage.getItem('tnt-user-id');
    if (!token || !tenantId || !userId) return null;

    let session = sessionFromToken({
      accessToken: token,
      tenantId,
      userId,
      email: localStorage.getItem('tnt-user-email') ?? '',
      role: localStorage.getItem('tnt-user-role') ?? '',
    });
    session = await enrichFromAgency(session);
    if (session.accessToken) persistSession(session);
    return session;
  },

  logout(): void {
    localStorage.removeItem('tnt-token');
    localStorage.removeItem('tnt-tenant-id');
    localStorage.removeItem('tnt-agency-id');
    localStorage.removeItem('tnt-user-id');
    localStorage.removeItem('tnt-user-email');
    localStorage.removeItem('tnt-user-role');
    localStorage.removeItem('tnt-shared-session');
    localStorage.removeItem('tnt-agency-status');
    localStorage.removeItem('tnt-agency-active');
    clearAuthCookie();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('tnt-token');
  },

  isAgencyActive(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('tnt-agency-active') === 'true';
  },

  getAgencyStatus(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('tnt-agency-status') ?? '';
  },

  getRole(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('tnt-user-role') ?? '';
  },

  isAdmin(): boolean {
    const role = this.getRole();
    if (role === 'TNT_ADMIN') return true;
    const token = typeof window !== 'undefined' ? localStorage.getItem('tnt-token') : null;
    if (!token) return false;
    return isPlatformAdmin(claimRoles(parseJwtPayload(token)));
  },
};

export function isMfaRequiredError(err: unknown): err is Error & { mfa: MfaPending } {
  return err instanceof Error && err.message === 'MFA_REQUIRED' && 'mfa' in err;
}
