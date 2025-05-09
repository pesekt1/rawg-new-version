import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface DevelopersGroupProps {
  developersData: { results: Entity[] } | undefined;
  developersLoading: boolean;
  developersError: any;
  selectedDevelopers: Entity[];
  setSelectedDevelopers: (developers: Entity[]) => void;
  developerToAdd: number | "";
  setDeveloperToAdd: (developer: number | "") => void;
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

const DevelopersGroup: React.FC<DevelopersGroupProps> = ({
  developersData,
  developersLoading,
  developersError,
  selectedDevelopers,
  setSelectedDevelopers,
  developerToAdd,
  setDeveloperToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <EntityGroup
      label="Developer"
      data={developersData}
      loading={developersLoading}
      error={developersError}
      selectedEntities={selectedDevelopers}
      setSelectedEntities={setSelectedDevelopers}
      entityToAdd={developerToAdd}
      setEntityToAdd={setDeveloperToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />
  );
};

export default DevelopersGroup;
