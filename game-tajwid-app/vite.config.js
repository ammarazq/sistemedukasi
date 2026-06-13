import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon1.svg", "icons.svg", "hero.png"],
      manifest: {
        name: "Game Tajwid",
        short_name: "Game Tajwid",
        description: "Game edukasi tajwid yang bisa dipasang di perangkat.",
        theme_color: "#0f8a70",
        background_color: "#0f8a70",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json,woff2}"],
      },
    }),
  ],
});
