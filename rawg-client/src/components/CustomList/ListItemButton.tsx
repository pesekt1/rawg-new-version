import { Button } from "@chakra-ui/react";

interface ListItemButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  colorSelected: string;
}

const ListItemButton = ({
  text,
  isSelected,
  onClick,
  colorSelected,
}: ListItemButtonProps) => (
  <Button
    variant="customButton"
    color={isSelected ? colorSelected : undefined}
    p={1}
    textAlign="left"
    whiteSpace="normal"
    fontSize="sm"
    _focus="none"
    onClick={onClick}
  >
    {text}
  </Button>
);

export default ListItemButton;
