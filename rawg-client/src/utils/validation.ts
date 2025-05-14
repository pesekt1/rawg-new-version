/**
 * Validates whether a given string is a valid URL.
 *
 * @param url - The URL string to validate.
 * @returns `true` if the URL is valid, otherwise `false`.
 */
export const isValidUrl = (url: string): boolean => {
  return /^https?:\/\/.+/i.test(url);
};
