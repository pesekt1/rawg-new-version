import authClient from "../../services/auth-client";

const authService = {
  login: (username: string, password: string) =>
    authClient.login(username, password),
  register: (username: string, password: string) =>
    authClient.register(username, password),
  // Add more methods as needed
};

export default authService;
