import { Button, useColorMode } from "@chakra-ui/react";
const { colorMode } = useColorMode();

interface ListItemButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";

const ListItemButton = ({ text, isSelected, onClick }: ListItemButtonProps) => (
  <Button
    variant="customButton"
    color={isSelected ? colorSelected : undefined}
    p={1}
    textAlign="left"
    whiteSpace="normal"
    fontSize="sm"
    _focus={{ boxShadow: "none" }} // Updated to a valid SystemStyleObject
    onClick={onClick}
  >
    {text}
  </Button>
);

export default ListItemButton;
