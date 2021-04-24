const map = (callback: (h: Headers) => void) => (r: Request) => {
  const newHeaders = new Headers(r.headers);
  callback(newHeaders);
  return new Request(r, { headers: newHeaders });
};

export const setHeader = (key: string, value: string) =>
  map((h) => h.set(key, value));

export const appendHeader = (key: string, value: string) =>
  map((h) => h.append(key, value));

export const deleteHeader = (key: string) => map((h) => h.delete(key));

export const setAllHeaders = (headers: Headers) =>
  map((h) => headers.forEach((value, key) => h.set(key, value)));

export const appendAllHeaders = (headers: Headers) =>
  map((h) => headers.forEach((value, key) => h.append(key, value)));
