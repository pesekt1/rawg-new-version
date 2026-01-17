import z from "zod";
import { gameService } from "../game/gameService";
import { genreService } from "../genreService";
import { parentPlatformService } from "../parentPlatformService";

const MAX_PAGE_SIZE = 20;

const SearchGamesArgs = z
  .object({
    searchText: z.string().trim().min(1).optional(),
    page: z.number().int().min(1).optional(),
    page_size: z.number().int().min(1).max(MAX_PAGE_SIZE).optional(),
    genreId: z.string().optional(),
    storeId: z.number().int().optional(),
    platformId: z.number().int().optional(),
    publisherId: z.number().int().optional(),
    developerId: z.number().int().optional(),
    tagId: z.number().int().optional(),
    sortOrder: z
      .enum([
        "relevance",
        "-added",
        "name",
        "-released",
        "-metacritic",
        "-rating",
      ])
      .optional(),
  })
  .strict();

const GetGameArgs = z.object({ id: z.number().int().positive() }).strict();

const ListArgs = z
  .object({
    page: z.number().int().min(1).optional(),
    page_size: z.number().int().min(1).max(MAX_PAGE_SIZE).optional(),
  })
  .strict();

function sanitizeGameCard(dto: any) {
  return {
    id: dto.id,
    name: dto.name,
    metacritic: dto.metacritic,
    background_image: dto.background_image,
    rating_top: dto.rating_top,
    parent_platforms: dto.parent_platforms ?? [],
  };
}

function sanitizeGameRead(dto: any) {
  const {
    wishlistedBy: _wishlistedBy,
    inLibraryOf: _inLibraryOf,
    ...rest
  } = dto ?? {};
  return rest;
}

export const rawgDbToolset = {
  tools: [
    {
      type: "function",
      name: "rawg_search_games",
      description:
        "Search games in the RAWG database with optional filters and pagination.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          searchText: { type: "string" },
          page: { type: "integer", minimum: 1 },
          page_size: { type: "integer", minimum: 1, maximum: MAX_PAGE_SIZE },
          genreId: { type: "string" },
          storeId: { type: "integer" },
          platformId: { type: "integer" },
          publisherId: { type: "integer" },
          developerId: { type: "integer" },
          tagId: { type: "integer" },
          sortOrder: {
            type: "string",
            enum: [
              "relevance",
              "-added",
              "name",
              "-released",
              "-metacritic",
              "-rating",
            ],
          },
        },
        required: [],
      },
    },
    {
      type: "function",
      name: "rawg_get_game",
      description:
        "Get full details for a single game by id (sanitized; no user relation ids).",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "integer", minimum: 1 },
        },
        required: ["id"],
      },
    },
    {
      type: "function",
      name: "rawg_list_genres",
      description: "List genres with pagination.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          page: { type: "integer", minimum: 1 },
          page_size: { type: "integer", minimum: 1, maximum: MAX_PAGE_SIZE },
        },
        required: [],
      },
    },
    {
      type: "function",
      name: "rawg_list_platforms",
      description: "List parent platforms with pagination.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          page: { type: "integer", minimum: 1 },
          page_size: { type: "integer", minimum: 1, maximum: MAX_PAGE_SIZE },
        },
        required: [],
      },
    },
  ],
  handlers: {
    async rawg_search_games(args: unknown) {
      const parsed = SearchGamesArgs.parse(args);

      const filters: any = {
        ...parsed,
        page_size: parsed.page_size ?? 10,
      };

      const res = await gameService.getGames(filters);

      return {
        count: res.count,
        next: res.next,
        results: (res.results ?? []).map(sanitizeGameCard),
      };
    },

    async rawg_get_game(args: unknown) {
      const { id } = GetGameArgs.parse(args);
      const dto = await gameService.getGame(id);
      return sanitizeGameRead(dto);
    },

    async rawg_list_genres(args: unknown) {
      const parsed = ListArgs.parse(args);
      return genreService.getAllDtos(parsed.page ?? 1, parsed.page_size ?? 20);
    },

    async rawg_list_platforms(args: unknown) {
      const parsed = ListArgs.parse(args);
      return parentPlatformService.getAllDtos(
        parsed.page ?? 1,
        parsed.page_size ?? 20,
      );
    },
  },
} as const;
