/**
 * DTO for updating and creating entities with common fields - some optional.
 */
export interface EntityUpdateDto {
  name: string;
  slug: string;
  image_background?: string | null;
  language?: string | null;
}
