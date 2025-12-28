import { Box, Heading, Spinner } from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StyledText from "../../../components/StyledText";
import { Response } from "../../../services/api-client";
import Review from "../Review";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: InfiniteData<Response<Review>> | undefined;
  isLoadingReviews: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  fetchedReviewsCount: number;
  isGameDetail: boolean;
}

const ReviewsSection = ({
  reviews,
  isLoadingReviews,
  fetchNextPage,
  hasNextPage,
  fetchedReviewsCount,
  isGameDetail,
}: Props) => (
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
            <ReviewCard
              key={`${review.userId}-${review.gameId}`}
              review={review}
              isGameDetail={isGameDetail} //show game name or not
            />
          ))}
        </React.Fragment>
      ))}
    </InfiniteScroll>
    {(!reviews?.pages || reviews.pages[0].results.length === 0) &&
      !isLoadingReviews && <StyledText>No reviews available.</StyledText>}
  </Box>
);

export default ReviewsSection;
