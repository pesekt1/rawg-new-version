import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import { Response } from "../../services/api-client";
import ms from "ms";
import { Genre } from "./Genre";
import genres from "./genres";

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    placeholderData: genres,
  });

export default useGenres;
