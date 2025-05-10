import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const usePublishersPagination = () =>
  useGetEntitiesPagination<Publisher>({
    queryKey: ["publishers-pagination"],
    queryFn: ({ pageParam = 1, page_size }) =>
      publisherService.getAll({
        params: {
          page: pageParam,
          page_size,
        },
      }),
  });

export default usePublishersPagination;
