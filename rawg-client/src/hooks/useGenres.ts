import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Response } from "../hooks/useData";
import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient.get<Response<Genre>>("/genres").then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 1000, // 24 hours
    initialData: genres,
  });

export default useGenres;
