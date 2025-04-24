import useGetEntities from "../../hooks/useGetEntities";
import stores from "./stores";
import { Store } from "./Store";
import storeService from "./storeService";
import { Response } from "../../services/api-client";

const useStores = () =>
  useGetEntities<Response<Store>>({
    queryKey: ["stores"],
    queryFn: storeService.getAll,
    placeholderData: stores,
  });

export default useStores;
