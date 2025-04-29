import useGetEntity from "../../hooks/useGetEntity";
import { Platform } from "./Platform";
import platformService from "./platformService";

const usePlatform = (platformId?: number | null) =>
  useGetEntity<Platform>({
    idOrSlug: platformId,
    queryKeyPrefix: "platform",
    service: platformService,
  });

export default usePlatform;
