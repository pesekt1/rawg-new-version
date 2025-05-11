import { useParams } from "react-router-dom";
import { Spinner, Center, Text, Box, Heading } from "@chakra-ui/react";
import EntityGrid from "../components/EntityGrid";
import EntityCard from "../components/EntityCard";
import useGenresPagination from "../domains/genres/useGenresPagination";
import useDevelopersPagination from "../domains/developers/useDevelopersPagination";
import useStoresPagination from "../domains/stores/useStoresPagination";
import usePublishersPagination from "../domains/publishers/usePublishersPagination";
import { Genre } from "../domains/genres/Genre";
import { Developer } from "../domains/developers/Developer";
import { Store } from "../domains/stores/Store";
import { Publisher } from "../domains/publishers/Publisher";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { Response } from "../services/api-client";
import useGameQueryStore from "../state";

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
    hook: useDevelopersPagination,
    title: "Developers",
    renderDetails: (entity: Developer) => <p>ID: {entity.id}</p>,
    setter: useGameQueryStore.getState().setDeveloperId,
  },
  stores: {
    hook: useStoresPagination,
    title: "Stores",
    renderDetails: (entity: Store) => <p>Slug: {entity.slug}</p>,
    setter: useGameQueryStore.getState().setStoreId,
  },
  publishers: {
    hook: usePublishersPagination,
    title: "Publishers",
    renderDetails: (entity: Publisher) => <p>ID: {entity.id}</p>,
    setter: useGameQueryStore.getState().setPublisherId,
  },
};

const EntityPage = () => {
  const { entityType } = useParams<{ entityType: string }>();
  const config = entityConfig[entityType as keyof typeof entityConfig];

  if (!config) {
    return <p>Invalid entity type.</p>;
  }

  const { hook, title, renderDetails, setter } = config;
  const { data, isLoading, error, fetchNextPage, hasNextPage } = hook();

  // Flatten the results from all pages
  const entities = data?.pages?.flatMap((page) => page.results) || [];

  if (isLoading) {
    return (
      <Center minH="70vh">
        <Spinner size="xl" />
      </Center>
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
        isLoading={isLoading}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        renderCard={(entity) => (
          <EntityCard
            key={entity.id}
            entity={entity}
            name={entity.name}
            image={entity.image_background}
            renderDetails={renderDetails}
            setter={setter}
          />
        )}
      />
    </Box>
  );
};

export default EntityPage;
