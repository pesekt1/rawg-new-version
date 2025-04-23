import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Platform } from "../entities/Platform"; // Adjust import path as needed

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

const useCreateParentPlatform = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Platform>) => apiClient.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
};

export default useCreateParentPlatform;
