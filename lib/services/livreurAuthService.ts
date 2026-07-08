import { formatUserError } from '@/lib/errors';
import { unwrapApiData } from '@/lib/api/envelope';
import { API_BASE_URL } from '@/lib/config';
import { yowAuthService, challengeToTokens, isMfaRequiredError, type AuthChallenge } from '@/lib/yowauthService';
import { claimRoles, claimString, hasRole, parseJwtPayload } from '@/lib/jwt';
import {
  livreurFetch,
  saveLivreurSession,
  clearLivreurSession,
  getLivreurSession,
  type LivreurSession,
} from '@/lib/livreur/api';
import { mapDeliverer, mapMission } from '@/lib/api/mappers';
import type { DelivererDto, MissionDto } from '@/lib/api/dto';
import type { Deliverer, DelivererStatus, Mission } from '@/lib/types';
import { enqueueOfflineAction, flushOfflineQueue, listOfflineActions, removeOfflineAction, type OfflineAction } from '@/lib/livreur/offlineQueue';
import { livreurSyncService } from '@/lib/livreur/syncService';
import { livreurMediaService } from '@/lib/services/livreurMediaService';

export type { LivreurSession };

export const livreurAuthService = {
  async login(email: string, password: string): Promise<LivreurSession> {
    const challenge = await yowAuthService.login(email, password);
    return livreurAuthService.completeLogin(challenge, email);
  },

  async confirmMfa(mfaToken: string, code: string, email: string): Promise<LivreurSession> {
    const challenge = await yowAuthService.confirmMfa(mfaToken, code);
    return livreurAuthService.completeLogin(challenge, email);
  },

  async completeLogin(challenge: AuthChallenge, email: string): Promise<LivreurSession> {
    const tokens = challengeToTokens(challenge, email);
    const claims = parseJwtPayload(tokens.accessToken);
    const roles = claimRoles(claims);
    if (!hasRole(roles, 'PERMANENT_DELIVERER') && !hasRole(roles, 'DELIVERER')) {
      throw new Error('Ce compte n\'a pas les droits livreur.');
    }

    const userId = claimString(claims, 'sub', 'userId', 'uid') || tokens.userId;

    const res = await fetch(`${API_BASE_URL}/auth/livreur/session`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'X-Tenant-Id': tokens.tenantId,
        'X-User-Id': userId,
        'X-Agency-Id': '',
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(formatUserError(
        { status: res.status, message: (body as { message?: string })?.message ?? '' },
        'Profil livreur introuvable pour ce compte.',
      ));
    }

    const data = unwrapApiData<{
      tenantId: string;
      agencyId: string;
      delivererId: string;
      delivererName: string;
    }>(await res.json());

    const session: LivreurSession = {
      token: tokens.accessToken,
      delivererId: data.delivererId,
      delivererName: data.delivererName,
      tenantId: data.tenantId,
      agencyId: data.agencyId,
      userId,
    };
    saveLivreurSession(session);
    return session;
  },

  isMfaRequiredError,

  logout() {
    clearLivreurSession();
    window.location.href = '/livreur/login';
  },

  isAuthenticated(): boolean {
    return !!getLivreurSession()?.token;
  },

  getCurrentDelivererId(): string | null {
    return getLivreurSession()?.delivererId ?? null;
  },

  getCurrentDelivererName(): string | null {
    return getLivreurSession()?.delivererName ?? null;
  },

  getAgencyId(): string | null {
    return getLivreurSession()?.agencyId ?? null;
  },
};

