import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import EntityCard from "./EntityCard";

interface EntityGridProps<T extends { id: number }> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  renderCard: (entity: T) => React.ReactNode;
}

const EntityGrid = <T extends { id: number }>({
  data,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  renderCard,
}: EntityGridProps<T>) => {
  if (error) return <Text color="tomato">{error.message}</Text>;

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Spinner />}
      scrollThreshold={1}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        spacing={8}
        paddingY={10}
      >
        {isLoading
          ? [...Array(10).keys()].map((skeleton) => (
              <EntityCard
                key={skeleton}
                entity={{} as T}
                name="Loading..."
                image="https://via.placeholder.com/300x150"
                setter={() => {}} // Provide a no-op setter
              />
            ))
          : data.map((entity) => renderCard(entity))}
        {data.length === 0 && !isLoading && (
          <Text fontSize="2xl" fontWeight="bold" color="purple.400" p={4}>
            No entities found...
          </Text>
        )}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default EntityGrid;
