import { UserCollectionService } from "./userCollectionService";

const libraryService = new UserCollectionService("library");

export const getUserWithLibrary = async (userId: number) => {
  return libraryService.getUserWithCollection(userId);
};

export const addToLibrary = async (userId: number, gameId: number) => {
  return libraryService.addToCollection(userId, gameId);
};

export const removeFromLibrary = async (userId: number, gameId: number) => {
  return libraryService.removeFromCollection(userId, gameId);
};
