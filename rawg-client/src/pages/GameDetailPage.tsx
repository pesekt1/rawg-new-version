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
} from "@chakra-ui/react";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../domains/games/components/GameAttributes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { useAuth } from "../domains/auth/useAuth";
import GameScreenshots from "../domains/games/components/GameScreenshots";
import GameTrailer from "../domains/games/components/GameTrailer";
import StyledText from "../components/StyledText";

const apiClient = new ApiClient<any>("/games");

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const {
    mutate: deleteGame,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: () => apiClient.delete(slug!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] }); // Add this line
      navigate("/");
    },
  });

  if (isLoading) return <Spinner />;
  if (error || !game) throw error; // error is handled in the router

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacing={5}
    >
      <GridItem>
        <Heading>{game.name}</Heading>
        <StyledText>
          <ExpandableText>{game.description_raw}</ExpandableText>
        </StyledText>
        <GameAttributes game={game} />
        {isAuthenticated && (
          <HStack mt={4} spacing={2}>
            <Button
              colorScheme="blue"
              variant="solid"
              size="sm"
              onClick={() => navigate(`/games/${game.slug}/edit`)}
            >
              Edit Game
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              size="sm"
              onClick={() => deleteGame()}
              isLoading={isDeleting}
            >
              Delete Game
            </Button>
          </HStack>
        )}
        {isDeleteError && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            {(deleteError as any)?.response?.data?.error ||
              "Failed to delete game"}
          </Alert>
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
