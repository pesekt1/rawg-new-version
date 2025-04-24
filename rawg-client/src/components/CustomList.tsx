import { Box, useColorMode } from "@chakra-ui/react";
import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";
import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Response } from "../services/api-client";
import AdminEditIcon from "./AdminEditIcon";
import GenericEditModal from "./GenericEditModal";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Props<T> {
  title: string;
  onSelectedItemId: (id?: number) => void;
  selectedItemId?: number;
  useDataHook: () => UseQueryResult<Response<T>, Error>;
  useCreateHook: () => { mutateAsync: (data: Partial<T>) => Promise<any> }; // <-- add this
}

interface Item {
  id: number;
  image_background: string;
  name: string;
}

const DEFAULT_VISIBLE_ITEMS = 3;

const CustomList = <T extends Item>({
  onSelectedItemId,
  selectedItemId,
  title,
  useDataHook,
  useCreateHook,
}: Props<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<T | null>(null);
  const { data, isLoading, error } = useDataHook();
  const { colorMode } = useColorMode();
  const createMutation = useCreateHook ? useCreateHook() : undefined;

  const items = data?.results;
  const displayedItems = isExpanded
    ? items
    : items?.slice(0, DEFAULT_VISIBLE_ITEMS);

  // Example: fields for generic modal (customize as needed)
  const editFields = [
    { name: "name", label: "Name" },
    { name: "slug", label: "Slug" },
    { name: "image_background", label: "Image Background" },
  ];

  // Example: save handler (replace with your update logic)
  const handleSave = async (updated: Partial<T>) => {
    if (createMutation) {
      await createMutation.mutateAsync(updated);
    }
    setIsEditOpen(false);
  };

  if (error) return null;
  if (isLoading) return <Spinner />;

  // Open modal for editing a specific item
  const handleEditClick = (item: T) => {
    setEditEntity(item);
    setIsEditOpen(true);
  };

  return (
    <Box marginBottom="2">
      <HStack>
        <Button
          variant="link"
          onClick={() => onSelectedItemId(undefined)}
          bg="transparent"
          _hover={{
            textDecoration: "none",
            color: colorMode === "light" ? "accent.600" : "white",
          }}
          fontSize="2xl"
          fontWeight="bold"
          color={colorMode === "light" ? "gray.800" : "white"}
          _active={{
            color: colorMode === "light" ? "accent.700" : "yellow.300",
            bg: colorMode === "light" ? "lightGray.300" : "accent.500",
          }}
        >
          <Heading size="lg">{title}</Heading>
        </Button>
        {/* Optionally: Add a button to create a new item */}
        {/* <AdminEditIcon onClick={() => { setEditEntity(null); setIsEditOpen(true); }} /> */}
      </HStack>
      <List>
        {displayedItems?.map((item) => (
          <ListItem key={item.id} paddingY="5px">
            <HStack>
              <AdminEditIcon onClick={() => handleEditClick(item)} />
              <Image
                src={getCroppedImageUrl(item.image_background)}
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
              />
              <Button
                textAlign="left"
                whiteSpace="normal"
                color={
                  selectedItemId === item.id
                    ? colorMode === "light"
                      ? "accent.700"
                      : "yellow.300"
                    : colorMode === "light"
                    ? "gray.800"
                    : "white"
                }
                variant="link"
                fontSize="lg"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  color: colorMode === "light" ? "accent.600" : "white",
                  bg: colorMode === "light" ? "lightGray.300" : "accent.500",
                }}
                onClick={() => onSelectedItemId(item.id)}
              >
                {item.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
        {items && items.length > DEFAULT_VISIBLE_ITEMS && (
          <ListItem paddingY="5px">
            <HStack>
              {isExpanded ? (
                <FiChevronUp size={24} />
              ) : (
                <FiChevronDown size={24} />
              )}
              <Button
                textAlign="left"
                whiteSpace="normal"
                color={colorMode === "light" ? "gray.800" : "white"}
                variant="link"
                fontSize="lg"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  color: colorMode === "light" ? "accent.600" : "white",
                  bg: colorMode === "light" ? "lightGray.300" : "accent.500",
                }}
                onClick={() => setIsExpanded(!isExpanded)}
                padding={0}
                height="auto"
                minWidth={0}
                margin={0}
              >
                {isExpanded ? "Hide" : "Show all"}
              </Button>
            </HStack>
          </ListItem>
        )}
      </List>
      <GenericEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        entity={editEntity ?? ({} as T)}
        fields={editFields}
        onSave={handleSave}
        title={`Edit ${title}`}
      />
    </Box>
  );
};

export default CustomList;
