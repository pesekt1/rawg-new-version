import { HStack, Text, VStack } from "@chakra-ui/react";
import useGameQueryStore from "../../state/state";
import WishlistAction from "./WishlistAction";
import LibraryAction from "./LibraryAction";
import UserAvatar from "./UserAvatar";
import useAuthStore from "../../state/useAuthStore";

const UserPanel = () => {
  // Always call hooks first, before any return
  const user = useAuthStore((s) => s.user);
  const setWishlistId = useGameQueryStore((s) => s.setWishlistUserId);
  const wishlistId = useGameQueryStore((s) => s.gameQuery.wishlistUserId);
  const setLibraryId = useGameQueryStore((s) => s.setLibraryUserId);
  const libraryId = useGameQueryStore((s) => s.gameQuery.libraryUserId);

  //if not logged in, return null - dont show the user panel
  if (!user || !user.id || !user.username) return null;

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
        <UserAvatar user={user} size="sm" />
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
    </VStack>
  );
};

export default UserPanel;
