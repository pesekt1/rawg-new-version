import { UserCollectionService } from "./userCollectionService";

const wishlistService = new UserCollectionService("wishlist");

export const getUserWithWishlist = async (userId: number) => {
  return wishlistService.getUserWithCollection(userId);
};

export const addToWishlist = async (userId: number, gameId: number) => {
  return wishlistService.addToCollection(userId, gameId);
};

export const removeFromWishlist = async (userId: number, gameId: number) => {
  return wishlistService.removeFromCollection(userId, gameId);
};
