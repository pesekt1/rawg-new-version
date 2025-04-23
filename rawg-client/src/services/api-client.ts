import axios, { AxiosRequestConfig } from "axios";

export interface Response<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add JWT token to every request if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

  delete = (slug: string) =>
    axiosInstance.delete(`${this.endpoint}/${slug}`).then((res) => res.data);

  patch = (slug: string, data: Partial<T>) =>
    axiosInstance
      .patch<T>(`${this.endpoint}/${slug}`, data)
      .then((res) => res.data);
}

export default ApiClient;
