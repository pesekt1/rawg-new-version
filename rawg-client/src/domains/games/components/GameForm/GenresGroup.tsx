import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface GenresGroupProps {
  genresData: { results: Entity[] } | undefined;
  selectedGenres: Entity[];
  setSelectedGenres: (genres: Entity[]) => void;
}

const GenresGroup: React.FC<GenresGroupProps> = ({
  genresData,
  selectedGenres,
  setSelectedGenres,
}) => {
  const fetchData = () => genresData;

  return (
    <EntityGroup
      label="Genre"
      fetchData={fetchData}
      selectedEntities={selectedGenres}
      setSelectedEntities={setSelectedGenres}
    />
  );
};

export default GenresGroup;
