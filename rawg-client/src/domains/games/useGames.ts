import { useInfiniteQuery } from "@tanstack/react-query";
import { Response } from "../../services/api-client";
import useGameQueryStore from "../../state";
import { Game } from "./Game";
import gameService from "./gameService";

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useInfiniteQuery<Response<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      gameService.getAll({
        params: {
          ...gameQuery,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
