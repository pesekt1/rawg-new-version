import useDeleteEntity from "../../hooks/useDeleteEntity";
import platformService from "./platformService";

const useDeleteParentPlatform = () =>
  useDeleteEntity(platformService.delete, ["platforms"]);

export default useDeleteParentPlatform;
