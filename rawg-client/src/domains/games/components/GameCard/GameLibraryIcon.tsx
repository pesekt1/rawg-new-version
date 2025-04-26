import { IconButton, useToast, useColorMode } from "@chakra-ui/react";
import { FaBookOpen, FaBook } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import libraryService from "../../../gameLibrary/gameLibraryService";

interface GameLibraryIconProps {
  gameId: number;
  initialInLibrary: boolean;
}

const GameLibraryIcon = ({
  gameId,
  initialInLibrary,
}: GameLibraryIconProps) => {
  const { user } = useAuth();
  const [inLibrary, setInLibrary] = useState(initialInLibrary);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleToggle = async () => {
    if (!user?.id) {
      toast({
        title: "Login required",
        description: "Please log in to use the library.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      if (inLibrary) {
        await libraryService.removeFromLibrary(user.id, gameId);
        setInLibrary(false);
      } else {
        await libraryService.addToLibrary(user.id, gameId);
        setInLibrary(true);
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not update library.",
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
      aria-label={inLibrary ? "Remove from library" : "Add to library"}
      icon={
        inLibrary ? (
          <FaBook color={colorMode === "light" ? "#3182ce" : "#63b3ed"} />
        ) : (
          <FaBookOpen />
        )
      }
      isLoading={loading}
      variant="ghost"
      size="md"
      fontSize="1.5rem"
      bg="transparent"
      _hover={{
        bg: colorMode === "light" ? "gray.100" : "gray.700",
        color: colorMode === "light" ? "blue.400" : "blue.300",
      }}
      _active={{
        bg: colorMode === "light" ? "gray.200" : "gray.600",
      }}
      onClick={handleToggle}
      tabIndex={0}
      transition="all 0.15s"
    />
  );
};

export default GameLibraryIcon;
