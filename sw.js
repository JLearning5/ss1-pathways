const cacheName = 'ss1-pathways-v1';
const cachePrefix = 'ss1-pathways-v';
const pages = ['./', './index.html', './worksheet.html'];
const files = [...pages, './styles.css', './app.js', './reflection.js', './worksheet.js', './assets/icon.png'];
const appUrls = new Set(files.map((file) => new URL(file, self.registration.scope).href));

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(files)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(cachePrefix) && key !== cacheName).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.hash = '';
  url.search = '';
  if (!appUrls.has(url.href)) return;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(url.href)) || fetch(event.request);
  })());
});
