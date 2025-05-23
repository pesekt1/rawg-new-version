import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useGenresPagination = (pageSize: number = 10) =>
  useGetEntitiesPagination<Genre>({
    queryKey: ["genres-pagination", pageSize],
    queryFn: ({ pageParam = 1, page_size }) =>
      genreService.getAll({
        params: {
          page: pageParam,
          page_size: pageSize ?? page_size,
        },
      }),
  });

export default useGenresPagination;
