import { UserGameRelationClient } from "../../services/user-game-relation-client";
import { Game } from "../games/Game";

const wishlistService = new UserGameRelationClient<Game>("/wishlist");

export default wishlistService;
