const CACHE_NAME = 'map-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/leaflet/leaflet.css',
  '/leaflet/leaflet.js',
  // Autres fichiers nécessaires, comme ceux que vous pourriez vouloir mettre en cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
