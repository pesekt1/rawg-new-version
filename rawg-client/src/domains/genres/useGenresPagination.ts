import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useGenresPagination = () =>
  useGetEntitiesPagination<Genre>({
    queryKey: ["genres-pagination"],
    queryFn: ({ pageParam = 1, page_size }) =>
      genreService.getAll({
        params: {
          page: pageParam,
          page_size,
        },
      }),
  });

export default useGenresPagination;
