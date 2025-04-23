import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Genre } from "../entities/Genre"; // Adjust import path as needed

const apiClient = new ApiClient<Genre>("/genres");

const useCreateGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Genre>) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });
};

export default useCreateGenre;
