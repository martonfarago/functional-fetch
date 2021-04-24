# Functional Fetch

Helpers to use the Fetch API in a more immutable and functional way.

## Example usage

```ts
import {
  appendAllSearchParams,
  getRequest,
  appendAllHeaders,
} from "functional-fetch";
import { pipe, flow } from "fp-ts/es6/function";

const getList = (page: string, search: string) =>
  pipe(
    new URL("http://test.dev"),
    appendAllSearchParams(new URLSearchParams({ page, search })),
    getRequest,
    appendAllHeaders(
      new Headers({ Accept: "application/json", Authorization: "Bearer token" })
    ),
    fetch
  );

const getSingle = flow(
  (id: Number) => new URL(`http://test.dev/post/${id}`),
  getRequest,
  appendAllHeaders(
    new Headers({ Accept: "application/json", Authorization: "Bearer token" })
  ),
  fetch
);
```
