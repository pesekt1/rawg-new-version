import React from "react";
import EntityGroup from "./EntityGroup";
import { Entity } from "./Entity";

interface TagsGroupProps {
  tagsData: { results: Entity[] } | undefined;
  tagsLoading: boolean;
  tagsError: any;
  selectedTags: Entity[];
  setSelectedTags: (tags: Entity[]) => void;
  tagToAdd: number | "";
  setTagToAdd: (tag: number | "") => void;
}

const TagsGroup: React.FC<TagsGroupProps> = ({
  tagsData,
  tagsLoading,
  tagsError,
  selectedTags,
  setSelectedTags,
  tagToAdd,
  setTagToAdd,
}) => {
  return (
    <EntityGroup
      label="Tag"
      data={tagsData}
      loading={tagsLoading}
      error={tagsError}
      selectedEntities={selectedTags}
      setSelectedEntities={setSelectedTags}
      entityToAdd={tagToAdd}
      setEntityToAdd={setTagToAdd}
    />
  );
};

export default TagsGroup;
