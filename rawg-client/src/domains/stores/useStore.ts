import useGetEntity from "../../hooks/useGetEntity";
import { Store } from "./Store";
import storeService from "./storeService";

const useStore = (storeId?: number | null) =>
  useGetEntity<Store>({
    idOrSlug: storeId,
    queryKeyPrefix: "store",
    service: storeService,
  });

export default useStore;
