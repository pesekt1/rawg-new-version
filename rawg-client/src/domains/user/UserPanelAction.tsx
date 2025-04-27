import { Box, Icon, Text } from "@chakra-ui/react";

interface UserPanelActionProps {
  icon: any;
  label: string;
  selected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  colorMain: string;
  colorSelected: string;
  colorHover: string;
  colorActive: string;
  bgHover: string;
  bgActive: string;
  bgSelected: string;
}

const UserPanelAction = ({
  icon,
  label,
  selected,
  onClick,
  onKeyDown,
  colorMain,
  colorSelected,
  colorHover,
  colorActive,
  bgHover,
  bgActive,
  bgSelected,
}: UserPanelActionProps) => (
  <Box
    w="100%"
    cursor="pointer"
    onClick={onClick}
    onKeyDown={onKeyDown}
    role="button"
    tabIndex={0}
    display="flex"
    alignItems="center"
    gap={2}
    px={2}
    py={1}
    borderRadius="md"
    color={selected ? colorSelected : colorMain}
    bg={bgSelected}
    _hover={{
      bg: bgHover,
      color: colorHover,
    }}
    _active={{
      bg: bgActive,
      color: colorActive,
    }}
    transition="background 0.2s, color 0.2s"
  >
    <Box
      bg="gray.700"
      color="white"
      borderRadius="md"
      p={2}
      display="flex"
      alignItems="center"
    >
      <Icon as={icon} boxSize={6} />
    </Box>
    <Text fontWeight="bold" fontSize="md">
      {label}
    </Text>
  </Box>
);

export default UserPanelAction;
