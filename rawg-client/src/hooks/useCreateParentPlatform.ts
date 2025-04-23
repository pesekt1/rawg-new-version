import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Platform } from "../entities/Platform"; // Adjust import path as needed

const apiClient = new ApiClient<Platform>("/parent-platforms");

const useCreateParentPlatform = () =>
  useMutation({
    mutationFn: (data: Partial<Platform>) => apiClient.post(data),
  });

export default useCreateParentPlatform;
