import { Developer } from "../developers/Developer";
import { Genre } from "../genres/Genre";
import { Platform } from "../platforms/Platform";
import { Publisher } from "../publishers/Publisher";
import { Store } from "../stores/Store";
import { Tag } from "../tags/Tag";

export interface Game {
  id: number;
  name: string;
  slug: string;
  description_raw: string;
  website: string;
  background_image: string;
  metacritic: number;
  rating_top: number;
  released: string;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
  publishers: Publisher[];
  stores: Store[];
  tags: Tag[];
  developers: Developer[];
  wishlistedBy?: { id: number; username: string }[];
  inLibraryOf?: { id: number; username: string }[];
}
