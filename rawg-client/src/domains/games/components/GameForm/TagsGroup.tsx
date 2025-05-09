import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface TagsGroupProps {
  tagsData: { results: Entity[] } | undefined;
  selectedTags: Entity[];
  setSelectedTags: (tags: Entity[]) => void;
}

const TagsGroup: React.FC<TagsGroupProps> = ({
  tagsData,
  selectedTags,
  setSelectedTags,
}) => {
  const fetchData = () => tagsData;

  return (
    <EntityGroup
      label="Tag"
      fetchData={fetchData}
      selectedEntities={selectedTags}
      setSelectedEntities={setSelectedTags}
    />
  );
};

export default TagsGroup;
