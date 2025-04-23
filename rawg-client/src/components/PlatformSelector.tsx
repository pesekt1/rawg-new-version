import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../state";
import AdminEditIcon from "./AdminEditIcon";

const PlatformSelector = () => {
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const onSelectedPlatform = useGameQueryStore((s) => s.setPlatformId);

  const { data, error } = usePlatforms();
  const selectedPlatform = data?.results?.find(
    (platform) => platform.id === selectedPlatformId
  );

  if (error) return null;

  return (
    <HStack>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          <HStack spacing={2}>
            <span>
              {selectedPlatform ? selectedPlatform.name : "Platforms"}
            </span>
            <AdminEditIcon /* onClick handler can be added here */ />
          </HStack>
        </MenuButton>
        <MenuList>
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
              {platform.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default PlatformSelector;
