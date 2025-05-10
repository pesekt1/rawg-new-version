import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import ms from "ms";
import { Response } from "../services/api-client";

const PAGE_SIZE = 10; // Define the page size constant

/**
 * useGetEntitiesPagination is a generic hook for fetching a paginated list of entities.
 * @param queryKey - Unique key for the query (e.g. ["developers"])
 * @param queryFn - Function that fetches the entities
 * @param staleTime - Optional stale time for caching (default: 1 day)
 * @param cacheTime - Optional cache time (default: 1 day)
 * @param enabled - Controls whether the query should automatically run (default: true)
 * @param options - Additional react-query options
 */
interface UseGetEntitiesPaginationParams<T> {
  queryKey: (string | number)[];
  queryFn: (params: { pageParam?: number; page_size: number }) => Promise<Response<T>>;
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
  options?: Omit<
    UseInfiniteQueryOptions<Response<T>, Error>,
    | "queryKey"
    | "queryFn"
    | "staleTime"
    | "cacheTime"
    | "enabled"
  >;
}

const useGetEntitiesPagination = <T>({
  queryKey,
  queryFn,
  staleTime = ms("1d"),
  cacheTime = ms("1d"),
  enabled = true,
  options = {},
}: UseGetEntitiesPaginationParams<T>) =>
  useInfiniteQuery<Response<T>, Error>({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      queryFn({
        pageParam,
        page_size: PAGE_SIZE,
      }),
    staleTime,
    cacheTime,
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined; // Calculate the next page number
    },
    ...options,
  });

export default useGetEntitiesPagination;
