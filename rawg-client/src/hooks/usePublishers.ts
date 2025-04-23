import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Publisher } from "../entities/Publisher";

const apiClient = new ApiClient<Publisher>("/publishers");

const usePublishers = () =>
  useQuery({
    queryKey: ["publishers"],
    queryFn: apiClient.getAll,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

export default usePublishers;
