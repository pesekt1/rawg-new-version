import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import ApiClient from "../../services/api-client";
import { Platform } from "./Platform";
import platforms from "./platforms";
import { Response } from "../../services/api-client";

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
  useQuery<Response<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    placeholderData: platforms,
  });
export default usePlatforms;
