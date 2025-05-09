import { AppDataSource } from "../../startup/data-source";
import { Game } from "../../entities/Game";
import {
  addGenreFilter,
  addStoreFilter,
  addParentPlatformFilter,
  addPublisherFilter,
  addDeveloperFilter,
  addTagFilter,
  addWishlistFilter,
  addGameLibraryFilter,
  addSearch,
  addOrdering,
} from "./gameQueryFilters";

export const buildGameQuery = (filters: any) => {
  const gameRepository = AppDataSource.getRepository(Game);

  const genreId = filters.genreId ? String(filters.genreId) : undefined;
  const storeId = filters.storeId ? Number(filters.storeId) : undefined;
  const parentPlatformId = filters.platformId
    ? Number(filters.platformId)
    : undefined;
  const publisherId = filters.publisherId
    ? Number(filters.publisherId)
    : undefined;
  const developerId = filters.developerId
    ? Number(filters.developerId)
    : undefined;
  const wishlistUserId = filters.wishlistUserId
    ? Number(filters.wishlistUserId)
    : undefined;
  const libraryUserId = filters.libraryUserId
    ? Number(filters.libraryUserId)
    : undefined;
  const ordering = filters.sortOrder ? String(filters.sortOrder) : undefined;
  const search = filters.searchText
    ? String(filters.searchText).toLowerCase()
    : undefined;
  const tagId = filters.tagId ? Number(filters.tagId) : undefined;

  const queryBuilder = gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms");

  addGenreFilter(queryBuilder, genreId);
  addStoreFilter(queryBuilder, storeId);
  addParentPlatformFilter(queryBuilder, parentPlatformId);
  addPublisherFilter(queryBuilder, publisherId);
  addDeveloperFilter(queryBuilder, developerId);
  addTagFilter(queryBuilder, tagId);
  addWishlistFilter(queryBuilder, wishlistUserId);
  addGameLibraryFilter(queryBuilder, libraryUserId);
  addSearch(queryBuilder, search);
  addOrdering(queryBuilder, ordering);

  return queryBuilder;
};
