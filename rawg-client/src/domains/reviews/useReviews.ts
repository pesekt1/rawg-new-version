import { useInfiniteQuery } from "@tanstack/react-query";
import { Response } from "../../services/api-client";
import Review from "./Review";
import reviewService from "./reviewService";

const useReviews = (gameId: number) =>
  useInfiniteQuery<Response<Review>, Error>({
    queryKey: ["reviews", gameId],
    queryFn: ({ pageParam = 1 }) =>
      reviewService.getAll({
        params: {
          gameId,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

export default useReviews;
