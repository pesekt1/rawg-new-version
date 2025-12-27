import * as Sentry from "@sentry/react";
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

// Capture API errors with Sentry
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    Sentry.captureException(error);
    return Promise.reject(error);
  }
);

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
   * Delete an entity by a composite key (e.g., two IDs).
   * @param keys - An object containing the composite keys (e.g., { userId, gameId }).
   * @returns A promise resolving to a message object.
   */
  deleteComposite = <TKeys extends Record<string, string | number>>(
    keys: TKeys
  ) => {
    const keyPath = Object.values(keys).join("/"); // Construct the path from the keys
    return axiosInstance
      .delete<{ message: string }>(`${this.endpoint}/${keyPath}`)
      .then((res) => res.data);
  };

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

  /**
   * Update an entity by id or slug using PUT.
   * @param idOrSlug - The id or slug of the entity.
   * @param data - Partial entity data to update.
   * @returns A promise resolving to the updated entity.
   */
  put = (idOrSlug: string | number, data: Partial<T>) =>
    axiosInstance
      .put<T>(`${this.endpoint}/${idOrSlug}`, data)
      .then((res) => res.data);
}

export default ApiClient;
export { axiosInstance };

/**
 * Typed helpers for service modules that don't fit CRUD-style ApiClient (e.g., /chat).
 * Keeps service code consistent with "return res.data".
 */
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, config).then((res) => res.data);

export const apiPost = async <TRes, TReq = unknown>(
  url: string,
  data?: TReq,
  config?: AxiosRequestConfig
) => axiosInstance.post<TRes>(url, data, config).then((res) => res.data);

export const apiPut = async <TRes, TReq = unknown>(
  url: string,
  data?: TReq,
  config?: AxiosRequestConfig
) => axiosInstance.put<TRes>(url, data, config).then((res) => res.data);

export const apiPatch = async <TRes, TReq = unknown>(
  url: string,
  data?: TReq,
  config?: AxiosRequestConfig
) => axiosInstance.patch<TRes>(url, data, config).then((res) => res.data);

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete<T>(url, config).then((res) => res.data);
