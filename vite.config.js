import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: ".",
      filename: "sw.js",
      injectManifest: {
        swSrc: "sw.js", 
      },
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
      ],
      manifest: {
        name: "Dicoding Story App",
        short_name: "Dicoding Story App",
        description: "Dicoding Story App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Tambah Story",
            short_name: "Tambah",
            description: "Langsung ke halaman tambah cerita",
            url: "/#/add-story",
            icons: [{ src: "icons/icon-192x192.png", sizes: "192x192" }],
          },
        ],
        screenshots: [
          {
            src: "screenshots/screenshot-desktop.png",
            sizes: "1280x720",
            type: "image/png",
          },
          {
            src: "screenshots/screenshot-mobile.png",
            sizes: "360x640",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
