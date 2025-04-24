import useCreateEntity from "../../hooks/useCreateEntity";
import { Store } from "./Store";
import storeService from "./storeService";

const useCreateStore = () =>
  useCreateEntity<Store>(storeService.post, ["stores"]);

export default useCreateStore;
