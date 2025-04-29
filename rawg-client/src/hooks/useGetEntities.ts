import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ms from "ms";

interface UseGetEntitiesParams<T> {
  queryKey: (string | number)[];
  queryFn: () => Promise<T>;
  placeholderData?: T;
  staleTime?: number;
  cacheTime?: number;
  /**
   * enabled: Controls whether the query should automatically run.
   * Useful for dependent queries or conditional fetching.
   * Defaults to true.
   */
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
