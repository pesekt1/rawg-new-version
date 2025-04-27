import { HStack, Avatar, Text, VStack, useColorMode } from "@chakra-ui/react";
import { FaGift, FaBook } from "react-icons/fa";
import { useAuth } from "../../domains/auth/useAuth";
import useGameQueryStore from "../../state";
import UserPanelAction from "./UserPanelAction";

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
    if (user?.id) setWishlistId(user.id);
  };
  const handleWishlistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") handleWishlistClick();
  };
  const handleLibraryClick = () => {
    if (user?.id) setLibraryId(user.id);
  };
  const handleLibraryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") handleLibraryClick();
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
        <Avatar name={user.username} color="white" size="md" />
      </HStack>
      <UserPanelAction
        icon={FaGift}
        label="Wishlist"
        selected={isWishlistSelected}
        onClick={handleWishlistClick}
        onKeyDown={handleWishlistKeyDown}
        colorMain={colorMain}
        colorSelected={colorSelected}
        colorHover={colorHover}
        colorActive={colorActive}
        bgHover={bgHover}
        bgActive={bgActive}
        bgSelected={bgSelected}
      />
      <UserPanelAction
        icon={FaBook}
        label="Library"
        selected={isLibrarySelected}
        onClick={handleLibraryClick}
        onKeyDown={handleLibraryKeyDown}
        colorMain={colorMain}
        colorSelected={colorSelected}
        colorHover={colorHover}
        colorActive={colorActive}
        bgHover={bgHover}
        bgActive={bgActive}
        bgSelected={bgSelected}
      />
      {/* Add more user-related items here in the future */}
    </VStack>
  );
};

export default UserPanel;
