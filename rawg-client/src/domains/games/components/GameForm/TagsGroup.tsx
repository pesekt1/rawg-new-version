import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { Entity } from "./Entity";

interface TagsGroupProps {
  tagsData: { results: Entity[] } | undefined;
  tagsLoading: boolean;
  tagsError: any;
  selectedTags: Entity[];
  setSelectedTags: (tags: Entity[]) => void;
  tagToAdd: number | "";
  setTagToAdd: (tag: number | "") => void;
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

const TagsGroup: React.FC<TagsGroupProps> = ({
  tagsData,
  tagsLoading,
  tagsError,
  selectedTags,
  setSelectedTags,
  tagToAdd,
  setTagToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Tag</FormLabel>
        {tagsLoading ? (
          <Spinner size="sm" />
        ) : tagsError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load tags
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select tag"
              value={tagToAdd}
              onChange={(e) =>
                setTagToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {tagsData?.results
                .filter((t) => !selectedTags.some((st) => st.id === t.id))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  tagToAdd,
                  setTagToAdd,
                  selectedTags,
                  setSelectedTags,
                  tagsData
                )
              }
              isDisabled={!tagToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Tags</FormLabel>
        <HStack wrap="wrap">
          {selectedTags.map((tag) => (
            <Tag key={tag.id} m={1} colorScheme="purple">
              <TagLabel>{tag.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(tag.id, selectedTags, setSelectedTags)
                }
              />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default TagsGroup;
