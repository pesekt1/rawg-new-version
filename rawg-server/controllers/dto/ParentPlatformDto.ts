/**
 * DTO for updating parent platform.
 */
export interface ParentPlatformDto {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}
