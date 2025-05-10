import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Developer } from "./Developer";
import developerService from "./developerService";

const useDevelopersPagination = () =>
  useGetEntitiesPagination<Developer>({
    queryKey: ["developers-pagination"],
    queryFn: ({ pageParam = 1, page_size }) =>
      developerService.getAll({
        params: {
          page: pageParam,
          page_size,
        },
      }),
  });

export default useDevelopersPagination;
