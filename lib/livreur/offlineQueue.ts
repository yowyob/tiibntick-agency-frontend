const DB_NAME = 'tnt-livreur-offline'
const STORE = 'actions'
const META_STORE = 'metadata'
const BLOB_STORE = 'blobs'
const DB_VERSION = 3

export type OfflineActionType =
  | 'pickup'
  | 'deliver'
  | 'anomaly'
  | 'deposit-hub'
  | 'location'

/** Types Core OfflineOpType acceptés par tnt-sync-core. */
export type CoreOfflineOpType =
  | 'MISSION_STATUS_UPDATE'
  | 'DELIVERY_CONFIRMATION'
  | 'ANOMALY_REPORT'
  | 'HUB_DEPOSIT'
  | 'GPS_UPDATE'

export interface OfflineScope {
  tenantId: string
  agencyId: string
  userId: string
  delivererId: string
}

export interface OfflineAction {
  id: string
  scopeKey: string
  type: OfflineActionType
  coreType: CoreOfflineOpType
  aggregateType: 'MISSION' | 'PACKAGE' | 'GPS'
  aggregateId: string
  path: string
  method: string
  body: Record<string, unknown>
  createdAt: string
  sequenceNumber: number
  idempotencyKey: string
  status: 'PENDING' | 'FAILED'
  retryCount: number
  lastError?: string
}

