import useDeleteEntity from "../../hooks/useDeleteEntity";
import platformService from "./platformService";

const useDeleteParentPlatform = (options?: any) =>
  useDeleteEntity<string>(platformService.delete, ["platforms"], options);

export default useDeleteParentPlatform;
