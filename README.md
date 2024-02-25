# Functional Fetch

Helpers to use the Fetch API in an immutable and functional way.

## Example usage

```ts
import { pipe } from "fp-ts/es6/function";
import {
  appendSearchParams,
  getFromURL,
  appendHeaders,
} from "functional-fetch";

const getPost = (id: Number) =>
  pipe(
    new URL(`http://test.dev/posts/${id}`),
    getFromURL,
    appendHeaders({
      Accept: "application/json",
      Authorization: "Bearer token",
    }),
    fetch
  );

const getPosts = (page: string, search: string) =>
  pipe(
    new URL("http://test.dev/posts"),
    appendSearchParams(new URLSearchParams({ page, search })),
    getFromURL,
    appendHeaders({
      Accept: "application/json",
      Authorization: "Bearer token",
    }),
    fetch
  );
```