export function scopeKey(scope: OfflineScope): string {
  return `livreur:${scope.tenantId}:${scope.agencyId}:${scope.userId}:${scope.delivererId}`
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB indisponible'))
      return
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (event) => {
      const db = req.result
      const oldVersion = event.oldVersion
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' })
        store.createIndex('scopeKey', 'scopeKey', { unique: false })
        store.createIndex('byScopeSeq', ['scopeKey', 'sequenceNumber'], { unique: false })
      } else if (oldVersion < 2) {
        const store = req.transaction!.objectStore(STORE)
        if (!store.indexNames.contains('scopeKey')) {
          store.createIndex('scopeKey', 'scopeKey', { unique: false })
        }
        if (!store.indexNames.contains('byScopeSeq')) {
          store.createIndex('byScopeSeq', ['scopeKey', 'sequenceNumber'], { unique: false })
        }
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'key' })
      }
      if (!db.objectStoreNames.contains(BLOB_STORE)) {
        const blobs = db.createObjectStore(BLOB_STORE, { keyPath: 'id' })
        blobs.createIndex('scopeKey', 'scopeKey', { unique: false })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function withStore<T>(
  mode: IDBTransactionMode,
  storeName: string,
  run: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>,
): Promise<T> {
  const db = await openDb()
  try {
    const tx = db.transaction(storeName, mode)
    const store = tx.objectStore(storeName)
    const result = await Promise.resolve(run(store)).then(
      value =>
        value instanceof IDBRequest
          ? new Promise<T>((res, rej) => {
              value.onsuccess = () => res(value.result)
              value.onerror = () => rej(value.error)
            })
          : value,
    )
    await new Promise<void>((res, rej) => {
      tx.oncomplete = () => res()
      tx.onerror = () => rej(tx.error)
      tx.onabort = () => rej(tx.error ?? new Error('IndexedDB abort'))
    })
    return result
  } finally {
    db.close()
  }
}

function migrateLegacy(action: Record<string, unknown>, scope: OfflineScope): OfflineAction {
  const type = (action.type as OfflineActionType) || 'pickup'
  const path = String(action.path || '')
  const aggregateId =
    path.match(/\/missions\/([^/]+)/)?.[1] ||
    path.match(/\/deliverers\/([^/]+)/)?.[1] ||
    String(action.id || crypto.randomUUID())
  return {
    id: String(action.id || crypto.randomUUID()),
    scopeKey: scopeKey(scope),
    type,
    coreType: toCoreType(type),
    aggregateType: type === 'location' ? 'GPS' : type === 'deposit-hub' ? 'PACKAGE' : 'MISSION',
    aggregateId,
    path,
    method: String(action.method || 'POST'),
    body: (action.body as Record<string, unknown>) || {},
    createdAt: String(action.createdAt || new Date().toISOString()),
    sequenceNumber: Number(action.sequenceNumber || 0),
    idempotencyKey: String(action.idempotencyKey || action.id || crypto.randomUUID()),
    status: 'PENDING',
    retryCount: Number(action.retryCount || 0),
    lastError: typeof action.lastError === 'string' ? action.lastError : undefined,
  }
}

export function toCoreType(type: OfflineActionType): CoreOfflineOpType {
  switch (type) {
    case 'pickup':
      return 'MISSION_STATUS_UPDATE'
    case 'deliver':
      return 'DELIVERY_CONFIRMATION'
    case 'anomaly':
      return 'ANOMALY_REPORT'
    case 'deposit-hub':
      return 'HUB_DEPOSIT'
    case 'location':
      return 'GPS_UPDATE'
  }
}

export function corePayloadFor(action: OfflineAction): Record<string, unknown> {
  const body = action.body
  switch (action.coreType) {
    case 'MISSION_STATUS_UPDATE':
      return {
        action: 'PICKUP',
        delivererId: body.delivererId,
        trackingCode: body.trackingCode ?? null,
      }
    case 'DELIVERY_CONFIRMATION':
      return {
        delivererId: body.delivererId,
        proofReference: body.proofReference ?? null,
      }
    case 'ANOMALY_REPORT':
      return {
        delivererId: body.delivererId,
        anomalyType: body.anomalyType ?? 'OTHER',
        description: body.description ?? '',
        fatal: Boolean(body.fatal),
      }
    case 'HUB_DEPOSIT':
      return {
        delivererId: body.delivererId,
        hubId: body.hubId,
        trackingCode: body.trackingCode ?? null,
      }
    case 'GPS_UPDATE':
      return {
        delivererId: body.delivererId ?? action.aggregateId,
        missionId: body.missionId ?? null,
        latitude: body.latitude,
        longitude: body.longitude,
        accuracyMeters: body.accuracyMeters ?? 0,
        speedKmh: body.speedKmh ?? 0,
        bearing: body.bearing ?? 0,
        timestamp: body.recordedAt ?? action.createdAt,
      }
  }
}

async function nextSequence(scope: OfflineScope): Promise<number> {
  const key = `${scopeKey(scope)}:seq`
  const current = await withStore<{ key: string; value: number } | undefined>(
    'readwrite',
    META_STORE,
    store => store.get(key),
  )
  const next = (current?.value ?? 0) + 1
  await withStore('readwrite', META_STORE, store => {
    store.put({ key, value: next })
    return Promise.resolve(next)
  })
  return next
}

export async function getSyncToken(scope: OfflineScope): Promise<string | null> {
  if (typeof indexedDB === 'undefined') return null
  const key = `${scopeKey(scope)}:syncToken`
  const row = await withStore<{ key: string; value: string } | undefined>(
    'readonly',
    META_STORE,
    store => store.get(key),
  )
  return row?.value ?? null
}

export async function saveSyncToken(scope: OfflineScope, token: string | null | undefined): Promise<void> {
  if (typeof indexedDB === 'undefined' || !token) return
  const key = `${scopeKey(scope)}:syncToken`
  await withStore('readwrite', META_STORE, store => {
    store.put({ key, value: token })
    return Promise.resolve(undefined)
  })
}

export async function getOrCreateDeviceId(scope: OfflineScope): Promise<string> {
  if (typeof indexedDB === 'undefined') return 'livreur-pwa'
  const key = `${scopeKey(scope)}:deviceId`
  const existing = await withStore<{ key: string; value: string } | undefined>(
    'readonly',
    META_STORE,
    store => store.get(key),
  )
  if (existing?.value) return existing.value
  const deviceId = `livreur-${crypto.randomUUID()}`
  await withStore('readwrite', META_STORE, store => {
    store.put({ key, value: deviceId })
    return Promise.resolve(undefined)
  })
  return deviceId
}

export async function enqueueOfflineAction(
  action: Omit<OfflineAction, 'id' | 'createdAt' | 'scopeKey' | 'coreType' | 'aggregateType' | 'aggregateId' | 'sequenceNumber' | 'idempotencyKey' | 'status' | 'retryCount'> & {
    aggregateId?: string
  },
  scope: OfflineScope,
): Promise<OfflineAction> {
  if (typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB indisponible')
  }
  const id = crypto.randomUUID()
  const sequenceNumber = await nextSequence(scope)
  const aggregateId =
    action.aggregateId ||
    action.path.match(/\/missions\/([^/]+)/)?.[1] ||
    action.path.match(/\/deliverers\/([^/]+)/)?.[1] ||
    id
  const record: OfflineAction = {
    id,
    scopeKey: scopeKey(scope),
    type: action.type,
    coreType: toCoreType(action.type),
    aggregateType: action.type === 'location' ? 'GPS' : action.type === 'deposit-hub' ? 'PACKAGE' : 'MISSION',
    aggregateId,
    path: action.path,
    method: action.method,
    body: action.body,
    createdAt: new Date().toISOString(),
    sequenceNumber,
    idempotencyKey: id,
    status: 'PENDING',
    retryCount: 0,
  }

  if (action.type === 'location') {
    await coalesceLocation(scope, record)
    return record
  }

  await withStore('readwrite', STORE, store => {
    store.put(record)
    return Promise.resolve(undefined)
  })
  return record
}

async function coalesceLocation(scope: OfflineScope, next: OfflineAction): Promise<void> {
  const pending = await listOfflineActions(scope)
  const previous = pending.find(
    item => item.type === 'location' && item.aggregateId === next.aggregateId && item.status === 'PENDING',
  )
  if (previous) {
    next.id = previous.id
    next.sequenceNumber = previous.sequenceNumber
    next.idempotencyKey = previous.idempotencyKey
    next.createdAt = previous.createdAt
  }
  await withStore('readwrite', STORE, store => {
    store.put(next)
    return Promise.resolve(undefined)
  })
}

export async function listOfflineActions(scope?: OfflineScope): Promise<OfflineAction[]> {
  if (typeof indexedDB === 'undefined') return []
  const items = await withStore<unknown[]>('readonly', STORE, store => store.getAll())
  const mapped = items.map(item => {
    const row = item as Record<string, unknown>
    if (scope && !row.scopeKey) return migrateLegacy(row, scope)
    return row as unknown as OfflineAction
  })
  const filtered = scope
    ? mapped.filter(item => item.scopeKey === scopeKey(scope) || !item.scopeKey)
    : mapped
  return filtered.sort((a, b) =>
    a.sequenceNumber === b.sequenceNumber
      ? a.createdAt.localeCompare(b.createdAt)
      : a.sequenceNumber - b.sequenceNumber,
  )
}

export async function removeOfflineAction(id: string): Promise<void> {
  if (typeof indexedDB === 'undefined') return
  await deleteOfflineBlobsForAction(id)
  await withStore('readwrite', STORE, store => {
    store.delete(id)
    return Promise.resolve(undefined)
  })
}

export async function updateOfflineAction(action: OfflineAction): Promise<void> {
  if (typeof indexedDB === 'undefined') return
  await withStore('readwrite', STORE, store => {
    store.put(action)
    return Promise.resolve(undefined)
  })
}

export async function acknowledgeOfflineActions(ids: string[]): Promise<void> {
  for (const id of ids) {
    await removeOfflineAction(id)
  }
}

export async function markOfflineActionFailed(id: string, message: string): Promise<void> {
  if (typeof indexedDB === 'undefined') return
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const existing = await new Promise<OfflineAction | undefined>((res, rej) => {
      const req = store.get(id)
      req.onsuccess = () => res(req.result as OfflineAction | undefined)
      req.onerror = () => rej(req.error)
    })
    if (!existing) return
    store.put({
      ...existing,
      status: 'FAILED',
      retryCount: (existing.retryCount || 0) + 1,
      lastError: message,
    })
    await new Promise<void>((res, rej) => {
      tx.oncomplete = () => res()
      tx.onerror = () => rej(tx.error)
    })
  } finally {
    db.close()
  }
}

