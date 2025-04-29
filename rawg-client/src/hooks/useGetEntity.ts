import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ms from "ms";

interface UseGetEntityParams<T> {
  queryKey: (string | number)[];
  queryFn: () => Promise<T | undefined>;
  placeholderData?: T;
  staleTime?: number;
  cacheTime?: number;
  options?: Omit<
    UseQueryOptions<T | undefined, Error>,
    "queryKey" | "queryFn" | "placeholderData" | "staleTime" | "cacheTime"
  >;
}

const useGetEntity = <T>({
  queryKey,
  queryFn,
  placeholderData,
  staleTime = ms("1d"),
  cacheTime = ms("1d"),
  options = {},
}: UseGetEntityParams<T>) =>
  useQuery<T | undefined, Error>({
    queryKey,
    queryFn,
    placeholderData,
    staleTime,
    cacheTime,
    ...options,
  });

export default useGetEntity;
