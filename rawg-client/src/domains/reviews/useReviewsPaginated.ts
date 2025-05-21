import useGetEntitiesPagination from "../../hooks/useGetEntitiesPagination";
import Review from "./Review";
import reviewService from "./reviewService";

const useReviewsPaginated = () =>
  useGetEntitiesPagination<Review>({
    queryKey: ["reviews-pagination"],
    queryFn: ({ pageParam = 1, page_size }) =>
      reviewService.getAll({
        params: {
          page: pageParam,
          page_size,
        },
      }),
  });

export default useReviewsPaginated;
