import ApiClient from "../../services/api-client";
import { Trailer } from "./Trailer";

const trailerService = (gameId: number) =>
  new ApiClient<Trailer>(`/games/${gameId}/movies`);

export default trailerService;
