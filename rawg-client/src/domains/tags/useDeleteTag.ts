import useDeleteEntity from "../../hooks/useDeleteEntity";
import tagService from "./tagService";

const useDeleteTag = (options?: any) =>
  useDeleteEntity<string>(tagService.delete, ["tags"], options);

export default useDeleteTag;
