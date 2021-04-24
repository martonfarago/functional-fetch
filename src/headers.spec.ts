import fetchMock from "jest-fetch-mock";
import { appendAllHeaders } from "./header";

fetchMock.enableMocks();

describe("appendAllHeaders", () => {
  it("appends passed header to a request", () => {
    // act
    const request = appendAllHeaders(new Headers({ bar: "foo", baz: "bar" }))(
      new Request("https://someurl.com")
    );

    // assert
    expect(request.headers.get("bar")).toBe("foo");
    expect(request.headers.get("baz")).toBe("bar");
  });

  it("preserves unaffected keys", () => {
    // arrange
    const request = new Request("https://someurl.com", {
      headers: new Headers({
        foo: "bar",
      }),
    });

    // act
    const requestWithNewHeaders = appendAllHeaders(
      new Headers({ bar: "foo", baz: "bar" })
    )(request);

    // assert
    expect(requestWithNewHeaders.headers.get("foo")).toBe("bar");
  });

  it("combines new and existing ones", () => {
    // arrange
    const request = new Request("https://someurl.com", {
      headers: new Headers({
        foo: "bar",
      }),
    });

    // act
    const requestWithNewHeaders = appendAllHeaders(
      new Headers({ foo: "baz", baz: "bar" })
    )(request);

    // assert
    expect(requestWithNewHeaders.headers.get("foo")).toBe("bar, baz");
    expect(requestWithNewHeaders.headers.get("baz")).toBe("bar");
  });
});
