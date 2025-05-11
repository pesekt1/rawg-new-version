import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useGames from "../useGames";
import GameCard from "./GameCard/GameCard";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GameCardContainer from "./GameCard/GameCardContainer";
import GameCardSkeleton from "./GameCard/GameCardSkeleton";

const GameGrid = () => {
  const skeletons = [...Array(20).keys()];

  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();

  if (error) return <Text color="tomato">{error.message}</Text>;

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<Spinner />}
      scrollThreshold={1}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        spacing={4}
      >
        {isLoading
          ? skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))
          : data.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.results.map((game) => (
                  <GameCardContainer key={game.id}>
                    <GameCard game={game} />
                  </GameCardContainer>
                ))}
              </React.Fragment>
            ))}
        {(!data?.pages || data.pages[0].results.length === 0) && !isLoading && (
          <Text fontSize="2xl" fontWeight="bold" color="purple.400" p={4}>
            No games found...
          </Text>
        )}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
