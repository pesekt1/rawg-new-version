import useDeleteEntity from "../../hooks/useDeleteEntity";
import genreService from "./genreService";

const useDeleteGenre = () => useDeleteEntity(genreService.delete, ["genres"]);

export default useDeleteGenre;
