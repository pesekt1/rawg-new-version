import useCreateEntity from "../../hooks/useCreateEntity";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useCreateGenre = () =>
  useCreateEntity<Genre>(genreService.post, ["genres"]);

export default useCreateGenre;
