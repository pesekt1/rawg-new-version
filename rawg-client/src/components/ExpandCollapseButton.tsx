import { Button } from "@chakra-ui/react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
  iconSize?: string | number;
}

const ExpandCollapseButton = ({
  isExpanded,
  onToggle,
  iconSize = 20,
}: ExpandCollapseButtonProps) => (
  <Button
    variant="customButton"
    padding={0}
    height="auto"
    minWidth={0}
    _focus={{ boxShadow: "none" }} // Updated to a valid SystemStyleObject
    onClick={onToggle}
  >
    {isExpanded ? (
      <FiChevronUp size={iconSize} />
    ) : (
      <FiChevronDown size={iconSize} />
    )}
  </Button>
);

export default ExpandCollapseButton;
