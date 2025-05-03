import { EntityUpdateDto } from "./EntityUpdateDto";

/**
 * DTO for entities with an id, name, slug, and optional image_background.
 */
export interface EntityWithIdDto extends EntityUpdateDto {
  id: number;
}
