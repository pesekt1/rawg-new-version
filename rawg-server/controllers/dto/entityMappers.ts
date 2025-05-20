import { EntityReadDto } from "./EntityReadDto";
import { PlatformReadDto } from "./PlatformReadDto";
import { TagReadDto } from "./TagReadDto";
import { Developer } from "../../entities/Developer";
import { ParentPlatform } from "../../entities/ParentPlatform";
import { Tag } from "../../entities/Tag";
import { Publisher } from "../../entities/Publisher";
import { Store } from "../../entities/Store";
import { Genre } from "../../entities/Genre";
import { Game } from "../../entities/Game";
import { GameReadDto } from "./GameReadDto";
import { GameCardDto } from "./GameCardDto";
import { User } from "../../entities/User";
import { UserReadDto } from "./UserReadDto";

/**
 * Mapper for Developer, Publisher, Store, and Genre entities to EntityReadDto.
 */
export function toEntityReadDto(
  entity: Developer | Publisher | Store | Genre
): EntityReadDto {
  return {
    id: entity.id,
    name: entity.name,
    slug: entity.slug,
    image_background: entity.image_background ?? null,
  };
}

/**
 * Mapper for ParentPlatform entity to PlatformReadDto (no image_background).
 */
export function toPlatformReadDto(entity: ParentPlatform): PlatformReadDto {
  return {
    id: entity.id,
    name: entity.name,
    slug: entity.slug,
  };
}

/**
 * Mapper for Tag entity to TagReadDto (with optional language).
 */
export function toTagReadDto(entity: Tag): TagReadDto {
  return {
    id: entity.id,
    name: entity.name,
    slug: entity.slug,
    image_background: entity.image_background ?? null,
    language: entity.language ?? null,
  };
}

/**
 * Maps an array of Developer, Publisher, Store, or Genre entities to EntityReadDto array.
 */
export function toEntityReadDtoArray(
  entities: Array<Developer | Publisher | Store | Genre>
): EntityReadDto[] {
  return entities.map(toEntityReadDto);
}

/**
 * Maps an array of ParentPlatform entities to PlatformReadDto array.
 */
export function toPlatformReadDtoArray(
  entities: ParentPlatform[]
): PlatformReadDto[] {
  return entities.map(toPlatformReadDto);
}

/**
 * Maps an array of Tag entities to TagReadDto array.
 */
export function toTagReadDtoArray(entities: Tag[]): TagReadDto[] {
  return entities.map(toTagReadDto);
}

/**
 * Mapper for Game entity to GameReadDto.
 */
export function toGameReadDto(game: Game): GameReadDto {
  return {
    id: game.id,
    name: game.name,
    slug: game.slug,
    description_raw: game.description_raw,
    metacritic: game.metacritic,
    background_image: game.background_image,
    rating: game.rating,
    released: game.released,
    added: game.added,
    rating_top: game.rating_top,
    website: game.website,
    genres: game.genres ? toEntityReadDtoArray(game.genres) : [],
    parent_platforms: game.parent_platforms
      ? toPlatformReadDtoArray(game.parent_platforms)
      : [],
    stores: game.stores ? toEntityReadDtoArray(game.stores) : [],
    publishers: game.publishers ? toEntityReadDtoArray(game.publishers) : [],
    developers: game.developers ? toEntityReadDtoArray(game.developers) : [],
    tags: game.tags ? toTagReadDtoArray(game.tags) : [],
    wishlistedBy: game.wishlistedBy
      ? game.wishlistedBy.map((u) => ({ id: u.id }))
      : [],
    inLibraryOf: game.inLibraryOf
      ? game.inLibraryOf.map((u) => ({ id: u.id }))
      : [],
  };
}

/**
 * Mapper for Game entity to GameCardDto.
 */
export function toGameCardDto(game: Game): GameCardDto {
  return {
    id: game.id,
    name: game.name,
    metacritic: game.metacritic,
    background_image: game.background_image,
    rating_top: game.rating_top,
    parent_platforms: game.parent_platforms,
    wishlistedBy: game.wishlistedBy
      ? game.wishlistedBy.map((u) => ({ id: u.id }))
      : [],
    inLibraryOf: game.inLibraryOf
      ? game.inLibraryOf.map((u) => ({ id: u.id }))
      : [],
  };
}

/**
 * Mapper for User entity to UserDto.
 */
export function toUserDto(user: User): UserReadDto {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
}
