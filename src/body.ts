/**
 * Curried function to set the body of a request.
 */
export const setBody = (body: BodyInit) => (request: Request) =>
  new Request(request, { body });
