import { API_BASE_URL } from '@/lib/config';
import { formatUserError } from '@/lib/errors';
import { publicFetchJson, publicClientHeaders, publicClientJsonHeaders } from '@/lib/api/publicFetch';
import type { HubParcelStatus } from '@/lib/types';

function requireAgencyId(agencyId: string | undefined | null, context: string): string {
  const id = agencyId?.trim();
  if (!id) {
    throw {
      status: 400,
      message: `Agence manquante (${context}). Utilisez le lien fourni par l'agence.`,
    };
  }
  return id;
}

export interface TrackingHubInfo {
  hubId: string;
  hubName: string;
  hubCode: string;
  hubAddress?: string;
  hubCity?: string;
  hubOpeningHours?: string;
  hubLatitude?: number;
  hubLongitude?: number;
  hubAvailableSpace: number;
  hubCapacity: number;
}

export interface TrackingMissionInfo {
  missionId?: string;
  missionStatus?: string;
  missionScheduledAt?: string;
  missionStartedAt?: string;
  missionCompletedAt?: string;
}

export interface TrackingResult {
  trackingCode: string;
  status: HubParcelStatus;
  depositedAt: string;
  withdrawalDeadline: string;
  identityVerified: boolean;
  withdrawnBy?: string;
  updatedAt?: string;
  recipientName?: string;
  /** Présent si le Core / BFF le renvoie avec le suivi. */
  agencyId?: string;
  hub: TrackingHubInfo;
  mission?: TrackingMissionInfo;
}

interface TrackingResponseDto {
  id: string;
  hubId: string;
  missionId: string | null;
  trackingCode: string;
  status: string;
  depositedAt: string | null;
  withdrawalDeadline: string | null;
  identityVerified: boolean;
  withdrawnBy: string | null;
  updatedAt: string | null;
  agencyId?: string | null;
  hubName: string;
  hubCode: string;
  hubAddress: string | null;
  hubCity: string | null;
  hubOpeningHours: string | null;
  hubLatitude: number | null;
  hubLongitude: number | null;
  hubAvailableSpace: number;
  hubCapacity: number;
  missionStatus: string | null;
  missionScheduledAt: string | null;
  missionStartedAt: string | null;
  missionCompletedAt: string | null;
}

function mapTracking(dto: TrackingResponseDto, recipientName?: string): TrackingResult {
  return {
    trackingCode: dto.trackingCode,
    status: dto.status as HubParcelStatus,
    depositedAt: dto.depositedAt ?? '',
    withdrawalDeadline: dto.withdrawalDeadline ?? '',
    identityVerified: dto.identityVerified,
    withdrawnBy: dto.withdrawnBy ?? undefined,
    updatedAt: dto.updatedAt ?? undefined,
    recipientName,
    agencyId: typeof dto.agencyId === 'string' && dto.agencyId.trim() ? dto.agencyId.trim() : undefined,
    hub: {
      hubId: dto.hubId,
      hubName: dto.hubName,
      hubCode: dto.hubCode,
      hubAddress: dto.hubAddress ?? undefined,
      hubCity: dto.hubCity ?? undefined,
      hubOpeningHours: dto.hubOpeningHours ?? undefined,
      hubLatitude: dto.hubLatitude ?? undefined,
      hubLongitude: dto.hubLongitude ?? undefined,
      hubAvailableSpace: dto.hubAvailableSpace,
      hubCapacity: dto.hubCapacity,
    },
    mission: dto.missionStatus
      ? {
          missionId: dto.missionId ?? undefined,
          missionStatus: dto.missionStatus,
          missionScheduledAt: dto.missionScheduledAt ?? undefined,
          missionStartedAt: dto.missionStartedAt ?? undefined,
          missionCompletedAt: dto.missionCompletedAt ?? undefined,
        }
      : undefined,
  };
}

async function fetchTracking(code: string): Promise<TrackingResult> {
  const normalized = code.trim().toUpperCase();
  try {
    const dto = await publicFetchJson<TrackingResponseDto>(
      `${API_BASE_URL}/tracking/${encodeURIComponent(normalized)}`,
      { headers: publicClientHeaders() },
    );
    return mapTracking(dto);
  } catch (err) {
    const status = typeof err === 'object' && err !== null && 'status' in err
      ? (err as { status?: number }).status
      : undefined;
    if (status === 404) {
      throw {
        status: 404,
        message: `Aucun colis trouvé pour le code « ${normalized} ». Vérifiez votre numéro de suivi.`,
      };
    }
    throw {
      status: status ?? 0,
      message: formatUserError(err, 'Impossible de récupérer le suivi pour le moment. Réessayez dans quelques instants.'),
    };
  }
}

export interface ClaimResult {
  reference: string;
  message: string;
}

export interface PublicRelayHub {
  id: string;
  name: string;
  code: string;
  address?: string;
  city?: string;
  openingHours?: string;
  availableSpace: number;
  capacityUnits: number;
  latitude?: number;
  longitude?: number;
}

export interface DropOffResult {
  recordId: string;
  trackingCode: string;
  withdrawalDeadline?: string;
  hubId: string;
  message: string;
}

export const trackingService = {
  trackByCode: fetchTracking,

  async listRelayHubs(agencyId: string): Promise<PublicRelayHub[]> {
    const id = requireAgencyId(agencyId, 'liste des hubs');
    return publicFetchJson<PublicRelayHub[]>(
      `${API_BASE_URL}/agencies/${id}/relay-hubs`,
      { headers: publicClientHeaders() },
    );
  },

  async dropOff(data: {
    hubId: string;
    senderName: string;
    recipientName: string;
    recipientPhone?: string;
    trackingCode?: string;
    agencyId: string;
  }): Promise<DropOffResult> {
    const agencyId = requireAgencyId(data.agencyId, 'dépôt hub');
    try {
      return await publicFetchJson<DropOffResult>(
        `${API_BASE_URL}/agencies/${agencyId}/drop-off`,
        {
          method: 'POST',
          headers: publicClientJsonHeaders(),
          body: JSON.stringify({
            hubId: data.hubId,
            senderName: data.senderName,
            recipientName: data.recipientName,
            recipientPhone: data.recipientPhone ?? null,
            trackingCode: data.trackingCode?.trim() || null,
            missionId: null,
          }),
        },
      );
    } catch (err) {
      throw {
        status: 0,
        message: formatUserError(err, 'Impossible d\'enregistrer votre dépôt. Réessayez ou contactez l\'agence.'),
      };
    }
  },

  async submitClaim(data: {
    agencyId: string;
    trackingCode: string;
    missionId?: string;
    claimType: string;
    description: string;
    contactEmail: string;
  }): Promise<ClaimResult> {
    const agencyId = requireAgencyId(data.agencyId, 'réclamation');
    return publicFetchJson<ClaimResult>(
      `${API_BASE_URL}/agencies/${agencyId}/claims`,
      {
        method: 'POST',
        headers: publicClientJsonHeaders(),
        body: JSON.stringify({
          missionId: data.missionId ?? null,
          claimType: data.claimType,
          description: data.description,
          contactEmail: data.contactEmail,
        }),
      },
    );
  },
};
