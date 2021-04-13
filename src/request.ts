/**
 * Curried create request factory function
 * @param method The HTTP verb to use for the request
 */
const request = (method: string) => (url: URL) =>
  new Request(url.toString(), { method });

/**
 * Creates a GET request
 * @param url URL of the resource
 */
export const getRequest = request("GET");

/**
 * Creates a PUT request
 * @param url URL of the resource
 */
export const putRequest = request("PUT");

/**
 * Creates a PATCH request
 * @param url URL of the resource
 */
export const patchRequest = request("PATCH");

/**
 * Creates a POST request
 * @param url URL of the resource
 */
export const postRequest = request("POST");

/**
 * Creates a DELETE request
 * @param url URL of the resource
 */
export const deleteRequest = request("DELETE");
