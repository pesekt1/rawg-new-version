import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Response } from "../services/api-client";
import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 1000, // 24 hours
    initialData: genres,
  });

export default useGenres;
