import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ms from "ms";

interface UseGetEntitiesParams<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  placeholderData?: T;
  staleTime?: number;
  cacheTime?: number;
  options?: Omit<
    UseQueryOptions<T, Error>,
    "queryKey" | "queryFn" | "placeholderData" | "staleTime" | "cacheTime"
  >;
}

const useGetEntities = <T>({
  queryKey,
  queryFn,
  placeholderData,
  staleTime = ms("1d"),
  cacheTime = ms("1d"),
  options = {},
}: UseGetEntitiesParams<T>) =>
  useQuery<T, Error>({
    queryKey,
    queryFn,
    placeholderData,
    staleTime,
    cacheTime,
    ...options,
  });

export default useGetEntities;
