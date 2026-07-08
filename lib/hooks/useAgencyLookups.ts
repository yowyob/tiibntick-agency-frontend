'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAgencyId } from '@/lib/session';
import { branchService } from '@/lib/services/branchService';
import { staffService } from '@/lib/services/staffService';
import { fleetService } from '@/lib/services/fleetService';
import { hubService } from '@/lib/services/hubService';
import { missionService } from '@/lib/services/missionService';
import { formatUserError } from '@/lib/errors';
import { delivererDisplayName } from '@/lib/displayLabels';
import type { Branch, Deliverer, Vehicle, Hub, StaffMember, Mission } from '@/lib/types';

export interface AgencyLookups {
  branches: Branch[];
  deliverers: Deliverer[];
  vehicles: Vehicle[];
  hubs: Hub[];
  staff: StaffMember[];
  missions: Mission[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAgencyLookups(agencyId?: string): AgencyLookups {
  const resolvedId = agencyId ?? getAgencyId();
  const [state, setState] = useState<Omit<AgencyLookups, 'refetch'>>({
    branches: [],
    deliverers: [],
    vehicles: [],
    hubs: [],
    staff: [],
    missions: [],
    loading: true,
    error: null,
  });

  const refetch = useCallback(() => {
    if (!resolvedId) {
      setState(s => ({ ...s, loading: false, error: 'Agence non identifiée.' }));
      return;
    }
    setState(s => ({ ...s, loading: true, error: null }));
    Promise.all([
      branchService.getBranches(resolvedId),
      staffService.getDeliverers(resolvedId),
      fleetService.getVehicles(resolvedId),
      hubService.getHubs(resolvedId),
      staffService.getStaffMembers(resolvedId),
      missionService.getMissions(resolvedId),
    ])
      .then(([branches, deliverers, vehicles, hubs, staff, missions]) => {
        setState({ branches, deliverers, vehicles, hubs, staff, missions, loading: false, error: null });
      })
      .catch(e => {
        setState(s => ({
          ...s,
          loading: false,
          error: formatUserError(e, 'Impossible de charger les données de référence.'),
        }));
      });
  }, [resolvedId]);

  useEffect(() => { refetch(); }, [refetch]);

  return { ...state, refetch };
}

export function delivererLabel(deliverers: Deliverer[], id?: string): string {
  if (!id) return '—';
  return delivererDisplayName(deliverers.find(d => d.id === id)?.fullName);
}

export function missionsForBranch(missions: Mission[], deliverers: Deliverer[], branchId: string): Mission[] {
  const delivererIds = new Set(deliverers.filter(d => d.branchId === branchId).map(d => d.id));
  return missions.filter(
    m => m.branchId === branchId || (m.delivererId != null && delivererIds.has(m.delivererId)),
  );
}
