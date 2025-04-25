import { useQuery } from "@tanstack/react-query";
import gameService from "./gameService";

const useGame = (id: number) =>
  useQuery({
    queryKey: ["games", id],
    queryFn: () => gameService.get(id),
  });

export default useGame;
