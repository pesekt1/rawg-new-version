import useDeleteEntity from "../../hooks/useDeleteEntity";
import gameService from "./gameService";

const useDeleteGame = (options?: any) =>
  useDeleteEntity<number>(gameService.delete, ["games"], options);

export default useDeleteGame;
