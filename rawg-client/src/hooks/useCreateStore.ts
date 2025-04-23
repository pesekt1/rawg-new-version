import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Store } from "../entities/Store"; // Adjust import path as needed

const apiClient = new ApiClient<Store>("/stores");

const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Store>) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};

export default useCreateStore;
