import { describe, expect, it } from 'vitest'

import {
  corePayloadFor,
  toCoreType,
  type OfflineAction,
} from '@/lib/livreur/offlineQueue'
import { offlineActionToOperation } from '@/lib/livreur/syncService'

describe('Offline Core contracts', () => {
  it('maps livreur actions to Core OfflineOpType values', () => {
    expect(toCoreType('pickup')).toBe('MISSION_STATUS_UPDATE')
    expect(toCoreType('deliver')).toBe('DELIVERY_CONFIRMATION')
    expect(toCoreType('anomaly')).toBe('ANOMALY_REPORT')
    expect(toCoreType('deposit-hub')).toBe('HUB_DEPOSIT')
    expect(toCoreType('location')).toBe('GPS_UPDATE')
  })

  it('builds push payloads compatible with Agency Sync', () => {
    const action: OfflineAction = {
      id: 'op-1',
      scopeKey: 'livreur:t:a:u:d',
      type: 'pickup',
      coreType: 'MISSION_STATUS_UPDATE',
      aggregateType: 'MISSION',
      aggregateId: 'mission-1',
      path: '/missions/mission-1/pickup',
      method: 'POST',
      body: { delivererId: 'del-1' },
      createdAt: '2026-07-17T10:00:00.000Z',
      sequenceNumber: 3,
      idempotencyKey: 'op-1',
      status: 'PENDING',
      retryCount: 0,
    }

    expect(corePayloadFor(action)).toEqual({
      action: 'PICKUP',
      delivererId: 'del-1',
      trackingCode: null,
    })

    expect(offlineActionToOperation(action, 99)).toMatchObject({
      id: 'op-1',
      type: 'MISSION_STATUS_UPDATE',
      aggregateType: 'MISSION',
      aggregateId: 'mission-1',
      sequenceNumber: 3,
    })
  })
})
