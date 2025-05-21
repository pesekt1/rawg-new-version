import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Platform } from "./Platform";
import platformService from "./platformService";

const usePlatformsPagination = () =>
  useGetEntitiesPagination<Platform>({
    queryKey: ["platforms-pagination"],
    queryFn: ({ pageParam = 1, page_size }) =>
      platformService.getAll({
        params: {
          page: pageParam,
          page_size,
        },
      }),
  });

export default usePlatformsPagination;
