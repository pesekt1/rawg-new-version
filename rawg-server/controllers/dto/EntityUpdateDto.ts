/**
 * DTO for updating entities with common fields.
 */
export interface EntityUpdateDto {
  name: string;
  slug: string;
  image_background?: string | null;
}
