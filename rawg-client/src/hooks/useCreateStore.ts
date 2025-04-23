import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Store } from "../entities/Store"; // Adjust import path as needed

const apiClient = new ApiClient<Store>("/stores");

const useCreateStore = () =>
  useMutation({
    mutationFn: (data: Partial<Store>) => apiClient.post(data),
  });

export default useCreateStore;
