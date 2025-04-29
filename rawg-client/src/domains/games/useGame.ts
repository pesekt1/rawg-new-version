import useGetEntity from "../../hooks/useGetEntity";
import { Game } from "./Game";
import gameService from "./gameService";

const useGame = (id?: number | null) =>
  useGetEntity<Game>({
    idOrSlug: id,
    queryKeyPrefix: "game",
    service: gameService,
  });

export default useGame;
