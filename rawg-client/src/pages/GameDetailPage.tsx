import { useNavigate, useParams } from "react-router-dom";
import useGame from "../domains/games/useGame";
import {
  Spinner,
  Heading,
  GridItem,
  SimpleGrid,
  Button,
  Alert,
  AlertIcon,
  HStack,
  Box,
} from "@chakra-ui/react";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../domains/games/components/GameAttributes";
import useDeleteGame from "../domains/games/useDeleteGame";
import { useAuth } from "../domains/auth/useAuth";
import GameScreenshots from "../domains/games/components/GameScreenshots/GameScreenshots";
import GameTrailer from "../domains/games/components/GameTrailer";
import StyledText from "../components/StyledText";
import PlatformIconsList from "../domains/platforms/PlatformIconsList";
import { useQueryClient } from "@tanstack/react-query";
import ReviewModal from "../domains/reviews/reviewModal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Import the Plus icon
import useReviews from "../domains/reviews/useReviews";
import useReview from "../domains/reviews/useReview";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";

const GameDetailPage = () => {
  const { id } = useParams();
  const gameId = Number(id);

  const { data: game, isLoading, error } = useGame(gameId);
  const navigate = useNavigate();
  const { role, user } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate: deleteGame,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteGame({
    onSuccess: async () => {
      // Clear cached game detail query after deletion
      await queryClient.removeQueries({ queryKey: ["games", gameId] });
      navigate("/", { replace: true });
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    fetchNextPage,
    hasNextPage,
  } = useReviews(gameId);

  const { data: userReview } = useReview(gameId, user?.id || 0);

  const fetchedReviewsCount =
    reviews?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  if (isLoading)
    return (
      <Box
        minH="70vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  if (error || !game) throw error;

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacing={5}
    >
      <GridItem>
        {role === "admin" && (
          <HStack mb={2} spacing={2}>
            <Button
              colorScheme="blue"
              variant="solid"
              size="sm"
              onClick={() => navigate(`/games/${game.id}/edit`)}
            >
              Edit Game
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              size="sm"
              onClick={() => deleteGame(game.id)}
              isLoading={isDeleting}
            >
              Delete Game
            </Button>
          </HStack>
        )}
        <Heading>{game.name}</Heading>
        <PlatformIconsList platforms={game.parent_platforms} />
        <Button
          marginTop={2}
          variant="outlinedButton"
          size="sm"
          onClick={() => setReviewModalOpen(true)}
          isDisabled={!role} // Disable the button if the user is not authenticated
          leftIcon={<FaPlus />} // Add the Plus icon to the button
        >
          {userReview ? "Update Review" : "Create Review"}
        </Button>
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          gameId={game.id}
        />
        <StyledText>
          <ExpandableText>{game.description_raw}</ExpandableText>
        </StyledText>
        <GameAttributes game={game} />
        {isDeleteError && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            {(deleteError as any)?.response?.data?.error ||
              "Failed to delete game"}
          </Alert>
        )}
        {isLoadingReviews && !reviews ? (
          <Spinner size="sm" mt={4} />
        ) : (
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
              {reviews?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.results.map((review) => (
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
              !isLoadingReviews && (
                <StyledText>No reviews available.</StyledText>
              )}
          </Box>
        )}
      </GridItem>
      <GridItem>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
