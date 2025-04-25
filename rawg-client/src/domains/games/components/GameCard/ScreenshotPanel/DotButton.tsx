import { Box } from "@chakra-ui/react";

interface DotButtonProps {
  active: boolean;
  onMouseEnter: () => void;
  ariaLabel: string;
}

const DotButton = ({ active, onMouseEnter, ariaLabel }: DotButtonProps) => (
  <Box
    as="button"
    w="28px"
    h="6px"
    borderRadius="full"
    bg={active ? "whiteAlpha.900" : "whiteAlpha.500"}
    border={active ? "2px solid #fff" : "none"}
    transition="background 0.2s"
    onMouseEnter={onMouseEnter}
    aria-label={ariaLabel}
  />
);

export default DotButton;
