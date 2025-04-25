import useDeleteEntity from "../../hooks/useDeleteEntity";
import genreService from "./genreService";

const useDeleteGenre = (options?: any) =>
  useDeleteEntity<string>(genreService.delete, ["genres"], options);

export default useDeleteGenre;
