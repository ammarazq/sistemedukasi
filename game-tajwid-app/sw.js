// Service Worker untuk Game Tajwid PWA
const CACHE_NAME = "game-tajwid-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/index.css",
  "/src/App.css",
  "/src/main.jsx",
  "/src/App.jsx",
  "/assets/audio/correct.mp3",
  "/assets/audio/wrong.mp3",
  "/assets/audio/level-up.mp3",
  "/assets/audio/victory.mp3",
  "/assets/audio/intro.mp3",
  "/assets/audio/gameplay.mp3",
];

// 1. INSTALL EVENT - Menyimpan aset statis ke cache
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install event triggered");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching essential assets");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("[Service Worker] Cache failed during install:", error);
      }),
  );

  // Force SW aktivasi langsung tanpa menunggu
  self.skipWaiting();
});

// 2. ACTIVATE EVENT - Menghapus cache lama saat ada versi baru
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate event triggered");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Hapus cache lama yang bukan versi terbaru
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );

  // Claim semua clients dengan SW baru
  return self.clients.claim();
});

// 3. FETCH EVENT - Strategi Cache First dengan Network Fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  const { request } = event;
  const url = new URL(request.url);

  // Untuk aset statis (JS, CSS, audio, images) - gunakan Cache First
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "audio" ||
    request.destination === "image" ||
    request.destination === "font" ||
    url.pathname === "/" ||
    url.pathname === "/index.html"
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        // Jika ada di cache, gunakan cache
        if (response) {
          console.log("[Service Worker] Cache hit:", request.url);
          return response;
        }

        // Jika tidak ada, fetch dari network dan simpan ke cache
        return fetch(request)
          .then((response) => {
            // Hanya cache jika response valid (status 200)
            if (
              !response ||
              response.status !== 200 ||
              response.type === "error"
            ) {
              return response;
            }

            // Clone response untuk disimpan ke cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });

            return response;
          })
          .catch((error) => {
            console.error("[Service Worker] Fetch error:", error);
            // Return cached response jika network gagal
            return caches.match(request).then((cachedResponse) => {
              return (
                cachedResponse ||
                new Response("Offline - Resource not available", {
                  status: 503,
                  statusText: "Service Unavailable",
                  headers: new Headers({
                    "Content-Type": "text/plain",
                  }),
                })
              );
            });
          });
      }),
    );
  } else {
    // Untuk API atau resource lainnya - gunakan Network First
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Update cache dengan response baru
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch((error) => {
          console.error("[Service Worker] Network request failed:", error);
          // Jika network gagal, coba cache
          return caches.match(request).then((cachedResponse) => {
            return (
              cachedResponse ||
              new Response("Offline - No cache available", {
                status: 503,
                statusText: "Service Unavailable",
                headers: new Headers({
                  "Content-Type": "text/plain",
                }),
              })
            );
          });
        }),
    );
  }
});

// Message handler untuk force update
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
