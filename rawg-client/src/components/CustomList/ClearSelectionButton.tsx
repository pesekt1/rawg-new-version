import { Button } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

interface ClearSelectionButtonProps {
  onClear: (e: React.MouseEvent) => void;
}

const ClearSelectionButton = ({ onClear }: ClearSelectionButtonProps) => (
  <Button
    variant="customButton"
    onClick={onClear}
    padding={0}
    height="auto"
    minWidth={0}
  >
    <FiX size={16} />
  </Button>
);

export default ClearSelectionButton;
