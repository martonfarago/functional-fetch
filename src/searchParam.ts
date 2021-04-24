const map = (callback: (sp: URLSearchParams) => void) => (url: URL) => {
  const newUrl = new URL("", url);
  callback(newUrl.searchParams);
  return newUrl;
};

export const setSearchParam = (key: string, value: string) =>
  map((sp) => sp.set(key, value));

export const appendSearchParam = (key: string, value: string) =>
  map((sp) => sp.append(key, value));

export const deleteSearchParam = (key: string) => map((sp) => sp.delete(key));

export const setAllSearchParams = (searchParams: URLSearchParams) =>
  map((sp) => searchParams.forEach((value, key) => sp.set(key, value)));

export const appendAllSearchParams = (searchParams: URLSearchParams) =>
  map((sp) => searchParams.forEach((value, key) => sp.append(key, value)));
