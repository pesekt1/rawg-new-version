import { Genre } from "../genres/Genre";
import { Platform } from "../platforms/Platform";
import { Publisher } from "../publishers/Publisher";
import { Store } from "../stores/Store";

export interface Game {
  id: number;
  name: string;
  slug: string;
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  genres: Genre[];
  publishers: Publisher[];
  stores: Store[];
  released: string;
}
