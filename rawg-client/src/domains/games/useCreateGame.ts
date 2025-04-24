import useCreateEntity from "../../hooks/useCreateEntity";
import { Game } from "./Game";
import gameService from "./gameService";

const useCreateGame = () => useCreateEntity<Game>(gameService.post, ["games"]);

export default useCreateGame;
