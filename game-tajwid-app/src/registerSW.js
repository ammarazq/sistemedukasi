/**
 * Manual Service Worker Registration untuk Game Tajwid PWA
 *
 * Fungsi ini:
 * 1. Cek apakah browser support Service Worker
 * 2. Tunggu halaman selesai dimuat (window load event)
 * 3. Daftarkan file sw.js sebagai Service Worker
 * 4. Polling update setiap jam
 * 5. Notifikasi ketika ada update Service Worker baru
 */

export function registerServiceWorker() {
  // Cek apakah browser support Service Worker
  if ("serviceWorker" in navigator) {
    console.log("[PWA] Service Worker support detected");

    // Tunggu sampai window selesai dimuat
    window.addEventListener("load", () => {
      console.log(
        "[PWA] Window load event fired, registering Service Worker...",
      );

      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/", // Scope SW hanya ke root
        })
        .then((registration) => {
          console.log("[PWA] ✅ Service Worker registered successfully");
          console.log("[PWA] Registration scope:", registration.scope);

          // Cek update setiap 1 jam (3600000 ms)
          const updateCheckInterval = 60 * 60 * 1000; // 1 hour
          setInterval(() => {
            console.log("[PWA] Checking for Service Worker updates...");
            registration.update();
          }, updateCheckInterval);

          // Cek update langsung 30 detik setelah register
          setTimeout(() => {
            console.log("[PWA] Initial update check after 30 seconds");
            registration.update();
          }, 30000);
        })
        .catch((error) => {
          console.error(
            "[PWA] ❌ Service Worker registration failed:",
            error.message,
          );
        });

      // Listen untuk perubahan Service Worker (activation baru)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[PWA] 🔄 New Service Worker activated - PWA is updated!");

        // Optional: Tampilkan notifikasi ke user
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Game Tajwid Updated", {
            body: "Aplikasi telah diperbarui ke versi terbaru!",
            icon: "/favicon.svg",
            badge: "/favicon.svg",
            tag: "pwa-update",
          });
        }

        // Optional: Reload page otomatis (uncomment jika ingin)
        // window.location.reload();
      });
    });
  } else {
    console.warn(
      "[PWA] ⚠️  Service Worker tidak didukung di browser ini. Fitur offline tidak tersedia.",
    );
  }
}

/**
 * Request permission untuk menampilkan notifikasi
 * Panggil fungsi ini saat user interact dengan app (misal: click button)
 */
export function requestNotificationPermission() {
  if ("Notification" in window && "serviceWorker" in navigator) {
    if (Notification.permission === "granted") {
      console.log("[PWA] Notification permission already granted");
      return Promise.resolve();
    } else if (Notification.permission !== "denied") {
      return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("[PWA] Notification permission granted");
        }
        return permission;
      });
    }
  }
  return Promise.resolve();
}
