import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import trailerService from "./trailerService";

const useTrailers = (gameId: number) => {
  const apiClient = trailerService(gameId);

  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
  });
};

export default useTrailers;
