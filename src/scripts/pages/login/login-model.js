import CONFIG from "../../config";

const LoginModel = {
  async login({ email, password }) {
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login gagal");
    }

    const {
      loginResult: { token },
    } = await response.json();
    localStorage.setItem("token", token);
  },
};

export default LoginModel;
