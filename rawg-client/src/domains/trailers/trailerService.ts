import ApiClient from "../../services/api-client";
import { Trailer } from "./Trailer";

const trailerService = (gameId: number) =>
  new ApiClient<Trailer>(`/games/${gameId}/movies`);

export const fetchFirstTrailer = async (gameId: number) => {
  // Assumes the API supports page_size param
  const res = await trailerService(gameId).getAll({ params: { page_size: 1 } });
  return res.results[0] ?? null; // Return null if no trailer
};

export default trailerService;
