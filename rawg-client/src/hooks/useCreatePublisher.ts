import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Publisher } from "../entities/Publisher"; // Adjust import path as needed

const apiClient = new ApiClient<Publisher>("/publishers");

const useCreatePublisher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Publisher>) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
  });
};

export default useCreatePublisher;
