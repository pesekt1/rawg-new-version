import useDeleteEntity from "../../hooks/useDeleteEntity";
import developerService from "./developerService";

const useDeleteDeveloper = (options?: any) =>
  useDeleteEntity<string>(developerService.delete, ["developers"], options);

export default useDeleteDeveloper;
