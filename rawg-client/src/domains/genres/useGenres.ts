import useGetEntities from "../../hooks/useGetEntities";
import genres from "./genres";
import genreService from "./genreService";
import { Genre } from "./Genre";
import { Response } from "../../services/api-client";

const useGenres = () =>
  useGetEntities<Response<Genre>>({
    queryKey: ["genres"],
    queryFn: genreService.getAll,
    placeholderData: genres,
  });

export default useGenres;
