import { UserGameRelationClient } from "../../services/user-game-relation-client";
import { Game } from "../games/Game";

const libraryService = new UserGameRelationClient<Game>("/library");

export default libraryService;
