import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";

interface CreateReviewPayload {
  gameId: number;
  review: string;
  rating: number;
}

const apiClient = new ApiClient<CreateReviewPayload>("/reviews");

const useCreteReview = () => {
  const { mutateAsync: createReview, isLoading } = useMutation(
    async (payload: CreateReviewPayload) => {
      return apiClient.post(payload);
    }
  );

  return { createReview, isLoading };
};

export default useCreteReview;
