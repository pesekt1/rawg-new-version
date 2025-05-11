import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import EntityCard from "./EntityCard";

/**
 * Props for the `EntityGrid` component.
 *
 * @template T - The type of the entities being displayed.
 * @property data - The list of entities to display.
 * @property isLoading - Whether the data is currently being loaded.
 * @property error - An error object if an error occurred during data fetching.
 * @property fetchNextPage - Function to fetch the next page of data.
 * @property hasNextPage - Whether there are more pages of data to load.
 * @property renderCard - A function to render a card for each entity.
 */
interface EntityGridProps<T extends { id: number }> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  renderCard: (entity: T) => React.ReactNode;
}

/**
 * A grid component for displaying a list of entities with infinite scrolling support.
 *
 * @template T - The type of the entities being displayed.
 * @param props - The props for the component.
 * @returns A grid of entity cards with loading, error, and empty state handling.
 */
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
