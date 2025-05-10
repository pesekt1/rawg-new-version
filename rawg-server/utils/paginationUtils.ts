/**
 * Constructs the "next" URL for paginated responses.
 * @param baseUrl The base URL for the endpoint.
 * @param page The current page number.
 * @param pageSize The number of items per page.
 * @param total The total number of items.
 * @returns The "next" URL or null if there are no more pages.
 */
export function constructNextUrl(
  baseUrl: string,
  page: number,
  pageSize: number,
  total: number
): string | null {
  if (total <= page * pageSize) return null;

  const normalizedBaseUrl = baseUrl.startsWith("/") ? baseUrl : `/${baseUrl}`;
  const serverUrl = process.env.SERVER_URL;

  return `${serverUrl}${normalizedBaseUrl}?page=${page + 1}&page_size=${pageSize}`;
}
