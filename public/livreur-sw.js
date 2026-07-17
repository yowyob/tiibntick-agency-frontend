const CACHE_PREFIX = 'tnt-livreur-'
const CACHE = 'tnt-livreur-v2'
const PRECACHE = [
  '/livreur',
  '/livreur/login',
  '/livreur-offline.html',
  '/livreur-manifest.json',
  '/icons/livreur-192.svg',
  '/icons/livreur-512.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE)
          .map((key) => caches.delete(key)),
      ),
    ).then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Assets Next.js : stale-while-revalidate
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Shell livreur : network-first avec repli offline
  if (url.pathname.startsWith('/livreur')) {
    event.respondWith(networkFirst(request, '/livreur-offline.html'))
    return
  }

  if (
    url.pathname === '/livreur-manifest.json' ||
    url.pathname.startsWith('/icons/livreur-')
  ) {
    event.respondWith(cacheFirst(request))
  }
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(CACHE)
    cache.put(request, response.clone())
  }
  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  const networkPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone())
    return response
  }).catch(() => cached)
  return cached || networkPromise
}

async function networkFirst(request, offlineFallback) {
  try {
    const response = await fetch(request)
    if (response.ok && request.mode === 'navigate') {
      const cache = await caches.open(CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    const fallback = await caches.match(offlineFallback)
    return fallback || Response.error()
  }
}
