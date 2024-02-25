import fetchMock from "jest-fetch-mock";
import {
  getFromURL,
  postFromURL,
  putFromURL,
  deleteFromURL,
  appendHeaders,
} from "./request";

fetchMock.enableMocks();

describe("Request", () => {
  describe("getRequest function", () => {
    it("creates a get request with the proper URL", () => {
      // act
      const request = getFromURL(new URL("https://someurl.com"));

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "get" })
      );
    });
  });

  describe("postRequest function", () => {
    it("creates a post request with the proper URL", () => {
      // act
      const request = postFromURL(new URL("https://someurl.com"));

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "post" })
      );
    });
  });

  describe("putRequest function", () => {
    it("creates a put request with the proper URL", () => {
      // act
      const request = putFromURL(new URL("https://someurl.com"));

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "put" })
      );
    });
  });

  describe("deleteRequest function", () => {
    it("creates a delete request with the proper URL", () => {
      // act
      const request = deleteFromURL(new URL("https://someurl.com"));

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "delete" })
      );
    });
  });
});

describe("appendHeaders", () => {
  it("appends passed header to a request", () => {
    // act
    const request = appendHeaders(new Headers({ bar: "foo", baz: "bar" }))(
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
    const requestWithNewHeaders = appendHeaders(
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
    const requestWithNewHeaders = appendHeaders(
      new Headers({ foo: "baz", baz: "bar" })
    )(request);

    // assert
    expect(requestWithNewHeaders.headers.get("foo")).toBe("bar, baz");
    expect(requestWithNewHeaders.headers.get("baz")).toBe("bar");
  });
});
