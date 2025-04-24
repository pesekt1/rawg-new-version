import useDeleteEntity from "../../hooks/useDeleteEntity";
import storeService from "./storeService";

const useDeleteStore = () => useDeleteEntity(storeService.delete, ["stores"]);

export default useDeleteStore;
