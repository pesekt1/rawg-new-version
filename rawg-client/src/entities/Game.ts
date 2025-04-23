import { Genre } from "./Genre";
import { Platform } from "./Platform";
import { Publisher } from "./Publisher";
import { Store } from "./Store";

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
