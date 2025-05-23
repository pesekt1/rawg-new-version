import { IconButton, useToast } from "@chakra-ui/react";
import { ReactElement, useState, useEffect } from "react";
import { useAuth } from "../../../auth/useAuth";
import { Game } from "../../Game";

const loginMessage = "Please log in to use this feature.";
const errorMessage = "Could not update your selection. Please try again.";

interface UserGameRelationIconProps {
  gameId: number;
  initialActive: boolean;
  service: {
    add: (userId: number, gameId: number) => Promise<Game>;
    remove: (userId: number, gameId: number) => Promise<void>;
  };
  activeIcon: ReactElement;
  inactiveIcon: ReactElement;
  onChange?: (active: boolean) => void;
}

const UserGameRelationIcon = ({
  gameId,
  initialActive,
  service,
  activeIcon,
  inactiveIcon,
  onChange,
}: UserGameRelationIconProps) => {
  const { user } = useAuth();
  const [active, setActive] = useState(initialActive);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Sync internal state with prop
  useEffect(() => {
    setActive(initialActive);
  }, [initialActive]);

  const handleToggle = async () => {
    if (!user?.id) {
      toast({
        title: "Login required",
        description: loginMessage,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const nextActive = !active;
    setActive(nextActive); // Optimistically update UI
    try {
      if (nextActive) {
        await service.add(user.id, gameId);
      } else {
        await service.remove(user.id, gameId);
      }
      if (onChange) onChange(nextActive); //notify parent of change
    } catch {
      setActive(!nextActive); // Revert on error
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      aria-label={active ? "Remove" : "Add"}
      icon={active ? activeIcon : inactiveIcon}
      isDisabled={loading}
      variant="ghost"
      size="md"
      fontSize="1.5rem"
      bg="transparent"
      _hover={{
        bg: "accent.600",
      }}
      _active={{
        bg: "accent.700",
      }}
      onClick={handleToggle}
      transition="all 0.15s"
    />
  );
};

export default UserGameRelationIcon;
