import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Platform } from "./Platform";
import platformService from "./platformService";

const usePlatformsPagination = (pageSize: number = 10) =>
  useGetEntitiesPagination<Platform>({
    queryKey: ["platforms-pagination", pageSize],
    queryFn: ({ pageParam = 1, page_size }) =>
      platformService.getAll({
        params: {
          page: pageParam,
          page_size: pageSize ?? page_size,
        },
      }),
  });

export default usePlatformsPagination;
