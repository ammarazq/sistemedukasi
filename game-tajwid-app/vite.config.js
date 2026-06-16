<<<<<<< HEAD
<<<<<<< HEAD
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
>>>>>>> 8f0efff200184241c400ece1efde6ba52aa50ab8

export default defineConfig({
  plugins: [
    react(),
<<<<<<< HEAD
<<<<<<< HEAD

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'audio/*.mp3',
        'favicon.ico',
        'apple-touch-icon.png',
      ],

      manifest: {
        name: 'GameLand',
        short_name: 'GameLand',

        description:
          'Game edukasi belajar harakat hijaiyah',

        theme_color: '#2db891',

        background_color: '#ffffff',

        display: 'standalone',

        orientation: 'portrait',

        start_url: '/',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
=======
=======
>>>>>>> 8f0efff200184241c400ece1efde6ba52aa50ab8
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
<<<<<<< HEAD
>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4
=======
>>>>>>> 8f0efff200184241c400ece1efde6ba52aa50ab8
