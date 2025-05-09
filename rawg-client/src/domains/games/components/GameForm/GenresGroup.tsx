import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface GenresGroupProps {
  genresData: { results: Entity[] } | undefined;
  genresLoading: boolean;
  genresError: any;
  selectedGenres: Entity[];
  setSelectedGenres: (genres: Entity[]) => void;
  genreToAdd: number | "";
  setGenreToAdd: (genre: number | "") => void;
}

const GenresGroup: React.FC<GenresGroupProps> = ({
  genresData,
  genresLoading,
  genresError,
  selectedGenres,
  setSelectedGenres,
  genreToAdd,
  setGenreToAdd,
}) => {
  return (
    <EntityGroup
      label="Genre"
      data={genresData}
      loading={genresLoading}
      error={genresError}
      selectedEntities={selectedGenres}
      setSelectedEntities={setSelectedGenres}
      entityToAdd={genreToAdd}
      setEntityToAdd={setGenreToAdd}
    />
  );
};

export default GenresGroup;
