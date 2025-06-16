import LoginView from "./login-view.js";
import LoginPresenter from "./login-presenter.js";

class LoginPage {
  async render() {
    return LoginView.render();
  }

  async afterRender() {
    LoginView.bindLoginHandler(LoginPresenter.handleLogin);
  }
}

export default LoginPage;
