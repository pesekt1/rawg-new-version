import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { fetchFirstTrailer } from "./trailerService";

const useFirstTrailer = (gameId: number) => {
  return useQuery({
    queryKey: ["firstTrailer", gameId],
    queryFn: () => fetchFirstTrailer(gameId),
    staleTime: ms("1d"),
  });
};

export default useFirstTrailer;
