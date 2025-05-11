import { HStack, Avatar, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../../domains/auth/useAuth";
import useGameQueryStore from "../../state";
import WishlistAction from "./WishlistAction";
import LibraryAction from "./LibraryAction";

const UserPanel = () => {
  //if not logged in, return null - dont show the user panel
  const { user } = useAuth();
  if (!user) return null;

  const setWishlistId = useGameQueryStore((s) => s.setWishlistUserId);
  const wishlistId = useGameQueryStore((s) => s.gameQuery.wishlistUserId);
  const setLibraryId = useGameQueryStore((s) => s.setLibraryUserId);
  const libraryId = useGameQueryStore((s) => s.gameQuery.libraryUserId);

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

  const isWishlistSelected = wishlistId === user.id;
  const isLibrarySelected = libraryId === user.id;

  return (
    <VStack align="start" mb={2}>
      <HStack spacing={3} alignItems="center">
        <Text fontWeight="bold" fontSize="2xl">
          {user.username}
        </Text>
        <Avatar name={user.username} color="white" size="md" />
      </HStack>
      <WishlistAction
        selected={isWishlistSelected}
        onClick={handleWishlistClick}
        onKeyDown={handleWishlistKeyDown}
      />
      <LibraryAction
        selected={isLibrarySelected}
        onClick={handleLibraryClick}
        onKeyDown={handleLibraryKeyDown}
      />
      {/* Add more user-related items here in the future */}
    </VStack>
  );
};

export default UserPanel;
