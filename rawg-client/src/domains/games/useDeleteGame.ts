import useDeleteEntity from "../../hooks/useDeleteEntity";
import gameService from "./gameService";

const useDeleteGame = (options?: any) =>
  useDeleteEntity<string>(gameService.delete, ["games"], options);

export default useDeleteGame;
