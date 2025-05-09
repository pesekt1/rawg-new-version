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
}

const DevelopersGroup: React.FC<DevelopersGroupProps> = ({
  developersData,
  developersLoading,
  developersError,
  selectedDevelopers,
  setSelectedDevelopers,
  developerToAdd,
  setDeveloperToAdd,
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
    />
  );
};

export default DevelopersGroup;
