import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Publisher } from "../entities/Publisher"; // Adjust import path as needed

const apiClient = new ApiClient<Publisher>("/publishers");

const useCreatePublisher = () =>
  useMutation({
    mutationFn: (data: Partial<Publisher>) => apiClient.post(data),
  });

export default useCreatePublisher;
