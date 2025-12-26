import useGenresPagination from "../domains/genres/useGenresPagination";
import usePlatformsPagination from "../domains/platforms/usePlatformsPagination";
import useStoresPagination from "../domains/stores/useStoresPagination";
import usePublishersPagination from "../domains/publishers/usePublishersPagination";
import useDevelopersPagination from "../domains/developers/useDevelopersPagination";
import useTags from "../domains/tags/useTags";
import { flattenPaginatedResults } from "./flattenPaginatedResults";

/**
 * Fetches and flattens all entities needed for GameForm.
 * Returns both the paginated results and the tags.
 */
export function useGameEntities(pageSize: number = 100) {
  const genresResult = useGenresPagination(pageSize);
  const platformsResult = usePlatformsPagination(pageSize);
  const storesResult = useStoresPagination(pageSize);
  const publishersResult = usePublishersPagination(pageSize);
  const developersResult = useDevelopersPagination(pageSize);
  const tagsResult = useTags(); // not paginated

  const genres = flattenPaginatedResults(genresResult);
  const platforms = flattenPaginatedResults(platformsResult);
  const stores = flattenPaginatedResults(storesResult);
  const publishers = flattenPaginatedResults(publishersResult);
  const developers = flattenPaginatedResults(developersResult);
  const tags = { results: tagsResult.data?.results || [] };

  return {
    genres,
    platforms,
    stores,
    publishers,
    developers,
    tags,
  };
}
