import useUpdateEntity from "../../hooks/useUpdateEntity";
import { Store } from "./Store";
import storeService from "./storeService";

const useUpdateStore = () =>
  useUpdateEntity<Store>(storeService.put, ["stores"]);

export default useUpdateStore;
