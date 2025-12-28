import { Box, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EntityCard from "../components/EntityCard";
import EntityGrid from "../components/EntityGrid";
import { Developer } from "../domains/developers/Developer";
import useDevelopersPagination from "../domains/developers/useDevelopersPagination";
import GameCardSkeleton from "../domains/games/components/GameCard/GameCardSkeleton"; // Import GameCardSkeleton
import { Genre } from "../domains/genres/Genre";
import useGenresPagination from "../domains/genres/useGenresPagination";
import { Platform } from "../domains/platforms/Platform"; // <-- add this import
import usePlatformsPagination from "../domains/platforms/usePlatformsPagination"; // <-- add this import
import { Publisher } from "../domains/publishers/Publisher";
import usePublishersPagination from "../domains/publishers/usePublishersPagination";
import { Store } from "../domains/stores/Store";
import useStoresPagination from "../domains/stores/useStoresPagination";
import { Response } from "../services/api-client";
import useGameQueryStore from "../state/state";

const PAGE_SIZE = 20;

type EntityConfig<T> = {
  hook: () => UseInfiniteQueryResult<Response<T>, Error>;
  title: string;
  renderDetails: (entity: T) => React.ReactNode;
  setter: (id: number | undefined) => void;
};

const entityConfig: Record<string, EntityConfig<any>> = {
  genres: {
    hook: useGenresPagination,
    title: "Genres",
    renderDetails: (entity: Genre) => <p>Slug: {entity.slug}</p>,
    setter: useGameQueryStore.getState().setGenreId,
  },
  developers: {
    hook: () => useDevelopersPagination(PAGE_SIZE),
    title: "Developers",
    renderDetails: (entity: Developer) => <p>ID: {entity.id}</p>,
    setter: useGameQueryStore.getState().setDeveloperId,
  },
  stores: {
    hook: () => useStoresPagination(PAGE_SIZE),
    title: "Stores",
    renderDetails: (entity: Store) => <p>Slug: {entity.slug}</p>,
    setter: useGameQueryStore.getState().setStoreId,
  },
  publishers: {
    hook: () => usePublishersPagination(PAGE_SIZE),
    title: "Publishers",
    renderDetails: (entity: Publisher) => <p>ID: {entity.id}</p>,
    setter: useGameQueryStore.getState().setPublisherId,
  },
  platforms: {
    hook: () => usePlatformsPagination(PAGE_SIZE),
    title: "Platforms",
    renderDetails: (entity: Platform) => <p>Slug: {entity.slug}</p>,
    setter: useGameQueryStore.getState().setPlatformId,
  },
};

const EntityPage = () => {
  const { entityType } = useParams<{ entityType: string }>();
  const config = entityConfig[entityType as keyof typeof entityConfig];

  if (!config) {
    return <p>Invalid entity type.</p>;
  }

  const { hook, title, renderDetails, setter } = config;
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = hook();

  // Flatten the results from all pages
  const entities = data?.pages?.flatMap((page) => page.results) || [];

  if (isLoading && entities.length === 0) {
    // Show skeletons during the initial load
    return (
      <Box>
        <Heading>{title}</Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          spacing={4}
          margin={10}
        >
          {[...Array(20).keys()].map((skeleton) => (
            <GameCardSkeleton key={skeleton} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (!isLoading && entities.length === 0) {
    return (
      <Center minH="70vh">
        <Text fontSize="2xl" fontWeight="bold" color="purple.400">
          No entities found...
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <Heading>{title}</Heading>
      <EntityGrid
        data={entities}
        isFetchingNextPage={isFetchingNextPage} // Pass only `isFetchingNextPage` for infinite scroll spinner
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        renderCard={(entity) => (
          <EntityCard
            entity={entity}
            renderDetails={renderDetails}
            setter={setter}
          />
        )}
      />
    </Box>
  );
};

export default EntityPage;
