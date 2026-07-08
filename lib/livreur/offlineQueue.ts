const DB_NAME = 'tnt-livreur-offline';
const STORE = 'actions';
const DB_VERSION = 1;

export type OfflineActionType =
  | 'pickup'
  | 'deliver'
  | 'anomaly'
  | 'deposit-hub'
  | 'location';

export interface OfflineAction {
  id: string;
  type: OfflineActionType;
  path: string;
  method: string;
  body: Record<string, unknown>;
  createdAt: string;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function enqueueOfflineAction(
  action: Omit<OfflineAction, 'id' | 'createdAt'>,
): Promise<void> {
  if (typeof indexedDB === 'undefined') return;
  const db = await openDb();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put({
    ...action,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  await new Promise<void>((res, rej) => {
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
  db.close();
}

export async function listOfflineActions(): Promise<OfflineAction[]> {
  if (typeof indexedDB === 'undefined') return [];
  const db = await openDb();
  const tx = db.transaction(STORE, 'readonly');
  const req = tx.objectStore(STORE).getAll();
  const items = await new Promise<OfflineAction[]>((res, rej) => {
    req.onsuccess = () => res(req.result as OfflineAction[]);
    req.onerror = () => rej(req.error);
  });
  db.close();
  return items.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function removeOfflineAction(id: string): Promise<void> {
  if (typeof indexedDB === 'undefined') return;
  const db = await openDb();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).delete(id);
  await new Promise<void>((res, rej) => {
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
  db.close();
}

export async function countOfflineActions(): Promise<number> {
  const items = await listOfflineActions();
  return items.length;
}

export async function flushOfflineQueue(
  send: (action: OfflineAction) => Promise<void>,
): Promise<number> {
  const pending = await listOfflineActions();
  let synced = 0;
  for (const action of pending) {
    try {
      await send(action);
      await removeOfflineAction(action.id);
      synced++;
    } catch {
      break;
    }
  }
  return synced;
}
