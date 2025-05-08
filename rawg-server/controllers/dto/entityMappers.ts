import { EntityReadDto } from "./EntityReadDto";
import { PlatformReadDto } from "./PlatformReadDto";
import { TagReadDto } from "./TagReadDto";
import { Developer } from "../../entities/Developer";
import { ParentPlatform } from "../../entities/ParentPlatform";
import { Tag } from "../../entities/Tag";
import { Publisher } from "../../entities/Publisher";
import { Store } from "../../entities/Store";
import { Genre } from "../../entities/Genre";

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
