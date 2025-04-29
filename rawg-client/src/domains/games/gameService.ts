import ApiClient from "../../services/api-client";
import { Game } from "./Game";

/**
 * Service for performing CRUD operations on Game entities.
 * Uses the generic ApiClient with the "/games" endpoint.
 */
const gameService = new ApiClient<Game>("/games");

export default gameService;
