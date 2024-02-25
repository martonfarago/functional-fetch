import fetchMock from "jest-fetch-mock";
import { appendSearchParams } from "./url";

fetchMock.enableMocks();

describe("appendSearchParams", () => {
  it("appends passed queries to a request", () => {
    // act
    const url = appendSearchParams(
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
    const urlWithNewQuery = appendSearchParams(
      new URLSearchParams({ bar: "foo", baz: "bar" })
    )(url);

    // assert
    expect(urlWithNewQuery.searchParams.get("foo")).toBe("bar");
  });

  it("combines new and existing ones", () => {
    // arrange
    const url = new URL("https://someurl.com?foo=bar");

    // act
    const urlWithNewQuery = appendSearchParams(
      new URLSearchParams({ foo: "baz", baz: "bar" })
    )(url);

    // assert
    expect(urlWithNewQuery.searchParams.getAll("foo")).toEqual(["bar", "baz"]);
    expect(urlWithNewQuery.searchParams.get("baz")).toBe("bar");
  });
});
