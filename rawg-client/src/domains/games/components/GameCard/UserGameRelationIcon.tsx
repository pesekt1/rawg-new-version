import { IconButton, useToast } from "@chakra-ui/react";
import { ReactElement, useState, useEffect } from "react";
import { useAuth } from "../../../auth/useAuth";

const loginMessage = "Please log in to use this feature.";
const errorMessage = "Could not update your selection. Please try again.";

interface UserGameRelationIconProps {
  gameId: number;
  initialActive: boolean;
  service: {
    add: (userId: number, gameId: number) => Promise<any>;
    remove: (userId: number, gameId: number) => Promise<any>;
  };
  activeIcon: ReactElement;
  inactiveIcon: ReactElement;
}

const UserGameRelationIcon = ({
  gameId,
  initialActive,
  service,
  activeIcon,
  inactiveIcon,
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
    try {
      if (active) {
        await service.remove(user.id, gameId);
        setActive(false);
      } else {
        await service.add(user.id, gameId);
        setActive(true);
      }
    } catch {
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
      isLoading={loading}
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
