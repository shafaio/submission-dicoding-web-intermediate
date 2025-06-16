import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

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
