import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface StoresGroupProps {
  storesData: { results: Entity[] } | undefined;
  selectedStores: Entity[];
  setSelectedStores: (stores: Entity[]) => void;
}

const StoresGroup: React.FC<StoresGroupProps> = ({
  storesData,
  selectedStores,
  setSelectedStores,
}) => {
  const fetchData = () => storesData;

  return (
    <EntityGroup
      label="Store"
      fetchData={fetchData}
      selectedEntities={selectedStores}
      setSelectedEntities={setSelectedStores}
    />
  );
};

export default StoresGroup;
