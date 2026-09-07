import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      /* A catalogue should never show yesterday's prices or a withdrawn
         product because someone installed the app in March. The new build
         takes over on the next visit without asking. */
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "logo-mark.svg"],

      manifest: {
        id: "/",
        name: "Chandra & Co. — Corporate Gifting",
        short_name: "Chandra & Co.",
        description:
          "Corporate gifts branded for you and delivered where you need them — pens, gift sets, bags, keychains and desk pieces, quoted against your quantity.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        lang: "en-IN",
        /* The splash ground is the paper the site sits on; the theme colour is
           the deep indigo of the strip that runs across the top of every page,
           so the status bar continues it rather than cutting against it. */
        background_color: "#f9f9f9",
        theme_color: "#1e1b2e",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        /* Long-press the installed icon and these are the three things anyone
           actually opens the app to do. */
        shortcuts: [
          { name: "Products", url: "/products" },
          { name: "Ranges", url: "/categories" },
          { name: "Request a Quote", url: "/quote" },
        ],
      },

      workbox: {
        /* The shell only. The 126 product photographs come to 17MB, and
           precaching them would mean a first visit that downloads the entire
           catalogue before it is useful. They are cached as they are seen
           instead — see the runtime rule below. */
        globPatterns: ["**/*.{js,css,html,svg,ico,woff2}"],
        navigateFallback: "/index.html",
        /* These are files, not routes; the SPA fallback must not swallow them. */
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/],
        cleanupOutdatedCaches: true,

        runtimeCaching: [
          {
            /* Product and editorial photographs: kept once seen, so a range
               already browsed opens with its pictures on a train. Capped, so
               the cache cannot grow to the size of the catalogue. */
            urlPattern: /\/(products|editorial)\/[^/]+\.(?:webp|png|jpe?g|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "chandra-photographs",
              expiration: { maxEntries: 220, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          router: ["react-router-dom"],
        },
      },
    },
  },
});
