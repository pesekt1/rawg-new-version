import { libraryCollectionService } from "./userCollectionService";

export const getUserWithLibrary = async (userId: number) => {
  return libraryCollectionService.getUserWithCollection(userId);
};

export const addToLibrary = async (userId: number, gameId: number) => {
  return libraryCollectionService.addToCollection(userId, gameId);
};

export const removeFromLibrary = async (userId: number, gameId: number) => {
  return libraryCollectionService.removeFromCollection(userId, gameId);
};
