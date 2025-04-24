import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Platform } from "./Platform";
import platforms from "./platforms";
import { Response } from "../../services/api-client";
import platformService from "./platformService";

const usePlatforms = () =>
  useQuery<Response<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: platformService.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    placeholderData: platforms,
  });

export default usePlatforms;
