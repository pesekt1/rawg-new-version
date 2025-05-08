import { EntityReadDto } from "./EntityReadDto";

/**
 * DTO for Tag entity, with language field.
 */
export interface TagReadDto extends EntityReadDto {
  language?: string | null;
}
