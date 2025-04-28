import { axiosInstance } from "./api-client";

class AuthClient {
  private endpoint: string;

  constructor(endpoint: string = "/auth") {
    this.endpoint = endpoint;
  }

  login = (username: string, password: string) =>
    axiosInstance
      .post(`${this.endpoint}/login`, { username, password })
      .then((res) => res.data);

  register = (username: string, password: string) =>
    axiosInstance
      .post(`${this.endpoint}/register`, { username, password })
      .then((res) => res.data);
}

const authClient = new AuthClient();
export default authClient;
