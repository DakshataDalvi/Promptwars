const CACHE_NAME = 'maidanmind-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './js/config.js',
  './js/data.js',
  './js/i18n.js',
  './js/app.js',
  './icon.svg',
  './manifest.json'
];

// Install Event - Cache Core Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event - Serve from Cache, Fallback to Network
self.addEventListener('fetch', (event) => {
  // We only want to cache our own assets, not cross-origin API calls like Gemini
  if (event.request.url.includes('googleapis.com')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        // Optionally cache new successful requests
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Fallback for offline if file not in cache
        return null;
      });
    })
  );
});
