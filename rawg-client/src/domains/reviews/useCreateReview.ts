import { useMutation } from "@tanstack/react-query";
import { createReview, type CreateReviewPayload } from "./reviewService";

const useCreateReview = () => {
  const { mutateAsync: createReviewMutation, isLoading } = useMutation(
    async (payload: CreateReviewPayload) => {
      return createReview(payload);
    }
  );

  return { createReview: createReviewMutation, isLoading };
};

export default useCreateReview;
