var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/game.css',
  '/css/historique.css',
  '/css/historique.css',
  '/css/main.css',
  '/css/mainstats.css',
  '/js/bundle.js'
  '/js/bundleStats.js'
  '/js/bundleHisto.js'
  '/game.html',
  '/historique.html',
  '/index.html',
  '/stats.html',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});