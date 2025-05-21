import { Box } from "@chakra-ui/react";
import { HStack, Image, List, ListItem, Spinner } from "@chakra-ui/react";
import getCroppedImageUrl from "../../utils/image-url";
import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Response } from "../../services/api-client";
import AdminEditIcon from "../AdminEditIcon";
import GenericEditModal from "../GenericEditModal";
import { useAuth } from "../../domains/auth/useAuth";
import useGameQueryStore from "../../state";
import ExpandCollapseButton from "../ExpandCollapseButton";
import ClearSelectionButton from "./ClearSelectionButton";
import TitleButton from "./TitleButton";
import ListItemButton from "./ListItemButton";
import { useNavigate } from "react-router-dom";

/**
 * Represents an item in the list.
 *
 * @property id - The unique identifier for the item.
 * @property image_background - The URL of the item's background image.
 * @property name - The name of the item.
 */
interface Item {
  id: number;
  image_background: string;
  name: string;
}

/**
 * Props for the `CustomList` component.
 *
 * @template T - The type of the items in the list.
 * @property title - The title of the list.
 * @property onSelectedItemId - Callback to handle selection of an item by its ID.
 * @property selectedItemId - The currently selected item's ID.
 * @property useDataHook - A hook to fetch the list data.
 * @property useCreateHook - A hook to handle creating a new item.
 * @property useUpdateHook - Optional hook to handle updating an existing item.
 * @property useDeleteHook - Optional hook to handle deleting an item.
 */
interface Props<T> {
  title: string;
  onSelectedItemId: (id?: number) => void;
  selectedItemId?: number;
  useDataHook: () => UseQueryResult<Response<T>, Error>;
  useCreateHook: () => { mutateAsync: (data: Partial<T>) => Promise<any> };
  useUpdateHook?: () => {
    mutateAsync: (args: { id: number; data: Partial<T> }) => Promise<any>;
  };
  useDeleteHook?: (options?: any) => { mutateAsync: (id: any) => Promise<any> };
}

const DEFAULT_VISIBLE_ITEMS = 3;

/**
 * A customizable list component with support for CRUD operations and expandable items.
 *
 * @template T - The type of the items in the list.
 * @param props - The props for the component.
 * @returns A styled list with optional admin controls for creating, editing, and deleting items.
 */
const CustomList = <T extends Item>({
  onSelectedItemId,
  selectedItemId,
  title,
  useDataHook,
  useCreateHook,
  useUpdateHook,
  useDeleteHook,
}: Props<T>) => {
  const resetGameQuery = useGameQueryStore((state) => state.reset);
  const resetBrowseListQuery = useGameQueryStore((s) => s.resetBrowseListQuery);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<T | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const { data, isLoading, error } = useDataHook();
  const deleteMutation = useDeleteHook ? useDeleteHook() : undefined;
  const { role } = useAuth();
  const navigate = useNavigate();

  // Safely access the results
  const items = data?.results || [];
  const displayedItems = isExpanded
    ? items
    : items.slice(0, DEFAULT_VISIBLE_ITEMS);

  const createMutation = useCreateHook ? useCreateHook() : undefined;
  const updateMutation = useUpdateHook ? useUpdateHook() : undefined;

  // Example: fields for generic modal (customize as needed)
  const editFields = [
    { name: "name", label: "Name", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "image_background", label: "Image Background" },
  ];

  const handleSave = async (updated: Partial<T>) => {
    if (editEntity && editEntity.id && updateMutation) {
      await updateMutation.mutateAsync({ id: editEntity.id, data: updated });
    } else if (createMutation) {
      await createMutation.mutateAsync(updated);
    }
    setIsEditOpen(false);
  };

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

  const iconBoxSize = "26px";

  return (
    <Box pl={2} marginBottom="2">
      <HStack>
        {role === "admin" && (
          <AdminEditIcon title="Add new" onClick={handleCreateClick} />
        )}
        <HStack>
          <TitleButton title={title} onReset={resetGameQuery} />
          {selectedItemId !== undefined && (
            <ClearSelectionButton onClear={() => onSelectedItemId(undefined)} />
          )}
        </HStack>
      </HStack>
      <List>
        {displayedItems.map((item) => (
          <ListItem key={item.id}>
            <HStack>
              {role === "admin" && (
                <AdminEditIcon onClick={() => handleEditClick(item)} />
              )}
              <Image
                src={getCroppedImageUrl(item.image_background)}
                boxSize={iconBoxSize}
                borderRadius={8}
                objectFit="cover"
              />
              <ListItemButton
                text={item.name}
                isSelected={selectedItemId === item.id}
                onClick={() => {
                  onSelectedItemId(item.id);
                  resetBrowseListQuery(); // Reset BrowseList selection
                  navigate("/"); // Navigate to HomePage to show GameGrid
                }}
              />
            </HStack>
          </ListItem>
        ))}
        {items.length > DEFAULT_VISIBLE_ITEMS && (
          <ListItem paddingY="5px">
            <ExpandCollapseButton
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              iconSize={iconBoxSize}
            />
          </ListItem>
        )}
      </List>
      {role === "admin" && (
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
      )}
    </Box>
  );
};

export default CustomList;