export const livreurMissionService = {
  async getMyMissions(delivererId: string): Promise<Mission[]> {
    const dtos = await livreurFetch<MissionDto[]>(`/deliverers/${delivererId}/missions`);
    return dtos.map(mapMission);
  },

  async getMission(missionId: string): Promise<Mission> {
    const dto = await livreurFetch<MissionDto>(`/missions/${missionId}`);
    return mapMission(dto);
  },

  async getMyProfile(delivererId: string): Promise<Deliverer> {
    const dto = await livreurFetch<DelivererDto>(`/deliverers/${delivererId}`);
    const session = getLivreurSession();
    const mapped = mapDeliverer(dto);
    if (!mapped.fullName && session?.delivererName) {
      mapped.fullName = session.delivererName;
    }
    return mapped;
  },

  async setAvailability(delivererId: string, status: 'AVAILABLE' | 'OFFLINE'): Promise<Deliverer> {
    const dto = await livreurFetch<DelivererDto>(`/deliverers/${delivererId}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return mapDeliverer(dto);
  },

  async confirmPickup(missionId: string, trackingCode?: string): Promise<void> {
    const delivererId = livreurAuthService.getCurrentDelivererId();
    if (!delivererId) throw new Error('Session expirée');
    const body = { delivererId, trackingCode: trackingCode ?? undefined };
    try {
      await livreurFetch(`/missions/${missionId}/pickup`, {
        method: 'POST',
        body: JSON.stringify({ delivererId }),
      });
    } catch (err) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        await enqueueOfflineAction({
          type: 'pickup',
          path: `/missions/${missionId}/pickup`,
          method: 'POST',
          body: { delivererId },
        });
        return;
      }
      throw err;
    }
    void body;
  },

  async confirmDelivery(missionId: string, proofReference: string): Promise<void> {
    const delivererId = livreurAuthService.getCurrentDelivererId();
    if (!delivererId) throw new Error('Session expirée');
    const body = { delivererId, proofReference };
    try {
      await livreurFetch(`/missions/${missionId}/deliver`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        await enqueueOfflineAction({
          type: 'deliver',
          path: `/missions/${missionId}/deliver`,
          method: 'POST',
          body,
        });
        return;
      }
      throw err;
    }
  },

  async confirmDeliveryWithProof(
    missionId: string,
    proof: { photoBlob?: Blob; signatureDataUrl?: string; otpCode?: string },
  ): Promise<string> {
    let photoUrl: string | undefined;
    let signatureUrl: string | undefined;

    if (proof.photoBlob) {
      photoUrl = await livreurMediaService.uploadDeliveryPhoto(proof.photoBlob, missionId);
    }
    if (proof.signatureDataUrl) {
      signatureUrl = await livreurMediaService.uploadSignature(proof.signatureDataUrl, missionId);
    }

    const proofReference = livreurMediaService.buildProofReference({
      photoUrl,
      signatureUrl,
      otpCode: proof.otpCode,
    });
    await this.confirmDelivery(missionId, proofReference);
    return proofReference;
  },

  async reportIssue(missionId: string, reason: string, fatal = false): Promise<void> {
    const delivererId = livreurAuthService.getCurrentDelivererId();
    if (!delivererId) throw new Error('Session expirée');
    const body = {
      delivererId,
      anomalyType: 'OTHER',
      description: reason,
      fatal,
    };
    try {
      await livreurFetch(`/missions/${missionId}/anomaly`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        await enqueueOfflineAction({
          type: 'anomaly',
          path: `/missions/${missionId}/anomaly`,
          method: 'POST',
          body,
        });
        return;
      }
      throw err;
    }
  },

  async syncOfflineQueue(): Promise<number> {
    const pending = await listOfflineActions();
    let synced = 0;

    if (pending.length > 0) {
      const operations = pending.map((action, i) =>
        livreurSyncService.offlineActionToOperation(action, i + 1),
      );
      const pushToken = await livreurSyncService.push(operations);
      if (pushToken) {
        for (const action of pending) {
          await removeOfflineAction(action.id);
        }
        synced = pending.length;
      } else {
        synced = await flushOfflineQueue(async (action: OfflineAction) => {
          await livreurFetch(action.path, {
            method: action.method,
            body: JSON.stringify(action.body),
          });
        });
      }
    }

    const pull = await livreurSyncService.pull(['MISSION', 'PACKAGE']);
    if (pull && pull.changes.length > 0 && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livreur-sync-pull', { detail: pull }));
    }

    return synced;
  },
};

export type { DelivererStatus };
