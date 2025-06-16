import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import {
  generateSubscribeButtonTemplate,
  generateUnsubscribeButtonTemplate,
} from "../template";
import { isServiceWorkerAvailable } from "../utils";
import {
  subscribe,
  unsubscribe,
  isCurrentPushSubscriptionAvailable,
} from "../utils/notification-helper";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById(
      "push-notification-tools"
    );
    if (!pushNotificationTools) return;

    try {
      const isSubscribed = await isCurrentPushSubscriptionAvailable();

      pushNotificationTools.innerHTML = isSubscribed
        ? generateUnsubscribeButtonTemplate()
        : generateSubscribeButtonTemplate();

      const buttonId = isSubscribed ? "unsubscribe-button" : "subscribe-button";
      const button = document.getElementById(buttonId);

      button?.addEventListener("click", async () => {
        const currentStatus = await isCurrentPushSubscriptionAvailable();
        if (currentStatus) {
          await unsubscribe();
        } else {
          await subscribe();
        }

        this.#setupPushNotification();
      });
    } catch (err) {
      console.error("Failed to setup push notification:", err);
      pushNotificationTools.innerHTML = `<p class="error">Gagal memuat notifikasi.</p>`;
    }
  }

  static toggleLogoutButton() {
    const logoutButton = document.querySelector("#logout-button");
    const loginButton = document.querySelector("#login-button-nav");
    if (!logoutButton) return;

    const token = localStorage.getItem("token");

    if (!token) {
      logoutButton.classList.add("hidden");
      loginButton.classList.remove("hidden");
    } else {
      logoutButton.classList.remove("hidden");
      loginButton.classList.add("hidden");
    }
  }

  async renderPage() {
    const { route, params } = getActiveRoute();
    const page = routes[route];

    if (!page) {
      this.#content.innerHTML = `
        <section class="container text-center">
          <h2> 404 - Page Not Found</h2>
        </section>
      `;
      return;
    }

    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender(params);
      App.toggleLogoutButton();

      if (isServiceWorkerAvailable()) {
        this.#setupPushNotification();
      }

      return;
    }

    document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render(params);
      await page.afterRender(params);
      App.toggleLogoutButton();

      if (isServiceWorkerAvailable()) {
        this.#setupPushNotification();
      }
    });
  }
}

export default App;
