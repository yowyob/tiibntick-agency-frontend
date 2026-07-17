import type { Deliverer, Hub, Mission } from '@/lib/types'
import type { BranchOperationalData } from '@/lib/services/branchOperationsService'

const DB_NAME = 'tnt-agency-read-model'
const STORE = 'entities'
const META = 'meta'
const DB_VERSION = 1

type EntityKind = 'mission' | 'hub' | 'deliverer' | 'branchSnapshot'

interface EntityRecord {
  key: string
  scopeKey: string
  kind: EntityKind
  id: string
  data: unknown
  fetchedAt: string
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB indisponible'))
      return
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'key' })
        store.createIndex('byScopeKind', ['scopeKey', 'kind'], { unique: false })
      }
      if (!db.objectStoreNames.contains(META)) {
        db.createObjectStore(META, { keyPath: 'key' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function txDone(tx: IDBTransaction): Promise<void> {
  await new Promise<void>((res, rej) => {
    tx.oncomplete = () => res()
    tx.onerror = () => rej(tx.error)
    tx.onabort = () => rej(tx.error ?? new Error('IndexedDB abort'))
  })
}

function entityKey(scopeKey: string, kind: EntityKind, id: string): string {
  return `${scopeKey}|${kind}|${id}`
}

async function putMany(
  scopeKey: string,
  kind: EntityKind,
  items: Array<{ id: string; data: unknown }>,
  replace = true,
): Promise<void> {
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    if (replace) {
      const index = store.index('byScopeKind')
      const existing = await new Promise<EntityRecord[]>((res, rej) => {
        const req = index.getAll([scopeKey, kind])
        req.onsuccess = () => res((req.result as EntityRecord[]) || [])
        req.onerror = () => rej(req.error)
      })
      for (const row of existing) store.delete(row.key)
    }
    const fetchedAt = new Date().toISOString()
    for (const item of items) {
      store.put({
        key: entityKey(scopeKey, kind, item.id),
        scopeKey,
        kind,
        id: item.id,
        data: item.data,
        fetchedAt,
      } satisfies EntityRecord)
    }
    await txDone(tx)
  } finally {
    db.close()
  }
}

async function listKind<T>(scopeKey: string, kind: EntityKind): Promise<T[]> {
  if (typeof indexedDB === 'undefined') return []
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readonly')
    const index = tx.objectStore(STORE).index('byScopeKind')
    const rows = await new Promise<EntityRecord[]>((res, rej) => {
      const req = index.getAll([scopeKey, kind])
      req.onsuccess = () => res((req.result as EntityRecord[]) || [])
      req.onerror = () => rej(req.error)
    })
    await txDone(tx)
    return rows.map(row => row.data as T)
  } finally {
    db.close()
  }
}

async function setMeta(scopeKey: string, value: Record<string, unknown>): Promise<void> {
  const db = await openDb()
  try {
    const tx = db.transaction(META, 'readwrite')
    tx.objectStore(META).put({ key: scopeKey, ...value, updatedAt: new Date().toISOString() })
    await txDone(tx)
  } finally {
    db.close()
  }
}

async function getMeta(scopeKey: string): Promise<Record<string, unknown> | null> {
  if (typeof indexedDB === 'undefined') return null
  const db = await openDb()
  try {
    const tx = db.transaction(META, 'readonly')
    const row = await new Promise<Record<string, unknown> | undefined>((res, rej) => {
      const req = tx.objectStore(META).get(scopeKey)
      req.onsuccess = () => res(req.result as Record<string, unknown> | undefined)
      req.onerror = () => rej(req.error)
    })
    await txDone(tx)
    return row ?? null
  } finally {
    db.close()
  }
}

export const livreurReadModel = {
  async saveMissions(scopeKey: string, missions: Mission[]): Promise<void> {
    await putMany(
      scopeKey,
      'mission',
      missions.map(mission => ({ id: mission.id, data: mission })),
      true,
    )
    await setMeta(scopeKey, { lastMissionsRefreshAt: new Date().toISOString() })
  },

  async getMissions(scopeKey: string): Promise<Mission[]> {
    return listKind<Mission>(scopeKey, 'mission')
  },

  async upsertMission(scopeKey: string, mission: Mission): Promise<void> {
    await putMany(scopeKey, 'mission', [{ id: mission.id, data: mission }], false)
  },

  async saveProfile(scopeKey: string, profile: Deliverer): Promise<void> {
    await putMany(scopeKey, 'deliverer', [{ id: profile.id, data: profile }], true)
  },

  async getProfile(scopeKey: string, delivererId: string): Promise<Deliverer | null> {
    const profiles = await listKind<Deliverer>(scopeKey, 'deliverer')
    return profiles.find(profile => profile.id === delivererId) ?? profiles[0] ?? null
  },

  async saveHubs(scopeKey: string, hubs: Hub[]): Promise<void> {
    await putMany(
      scopeKey,
      'hub',
      hubs.map(hub => ({ id: hub.id, data: hub })),
      true,
    )
  },

  async getHubs(scopeKey: string): Promise<Hub[]> {
    return listKind<Hub>(scopeKey, 'hub')
  },

  async clear(scopeKey: string): Promise<void> {
    const db = await openDb()
    try {
      const tx = db.transaction([STORE, META], 'readwrite')
      const store = tx.objectStore(STORE)
      const all = await new Promise<EntityRecord[]>((res, rej) => {
        const req = store.getAll()
        req.onsuccess = () => res((req.result as EntityRecord[]) || [])
        req.onerror = () => rej(req.error)
      })
      for (const row of all) {
        if (row.scopeKey === scopeKey) store.delete(row.key)
      }
      tx.objectStore(META).delete(scopeKey)
      await txDone(tx)
    } finally {
      db.close()
    }
  },

  async freshness(scopeKey: string): Promise<string | null> {
    const meta = await getMeta(scopeKey)
    return typeof meta?.lastMissionsRefreshAt === 'string' ? meta.lastMissionsRefreshAt : null
  },
}

export const branchReadModel = {
  async saveSnapshot(scopeKey: string, data: BranchOperationalData): Promise<void> {
    await putMany(
      scopeKey,
      'branchSnapshot',
      [{ id: data.branch.id, data }],
      true,
    )
    await setMeta(scopeKey, { lastBranchRefreshAt: new Date().toISOString() })
  },

  async getSnapshot(scopeKey: string): Promise<BranchOperationalData | null> {
    const rows = await listKind<BranchOperationalData>(scopeKey, 'branchSnapshot')
    return rows[0] ?? null
  },

  async clear(scopeKey: string): Promise<void> {
    await livreurReadModel.clear(scopeKey)
  },

  async freshness(scopeKey: string): Promise<string | null> {
    const meta = await getMeta(scopeKey)
    return typeof meta?.lastBranchRefreshAt === 'string' ? meta.lastBranchRefreshAt : null
  },
}
