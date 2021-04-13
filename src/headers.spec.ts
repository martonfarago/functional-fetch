import fetchMock from "jest-fetch-mock";
import { setHeaders } from "./header";

fetchMock.enableMocks();

describe("setHeaders", () => {
  it("adds passed header to a request", () => {
    // act
    const request = setHeaders(new Headers({ bar: "foo", baz: "bar" }))(
      new Request("https://someurl.com")
    );

    // assert
    expect(request.headers.get("bar")).toBe("foo");
    expect(request.headers.get("baz")).toBe("bar");
  });

  it("removes unaffected keys", () => {
    // arrange
    const request = new Request("https://someurl.com", {
      headers: new Headers({
        foo: "bar",
      }),
    });

    // act
    const requestWithNewHeaders = setHeaders(
      new Headers({ bar: "foo", baz: "bar" })
    )(request);

    // assert
    expect(requestWithNewHeaders.headers.get("foo")).toBeNull();
  });

  it("overwrites existing keys", () => {
    // arrange
    const request = new Request("https://someurl.com", {
      headers: new Headers({
        foo: "bar",
      }),
    });

    // act
    const requestWithNewHeaders = setHeaders(
      new Headers({ foo: "baz", baz: "bar" })
    )(request);

    // assert
    expect(requestWithNewHeaders.headers.get("foo")).toBe("baz");
    expect(requestWithNewHeaders.headers.get("baz")).toBe("bar");
  });
});
