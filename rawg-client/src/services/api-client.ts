import axios, { AxiosRequestConfig } from "axios";

/**
 * Generic API response type for paginated endpoints.
 */
export interface Response<T> {
  count: number;
  next: string | null;
  results: T[];
}

/**
 * Axios instance configured with base URL and JWT token interceptor.
 */
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

/**
 * ApiClient is a generic service for making HTTP requests to a REST API.
 * It provides CRUD operations for a given endpoint.
 *
 * @template T - The entity type handled by this client.
 */
class ApiClient<T> {
  protected endpoint: string;

  /**
   * Create a new ApiClient for a specific endpoint.
   * @param endpoint - The API endpoint (e.g. "/games")
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Fetch all entities from the endpoint.
   * @param config - Optional Axios request config.
   * @returns A promise resolving to a paginated response of entities.
   */
  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<Response<T>>(this.endpoint, config)
      .then((res) => res.data);

  /**
   * Fetch a single entity by id or slug.
   * @param idOrSlug - The id or slug of the entity.
   * @returns A promise resolving to the entity.
   */
  get = (idOrSlug: string | number) =>
    axiosInstance
      .get<T>(`${this.endpoint}/${idOrSlug}`)
      .then((res) => res.data);

  /**
   * Create a new entity.
   * @param data - Partial entity data to create.
   * @returns A promise resolving to the created entity.
   */
  post = (data: Partial<T>) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);

  /**
   * Delete an entity by id or slug.
   * @param idOrSlug - The id or slug of the entity.
   * @returns A promise resolving to a message object.
   */
  delete = (idOrSlug: string | number) =>
    axiosInstance
      .delete<{ message: string }>(`${this.endpoint}/${idOrSlug}`)
      .then((res) => res.data);

  /**
   * Update an entity by id or slug using PATCH.
   * @param idOrSlug - The id or slug of the entity.
   * @param data - Partial entity data to update.
   * @returns A promise resolving to the updated entity.
   */
  patch = (idOrSlug: string | number, data: Partial<T>) =>
    axiosInstance
      .patch<T>(`${this.endpoint}/${idOrSlug}`, data)
      .then((res) => res.data);
}

export default ApiClient;
export { axiosInstance };
