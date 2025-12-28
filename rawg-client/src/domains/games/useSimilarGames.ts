import { useQuery } from "@tanstack/react-query";
import { Response } from "../../services/api-client";
import { Game } from "./Game";
import gameService from "./gameService";

type Params = {
  gameId: number;
  genreId?: number;
  tagId?: number;
  limit?: number;
};

const useSimilarGames = ({ gameId, genreId, tagId, limit = 8 }: Params) => {
  const pageSize = Math.min(Math.max(limit + 1, 1), 40);

  return useQuery<Response<Game>, Error>({
    queryKey: ["games", "similar", { gameId, genreId, tagId, limit }],
    enabled: !!gameId && (!!genreId || !!tagId),
    queryFn: () =>
      gameService.getAll({
        params: {
          page: 1,
          page_size: pageSize,
          sortOrder: "-metacritic",
          ...(genreId ? { genreId } : {}),
          ...(tagId ? { tagId } : {}),
        },
      }),
  });
};

export default useSimilarGames;
