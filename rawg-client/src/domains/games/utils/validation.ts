export const isValidUrl = (url: string): boolean => {
  return /^https?:\/\/.+/i.test(url);
};
