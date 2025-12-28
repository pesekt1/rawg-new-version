import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import useSimilarGames from "../useSimilarGames";
import GamesGridBase from "./GamesGridBase";

type Props = {
  gameId: number;
  genreId?: number;
  tagId?: number;
  limit?: number;
};

const SimilarGamesGrid = ({ gameId, genreId, tagId, limit = 8 }: Props) => {
  const { data, isLoading, error } = useSimilarGames({
    gameId,
    genreId,
    tagId,
    limit,
  });

  if (!genreId && !tagId) return null;

  if (isLoading) {
    return (
      <Box mt={6}>
        <Heading size="md" mb={3}>
          Similar games
        </Heading>
        <Spinner size="sm" />
      </Box>
    );
  }

  if (error) return <Text color="tomato">{error.message}</Text>;

  const games = (data?.results || [])
    .filter((g) => g.id !== gameId)
    .slice(0, limit);

  if (games.length === 0) return null;

  return (
    <Box mt={6}>
      <Heading size="md" mb={3}>
        Similar games
      </Heading>
      <GamesGridBase
        games={games}
        isLoading={false}
        skeletonCount={limit}
        columns={{ base: 1, lg: 2 }}
        spacing={4}
        margin={0}
        emptyMessage=""
      />
    </Box>
  );
};

export default SimilarGamesGrid;
