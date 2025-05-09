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

interface StoresGroupProps {
  storesData: { results: Entity[] } | undefined;
  storesLoading: boolean;
  storesError: any;
  selectedStores: Entity[];
  setSelectedStores: (stores: Entity[]) => void;
  storeToAdd: number | "";
  setStoreToAdd: (store: number | "") => void;
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

const StoresGroup: React.FC<StoresGroupProps> = ({
  storesData,
  storesLoading,
  storesError,
  selectedStores,
  setSelectedStores,
  storeToAdd,
  setStoreToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Store</FormLabel>
        {storesLoading ? (
          <Spinner size="sm" />
        ) : storesError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load stores
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select store"
              value={storeToAdd}
              onChange={(e) =>
                setStoreToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {storesData?.results
                .filter((s) => !selectedStores.some((ss) => ss.id === s.id))
                .map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  storeToAdd,
                  setStoreToAdd,
                  selectedStores,
                  setSelectedStores,
                  storesData
                )
              }
              isDisabled={!storeToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Stores</FormLabel>
        <HStack wrap="wrap">
          {selectedStores.map((store) => (
            <Tag key={store.id} m={1} colorScheme="teal">
              <TagLabel>{store.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(store.id, selectedStores, setSelectedStores)
                }
              />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default StoresGroup;
