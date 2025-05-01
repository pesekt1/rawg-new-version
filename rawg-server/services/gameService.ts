import { SelectQueryBuilder } from "typeorm";
import { Game } from "../entities/Game";
import { AppDataSource } from "../startup/data-source";

/**
 * Service functions for querying and manipulating Game entities.
 */

const gameRepository = AppDataSource.getRepository(Game);

const addGenreFilter = (
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

const addStoreFilter = (
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

const addParentPlatformFilter = (
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

const addPublisherFilter = (
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

const addDeveloperFilter = (
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

const addWishlistFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  wishlistUserId: number | undefined
) => {
  if (wishlistUserId) {
    // Only select games wishlisted by the user
    queryBuilder.innerJoinAndSelect(
      "game.wishlistedBy",
      "wishlistedBy",
      "wishlistedBy.id = :wishlistUserId",
      { wishlistUserId }
    );
  } else {
    // Select all wishlistedBy for all games
    queryBuilder.leftJoinAndSelect("game.wishlistedBy", "wishlistedBy");
  }
};

// Add game library filter
const addGameLibraryFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  libraryUserId: number | undefined
) => {
  if (libraryUserId) {
    // Only select games in the user's library
    queryBuilder.innerJoinAndSelect(
      "game.inLibraryOf",
      "inLibraryOf",
      "inLibraryOf.id = :libraryUserId",
      { libraryUserId }
    );
  } else {
    // Select all inLibraryOf for all games
    queryBuilder.leftJoinAndSelect("game.inLibraryOf", "inLibraryOf");
  }
};

const addOrdering = (
  queryBuilder: SelectQueryBuilder<Game>,
  ordering: String | undefined
) => {
  if (!ordering) {
    return;
  }
  //TODO: implement calculation of the relevance ordering
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

const addSearch = (
  queryBuilder: SelectQueryBuilder<Game>,
  search: String | undefined
) => {
  if (search) {
    queryBuilder.andWhere("LOWER(game.name) LIKE :search", {
      search: `%${search}%`,
    });
  }
};

const addTagFilter = (
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

const buildGameQuery = (req: any) => {
  const genreId = req.query.genreId ? String(req.query.genreId) : undefined;
  const storeId = req.query.storeId ? Number(req.query.storeId) : undefined;
  const parentPlatformId = req.query.platformId
    ? Number(req.query.platformId)
    : undefined;
  const publisherId = req.query.publisherId
    ? Number(req.query.publisherId)
    : undefined;
  const developerId = req.query.developerId
    ? Number(req.query.developerId)
    : undefined;
  const wishlistUserId = req.query.wishlistUserId
    ? Number(req.query.wishlistUserId)
    : undefined;
  const libraryUserId = req.query.libraryUserId
    ? Number(req.query.libraryUserId)
    : undefined;
  const ordering = req.query.sortOrder
    ? String(req.query.sortOrder)
    : undefined;
  const search = req.query.searchText
    ? String(req.query.searchText).toLowerCase()
    : undefined;
  const tagId = req.query.tagId ? Number(req.query.tagId) : undefined;

  // Only join/select minimal relations for GameCard
  const queryBuilder = gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms");

  // Filtering (subquery-based, keeps all relations in response)
  addGenreFilter(queryBuilder, genreId);
  addStoreFilter(queryBuilder, storeId);
  addParentPlatformFilter(queryBuilder, parentPlatformId);
  addPublisherFilter(queryBuilder, publisherId);
  addDeveloperFilter(queryBuilder, developerId);
  addTagFilter(queryBuilder, tagId);

  // Wishlisted and Library filters (these are user-specific, so use inner join if filtering)
  addWishlistFilter(queryBuilder, wishlistUserId);
  addGameLibraryFilter(queryBuilder, libraryUserId);

  // Search and ordering
  addSearch(queryBuilder, search);
  addOrdering(queryBuilder, ordering);

  return queryBuilder;
};

const modifyGameResponse = (games: Game[]) => {
  return games.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms?.map((parent_platform) => ({
      platform: parent_platform,
    })),
    wishlistedBy: game.wishlistedBy
      ? game.wishlistedBy.map((u) => ({ id: u.id, username: u.username }))
      : [],
    inLibraryOf: game.inLibraryOf
      ? game.inLibraryOf.map((u) => ({ id: u.id, username: u.username }))
      : [],
  }));
};

/**
 * Get a paginated list of games with filters and sorting.
 */
export const getGames = async (req: any) => {
  const DEFAULT_PAGE_SIZE = 10;
  const MAX_PAGE_SIZE = 40;
  const DEFAULT_PAGE = 1;

  const page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
  let pageSize = req.query.page_size
    ? Number(req.query.page_size)
    : DEFAULT_PAGE_SIZE;

  // Enforce maximum page size
  if (pageSize > MAX_PAGE_SIZE) pageSize = MAX_PAGE_SIZE;
  if (pageSize < 1) pageSize = DEFAULT_PAGE_SIZE;

  const queryBuilder = buildGameQuery(req);
  queryBuilder.skip((page - 1) * pageSize).take(pageSize);

  const [games, total] = await queryBuilder.getManyAndCount();
  const modifiedGames = modifyGameResponse(games);

  return {
    count: total,
    next:
      total > page * pageSize
        ? `${process.env.SERVER_URL}/games?page=${
            page + 1
          }&page_size=${pageSize}`
        : null,
    results: modifiedGames,
  };
};

/**
 * Get a single game by ID, including all relations.
 */
export const getGame = async (id: number) => {
  const game = await gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.genres", "genres")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms")
    .leftJoinAndSelect("game.stores", "stores")
    .leftJoinAndSelect("game.publishers", "publishers")
    .leftJoinAndSelect("game.developers", "developers")
    .leftJoinAndSelect("game.tags", "tags")
    .leftJoinAndSelect("game.wishlistedBy", "wishlistedBy")
    .leftJoinAndSelect("game.inLibraryOf", "inLibraryOf")
    .where("game.id = :id", { id })
    .getOne();

  if (!game) {
    throw new Error(`Game with id "${id}" not found`);
  }

  return {
    ...game,
    parent_platforms: game.parent_platforms?.map((parent_platform) => ({
      platform: parent_platform,
    })),
    wishlistedBy: game.wishlistedBy
      ? game.wishlistedBy.map((u) => ({ id: u.id, username: u.username }))
      : [],
    inLibraryOf: game.inLibraryOf
      ? game.inLibraryOf.map((u) => ({ id: u.id, username: u.username }))
      : [],
  };
};

/**
 * Get trailers for a specific game.
 */
export const getTrailers = async (gameId: number) => {
  const game = await gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.trailers", "trailers")
    .where("game.id = :gameId", { gameId })
    .getOne();

  if (!game || !game.trailers) {
    throw new Error(`No trailers found for game with ID "${gameId}"`);
  }

  return {
    count: game.trailers.length,
    results: game.trailers,
  };
};

/**
 * Get screenshots for a specific game.
 */
export const getScreenshots = async (gameId: number) => {
  const game = await gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.screenshots", "screenshots") // Assuming a relation exists
    .where("game.id = :gameId", { gameId })
    .getOne();

  if (!game || !game.screenshots) {
    throw new Error(`No screenshots found for game with ID "${gameId}"`);
  }

  return {
    count: game.screenshots.length,
    results: game.screenshots,
  };
};

/**
 * Create a new game.
 */
export const createGame = async (data: Partial<Game>) => {
  // Validate required fields
  if (!data.name || !data.slug) {
    throw new Error("Missing required fields: name and slug");
  }

  // Transform parent_platforms from { platform }[] to Platform[]
  let parentPlatforms = undefined;
  if (Array.isArray(data.parent_platforms)) {
    parentPlatforms = data.parent_platforms
      .map((pp: any) => pp.platform)
      .filter(Boolean);
  }

  // Unix timestamp in seconds
  const added =
    typeof data.added === "number" ? data.added : Math.floor(Date.now() / 1000);

  // Create and save the game
  const game = gameRepository.create({
    ...data,
    parent_platforms: parentPlatforms ?? [],
    added,
  });
  await gameRepository.save(game);
  return game;
};

/**
 * Delete a game by ID.
 */
export const deleteGame = async (id: number) => {
  const game = await gameRepository.findOneBy({ id });
  if (!game) {
    throw new Error(`Game with id "${id}" not found`);
  }
  await gameRepository.remove(game);
};

/**
 * Update a game by ID.
 */
export const updateGame = async (id: number, data: Partial<Game>) => {
  const game = await gameRepository.findOneBy({ id });
  if (!game) throw new Error(`Game with id "${id}" not found`);

  // Only update allowed fields
  if (data.name !== undefined) game.name = data.name;
  if (data.slug !== undefined) game.slug = data.slug;
  if (data.description_raw !== undefined)
    game.description_raw = data.description_raw;
  if (data.released !== undefined) game.released = data.released;
  if (data.website !== undefined) game.website = data.website;
  if (data.background_image !== undefined)
    game.background_image = data.background_image;
  if (data.genres !== undefined) game.genres = data.genres;
  if (data.parent_platforms !== undefined) {
    game.parent_platforms = data.parent_platforms.map((pp: any) => pp.platform);
  }
  if (data.stores !== undefined) game.stores = data.stores;
  if (data.publishers !== undefined) game.publishers = data.publishers;
  if (data.developers !== undefined) game.developers = data.developers;
  if (data.tags !== undefined) game.tags = data.tags;

  await gameRepository.save(game);
  return game;
};
