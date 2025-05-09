import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface PublishersGroupProps {
  publishersData: { results: Entity[] } | undefined;
  publishersLoading: boolean;
  publishersError: any;
  selectedPublishers: Entity[];
  setSelectedPublishers: (publishers: Entity[]) => void;
  publisherToAdd: number | "";
  setPublisherToAdd: (publisher: number | "") => void;
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

const PublishersGroup: React.FC<PublishersGroupProps> = ({
  publishersData,
  publishersLoading,
  publishersError,
  selectedPublishers,
  setSelectedPublishers,
  publisherToAdd,
  setPublisherToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <EntityGroup
      label="Publisher"
      data={publishersData}
      loading={publishersLoading}
      error={publishersError}
      selectedEntities={selectedPublishers}
      setSelectedEntities={setSelectedPublishers}
      entityToAdd={publisherToAdd}
      setEntityToAdd={setPublisherToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />
  );
};

export default PublishersGroup;
