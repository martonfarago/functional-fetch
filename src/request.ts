const request = (method: string) => (url: URL) => new Request(url, { method });

export const getFromURL = request("GET");
export const putFromURL = request("PUT");
export const patchFromURL = request("PATCH");
export const postFromURL = request("POST");
export const deleteFromURL = request("DELETE");

export const setBody = (body: BodyInit) => (r: Request) =>
  new Request(r, { body });

export const unsetBody = (r: Request) => new Request(r, { body: null });

export const appendHeaders = (h: HeadersInit) => (r: Request) => {
  const headers = new Headers(r.headers);
  new Headers(h).forEach((value, key) => headers.append(key, value));
  return new Request(r, { headers });
};

export const setHeaders = (h: HeadersInit) => (r: Request) => {
  const headers = new Headers(r.headers);
  new Headers(h).forEach((value, key) => headers.set(key, value));
  return new Request(r, { headers });
};

export const unsetHeader = (key: string) => (r: Request) => {
  const headers = new Headers(r.headers);
  r.headers.delete(key);
  return new Request(r, { headers });
};
