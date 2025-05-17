import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Entity } from "../interfaces/Entity";

/**
 * Props for the `EntityGrid` component.
 *
 * @template T - The type of the entities being displayed.
 * @property data - The list of entities to display.
 * @property isFetchingNextPage - Whether the next page is currently being fetched.
 * @property error - An error object if an error occurred during data fetching.
 * @property fetchNextPage - Function to fetch the next page of data.
 * @property hasNextPage - Whether there are more pages of data to load.
 * @property renderCard - A function to render a card for each entity.
 */
interface EntityGridProps<T extends Entity> {
  data: T[];
  isFetchingNextPage: boolean; // Only handle infinite scroll spinner
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
const EntityGrid = <T extends Entity>({
  data,
  isFetchingNextPage,
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
      loader={isFetchingNextPage && <Spinner />} // Show spinner during infinite scroll
      scrollThreshold={1}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        spacing={4}
        margin={10}
      >
        {data.map((entity) => renderCard(entity))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default EntityGrid;
