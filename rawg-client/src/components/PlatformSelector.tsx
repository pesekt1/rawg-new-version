import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms, { Platform } from "../hooks/usePlatforms";

interface Props {
  selectedPlatformId?: number;
  onSelectedPlatform: (platform: Platform | null) => void;
}

const PlatformSelector = ({
  selectedPlatformId,
  onSelectedPlatform,
}: Props) => {
  const { data, error } = usePlatforms();
  const selectedPlatform = data?.results?.find(
    (platform) => platform.id === selectedPlatformId
  );

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform ? selectedPlatform.name : "Platforms"}
      </MenuButton>
      <MenuList>
        <MenuItem
          hidden={!selectedPlatform}
          color="red"
          onClick={() => onSelectedPlatform(null)}
        >
          Clear
        </MenuItem>
        {data?.results?.map((platform) => (
          <MenuItem
            key={platform.id}
            onClick={() => onSelectedPlatform(platform)}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
