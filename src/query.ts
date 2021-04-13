/**
 * Curried function to set the search (query string) of a `URL` object.
 */
export const setQuery = (query: URLSearchParams) => (url: URL) => {
  const newUrl = new URL("", url);
  newUrl.search = query.toString();
  return newUrl;
};
