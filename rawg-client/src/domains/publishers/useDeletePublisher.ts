import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import { Publisher } from "./Publisher";

const apiClient = new ApiClient<Publisher>("/publishers");

const useDeletePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
  });
};

export default useDeletePublisher;
