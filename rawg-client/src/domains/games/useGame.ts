import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import { Game } from "./Game";
const apiClient = new ApiClient<Game>("/games");

const useGame = (id: number) =>
  useQuery({
    queryKey: ["games", id],
    queryFn: () => apiClient.get(id),
  });

export default useGame;
