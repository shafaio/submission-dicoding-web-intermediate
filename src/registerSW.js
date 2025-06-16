import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    if (confirm("Update tersedia. Muat ulang sekarang?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("Aplikasi siap digunakan secara offline.");
  },
});
