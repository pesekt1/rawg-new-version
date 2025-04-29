import useGetEntity from "../../hooks/useGetEntity";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useGenre = (genreId: number) =>
  useGetEntity<Genre>({
    queryKey: ["genre", genreId],
    queryFn: () => genreService.get(genreId),
  });

export default useGenre;
