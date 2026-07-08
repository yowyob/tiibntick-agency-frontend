import { API_BASE_URL } from '@/lib/config';
import { unwrapApiData } from '@/lib/api/envelope';
import { formatUserError } from '@/lib/errors';

export interface YowAuthTokens {
  accessToken: string;
  tenantId: string;
  userId: string;
  email: string;
  role: string;
  sharedSessionToken?: string;
}

export interface AuthChallenge {
  status: 'AUTHENTICATED' | 'MFA_REQUIRED' | 'EMAIL_VERIFICATION_REQUIRED';
  accessToken?: string;
  tenantId?: string;
  userId?: string;
  email?: string;
  role?: string;
  sharedSessionToken?: string;
  mfaToken?: string;
  mfaChannel?: string;
  codePreview?: string | null;
}

interface AuthOutcomeResponse {
  status: string;
  accessToken?: string;
  tenantId?: string;
  userId?: string;
  email?: string;
  role?: string;
  sharedSessionToken?: string;
  mfaToken?: string;
  mfaChannel?: string;
  codePreview?: string | null;
}

async function agencyAuthPost(path: string, body: unknown): Promise<AuthOutcomeResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Impossible de joindre le serveur Agency. Vérifiez que tnt-agency est démarré.');
  }

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = payload?.error?.message ?? payload?.message ?? '';
    throw new Error(formatUserError({ message }, 'Authentification impossible.'));
  }

  return unwrapApiData<AuthOutcomeResponse>(payload);
}

function toChallenge(data: AuthOutcomeResponse, fallbackEmail: string): AuthChallenge {
  if (data.status === 'EMAIL_VERIFICATION_REQUIRED') {
    return {
      status: 'EMAIL_VERIFICATION_REQUIRED',
      email: data.email ?? fallbackEmail,
    };
  }

  if (data.status === 'MFA_REQUIRED') {
    return {
      status: 'MFA_REQUIRED',
      mfaToken: data.mfaToken,
      mfaChannel: data.mfaChannel,
      codePreview: data.codePreview ?? null,
    };
  }

  const accessToken = data.accessToken ?? '';
  if (!accessToken) {
    throw new Error('Réponse auth invalide : token manquant.');
  }

  return {
    status: 'AUTHENTICATED',
    accessToken,
    tenantId: data.tenantId ?? '',
    userId: data.userId ?? '',
    email: data.email ?? fallbackEmail,
    role: data.role ?? '',
    sharedSessionToken: data.sharedSessionToken,
  };
}

export function challengeToTokens(challenge: AuthChallenge, fallbackEmail: string): YowAuthTokens {
  if (challenge.status === 'MFA_REQUIRED') {
    const err = new Error('MFA_REQUIRED') as Error & {
      mfa: { mfaToken: string; mfaChannel?: string; codePreview?: string | null };
    };
    err.mfa = {
      mfaToken: challenge.mfaToken ?? '',
      mfaChannel: challenge.mfaChannel,
      codePreview: challenge.codePreview,
    };
    throw err;
  }
  if (challenge.status === 'EMAIL_VERIFICATION_REQUIRED') {
    throw new Error('Compte créé. Vérifiez votre email avant de vous connecter.');
  }
  if (challenge.status !== 'AUTHENTICATED' || !challenge.accessToken) {
    throw new Error('Authentification incomplète.');
  }
  return {
    accessToken: challenge.accessToken,
    tenantId: challenge.tenantId ?? '',
    userId: challenge.userId ?? '',
    email: challenge.email ?? fallbackEmail,
    role: challenge.role ?? '',
    sharedSessionToken: challenge.sharedSessionToken,
  };
}

export function isMfaRequiredError(err: unknown): err is Error & {
  mfa: { mfaToken: string; mfaChannel?: string; codePreview?: string | null };
} {
  return err instanceof Error && err.message === 'MFA_REQUIRED' && 'mfa' in err;
}

export const yowAuthService = {
  async login(email: string, password: string): Promise<AuthChallenge> {
    const data = await agencyAuthPost('/auth/login', { email, password });
    return toChallenge(data, email);
  },

  async signup(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationName: string;
  }): Promise<AuthChallenge> {
    const data = await agencyAuthPost('/auth/signup', payload);
    return toChallenge(data, payload.email);
  },

  async confirmMfa(mfaToken: string, code: string): Promise<AuthChallenge> {
    const data = await agencyAuthPost('/auth/login/mfa/confirm', { mfaToken, code });
    return toChallenge(data, '');
  },

  /** Rétrocompat — propage MFA / email verification. */
  async loginTokens(email: string, password: string): Promise<YowAuthTokens> {
    return challengeToTokens(await yowAuthService.login(email, password), email);
  },
};
