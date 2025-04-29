import ApiClient from "../../services/api-client";
import { Screenshot } from "./Screenshot";

// Returns an ApiClient for Screenshot entities for a specific game.
const screenshotService = (gameId: number) =>
  new ApiClient<Screenshot>(`/games/${gameId}/screenshots`);

export default screenshotService;
