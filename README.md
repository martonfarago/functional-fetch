# Functional Fetch

Helpers to use the Fetch API in a more immutable and functional way.

## Example usage

```ts
import { pipe, flow } from "fp-ts/es6/function";

const getList = (page: string) =>
  pipe(
    new URL("http://test.dev"),
    setQuery(new URLSearchParams({ page })),
    getRequest,
    fetch
  );

const getSingle = flow(
  (id: Number) => new URL(`http://test.dev/post/${id}`),
  getRequest,
  fetch
);
```
