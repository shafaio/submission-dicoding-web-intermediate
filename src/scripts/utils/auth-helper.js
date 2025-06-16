const AuthHelper = {
  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
  getToken() {
    return localStorage.getItem("token");
  },
};

export default AuthHelper;
