import { Box, Icon, Text, useColorMode } from "@chakra-ui/react";

interface UserPanelActionProps {
  icon: any;
  label: string;
  selected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const UserPanelAction = ({
  icon,
  label,
  selected,
  onClick,
  onKeyDown,
}: UserPanelActionProps) => {
  const { colorMode } = useColorMode();
  const colorMain = colorMode === "light" ? "gray.800" : "white";
  const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";
  const colorHover = colorMode === "light" ? "accent.600" : "white";
  const colorActive = colorMode === "light" ? "accent.700" : "yellow.300";
  const bgHover = colorMode === "light" ? "lightGray.300" : "accent.500";
  const bgActive = colorMode === "light" ? "lightGray.300" : "accent.500";

  return (
    <Box
      padding={2}
      cursor="pointer"
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      display="flex"
      gap={2}
      borderRadius="lg"
      color={selected ? colorSelected : colorMain}
      _hover={{
        bg: bgHover,
        color: colorHover,
      }}
      _active={{
        bg: bgActive,
        color: colorActive,
      }}
    >
      <Icon as={icon} boxSize={6} />
      <Text fontWeight="bold" fontSize="md">
        {label}
      </Text>
    </Box>
  );
};

export default UserPanelAction;
