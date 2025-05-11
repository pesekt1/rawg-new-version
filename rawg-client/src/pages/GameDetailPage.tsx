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
import GameScreenshots from "../domains/games/components/GameScreenshots";
import GameTrailer from "../domains/games/components/GameTrailer";
import StyledText from "../components/StyledText";
import PlatformIconsList from "../domains/platforms/PlatformIconsList";
import { useQueryClient } from "@tanstack/react-query";

const GameDetailPage = () => {
  const { id } = useParams();
  const gameId = Number(id);

  const { data: game, isLoading, error } = useGame(gameId);
  const navigate = useNavigate();
  const { role } = useAuth();
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
