import { EntityWithIdDto } from "./EntityWithIdDto";

/**
 * DTO for updating and creating Game entities.
 * 'name' and 'slug' are required, all other fields are optional.
 */
export type GameUpdateDto = {
  name: string;
  slug: string;
  description_raw?: string;
  metacritic?: number;
  background_image?: string;
  rating?: number;
  released?: string;
  added?: number;
  rating_top?: number;
  website?: string;
  genres?: EntityWithIdDto[];
  parent_platforms?: EntityWithIdDto[];
  stores?: EntityWithIdDto[];
  publishers?: EntityWithIdDto[];
  developers?: EntityWithIdDto[];
  tags?: EntityWithIdDto[];
  // Add other relations as needed
};
