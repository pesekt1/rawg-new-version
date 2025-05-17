import { Box, Heading, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import StyledText from "../../../components/StyledText";
import React from "react";

const ReviewsSection = ({
  reviews,
  isLoadingReviews,
  fetchNextPage,
  hasNextPage,
  fetchedReviewsCount,
}: {
  reviews: any;
  isLoadingReviews: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  fetchedReviewsCount: number;
}) => (
  <Box mt={4}>
    <Heading size="md" mb={2}>
      Reviews
    </Heading>
    <InfiniteScroll
      dataLength={fetchedReviewsCount}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<Spinner size="sm" mt={2} />}
    >
      {reviews?.pages.map((page: any, index: number) => (
        <React.Fragment key={index}>
          {page.results.map((review: any) => (
            <Box
              key={review.userId}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              mb={2}
            >
              <StyledText>{review.review}</StyledText>
              <Box fontSize="sm" color="gray.500">
                - User {review.userId}
              </Box>
            </Box>
          ))}
        </React.Fragment>
      ))}
    </InfiniteScroll>
    {(!reviews?.pages || reviews.pages[0].results.length === 0) &&
      !isLoadingReviews && <StyledText>No reviews available.</StyledText>}
  </Box>
);

export default ReviewsSection;
