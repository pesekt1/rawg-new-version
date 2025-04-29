import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import ms from "ms";
import ApiClient from "../services/api-client";

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
