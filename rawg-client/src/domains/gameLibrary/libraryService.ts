import { UserGameRelationClient } from "../../services/user-game-relation-client";
import { Game } from "../games/Game";

/**
 * Service for managing the user's game library.
 * Provides methods to get, add, and remove games from a user's library
 * using the UserGameRelationClient with the "/library" endpoint.
 */
const libraryService = new UserGameRelationClient<Game>("/library/games");

export default libraryService;
