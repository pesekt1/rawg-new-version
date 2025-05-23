import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Store } from "./Store";
import storeService from "./storeService";

const useStoresPagination = (pageSize: number = 10) =>
  useGetEntitiesPagination<Store>({
    queryKey: ["stores-pagination", pageSize],
    queryFn: ({ pageParam = 1, page_size }) =>
      storeService.getAll({
        params: {
          page: pageParam,
          page_size: pageSize ?? page_size,
        },
      }),
  });

export default useStoresPagination;
