// Only public app files are cached. API and authentication requests pass through.
const CACHE = "watch-static-mobile-v2";
const FILES = ["/watch-in-pencil/", "/watch-in-pencil/manifest.webmanifest", "/watch-in-pencil/css/style.css", "/watch-in-pencil/css/pencil.css", "/watch-in-pencil/js/app.js", "/watch-in-pencil/js/store.js", "/watch-in-pencil/js/rec.js", "/watch-in-pencil/js/data.js", "/watch-in-pencil/js/compass.js", "/watch-in-pencil/icon-192.png", "/watch-in-pencil/icon-512.png", "/watch-in-pencil/assets/js/app-install.js?v=20261105-origin2"];
const allowed = new Set(FILES.map(p => new URL(p, self.location.origin).pathname));
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("watch-static-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if(e.request.method !== 'GET' || u.origin !== self.location.origin || !allowed.has(u.pathname)) return;
  e.respondWith(fetch(e.request).then(r => {
    if(r.ok) { const copy = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(e.request, copy))); }
    return r;
  }).catch(async () => (await caches.match(e.request)) || (e.request.mode === 'navigate' ? await caches.match("/watch-in-pencil/") : null) || Response.error()));
});
