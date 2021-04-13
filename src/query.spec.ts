import fetchMock from "jest-fetch-mock";
import { setQuery } from "./query";

fetchMock.enableMocks();

describe("setQuery", () => {
  it("adds passed queries to a request", () => {
    // act
    const url = setQuery(new URLSearchParams({ bar: "foo", baz: "bar" }))(
      new URL("https://someurl.com")
    );

    // assert
    expect(url.searchParams.get("bar")).toBe("foo");
    expect(url.searchParams.get("baz")).toBe("bar");
  });

  it("removes unaffected keys", () => {
    // arrange
    const url = new URL("https://someurl.com?foo=bar");

    // act
    const urlWithNewQuery = setQuery(
      new URLSearchParams({ bar: "foo", baz: "bar" })
    )(url);

    // assert
    expect(urlWithNewQuery.searchParams.get("foo")).toBeNull();
  });

  it("overwrites existing keys", () => {
    // arrange
    const url = new URL("https://someurl.com?foo=bar");

    // act
    const urlWithNewQuery = setQuery(
      new URLSearchParams({ foo: "baz", baz: "bar" })
    )(url);

    // assert
    expect(urlWithNewQuery.searchParams.get("foo")).toBe("baz");
    expect(urlWithNewQuery.searchParams.get("baz")).toBe("bar");
  });
});
