import { EntityUpdateDto } from "./EntityUpdateDto";

/**
 * DTO for entities with an id, name, slug, and optional image_background and language.
 */
export interface EntityWithIdDto extends EntityUpdateDto {
  id: number;
}
