import CustomList from "./CustomList";
import useGenres from "../hooks/useGenres";
import useCreateGenre from "../hooks/useCreateGenre";
import useGameQueryStore from "../state";

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
    />
  );
};

export default GenreList;
