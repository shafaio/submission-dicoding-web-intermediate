import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) =>
    url.origin === "https://story-api.dicoding.dev" &&
    url.pathname.startsWith("/v1/stories"),
  new NetworkFirst({
    cacheName: "stories-api-cache",
    networkTimeoutSeconds: 5,
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  if (!event.data) {
    console.warn("Push event received but no data was sent!");
    return;
  }

  console.log("Push event fired");
  console.log("Data:", event.data?.text());

  async function chainPromise() {
    const data = await event.data.json();

    await self.registration.showNotification(
      data.title || "Ada laporan baru untuk Anda!",
      {
        body:
          data.options.body || "Terjadi kerusakan lampu jalan di Jl. Melati",
      }
    );
  }

  event.waitUntil(chainPromise());
});
