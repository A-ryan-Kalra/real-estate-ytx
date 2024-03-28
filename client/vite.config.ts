import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Real-Estate-ytx",
        short_name: "Real-Estate",
        icons: [
          {
            src: "/ebag-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/ebag-384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/ebag-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#7BE1C8",
        background_color: "#7BE1C8",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api");
            },
            handler: "CacheFirst" as const,
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200, 201],
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false,
      },
    },
  },
});
