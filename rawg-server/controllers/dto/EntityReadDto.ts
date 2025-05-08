/**
 * General DTO for reading entities with common fields.
 */
export interface EntityReadDto {
  id: number;
  name: string;
  slug: string;
  image_background?: string | null;
}
