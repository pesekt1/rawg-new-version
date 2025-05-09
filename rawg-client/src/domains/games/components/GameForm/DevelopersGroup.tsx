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

interface DevelopersGroupProps {
  developersData: { results: Entity[] } | undefined;
  developersLoading: boolean;
  developersError: any;
  selectedDevelopers: Entity[];
  setSelectedDevelopers: (developers: Entity[]) => void;
  developerToAdd: number | "";
  setDeveloperToAdd: (developer: number | "") => void;
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

const DevelopersGroup: React.FC<DevelopersGroupProps> = ({
  developersData,
  developersLoading,
  developersError,
  selectedDevelopers,
  setSelectedDevelopers,
  developerToAdd,
  setDeveloperToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Developer</FormLabel>
        {developersLoading ? (
          <Spinner size="sm" />
        ) : developersError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load developers
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select developer"
              value={developerToAdd}
              onChange={(e) =>
                setDeveloperToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {developersData?.results
                .filter((d) => !selectedDevelopers.some((sd) => sd.id === d.id))
                .map((developer) => (
                  <option key={developer.id} value={developer.id}>
                    {developer.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  developerToAdd,
                  setDeveloperToAdd,
                  selectedDevelopers,
                  setSelectedDevelopers,
                  developersData
                )
              }
              isDisabled={!developerToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Developers</FormLabel>
        <HStack wrap="wrap">
          {selectedDevelopers.map((developer) => (
            <Tag key={developer.id} m={1} colorScheme="teal">
              <TagLabel>{developer.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(
                    developer.id,
                    selectedDevelopers,
                    setSelectedDevelopers
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

export default DevelopersGroup;
