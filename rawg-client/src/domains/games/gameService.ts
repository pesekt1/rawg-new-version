import ApiClient from "../../services/api-client";
import { Game } from "./Game";

const gameService = new ApiClient<Game>("/games");

export default gameService;
