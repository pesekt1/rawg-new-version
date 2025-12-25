import {
  Alert,
  AlertIcon,
  Box,
  GridItem,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../domains/auth/useAuth";
import AdminActions from "../domains/games/components/AdminActions";
import GameDetailsSection from "../domains/games/components/GameDetailsSection";
import GameScreenshots from "../domains/games/components/GameScreenshots/GameScreenshots";
import GameTrailer from "../domains/games/components/GameTrailer";
import useDeleteGame from "../domains/games/useDeleteGame";
import useGame from "../domains/games/useGame";
import ReviewButton from "../domains/reviews/components/ReviewButton";
import ReviewModal from "../domains/reviews/components/reviewModal";
import ReviewsSection from "../domains/reviews/components/ReviewsSection";
import ReviewSummarySection from "../domains/reviews/components/RewiewSummarySection";
import useReview from "../domains/reviews/useReview";
import useReviews from "../domains/reviews/useReviews";

const GameDetailPage = () => {
  const { id } = useParams();
  const gameId = Number(id);

  const { data: game, isLoading, error } = useGame(gameId);
  const navigate = useNavigate();
  const { user } = useAuth();
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
        {user?.role === "admin" && (
          <AdminActions
            onEdit={() => navigate(`/games/${game.id}/edit`)}
            onDelete={() => deleteGame(game.id)}
            isDeleting={isDeleting}
          />
        )}
        <ReviewButton
          userReview={userReview}
          role={user?.role}
          onOpenReviewModal={() => setReviewModalOpen(true)}
        />
        <GameDetailsSection game={game} />
        <ReviewSummarySection game={game} />
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          gameId={game.id}
        />
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
          <ReviewsSection
            reviews={reviews}
            isLoadingReviews={isLoadingReviews}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            fetchedReviewsCount={fetchedReviewsCount}
          />
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
