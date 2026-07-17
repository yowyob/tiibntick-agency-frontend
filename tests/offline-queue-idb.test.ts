import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  clearScope,
  enqueueOfflineAction,
  listOfflineActions,
  listOfflineBlobsForAction,
  putOfflineBlob,
  removeOfflineAction,
  type OfflineScope,
} from '@/lib/livreur/offlineQueue'
import {
  clearSyncConflicts,
  publishSyncConflicts,
  readSyncConflicts,
} from '@/lib/livreur/syncConflicts'

const scope: OfflineScope = {
  tenantId: '11111111-1111-1111-1111-111111111111',
  agencyId: '22222222-2222-2222-2222-222222222222',
  userId: '33333333-3333-3333-3333-333333333333',
  delivererId: '44444444-4444-4444-4444-444444444444',
}

describe('Offline IndexedDB queue + blobs', () => {
  beforeEach(async () => {
    indexedDB.deleteDatabase('tnt-livreur-offline')
    await new Promise(resolve => setTimeout(resolve, 0))
  })

  it('stores POD photo/signature blobs keyed by action id', async () => {
    const action = await enqueueOfflineAction(
      {
        type: 'deliver',
        path: `/missions/m1/deliver`,
        method: 'POST',
        body: {
          delivererId: scope.delivererId,
          proofReference: 'local',
          pendingMedia: true,
        },
        aggregateId: '55555555-5555-5555-5555-555555555555',
      },
      scope,
    )

    const photo = new Blob(['photo-bytes'], { type: 'image/jpeg' })
    const signature = new Blob(['sig-bytes'], { type: 'image/png' })
    await putOfflineBlob(scope, action.id, 'photo', photo)
    await putOfflineBlob(scope, action.id, 'signature', signature)

    const blobs = await listOfflineBlobsForAction(action.id)
    expect(blobs).toHaveLength(2)
    expect(blobs.map(b => b.kind).sort()).toEqual(['photo', 'signature'])

    await removeOfflineAction(action.id)
    expect(await listOfflineActions(scope)).toHaveLength(0)
    expect(await listOfflineBlobsForAction(action.id)).toHaveLength(0)
  })

  it('scopes outbox entries per livreur session', async () => {
    await enqueueOfflineAction(
      {
        type: 'pickup',
        path: '/missions/m1/pickup',
        method: 'POST',
        body: { delivererId: scope.delivererId },
        aggregateId: '55555555-5555-5555-5555-555555555555',
      },
      scope,
    )
    const other: OfflineScope = { ...scope, delivererId: '66666666-6666-6666-6666-666666666666' }
    expect(await listOfflineActions(scope)).toHaveLength(1)
    expect(await listOfflineActions(other)).toHaveLength(0)
    await clearScope(scope)
    expect(await listOfflineActions(scope)).toHaveLength(0)
  })
})

describe('Sync conflict snapshot', () => {
  beforeEach(() => {
    const mem = new Map<string, string>()
    vi.stubGlobal('sessionStorage', {
      getItem: (key: string) => mem.get(key) ?? null,
      setItem: (key: string, value: string) => {
        mem.set(key, value)
      },
      removeItem: (key: string) => {
        mem.delete(key)
      },
      clear: () => mem.clear(),
      key: () => null,
      length: 0,
    })
    vi.stubGlobal('window', {
      dispatchEvent: () => true,
    })
    clearSyncConflicts()
  })

  it('persists conflicts in sessionStorage for the banner', () => {
    publishSyncConflicts([
      {
        aggregateType: 'MISSION',
        aggregateId: '55555555-5555-5555-5555-555555555555',
        resolution: 'SERVER_WINS',
      },
    ])
    const snapshot = readSyncConflicts()
    expect(snapshot?.conflicts).toHaveLength(1)
    expect(snapshot?.conflicts[0].resolution).toBe('SERVER_WINS')
    clearSyncConflicts()
    expect(readSyncConflicts()).toBeNull()
  })
})
