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
  useCreateHook: () => { mutateAsync: (data: Partial<T>) => Promise<any> };
  useDeleteHook?: (options?: any) => { mutateAsync: (id: any) => Promise<any> };
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
  useDeleteHook,
}: Props<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<T | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const { data, isLoading, error } = useDataHook();
  const { colorMode } = useColorMode();
  const deleteMutation = useDeleteHook ? useDeleteHook() : undefined;

  // Color variables for easier use
  const colorMain = colorMode === "light" ? "gray.800" : "white";
  const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";
  const colorHover = colorMode === "light" ? "accent.600" : "white";
  const colorActive = colorMode === "light" ? "accent.700" : "yellow.300";
  const bgHover = colorMode === "light" ? "lightGray.300" : "accent.500";
  const bgActive = colorMode === "light" ? "lightGray.300" : "accent.500";

  const createMutation = useCreateHook ? useCreateHook() : undefined;

  const items = data?.results;
  const displayedItems = isExpanded
    ? items
    : items?.slice(0, DEFAULT_VISIBLE_ITEMS);

  // Example: fields for generic modal (customize as needed)
  const editFields = [
    { name: "name", label: "Name", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "image_background", label: "Image Background" },
  ];

  // Example: save handler (replace with your update logic)
  const handleSave = async (updated: Partial<T>) => {
    if (createMutation) {
      await createMutation.mutateAsync(updated);
    }
    setIsEditOpen(false);
  };

  // Delete handler for modal
  const handleDelete = async () => {
    if (deleteMutation && editEntity) {
      // Accept both id and slug, prefer id if present, fallback to slug
      const deleteId = (editEntity as any).id ?? (editEntity as any).slug;
      await deleteMutation.mutateAsync(deleteId);
      setIsEditOpen(false);
    }
  };

  if (error) return null;
  if (isLoading) return <Spinner />;

  // Open modal for editing a specific item
  const handleEditClick = (item: T) => {
    setEditEntity(item);
    setModalTitle(`Edit ${title}`);
    setIsEditOpen(true);
  };

  // Open modal for creating a new item
  const handleCreateClick = () => {
    setEditEntity(null);
    setModalTitle(`Create new ${title}`);
    setIsEditOpen(true);
  };

  return (
    <Box marginBottom="4">
      <HStack>
        <AdminEditIcon title="Add new" onClick={handleCreateClick} />
        <Button
          variant="link"
          onClick={() => onSelectedItemId(undefined)}
          bg="transparent"
          _hover={{
            textDecoration: "none",
            color: colorHover,
          }}
          fontSize="2xl"
          fontWeight="bold"
          color={colorMain}
          _active={{
            color: colorActive,
            bg: bgActive,
          }}
        >
          <Heading size="lg">{title}</Heading>
        </Button>
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
                color={selectedItemId === item.id ? colorSelected : colorMain}
                variant="link"
                fontSize="lg"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  color: colorHover,
                  bg: bgHover,
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
                color={colorMain}
                variant="link"
                fontSize="lg"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  color: colorHover,
                  bg: bgHover,
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
        onDelete={
          editEntity && editEntity.id && deleteMutation
            ? handleDelete
            : undefined
        }
        title={modalTitle}
      />
    </Box>
  );
};

export default CustomList;
