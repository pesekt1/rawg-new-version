import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface PlatformsGroupProps {
  platformsData: { results: Entity[] } | undefined;
  selectedPlatforms: Entity[];
  setSelectedPlatforms: (platforms: Entity[]) => void;
}

const PlatformsGroup: React.FC<PlatformsGroupProps> = ({
  platformsData,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const fetchData = () => platformsData;

  return (
    <EntityGroup
      label="Platform"
      fetchData={fetchData}
      selectedEntities={selectedPlatforms}
      setSelectedEntities={setSelectedPlatforms}
    />
  );
};

export default PlatformsGroup;
