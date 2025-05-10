import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Store } from "./Store";
import storeService from "./storeService";

const useStoresPagination = () =>
  useGetEntitiesPagination<Store>({
    queryKey: ["stores-pagination"],
    queryFn: ({ pageParam = 1, page_size }) =>
      storeService.getAll({
        params: {
          page: pageParam,
          page_size,
        },
      }),
  });

export default useStoresPagination;
