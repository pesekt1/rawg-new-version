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
  handleAdd: (
    toAdd: number | "",
    setToAdd: (v: number | "") => void,
    selected: Entity[],
    setSelected: (v: Entity[]) => void,
    data: { results: Entity[] } | undefined
  ) => void;
  handleRemove: (
    id: number,
    selected: Entity[],
    setSelected: (v: Entity[]) => void
  ) => void;
}

const GenresGroup: React.FC<GenresGroupProps> = ({
  genresData,
  genresLoading,
  genresError,
  selectedGenres,
  setSelectedGenres,
  genreToAdd,
  setGenreToAdd,
  handleAdd,
  handleRemove,
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
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />
  );
};

export default GenresGroup;
