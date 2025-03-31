import { useQuery } from "@tanstack/react-query";
import ApiClient, { Response } from "../services/api-client";
import stores from "../data/stores";

export interface Store {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const apiClient = new ApiClient<Store>("/stores");

const useStores = () =>
  useQuery<Response<Store>, Error>({
    queryKey: ["stores"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 1000, // 24 hours
    initialData: stores,
  });

export default useStores;
