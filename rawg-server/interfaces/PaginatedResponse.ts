/**
 * Standard interface for paginated responses.
 */
export interface PaginatedResponse<T> {
  count: number; // Total number of items
  next: string | null; // URL for the next page, or null if no more pages
  results: T[]; // Items for the current page
}
