/**
 * Curried function to set the body of a `Request` object.
 */
export const setBody = (body: BodyInit) => (request: Request) =>
  new Request(request, { body });
