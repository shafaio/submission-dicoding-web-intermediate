// CSS imports
import "../styles/styles.css";

import App from "./pages/app";

import MediaHelper from "./utils/media-helper";

import { registerServiceWorker } from "./utils";

import "../registerSW";


document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();

  // await registerServiceWorker();

  window.addEventListener("hashchange", async () => {
    MediaHelper.stopAllStreams();
    await app.renderPage();
  });
});

document.querySelector("#logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.hash = "/login";
});

document.querySelector(".skip-link").addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.querySelector("#main-content");
  e.target.blur();
  target.focus();
  target.scrollIntoView({ behavior: "smooth" });
});
