import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface PlatformsGroupProps {
  platformsData: { results: Entity[] } | undefined;
  platformsLoading: boolean;
  platformsError: any;
  selectedPlatforms: Entity[];
  setSelectedPlatforms: (platforms: Entity[]) => void;
  platformToAdd: number | "";
  setPlatformToAdd: (platform: number | "") => void;
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

const PlatformsGroup: React.FC<PlatformsGroupProps> = ({
  platformsData,
  platformsLoading,
  platformsError,
  selectedPlatforms,
  setSelectedPlatforms,
  platformToAdd,
  setPlatformToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <EntityGroup
      label="Platform"
      data={platformsData}
      loading={platformsLoading}
      error={platformsError}
      selectedEntities={selectedPlatforms}
      setSelectedEntities={setSelectedPlatforms}
      entityToAdd={platformToAdd}
      setEntityToAdd={setPlatformToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />
  );
};

export default PlatformsGroup;
