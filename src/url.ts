export const fromString = (url: string) => new URL(url);
export const toString = (url: URL) => url.toString();

type URLSearchParamsInit =
  | string[][]
  | Record<string, string>
  | string
  | URLSearchParams;

export const appendSearchParams = (sp: URLSearchParamsInit) => (url: URL) => {
  const newUrl = new URL(url);
  new URLSearchParams(sp).forEach((value, key) =>
    newUrl.searchParams.append(key, value)
  );
  return newUrl;
};

export const setSearchParams = (sp: URLSearchParamsInit) => (url: URL) => {
  const newUrl = new URL(url);
  new URLSearchParams(sp).forEach((value, key) =>
    newUrl.searchParams.set(key, value)
  );
  return newUrl;
};

export const unsetSearchParam = (key: string) => (url: URL) => {
  const newUrl = new URL(url);
  newUrl.searchParams.delete(key);
  return newUrl;
};
