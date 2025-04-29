import useGetEntity from "../../hooks/useGetEntity";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useGenre = (genreId?: number | null) =>
  useGetEntity<Genre>({
    idOrSlug: genreId,
    queryKeyPrefix: "genre",
    service: genreService,
  });

export default useGenre;
