import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Developer } from "./Developer";
import developerService from "./developerService";

const useDevelopersPagination = (pageSize: number = 10) =>
  useGetEntitiesPagination<Developer>({
    queryKey: ["developers-pagination", pageSize],
    queryFn: ({ pageParam = 1, page_size }) =>
      developerService.getAll({
        params: {
          page: pageParam,
          page_size: pageSize ?? page_size,
        },
      }),
  });

export default useDevelopersPagination;
