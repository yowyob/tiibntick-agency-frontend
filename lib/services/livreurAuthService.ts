import { formatUserError } from '@/lib/errors';
import { unwrapApiData } from '@/lib/api/envelope';
import { API_BASE_URL } from '@/lib/config';
import { yowAuthService, challengeToTokens, isMfaRequiredError, type AuthChallenge } from '@/lib/yowauthService';
import { claimString, parseJwtPayload } from '@/lib/jwt';
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
import {
  acknowledgeOfflineActions,
  clearScope,
  deleteOfflineBlobsForAction,
  enqueueOfflineAction,
  flushOfflineQueue,
  listOfflineActions,
  listOfflineBlobsForAction,
  putOfflineBlob,
  scopeKey,
  updateOfflineAction,
  type OfflineAction,
  type OfflineScope,
} from '@/lib/livreur/offlineQueue';
import { livreurSyncService } from '@/lib/livreur/syncService';
import { clearSyncConflicts, publishSyncConflicts } from '@/lib/livreur/syncConflicts';
import { livreurMediaService } from '@/lib/services/livreurMediaService';
import { livreurReadModel } from '@/lib/offline/readModel';

export type { LivreurSession };

function currentScope(): OfflineScope | null {
  const session = getLivreurSession();
  if (!session?.tenantId || !session.agencyId || !session.userId || !session.delivererId) return null;
  return {
    tenantId: session.tenantId,
    agencyId: session.agencyId,
    userId: session.userId,
    delivererId: session.delivererId,
  };
}

function requireScope(): OfflineScope {
  const scope = currentScope();
  if (!scope) throw new Error('Session expirée');
  return scope;
}

