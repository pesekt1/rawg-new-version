import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import genres from "./genres";
import genreService from "./genreService";
import { Genre } from "./Genre";
import { Response } from "../../services/api-client";

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: genreService.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    placeholderData: genres,
  });

export default useGenres;
