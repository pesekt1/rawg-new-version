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
}

const PublishersGroup: React.FC<PublishersGroupProps> = ({
  publishersData,
  publishersLoading,
  publishersError,
  selectedPublishers,
  setSelectedPublishers,
  publisherToAdd,
  setPublisherToAdd,
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
    />
  );
};

export default PublishersGroup;