export async function countOfflineActions(scope?: OfflineScope): Promise<number> {
  const items = await listOfflineActions(scope)
  return items.length
}

export interface OfflineBlobRecord {
  id: string
  scopeKey: string
  actionId: string
  kind: 'photo' | 'signature'
  mimeType: string
  blob: Blob
  createdAt: string
}

export async function putOfflineBlob(
  scope: OfflineScope,
  actionId: string,
  kind: 'photo' | 'signature',
  blob: Blob,
): Promise<OfflineBlobRecord> {
  if (typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB indisponible')
  }
  const record: OfflineBlobRecord = {
    id: `${actionId}:${kind}`,
    scopeKey: scopeKey(scope),
    actionId,
    kind,
    mimeType: blob.type || (kind === 'signature' ? 'image/png' : 'image/jpeg'),
    blob,
    createdAt: new Date().toISOString(),
  }
  await withStore('readwrite', BLOB_STORE, store => {
    store.put(record)
    return Promise.resolve(undefined)
  })
  return record
}

export async function listOfflineBlobsForAction(actionId: string): Promise<OfflineBlobRecord[]> {
  if (typeof indexedDB === 'undefined') return []
  const items = await withStore<OfflineBlobRecord[]>('readonly', BLOB_STORE, store => store.getAll())
  return items.filter(item => item.actionId === actionId)
}

export async function deleteOfflineBlobsForAction(actionId: string): Promise<void> {
  if (typeof indexedDB === 'undefined') return
  const items = await listOfflineBlobsForAction(actionId)
  await withStore('readwrite', BLOB_STORE, store => {
    for (const item of items) store.delete(item.id)
    return Promise.resolve(undefined)
  })
}

export async function clearScope(scope: OfflineScope): Promise<void> {
  if (typeof indexedDB === 'undefined') return
  const key = scopeKey(scope)
  const items = await listOfflineActions(scope)
  await withStore('readwrite', STORE, store => {
    for (const item of items) {
      if (item.scopeKey === key || !item.scopeKey) store.delete(item.id)
    }
    return Promise.resolve(undefined)
  })
  const blobs = await withStore<OfflineBlobRecord[]>('readonly', BLOB_STORE, store => store.getAll())
  await withStore('readwrite', BLOB_STORE, store => {
    for (const blob of blobs) {
      if (blob.scopeKey === key) store.delete(blob.id)
    }
    return Promise.resolve(undefined)
  })
  await withStore('readwrite', META_STORE, store => {
    for (const suffix of ['syncToken', 'seq', 'deviceId']) {
      store.delete(`${key}:${suffix}`)
    }
    return Promise.resolve(undefined)
  })
}

export async function flushOfflineQueue(
  send: (action: OfflineAction) => Promise<void>,
  scope?: OfflineScope,
): Promise<number> {
  const pending = await listOfflineActions(scope)
  let synced = 0
  for (const action of pending) {
    try {
      await send(action)
      await removeOfflineAction(action.id)
      synced++
    } catch (err) {
      await markOfflineActionFailed(
        action.id,
        err instanceof Error ? err.message : 'Échec de synchronisation',
      )
      break
    }
  }
  return synced
}
