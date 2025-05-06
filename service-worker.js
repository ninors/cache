const CACHE_NAME = 'votre-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/service-worker.js',
    'https://unpkg.com/leaflet/dist/leaflet.css',
    'https://unpkg.com/leaflet/dist/leaflet.js',
    'https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/svg/maps/place.svg', // Icône de position
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'  // Tuiles
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Récupération des ressources dans le cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
