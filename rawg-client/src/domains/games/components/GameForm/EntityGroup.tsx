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
import React, { useState } from "react";
import { Entity } from "./Entity";
import { handleAdd, handleRemove } from "../../utils/entityHandlers";

interface EntityGroupProps {
  label: string;
  data: { results: Entity[] } | undefined;
  onChange: (selectedEntities: Entity[]) => void; // Notify parent of changes
}

const EntityGroup: React.FC<EntityGroupProps> = ({ label, data, onChange }) => {
  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);
  const [entityToAdd, setEntityToAdd] = useState<number | "">("");

  const handleAddEntity = () => {
    handleAdd(
      entityToAdd,
      setEntityToAdd,
      selectedEntities,
      (updated) => {
        setSelectedEntities(updated);
        onChange(updated); // Notify parent of changes
      },
      data
    );
  };

  const handleRemoveEntity = (id: number) => {
    handleRemove(id, selectedEntities, (updated) => {
      setSelectedEntities(updated);
      onChange(updated); // Notify parent of changes
    });
  };

  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add {label}</FormLabel>
        {!data ? (
          <Spinner size="sm" />
        ) : data.results.length === 0 ? (
          <Alert status="error">
            <AlertIcon />
            No {label.toLowerCase()}s available
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
              sx={{
                "& option[value='']": {
                  fontWeight: "bold",
                  fontSize: "lg",
                  color: "#319795", // teal.700
                },
              }}
            >
              {data.results
                .filter(
                  (item) => !selectedEntities.some((se) => se.id === item.id)
                )
                .map((entity) => (
                  <option key={entity.id} value={entity.id}>
                    {entity.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={handleAddEntity}
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
              <TagCloseButton onClick={() => handleRemoveEntity(entity.id)} />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default EntityGroup;
