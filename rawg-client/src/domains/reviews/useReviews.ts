import { useInfiniteQuery } from "@tanstack/react-query";
import { Response } from "../../services/api-client";
import Review from "./Review";
import reviewService from "./reviewService";

interface Props {
  gameId?: number;
  userId?: number;
}

const useReviews = ({ gameId, userId }: Props) =>
  useInfiniteQuery<Response<Review>, Error>({
    queryKey: ["reviews", gameId, userId],
    queryFn: ({ pageParam = 1 }) =>
      reviewService.getAll({
        params: {
          gameId,
          userId,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

export default useReviews;
