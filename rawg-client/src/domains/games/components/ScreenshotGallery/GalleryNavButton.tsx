import { IconButton } from "@chakra-ui/react";
import { ReactElement } from "react";

interface GalleryNavButtonProps {
  icon: ReactElement;
  ariaLabel: string;
  onClick: () => void;
  isDisabled?: boolean;
  position: "left" | "right";
}

const GalleryNavButton = ({
  icon,
  ariaLabel,
  onClick,
  isDisabled,
  position,
}: GalleryNavButtonProps) => (
  <IconButton
    icon={icon}
    aria-label={ariaLabel}
    onClick={onClick}
    isDisabled={isDisabled}
    position="absolute"
    left={position === "left" ? 4 : undefined}
    right={position === "right" ? 4 : undefined}
    top="50%"
    transform="translateY(-50%)"
    bg="blackAlpha.700"
    color="white"
    _hover={{ bg: "blackAlpha.900" }}
    zIndex={10}
  />
);

export default GalleryNavButton;
