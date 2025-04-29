import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import ms from "ms";
import ApiClient from "../services/api-client";

/**
 * useGetEntity is a generic hook for fetching a single entity by id or slug.
 * @param idOrSlug - The id or slug of the entity to fetch (can be undefined or null to disable fetching)
 * @param queryKeyPrefix - Prefix for the query key (e.g. "developer")
 * @param service - The ApiClient instance for the entity type
 * @param placeholderData - Optional placeholder data for initial render
 * @param staleTime - Optional stale time for caching (default: 1 day)
 * @param cacheTime - Optional cache time (default: 1 day)
 * @param options - Additional react-query options
 * @returns A react-query result object for the entity
 */
interface UseGetEntityParams<T> {
  idOrSlug?: string | number | null;
  queryKeyPrefix: string;
  service: ApiClient<T>;
  placeholderData?: T;
  staleTime?: number;
  cacheTime?: number;
  options?: Omit<
    UseQueryOptions<T | undefined, Error>,
    | "queryKey"
    | "queryFn"
    | "placeholderData"
    | "staleTime"
    | "cacheTime"
    | "enabled"
  >;
}

const useGetEntity = <T>({
  idOrSlug,
  queryKeyPrefix,
  service,
  placeholderData,
  staleTime = ms("1d"),
  cacheTime = ms("1d"),
  options = {},
}: UseGetEntityParams<T>) => {
  const queryKey = useMemo(
    () => [queryKeyPrefix, idOrSlug ?? ""],
    [queryKeyPrefix, idOrSlug]
  );

  return useQuery<T | undefined, Error>({
    queryKey,
    queryFn: () => {
      if (idOrSlug == null) return Promise.resolve(undefined);
      return service.get(idOrSlug);
    },
    placeholderData,
    staleTime,
    cacheTime,
    enabled: idOrSlug !== undefined && idOrSlug !== null,
    ...options,
  });
};

export default useGetEntity;
