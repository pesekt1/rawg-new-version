import useDeleteEntity from "../../hooks/useDeleteEntity";
import storeService from "./storeService";

const useDeleteStore = (options?: any) =>
  useDeleteEntity<string>(storeService.delete, ["stores"], options);

export default useDeleteStore;
