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

interface PlatformsGroupProps {
  platformsData: { results: Entity[] } | undefined;
  platformsLoading: boolean;
  platformsError: any;
  selectedPlatforms: Entity[];
  setSelectedPlatforms: (platforms: Entity[]) => void;
  platformToAdd: number | "";
  setPlatformToAdd: (platform: number | "") => void;
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

const PlatformsGroup: React.FC<PlatformsGroupProps> = ({
  platformsData,
  platformsLoading,
  platformsError,
  selectedPlatforms,
  setSelectedPlatforms,
  platformToAdd,
  setPlatformToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Platform</FormLabel>
        {platformsLoading ? (
          <Spinner size="sm" />
        ) : platformsError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load platforms
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select platform"
              value={platformToAdd}
              onChange={(e) =>
                setPlatformToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {platformsData?.results
                .filter((p) => !selectedPlatforms.some((sp) => sp.id === p.id))
                .map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  platformToAdd,
                  setPlatformToAdd,
                  selectedPlatforms,
                  setSelectedPlatforms,
                  platformsData
                )
              }
              isDisabled={!platformToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Platforms</FormLabel>
        <HStack wrap="wrap">
          {selectedPlatforms.map((platform) => (
            <Tag key={platform.id} m={1} colorScheme="teal">
              <TagLabel>{platform.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(
                    platform.id,
                    selectedPlatforms,
                    setSelectedPlatforms
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

export default PlatformsGroup;
