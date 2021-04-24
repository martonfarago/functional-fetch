import fetchMock from "jest-fetch-mock";
import { appendAllSearchParams } from "./searchParam";

fetchMock.enableMocks();

describe("appendAllSearchParams", () => {
  it("appends passed queries to a request", () => {
    // act
    const url = appendAllSearchParams(
      new URLSearchParams({ bar: "foo", baz: "bar" })
    )(new URL("https://someurl.com"));

    // assert
    expect(url.searchParams.get("bar")).toBe("foo");
    expect(url.searchParams.get("baz")).toBe("bar");
  });

  it("preserves unaffected keys", () => {
    // arrange
    const url = new URL("https://someurl.com?foo=bar");

    // act
    const urlWithNewQuery = appendAllSearchParams(
      new URLSearchParams({ bar: "foo", baz: "bar" })
    )(url);

    // assert
    expect(urlWithNewQuery.searchParams.get("foo")).toBe("bar");
  });

  it("combines new and existing ones", () => {
    // arrange
    const url = new URL("https://someurl.com?foo=bar");

    // act
    const urlWithNewQuery = appendAllSearchParams(
      new URLSearchParams({ foo: "baz", baz: "bar" })
    )(url);

    // assert
    expect(urlWithNewQuery.searchParams.getAll("foo")).toEqual(["bar", "baz"]);
    expect(urlWithNewQuery.searchParams.get("baz")).toBe("bar");
  });
});
