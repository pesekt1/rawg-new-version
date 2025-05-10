import { useParams } from "react-router-dom";
import { Spinner, Center, Text } from "@chakra-ui/react";
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

type EntityConfig<T> = {
  hook: () => UseInfiniteQueryResult<Response<T>, Error>;
  title: string;
  renderDetails: (entity: T) => React.ReactNode;
};

const entityConfig: Record<string, EntityConfig<any>> = {
  genres: {
    hook: useGenresPagination, // Use pagination hook
    title: "Genres",
    renderDetails: (entity: Genre) => <p>Slug: {entity.slug}</p>,
  },
  developers: {
    hook: useDevelopersPagination, // Use pagination hook
    title: "Developers",
    renderDetails: (entity: Developer) => <p>ID: {entity.id}</p>,
  },
  stores: {
    hook: useStoresPagination, // Use pagination hook
    title: "Stores",
    renderDetails: (entity: Store) => <p>Slug: {entity.slug}</p>,
  },
  publishers: {
    hook: usePublishersPagination, // Use pagination hook
    title: "Publishers",
    renderDetails: (entity: Publisher) => <p>ID: {entity.id}</p>,
  },
};

const EntityPage = () => {
  const { entityType } = useParams<{ entityType: string }>();
  const config = entityConfig[entityType as keyof typeof entityConfig];

  if (!config) {
    return <p>Invalid entity type.</p>;
  }

  const { hook, title, renderDetails } = config;
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
    <div>
      <h1>{title}</h1>
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
          />
        )}
      />
    </div>
  );
};

export default EntityPage;
