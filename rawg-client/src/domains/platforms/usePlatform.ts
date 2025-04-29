import useGetEntity from "../../hooks/useGetEntity";
import { Platform } from "./Platform";
import platformService from "./platformService";

const usePlatform = (platformId: number) =>
  useGetEntity<Platform>({
    queryKey: ["platform", platformId],
    queryFn: () => platformService.get(platformId),
  });

export default usePlatform;
