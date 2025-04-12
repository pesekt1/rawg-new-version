import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Response } from "../services/api-client";
import genres from "../data/genres";
import ms from "ms";
import { Genre } from "../entities/Genre";

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    initialData: genres,
  });

export default useGenres;
