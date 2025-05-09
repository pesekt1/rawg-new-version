import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface StoresGroupProps {
  storesData: { results: Entity[] } | undefined;
  storesLoading: boolean;
  storesError: any;
  selectedStores: Entity[];
  setSelectedStores: (stores: Entity[]) => void;
  storeToAdd: number | "";
  setStoreToAdd: (store: number | "") => void;
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

const StoresGroup: React.FC<StoresGroupProps> = ({
  storesData,
  storesLoading,
  storesError,
  selectedStores,
  setSelectedStores,
  storeToAdd,
  setStoreToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <EntityGroup
      label="Store"
      data={storesData}
      loading={storesLoading}
      error={storesError}
      selectedEntities={selectedStores}
      setSelectedEntities={setSelectedStores}
      entityToAdd={storeToAdd}
      setEntityToAdd={setStoreToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />
  );
};

export default StoresGroup;
