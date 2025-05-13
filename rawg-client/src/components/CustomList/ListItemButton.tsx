import { Button, useColorMode } from "@chakra-ui/react";

interface ListItemButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const ListItemButton = ({ text, isSelected, onClick }: ListItemButtonProps) => {
  const { colorMode } = useColorMode(); // Moved inside the component
  const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";

  return (
    <Button
      variant="customButton"
      color={isSelected ? colorSelected : undefined}
      p={1}
      textAlign="left"
      whiteSpace="normal"
      fontSize="sm"
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ListItemButton;
