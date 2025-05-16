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
        //invalidate cache
        queryClient.invalidateQueries(["review", gameId, userId]);
        queryClient.invalidateQueries(["reviews", gameId]);
      },
    }
  );
};

export default useDeleteReview;
