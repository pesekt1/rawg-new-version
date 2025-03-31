import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { Platform } from "./usePlatforms";
import ApiClient, { Response } from "../services/api-client";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const apiClient = new ApiClient<Game>("/games");

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<Response<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genre?.slug,
          parent_platforms: gameQuery.platform?.id,
          stores: gameQuery.store?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

export default useGames;

// const useGames = (gameQuery: GameQuery) =>
//   useData<Game>(
//     "/games",
//     {
//       params: {
//         genres: gameQuery.genre?.slug,
//         parent_platforms: gameQuery.platform?.id,
//         stores: gameQuery.store?.id,
//         ordering: gameQuery.sortOrder,
//         search: gameQuery.searchText,
//       },
//     },
//     [gameQuery]
//   );
