import ms from "ms";
import { useQuery } from "@tanstack/react-query";
import screenshotService from "./screenshotService";

const useScreenshots = (gameId: number, enabled: boolean = true) => {
  const apiClient = screenshotService(gameId);

  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    enabled,
  });
};

export default useScreenshots;