function isOfflineError(err: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true;
  if (err instanceof TypeError) return true;
  if (err instanceof Error && /connexion|network|fetch|Failed to fetch/i.test(err.message)) return true;
  return false;
}

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
    const role = tokens.role.replace(/^ROLE_/, '');
    if (role !== 'PERMANENT_DELIVERER' && role !== 'DELIVERER') {
      throw new Error('Ce compte n\'a pas les droits livreur.');
    }

    const userId = claimString(claims, 'sub', 'userId', 'uid') || tokens.userId;

    const res = await fetch(`${API_BASE_URL}/auth/livreur/session`, {
      headers: {
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
    const scope = currentScope();
    if (scope) {
      void clearScope(scope);
      void livreurReadModel.clear(scopeKey(scope));
    }
    clearLivreurSession();
    void fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      keepalive: true,
    });
    window.location.href = '/livreur/login';
  },

  isAuthenticated(): boolean {
    return getLivreurSession() !== null;
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
    const scope = currentScope();
    try {
      const dtos = await livreurFetch<MissionDto[]>(`/deliverers/${delivererId}/missions`);
      const missions = dtos.map(mapMission);
      if (scope) await livreurReadModel.saveMissions(scopeKey(scope), missions);
      return missions;
    } catch (err) {
      if (scope && isOfflineError(err)) {
        const cached = await livreurReadModel.getMissions(scopeKey(scope));
        if (cached.length > 0) return cached;
      }
      throw err;
    }
  },

  async getMission(missionId: string): Promise<Mission> {
    const scope = currentScope();
    try {
      const dto = await livreurFetch<MissionDto>(`/missions/${missionId}`);
      const mission = mapMission(dto);
      if (scope) await livreurReadModel.upsertMission(scopeKey(scope), mission);
      return mission;
    } catch (err) {
      if (scope && isOfflineError(err)) {
        const cached = (await livreurReadModel.getMissions(scopeKey(scope)))
          .find(mission => mission.id === missionId);
        if (cached) return cached;
      }
      throw err;
    }
  },

  async getMyProfile(delivererId: string): Promise<Deliverer> {
    const scope = currentScope();
    try {
      const dto = await livreurFetch<DelivererDto>(`/deliverers/${delivererId}`);
      const session = getLivreurSession();
      const mapped = mapDeliverer(dto);
      if (!mapped.fullName && session?.delivererName) {
        mapped.fullName = session.delivererName;
      }
      if (scope) await livreurReadModel.saveProfile(scopeKey(scope), mapped);
      return mapped;
    } catch (err) {
      if (scope && isOfflineError(err)) {
        const cached = await livreurReadModel.getProfile(scopeKey(scope), delivererId);
        if (cached) return cached;
      }
      throw err;
    }
  },

  async setAvailability(delivererId: string, status: 'AVAILABLE' | 'OFFLINE'): Promise<Deliverer> {
    const dto = await livreurFetch<DelivererDto>(`/deliverers/${delivererId}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return mapDeliverer(dto);
  },

  async confirmPickup(missionId: string, trackingCode?: string): Promise<void> {
    const scope = requireScope();
    const body = {
      delivererId: scope.delivererId,
      trackingCode: trackingCode ?? undefined,
    };
    try {
      await livreurFetch(`/missions/${missionId}/pickup`, {
        method: 'POST',
        body: JSON.stringify({ delivererId: scope.delivererId }),
      });
    } catch (err) {
      if (isOfflineError(err)) {
        await enqueueOfflineAction({
          type: 'pickup',
          path: `/missions/${missionId}/pickup`,
          method: 'POST',
          body: { delivererId: scope.delivererId },
          aggregateId: missionId,
        }, scope);
        return;
      }
      throw err;
    }
    void body;
  },

  async confirmDelivery(missionId: string, proofReference: string): Promise<void> {
    const scope = requireScope();
    const body = { delivererId: scope.delivererId, proofReference };
    try {
      await livreurFetch(`/missions/${missionId}/deliver`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (isOfflineError(err)) {
        await enqueueOfflineAction({
          type: 'deliver',
          path: `/missions/${missionId}/deliver`,
          method: 'POST',
          body,
          aggregateId: missionId,
        }, scope);
        return;
      }
      throw err;
    }
  },

  async confirmDeliveryWithProof(
    missionId: string,
    proof: { photoBlob?: Blob; signatureDataUrl?: string; otpCode?: string },
  ): Promise<string> {
    const scope = requireScope();
    try {
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
    } catch (err) {
      if (!isOfflineError(err)) throw err;
      const localProof = livreurMediaService.buildProofReference({
        photoUrl: proof.photoBlob ? `local-photo:${missionId}` : undefined,
        signatureUrl: proof.signatureDataUrl ? `local-signature:${missionId}` : undefined,
        otpCode: proof.otpCode,
      });
      const queued = await enqueueOfflineAction({
        type: 'deliver',
        path: `/missions/${missionId}/deliver`,
        method: 'POST',
        body: {
          delivererId: scope.delivererId,
          proofReference: localProof,
          otpCode: proof.otpCode,
          pendingMedia: Boolean(proof.photoBlob || proof.signatureDataUrl),
        },
        aggregateId: missionId,
      }, scope);
      if (proof.photoBlob) {
        await putOfflineBlob(scope, queued.id, 'photo', proof.photoBlob);
      }
      if (proof.signatureDataUrl) {
        const signatureBlob = await livreurMediaService.dataUrlToBlob(proof.signatureDataUrl);
        await putOfflineBlob(scope, queued.id, 'signature', signatureBlob);
      }
      return localProof;
    }
  },

  async reportIssue(missionId: string, reason: string, fatal = false): Promise<void> {
    const scope = requireScope();
    const body = {
      delivererId: scope.delivererId,
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
      if (isOfflineError(err)) {
        await enqueueOfflineAction({
          type: 'anomaly',
          path: `/missions/${missionId}/anomaly`,
          method: 'POST',
          body,
          aggregateId: missionId,
        }, scope);
        return;
      }
      throw err;
    }
  },

  async syncOfflineQueue(): Promise<number> {
    const scope = currentScope();
    if (!scope) return 0;
    let pending = await listOfflineActions(scope);
    let synced = 0;

    if (pending.length > 0) {
      pending = await Promise.all(pending.map(action => resolvePendingDeliveryMedia(action, scope)));
      const pushable = pending.filter(
        action => !(action.type === 'deliver' && action.body.pendingMedia),
      );
      if (pushable.length === 0) {
        return 0;
      }
      const operations = pushable.map((action, i) =>
        livreurSyncService.offlineActionToOperation(action, action.sequenceNumber || i + 1),
      );
      const pushResult = await livreurSyncService.push(operations, scope);
      if (pushResult && (pushResult.conflictsDetected ?? 0) > 0) {
        publishSyncConflicts(pushResult.conflicts ?? []);
      } else if (pushResult) {
        clearSyncConflicts();
      }

      if (pushResult && pushResult.operationsApplied > 0 && pushResult.conflictsDetected === 0) {
        await acknowledgeOfflineActions(pushable.map(action => action.id));
        synced = pushable.length;
      } else if (
        pushResult &&
        pushResult.conflictsDetected === 0 &&
        pushResult.nextSyncToken &&
        pushResult.operationsSubmitted === pushable.length
      ) {
        await acknowledgeOfflineActions(pushable.map(action => action.id));
        synced = pushable.length;
      } else if (!pushResult || pushResult.conflictsDetected === 0) {
        synced = await flushOfflineQueue(async (action: OfflineAction) => {
          if (action.type === 'deliver' && action.body.pendingMedia) {
            throw new Error('Médias de preuve encore en attente d’upload');
          }
          const prepared = await resolvePendingDeliveryMedia(action, scope);
          if (prepared.type === 'deliver' && prepared.body.pendingMedia) {
            throw new Error('Médias de preuve encore en attente d’upload');
          }
          await livreurFetch(prepared.path, {
            method: prepared.method,
            body: JSON.stringify(
              prepared.type === 'deliver'
                ? {
                    delivererId: prepared.body.delivererId,
                    proofReference: prepared.body.proofReference,
                  }
                : prepared.type === 'pickup'
                  ? { delivererId: prepared.body.delivererId }
                  : prepared.body,
            ),
          });
        }, scope);
      }
    }

    const pull = await livreurSyncService.pull(['MISSION', 'PACKAGE', 'DELIVERER'], scope);
    if (pull && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livreur-sync-pull', { detail: pull }));
      try {
        await this.getMyMissions(scope.delivererId);
      } catch {
        // Keep cached missions if revalidation fails.
      }
    }

    return synced;
  },
};

async function resolvePendingDeliveryMedia(
  action: OfflineAction,
  _scope: OfflineScope,
): Promise<OfflineAction> {
  if (action.type !== 'deliver' || !action.body.pendingMedia) return action;

  try {
    let photoUrl: string | undefined;
    let signatureUrl: string | undefined;
    const blobs = await listOfflineBlobsForAction(action.id);
    for (const record of blobs) {
      if (record.kind === 'photo') {
        photoUrl = await livreurMediaService.uploadDeliveryPhoto(record.blob, action.aggregateId);
      } else if (record.kind === 'signature') {
        signatureUrl = await livreurMediaService.uploadSignatureBlob(record.blob, action.aggregateId);
      }
    }

    if (!signatureUrl && typeof action.body.signatureDataUrl === 'string') {
      signatureUrl = await livreurMediaService.uploadSignature(
        action.body.signatureDataUrl,
        action.aggregateId,
      );
    }

    const next: OfflineAction = {
      ...action,
      body: {
        ...action.body,
        proofReference: livreurMediaService.buildProofReference({
          photoUrl,
          signatureUrl,
          otpCode: typeof action.body.otpCode === 'string' ? action.body.otpCode : undefined,
        }),
        pendingMedia: false,
      },
    };
    delete next.body.signatureDataUrl;
    await updateOfflineAction(next);
    await deleteOfflineBlobsForAction(action.id);
    return next;
  } catch {
    // Keep local media until connectivity allows upload.
    return action;
  }
}

export type { DelivererStatus };
