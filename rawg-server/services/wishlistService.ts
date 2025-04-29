import { wishlistCollectionService } from "./userCollectionService";

export const getUserWithWishlist = async (userId: number) => {
  return wishlistCollectionService.getUserWithCollection(userId);
};

export const addToWishlist = async (userId: number, gameId: number) => {
  return wishlistCollectionService.addToCollection(userId, gameId);
};

export const removeFromWishlist = async (userId: number, gameId: number) => {
  return wishlistCollectionService.removeFromCollection(userId, gameId);
};
