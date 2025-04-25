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
import useDeleteGame from "../domains/games/useDeleteGame";
import { useAuth } from "../domains/auth/useAuth";
import GameScreenshots from "../domains/games/components/GameScreenshots";
import GameTrailer from "../domains/games/components/GameTrailer";
import StyledText from "../components/StyledText";
import PlatformIconsList from "../domains/platforms/PlatformIconsList";
import { useQueryClient } from "@tanstack/react-query";

const GameDetailPage = () => {
  const { id } = useParams();
  const gameId = Number(id);

  // Guard: If id is missing or not a valid number, show error
  if (!id || isNaN(gameId)) {
    return <div>Invalid game ID</div>;
  }

  const { data: game, isLoading, error } = useGame(gameId);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const {
    mutate: deleteGame,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteGame({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      navigate("/");
    },
  });

  if (isLoading) return <Spinner />;
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
        {isAuthenticated && (
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
        <PlatformIconsList
          platforms={game.parent_platforms?.map((p) => p.platform) || []}
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
      </GridItem>
      <GridItem>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
