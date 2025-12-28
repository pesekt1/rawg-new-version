import { Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../useGames";
import GamesGridBase from "./GamesGridBase";

const GameGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();

  if (error) return <Text color="tomato">{error.message}</Text>;

  const games = data?.pages.flatMap((page) => page.results) || [];

  return (
    <InfiniteScroll
      dataLength={games.length}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<Spinner />}
      scrollThreshold={1}
    >
      <GamesGridBase games={games} isLoading={isLoading} />
    </InfiniteScroll>
  );
};

export default GameGrid;
