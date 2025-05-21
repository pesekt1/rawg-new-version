import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import useReviewsPaginated from "../domains/reviews/useReviewsPaginated";

const ReviewsPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewsPaginated();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll: fetch next page when the sentinel comes into view
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error loading reviews.</Text>;

  return (
    <Box maxW="600px" mx="auto" mt={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        All Reviews
      </Text>
      <VStack spacing={4} align="stretch">
        {data?.pages.map((page, i) =>
          page.results.map((review) => (
            <Box
              key={`${review.userId}-${review.gameId}-${i}`}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="gray.50"
              _dark={{ bg: "gray.700" }}
            >
              <Text fontWeight="bold">User {review.userId}</Text>
              <Text>{review.review}</Text>
            </Box>
          ))
        )}
      </VStack>
      <Box ref={loadMoreRef} minH="40px" />
      {isFetchingNextPage && <Spinner mt={4} />}
      {!hasNextPage && (
        <Text mt={4} color="gray.500" textAlign="center">
          No more reviews.
        </Text>
      )}
    </Box>
  );
};

export default ReviewsPage;
