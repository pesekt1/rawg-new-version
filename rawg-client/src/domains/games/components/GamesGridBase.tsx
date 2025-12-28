import { SimpleGrid, SimpleGridProps, Text } from "@chakra-ui/react";
import { Game } from "../Game";
import GameCard from "./GameCard/GameCard";
import GameCardContainer from "./GameCard/GameCardContainer";
import GameCardSkeleton from "./GameCard/GameCardSkeleton";

type Props = {
  games?: Game[];
  isLoading: boolean;
  skeletonCount?: number;
  columns?: SimpleGridProps["columns"];
  spacing?: SimpleGridProps["spacing"];
  margin?: SimpleGridProps["margin"];
  emptyMessage?: string;
};

const GamesGridBase = ({
  games,
  isLoading,
  skeletonCount = 20,
  columns = { base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 },
  spacing = 4,
  margin = 4,
  emptyMessage = "No games found...",
}: Props) => {
  const skeletons = [...Array(skeletonCount).keys()];

  return (
    <SimpleGrid columns={columns} spacing={spacing} margin={margin}>
      {isLoading
        ? skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))
        : (games || []).map((game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          ))}

      {!isLoading && (!games || games.length === 0) && (
        <Text fontSize="2xl" fontWeight="bold" color="purple.400" p={4}>
          {emptyMessage}
        </Text>
      )}
    </SimpleGrid>
  );
};

export default GamesGridBase;
