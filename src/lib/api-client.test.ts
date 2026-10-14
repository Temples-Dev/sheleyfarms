import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ApiError,
  apiBaseUrl,
  apiFetch,
  buildQuery,
  clearStoredToken,
  getStoredToken,
  storeToken,
} from "./api-client";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("api-client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("defaults the base URL to the local API", () => {
    expect(apiBaseUrl()).toBe("http://localhost:8000/api/v1");
  });

  it("stores and clears the token", () => {
    expect(getStoredToken()).toBeNull();
    storeToken("abc123");
    expect(getStoredToken()).toBe("abc123");
    clearStoredToken();
    expect(getStoredToken()).toBeNull();
  });

  it("sends JSON with the stored token attached", async () => {
    storeToken("abc123");
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const body = await apiFetch<{ ok: boolean }>("/farms/", {
      method: "POST",
      body: { name: "Green Valley" },
    });

    expect(body).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("http://localhost:8000/api/v1/farms/");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({
      "Content-Type": "application/json",
      Authorization: "Token abc123",
    });
    expect(init.body).toBe(JSON.stringify({ name: "Green Valley" }));
  });

  it("omits the auth header without a token", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await apiFetch("/farms/");

    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.headers).not.toHaveProperty("Authorization");
  });

  it("maps envelope errors to ApiError", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(
          { error: { code: "validation_error", message: "Bad data.", details: {} } },
          400,
        ),
      ),
    );

    const failure = await apiFetch("/farms/").then(
      () => null,
      (error: unknown) => error,
    );
    expect(failure).toBeInstanceOf(ApiError);
    expect(failure).toMatchObject({ status: 400, code: "validation_error", message: "Bad data." });
  });

  it("maps network failures to ApiError", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      }),
    );

    const failure = await apiFetch("/farms/").then(
      () => null,
      (error: unknown) => error,
    );
    expect(failure).toMatchObject({ status: 0, code: "network_error" });
  });

  it("builds query strings skipping empty values", () => {
    expect(buildQuery({ search: "rice", status: "", location: undefined })).toBe("?search=rice");
    expect(buildQuery({})).toBe("");
  });
});
