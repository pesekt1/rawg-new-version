import { useQueryClient } from "@tanstack/react-query";
import useDeleteEntity from "../../hooks/useDeleteEntity";
import reviewService from "./reviewService";

const useDeleteReview = (gameId: number, userId: number) => {
  const queryClient = useQueryClient();

  return useDeleteEntity<{ id1: number; id2: number }>(
    (id1, id2) => reviewService.deleteComposite({ userId: id1, gameId: id2 }),
    ["reviews", gameId],
    {
      onSuccess: () => {
        // Invalidate the specific review cache for the user
        queryClient.invalidateQueries(["review", gameId, userId]);
      },
    }
  );
};

export default useDeleteReview;
