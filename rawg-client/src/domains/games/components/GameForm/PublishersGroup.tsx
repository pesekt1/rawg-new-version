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
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Publisher</FormLabel>
        {publishersLoading ? (
          <Spinner size="sm" />
        ) : publishersError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load publishers
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select publisher"
              value={publisherToAdd}
              onChange={(e) =>
                setPublisherToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {publishersData?.results
                .filter((p) => !selectedPublishers.some((sp) => sp.id === p.id))
                .map((publisher) => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  publisherToAdd,
                  setPublisherToAdd,
                  selectedPublishers,
                  setSelectedPublishers,
                  publishersData
                )
              }
              isDisabled={!publisherToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Publishers</FormLabel>
        <HStack wrap="wrap">
          {selectedPublishers.map((publisher) => (
            <Tag key={publisher.id} m={1} colorScheme="teal">
              <TagLabel>{publisher.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(
                    publisher.id,
                    selectedPublishers,
                    setSelectedPublishers
                  )
                }
              />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default PublishersGroup;
