import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
  Box,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../../state";
import AdminEditIcon from "../../components/AdminEditIcon";
import GenericEditModal from "../../components/GenericEditModal";
import { useState } from "react";
import useCreateParentPlatform from "./useCreateParentPlatform";
import usePlatforms from "./usePlatforms";

const PlatformSelector = () => {
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const onSelectedPlatform = useGameQueryStore((s) => s.setPlatformId);

  const { data, error } = usePlatforms();
  const selectedPlatform = data?.results?.find(
    (platform) => platform.id === selectedPlatformId
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<any>(null);
  const createPlatformMutation = useCreateParentPlatform();

  const editFields = [
    { name: "name", label: "Name" },
    { name: "slug", label: "Slug" },
  ];

  const handleSave = async (updated: Partial<any>) => {
    await createPlatformMutation.mutateAsync(updated);
    setIsEditOpen(false);
  };

  if (error) return null;

  return (
    <HStack>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          {selectedPlatform ? selectedPlatform.name : "Platforms"}
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              setEditEntity(null);
              setIsEditOpen(true);
            }}
            icon={<AdminEditIcon title="Add new platform" />}
          >
            Add new platform
          </MenuItem>
          <MenuItem
            hidden={!selectedPlatform}
            color="red"
            onClick={() => onSelectedPlatform(undefined)}
          >
            Clear
          </MenuItem>
          {data?.results?.map((platform) => (
            <MenuItem
              key={platform.id}
              onClick={() => onSelectedPlatform(platform.id)}
            >
              <HStack>
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditEntity(platform);
                    setIsEditOpen(true);
                  }}
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  marginRight={2}
                >
                  <AdminEditIcon />
                </Box>
                <span>{platform.name}</span>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <GenericEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        entity={editEntity || {}}
        fields={editFields}
        onSave={handleSave}
        title={editEntity ? "Edit Platform" : "Create Platform"}
      />
    </HStack>
  );
};

export default PlatformSelector;
