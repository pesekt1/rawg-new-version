import {
  HStack,
  Avatar,
  Text,
  VStack,
  Box,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { FaGift, FaBook } from "react-icons/fa";
import { useAuth } from "../../domains/auth/useAuth";
import useGameQueryStore from "../../state";

const UserPanel = () => {
  const { user } = useAuth();
  const setWishlistId = useGameQueryStore((s) => s.setWishlistId);
  const wishlistId = useGameQueryStore((s) => s.gameQuery.wishlistId);
  const setLibraryId = useGameQueryStore((s) => s.setLibraryId);
  const libraryId = useGameQueryStore((s) => s.gameQuery.libraryId);
  const { colorMode } = useColorMode();

  // Color variables similar to CustomList
  const colorMain = colorMode === "light" ? "gray.800" : "white";
  const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";
  const colorHover = colorMode === "light" ? "accent.600" : "white";
  const colorActive = colorMode === "light" ? "accent.700" : "yellow.300";
  const bgHover = colorMode === "light" ? "lightGray.300" : "accent.500";
  const bgActive = colorMode === "light" ? "lightGray.300" : "accent.500";
  const bgSelected = "transparent"; // always transparent

  const handleWishlistClick = () => {
    if (user?.id) {
      setWishlistId(user.id);
    }
  };

  const handleWishlistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleWishlistClick();
    }
  };

  const handleLibraryClick = () => {
    if (user?.id) {
      setLibraryId(user.id);
    }
  };

  const handleLibraryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleLibraryClick();
    }
  };

  if (!user) return null;

  const isWishlistSelected = wishlistId === user.id;
  const isLibrarySelected = libraryId === user.id;

  return (
    <VStack align="start" spacing={6} mb={6}>
      <HStack spacing={3} alignItems="center">
        <Text fontWeight="bold" fontSize="2xl" color={colorMain}>
          {user.username}
        </Text>
        <Avatar name={user.username} color="white" size="md">
          {user.username[0]?.toUpperCase()}
        </Avatar>
      </HStack>
      <Box
        w="100%"
        cursor="pointer"
        onClick={handleWishlistClick}
        onKeyDown={handleWishlistKeyDown}
        role="button"
        tabIndex={0}
        display="flex"
        alignItems="center"
        gap={2}
        px={2}
        py={1}
        borderRadius="md"
        color={isWishlistSelected ? colorSelected : colorMain}
        bg={bgSelected}
        _hover={{
          bg: bgHover,
          color: colorHover,
        }}
        _active={{
          bg: bgActive,
          color: colorActive,
        }}
        transition="background 0.2s, color 0.2s"
      >
        <Box
          bg="gray.700"
          color="white"
          borderRadius="md"
          p={2}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaGift} boxSize={6} />
        </Box>
        <Text fontWeight="bold" fontSize="md">
          Wishlist
        </Text>
      </Box>
      <Box
        w="100%"
        cursor="pointer"
        onClick={handleLibraryClick}
        onKeyDown={handleLibraryKeyDown}
        role="button"
        tabIndex={0}
        display="flex"
        alignItems="center"
        gap={2}
        px={2}
        py={1}
        borderRadius="md"
        color={isLibrarySelected ? colorSelected : colorMain}
        bg={bgSelected}
        _hover={{
          bg: bgHover,
          color: colorHover,
        }}
        _active={{
          bg: bgActive,
          color: colorActive,
        }}
        transition="background 0.2s, color 0.2s"
      >
        <Box
          bg="gray.700"
          color="white"
          borderRadius="md"
          p={2}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaBook} boxSize={6} />
        </Box>
        <Text fontWeight="bold" fontSize="md">
          Library
        </Text>
      </Box>
      {/* Add more user-related items here in the future */}
    </VStack>
  );
};

export default UserPanel;
