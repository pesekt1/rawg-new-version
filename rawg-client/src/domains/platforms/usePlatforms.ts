import useGetEntities from "../../hooks/useGetEntities";
import { Platform } from "./Platform";
import platforms from "./platforms";
import platformService from "./platformService";
import { Response } from "../../services/api-client";

const usePlatforms = () =>
  useGetEntities<Response<Platform>>({
    queryKey: ["platforms"],
    queryFn: platformService.getAll,
    placeholderData: platforms,
  });

export default usePlatforms;
