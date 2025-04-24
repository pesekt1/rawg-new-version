import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Publisher } from "../entities/Publisher";
import { Response } from "../services/api-client";
import ms from "ms";

const apiClient = new ApiClient<Publisher>("/publishers");

const usePublishers = () =>
  useQuery<Response<Publisher>, Error>({
    queryKey: ["publishers"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
  });

export default usePublishers;
