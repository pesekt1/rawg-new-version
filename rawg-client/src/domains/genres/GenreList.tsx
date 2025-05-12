import CustomList from "../../components/CustomList/CustomList";
import useGenres from "./useGenres";
import useCreateGenre from "./useCreateGenre";
import useDeleteGenre from "./useDeleteGenre";
import useUpdateGenre from "./useUpdateGenre";
import useGameQueryStore from "../../state";

const GenreList = () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setGenreId = useGameQueryStore((s) => s.setGenreId);

  return (
    <CustomList
      title="Genres"
      onSelectedItemId={setGenreId}
      selectedItemId={genreId}
      useDataHook={useGenres}
      useCreateHook={useCreateGenre}
      useUpdateHook={useUpdateGenre}
      useDeleteHook={useDeleteGenre}
    />
  );
};

export default GenreList;
