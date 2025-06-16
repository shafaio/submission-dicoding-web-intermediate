import LoginModel from "./login-model.js";

const LoginPresenter = {
  async handleLogin({ email, password }) {
    await LoginModel.login({ email, password });
  },
};

export default LoginPresenter;
