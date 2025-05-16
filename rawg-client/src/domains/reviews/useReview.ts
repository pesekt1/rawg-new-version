import { useQuery } from "@tanstack/react-query";
import reviewService from "./reviewService";
import Review from "./Review";

const useReview = (gameId: number, userId: number) =>
  useQuery<Review | null, Error>({
    queryKey: ["review", gameId, userId],
    queryFn: async () => {
      const response = await reviewService.getAll({
        params: { gameId, userId },
      });
      return response.results.length > 0 ? response.results[0] : null;
    },
    enabled: !!userId, // Only fetch if userId is available
  });

export default useReview;
