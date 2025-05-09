import { EntityReadDto } from "./EntityReadDto";
import { PlatformReadDto } from "./PlatformReadDto";
import { TagReadDto } from "./TagReadDto";

export type GameReadDto = {
  id: number;
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
  genres: EntityReadDto[];
  parent_platforms: PlatformReadDto[];
  stores: EntityReadDto[];
  publishers: EntityReadDto[];
  developers: EntityReadDto[];
  tags: TagReadDto[];
  wishlistedBy: { id: number }[];
  inLibraryOf: { id: number }[];
};
