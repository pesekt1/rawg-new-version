import { UserGameRelationClient } from "../../services/user-game-relation-client";
import { Game } from "../games/Game";

/**
 * Service for managing the user's wishlist.
 * Provides methods to get, add, and remove games from a user's wishlist
 * using the UserGameRelationClient with the "/wishlist" endpoint.
 */
const wishlistService = new UserGameRelationClient<Game>("/wishlist/games");

export default wishlistService;
