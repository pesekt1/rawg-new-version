import useCreateEntity from "../../hooks/useCreateEntity";
import { Platform } from "./Platform";
import platformService from "./platformService";

const useCreateParentPlatform = () =>
  useCreateEntity<Platform>(platformService.post, ["platforms"]);

export default useCreateParentPlatform;
