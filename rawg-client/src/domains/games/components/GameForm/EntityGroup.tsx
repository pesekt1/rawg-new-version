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

interface EntityGroupProps {
  label: string;
  data: { results: Entity[] } | undefined;
  loading: boolean;
  error: any;
  selectedEntities: Entity[];
  setSelectedEntities: (entities: Entity[]) => void;
  entityToAdd: number | "";
  setEntityToAdd: (entity: number | "") => void;
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

const EntityGroup: React.FC<EntityGroupProps> = ({
  label,
  data,
  loading,
  error,
  selectedEntities,
  setSelectedEntities,
  entityToAdd,
  setEntityToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add {label}</FormLabel>
        {loading ? (
          <Spinner size="sm" />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load {label.toLowerCase()}s
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder={`Select ${label.toLowerCase()}`}
              value={entityToAdd}
              onChange={(e) =>
                setEntityToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {data?.results
                .filter((item) => !selectedEntities.some((se) => se.id === item.id))
                .map((entity) => (
                  <option key={entity.id} value={entity.id}>
                    {entity.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  entityToAdd,
                  setEntityToAdd,
                  selectedEntities,
                  setSelectedEntities,
                  data
                )
              }
              isDisabled={!entityToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected {label}s</FormLabel>
        <HStack wrap="wrap">
          {selectedEntities.map((entity) => (
            <Tag key={entity.id} m={1} colorScheme="teal">
              <TagLabel>{entity.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(entity.id, selectedEntities, setSelectedEntities)
                }
              />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default EntityGroup;
