import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { User } from "../../interfaces/User";
import userService from "./userService";

const useUsersPagination = (pageSize: number = 10) =>
  useGetEntitiesPagination<User>({
    queryKey: ["users-pagination", pageSize],
    queryFn: ({ pageParam = 1, page_size }) =>
      userService.getAll({
        params: {
          page: pageParam,
          page_size: pageSize ?? page_size,
        },
      }),
  });

export default useUsersPagination;
