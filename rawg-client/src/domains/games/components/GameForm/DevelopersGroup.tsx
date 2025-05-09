import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface DevelopersGroupProps {
  developersData: { results: Entity[] } | undefined;
  selectedDevelopers: Entity[];
  setSelectedDevelopers: (developers: Entity[]) => void;
}

const DevelopersGroup: React.FC<DevelopersGroupProps> = ({
  developersData,
  selectedDevelopers,
  setSelectedDevelopers,
}) => {
  const fetchData = () => developersData;

  return (
    <EntityGroup
      label="Developer"
      fetchData={fetchData}
      selectedEntities={selectedDevelopers}
      setSelectedEntities={setSelectedDevelopers}
    />
  );
};

export default DevelopersGroup;
