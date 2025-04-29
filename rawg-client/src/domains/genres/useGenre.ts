import useGenres from "./useGenres";

const useGenre = (selectedGenreId?: number) => {
  const { data } = useGenres();
  const selectedGenre = data?.results?.find(
    (genre) => genre.id === selectedGenreId
  );

  return selectedGenre;
};

export default useGenre;
