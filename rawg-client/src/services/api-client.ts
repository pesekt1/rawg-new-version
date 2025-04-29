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
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<Response<T>>(this.endpoint, config)
      .then((res) => res.data);

  get = (idOrSlug: string | number) =>
    axiosInstance
      .get<T>(`${this.endpoint}/${idOrSlug}`)
      .then((res) => res.data);

  post = (data: Partial<T>) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);

  delete = (idOrSlug: string | number) =>
    axiosInstance
      .delete<{ message: string }>(`${this.endpoint}/${idOrSlug}`)
      .then((res) => res.data);

  patch = (idOrSlug: string | number, data: Partial<T>) =>
    axiosInstance
      .patch<T>(`${this.endpoint}/${idOrSlug}`, data)
      .then((res) => res.data);
}

export default ApiClient;
export { axiosInstance };
