import ApiClient from "../../services/api-client";
import { Screenshot } from "./Screenshot";

const screenshotService = (gameId: number) =>
  new ApiClient<Screenshot>(`/games/${gameId}/screenshots`);

export default screenshotService;
