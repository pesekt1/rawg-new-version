import { Entity } from "../interfaces/Entity";

/**
 * Flattens paginated react-query results into a single { results: Entity[] } object.
 * This is useful for handling paginated data in a more manageable format.
 * @param result - The paginated result object from react-query.
 * @returns An object containing all the results in a single array.
 */
export const flattenPaginatedResults = <T extends Entity>(result: {
  data?: { pages?: { results: T[] }[] };
}): { results: T[] } => ({
  results: result.data?.pages?.flatMap((page) => page.results) || [],
});
