const LoginView = {
  render() {
    return `
      <section class="login-section max-w-xl mx-auto p-4">
        <h2 class="text-3xl font-bold mb-4 text-center">Login</h2>
        <form id="login-form" class="flex flex-col gap-4">
          <div class="">
            <label for="email" class="block text-gray-700">Email</label>
            <input type="email" id="email" placeholder="Email" required class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
          </div>
          <div class="">
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" id="password" placeholder="Password" required class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
          </div>
          <button id="login-button" type="submit" class="p-2 w-full bg-blue-500 text-white rounded-md disabled:opacity-50">Login</button>
        </form>
        <div id="login-error" style="color:red; margin-top:1rem;"></div>
      </section>
    `;
  },

  bindLoginHandler(handler) {
    const form = document.querySelector("#login-form");
    const errorDisplay = document.querySelector("#login-error");
    const loginButton = document.querySelector("#login-button");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorDisplay.textContent = "";

      const email = form.email.value;
      const password = form.password.value;

      loginButton.disabled = true;
      const originalText = loginButton.textContent;
      loginButton.textContent = "Logging in...";

      try {
        await handler({ email, password });
        window.location.hash = "/";
      } catch (err) {
        errorDisplay.textContent = err.message;
      } finally {
        loginButton.disabled = false;
        loginButton.textContent = originalText;
      }
    });
  },
};

export default LoginView;
