import { SelectQueryBuilder } from "typeorm";
import { Game } from "../../entities/Game";

export const addGenreFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  genreId: String | undefined
) => {
  if (genreId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.genres", "genres")
        .where("genres.id = :genreId", { genreId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

export const addStoreFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  storeId: Number | undefined
) => {
  if (storeId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.stores", "stores")
        .where("stores.id = :storeId", { storeId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

export const addParentPlatformFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  parentPlatformId: Number | undefined
) => {
  if (parentPlatformId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.parent_platforms", "parent_platforms")
        .where("parent_platforms.id = :parentPlatformId", { parentPlatformId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

export const addPublisherFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  publisherId: Number | undefined
) => {
  if (publisherId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.publishers", "publishers")
        .where("publishers.id = :publisherId", { publisherId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

export const addDeveloperFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  developerId: Number | undefined
) => {
  if (developerId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.developers", "developers")
        .where("developers.id = :developerId", { developerId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};

export const addWishlistFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  wishlistUserId: number | undefined
) => {
  if (wishlistUserId) {
    queryBuilder.innerJoinAndSelect(
      "game.wishlistedBy",
      "wishlistedBy",
      "wishlistedBy.id = :wishlistUserId",
      { wishlistUserId }
    );
  } else {
    queryBuilder.leftJoinAndSelect("game.wishlistedBy", "wishlistedBy");
  }
};

export const addGameLibraryFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  libraryUserId: number | undefined
) => {
  if (libraryUserId) {
    queryBuilder.innerJoinAndSelect(
      "game.inLibraryOf",
      "inLibraryOf",
      "inLibraryOf.id = :libraryUserId",
      { libraryUserId }
    );
  } else {
    queryBuilder.leftJoinAndSelect("game.inLibraryOf", "inLibraryOf");
  }
};

export const addOrdering = (
  queryBuilder: SelectQueryBuilder<Game>,
  ordering: String | undefined
) => {
  if (!ordering) {
    return;
  }
  if (ordering === "relevance") {
    queryBuilder.orderBy("game.rating", "DESC");
  }
  if (ordering === "-added") {
    queryBuilder.orderBy("game.added", "DESC");
  }
  if (ordering === "name") {
    queryBuilder.orderBy("game.name", "ASC");
  }
  if (ordering === "-released") {
    queryBuilder.orderBy("game.released", "DESC");
  }
  if (ordering === "-metacritic") {
    queryBuilder.orderBy("game.metacritic", "DESC");
  }
  if (ordering === "-rating") {
    queryBuilder.orderBy("game.rating", "DESC");
  }
};

export const addSearch = (
  queryBuilder: SelectQueryBuilder<Game>,
  search: String | undefined
) => {
  if (search) {
    queryBuilder.andWhere("LOWER(game.name) LIKE :search", {
      search: `%${search}%`,
    });
  }
};

export const addTagFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  tagId: Number | undefined
) => {
  if (tagId) {
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("game.id")
        .from(Game, "game")
        .leftJoin("game.tags", "tags")
        .where("tags.id = :tagId", { tagId })
        .getQuery();
      return "game.id IN " + subQuery;
    });
  }
};
