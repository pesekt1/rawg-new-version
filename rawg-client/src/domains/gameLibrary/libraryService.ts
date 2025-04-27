import { UserGameRelationService } from "../../services/user-game-relation-service";
import { Game } from "../games/Game";

const libraryService = new UserGameRelationService<Game>("/library");

export default libraryService;
