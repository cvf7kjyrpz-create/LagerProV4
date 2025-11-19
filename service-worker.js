self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("lagerpro-v4-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.webmanifest"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
