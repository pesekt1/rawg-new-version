import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Genre } from "../entities/Genre"; // Adjust import path as needed

const apiClient = new ApiClient<Genre>("/genres");

const useCreateGenre = () =>
  useMutation({
    mutationFn: (data: Partial<Genre>) => apiClient.post(data),
  });

export default useCreateGenre;
