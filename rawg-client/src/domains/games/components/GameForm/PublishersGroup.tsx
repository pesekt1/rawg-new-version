import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface PublishersGroupProps {
  publishersData: { results: Entity[] } | undefined;
  selectedPublishers: Entity[];
  setSelectedPublishers: (publishers: Entity[]) => void;
}

const PublishersGroup: React.FC<PublishersGroupProps> = ({
  publishersData,
  selectedPublishers,
  setSelectedPublishers,
}) => {
  const fetchData = () => publishersData;

  return (
    <EntityGroup
      label="Publisher"
      fetchData={fetchData}
      selectedEntities={selectedPublishers}
      setSelectedEntities={setSelectedPublishers}
    />
  );
};

export default PublishersGroup;
