import api from "./api";

const authAPI = {
  login: (email, password) =>
    api.post("/api/v1/auth/login", { email, password }),
  signup: (username, email, password, role = "user") =>
    api.post("/api/v1/auth/signup", { username, email, password, role }),
};

export default authAPI;
