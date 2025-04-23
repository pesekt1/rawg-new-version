import axios, { AxiosRequestConfig } from "axios";

export interface Response<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  // baseURL: "https://api.rawg.io/api",
  baseURL: import.meta.env.VITE_API_URL,
  // params: {
  //   key: import.meta.env.VITE_API_KEY,
  // },
});

class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<Response<T>>(this.endpoint, config)
      .then((res) => res.data);

  get = (slug: string) =>
    axiosInstance.get<T>(`${this.endpoint}/${slug}`).then((res) => res.data);

  post = (data: Partial<T>) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
}

export default ApiClient;
