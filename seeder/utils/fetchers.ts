import axios from "axios";
import { Publisher } from "../entities/Publisher";
import { Trailer } from "../entities/Trailer";
import { Screenshot } from "../entities/Screenshot";
import { Repository } from "typeorm";
import { Game } from "../entities/Game";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Store } from "../entities/Store";

interface Response<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface TrailerOriginal {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
}

// Define a type for the RAWG API game structure
type GameOriginal = Omit<Game, "parent_platforms" | "stores"> & {
  parent_platforms: { platform: ParentPlatform }[];
  stores: { store: Store }[];
};

// New function to fetch both description and publishers
export async function fetchAdditionalGameData(
  slug: string
): Promise<{ description_raw: string; publishers: Publisher[] }> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get<Game>(
      `https://api.rawg.io/api/games/${slug}?key=${apiKey}`
    );
    return {
      description_raw:
        response.data.description_raw || "No description available.",
      publishers: response.data.publishers || [],
    };
  } catch (error) {
    console.error(
      `Failed to fetch additional game data for slug: ${slug}`,
      error
    );
    return {
      description_raw: "No description available.",
      publishers: [],
    };
  }
}

export async function fetchTrailers(
  gameId: number,
  trailerRepo: Repository<Trailer>
): Promise<Trailer[]> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get<Response<TrailerOriginal>>(
      `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`
    );
    const trailers = response.data.results || []; // Fallback to an empty array if no results

    // Use TypeORM's create method to ensure proper entity management
    return trailers.map((trailer) =>
      trailerRepo.create({
        id: trailer.id,
        name: trailer.name,
        preview: trailer.preview,
        data480: trailer.data["480"],
        dataMax: trailer.data["max"],
      })
    );
  } catch (error) {
    console.error(`Failed to fetch trailers for game ID: ${gameId}`, error);
    return []; // Return an empty array if the API call fails
  }
}

export async function fetchScreenshots(gameId: number): Promise<Screenshot[]> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get<Response<Screenshot>>(
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`
    );
    const screenshots = response.data.results || []; // Fallback to an empty array if no results
    return screenshots;
  } catch (error) {
    console.error(`Failed to fetch screenshots for game ID: ${gameId}`, error);
    return []; // Return an empty array if the API call fails
  }
}

export async function fetchGames(pages: number = 1): Promise<GameOriginal[]> {
  const apiKey = process.env.RAWG_API_KEY;
  const allGames: GameOriginal[] = [];
  for (let page = 1; page <= pages; page++) {
    try {
      const response = await axios.get<Response<GameOriginal>>(
        `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=40`
      );
      allGames.push(...(response.data.results || []));
    } catch (error) {
      console.error(`Failed to fetch games page ${page}`, error);
    }
  }
  return allGames;
}
