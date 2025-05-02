import useUpdateEntity from "../../hooks/useUpdateEntity";
import { Platform } from "./Platform";
import platformService from "./platformService";

const useUpdateParentPlatform = () =>
  useUpdateEntity<Platform>(platformService.put, ["platforms"]);

export default useUpdateParentPlatform;
