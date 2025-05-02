import useUpdateEntity from "../../hooks/useUpdateEntity";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useUpdateGenre = () =>
  useUpdateEntity<Genre>(genreService.put, ["genres"]);

export default useUpdateGenre;
