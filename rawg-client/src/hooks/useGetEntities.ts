import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ms from "ms";

/**
 * useGetEntities is a generic hook for fetching a list of entities.
 * @param queryKey - Unique key for the query (e.g. ["developers"])
 * @param queryFn - Function that fetches the entities
 * @param placeholderData - Optional placeholder data for initial render
 * @param staleTime - Optional stale time for caching (default: 1 day)
 * @param cacheTime - Optional cache time (default: 1 day)
 * @param enabled - Controls whether the query should automatically run (default: true)
 * @param options - Additional react-query options
 */
interface UseGetEntitiesParams<T> {
  queryKey: (string | number)[];
  queryFn: () => Promise<T>;
  placeholderData?: T;
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
  options?: Omit<
    UseQueryOptions<T, Error>,
    | "queryKey"
    | "queryFn"
    | "placeholderData"
    | "staleTime"
    | "cacheTime"
    | "enabled"
  >;
}

const useGetEntities = <T>({
  queryKey,
  queryFn,
  placeholderData,
  staleTime = ms("1d"),
  cacheTime = ms("1d"),
  enabled = true,
  options = {},
}: UseGetEntitiesParams<T>) =>
  useQuery<T, Error>({
    queryKey,
    queryFn,
    placeholderData,
    staleTime,
    cacheTime,
    enabled, //controls if the query should run
    ...options,
  });

export default useGetEntities;
