import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const usePublishersPagination = (pageSize: number = 10) =>
  useGetEntitiesPagination<Publisher>({
    queryKey: ["publishers-pagination", pageSize],
    queryFn: ({ pageParam = 1, page_size }) =>
      publisherService.getAll({
        params: {
          page: pageParam,
          page_size: pageSize ?? page_size,
        },
      }),
  });

export default usePublishersPagination;
