import ApiClient from "../../services/api-client";
import { Trailer } from "./Trailer";

/**
 * Returns an ApiClient for Trailer entities for a specific game.
 * @param gameId - The ID of the game.
 */
const trailerService = (gameId: number) =>
  new ApiClient<Trailer>(`/games/${gameId}/movies`);

/**
 * Fetches the first trailer for a given game.
 * @param gameId - The ID of the game.
 * @returns The first Trailer entity or null if none exist.
 */
export const fetchFirstTrailer = async (gameId: number) => {
  const res = await trailerService(gameId).getAll({ params: { page_size: 1 } });
  return res.results[0] ?? null;
};

export default trailerService;
