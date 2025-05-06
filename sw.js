const CACHE_NAME = 'map-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/leaflet/leaflet.css',
  '/leaflet/leaflet.js',
  // Ajouter les tuiles nécessaires à précharger :
  '/tiles/17/66022/43721.png',
  '/tiles/17/66022/43722.png',
  '/tiles/17/66023/43721.png',
  '/tiles/17/66023/43722.png',
  // Ajoute ici les tuiles nécessaires autour du point central
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
