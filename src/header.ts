/**
 * Curried function to set the headers of a `Request` object.
 */
export const setHeaders = (headers: Headers) => (request: Request) =>
  new Request(request, { headers });
