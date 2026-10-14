import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AdminAuthProvider, useAdminAuth } from "./admin-auth-context";
import { AuthProvider, useAuth } from "./auth-context";
import { FarmerAuthProvider, useFarmerAuth } from "./farmer-auth-context";
import { getStoredToken } from "./api-client";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("auth contexts", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("patron sign-in stores the session and token", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ token: "tok123", user: { id: 7, name: "Ama Mensah", email: "ama@example.com" } }),
      ),
    );
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    let signedIn = false;
    await act(async () => {
      signedIn = await result.current.signIn("ama@example.com", "s3cure-password");
    });

    expect(signedIn).toBe(true);
    expect(result.current.user).toMatchObject({ id: "7", email: "ama@example.com" });
    expect(result.current.isAuthenticated).toBe(true);
    expect(getStoredToken()).toBe("tok123");
  });

  it("patron sign-in fails without storing anything", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ error: { code: "validation_error", message: "Invalid email or password." } }, 400),
      ),
    );
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    let signedIn = true;
    await act(async () => {
      signedIn = await result.current.signIn("ama@example.com", "wrong");
    });

    expect(signedIn).toBe(false);
    expect(result.current.user).toBeNull();
    expect(getStoredToken()).toBeNull();
  });

  it("patron sign-up registers through the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ token: "tok456", user: { id: 8, name: "Ama Mensah", email: "ama@example.com" } }),
      ),
    );
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    let signedUp = false;
    await act(async () => {
      signedUp = await result.current.signUp({
        firstName: "Ama",
        lastName: "Mensah",
        email: "ama@example.com",
        password: "s3cure-password",
      });
    });

    expect(signedUp).toBe(true);
    const [, init] = (fetch as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0];
    expect(JSON.parse(init.body as string)).toMatchObject({ firstName: "Ama", email: "ama@example.com" });
  });

  it("sign-out clears the session", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL | Request) => {
        if (String(url).endsWith("/auth/token/")) {
          return jsonResponse({ token: "tok123", user: { id: 7, name: "Ama", email: "ama@example.com" } });
        }
        return jsonResponse({});
      }),
    );
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.signIn("ama@example.com", "s3cure-password");
    });

    await act(async () => {
      result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(getStoredToken()).toBeNull();
  });

  it("restores the patron session from storage", async () => {
    localStorage.setItem(
      "shelley-farms-user",
      JSON.stringify({ token: "tok999", user: { id: "7", name: "Ama", email: "ama@example.com" } }),
    );
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.user?.email).toBe("ama@example.com");
    expect(getStoredToken()).toBe("tok999");
  });

  it("admin sign-in requires staff", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ token: "tok1", user: { id: 1, name: "Patron", email: "p@example.com", is_staff: false } }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useAdminAuth(), { wrapper: AdminAuthProvider });

    let signedIn = true;
    await act(async () => {
      signedIn = await result.current.signIn("p@example.com", "password123");
    });

    expect(signedIn).toBe(false);
    expect(result.current.admin).toBeNull();
  });

  it("admin sign-in stores staff sessions", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ token: "tok2", user: { id: 2, name: "Admin User", email: "a@example.com", is_staff: true } }),
      ),
    );
    const { result } = renderHook(() => useAdminAuth(), { wrapper: AdminAuthProvider });

    await act(async () => {
      await result.current.signIn("a@example.com", "password123");
    });

    expect(result.current.admin).toMatchObject({ email: "a@example.com", role: "admin" });
    expect(getStoredToken()).toBe("tok2");
  });

  it("farmer sign-up keeps profile extras locally", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ token: "tok3", user: { id: 9, name: "John Farmer", email: "j@example.com" } }),
      ),
    );
    const { result } = renderHook(() => useFarmerAuth(), { wrapper: FarmerAuthProvider });

    await act(async () => {
      await result.current.signUp({
        name: "John Farmer",
        email: "j@example.com",
        password: "password123",
        phone: "+15551234567",
        farmName: "Green Valley",
        location: "Northern",
      });
    });

    expect(result.current.farmer).toMatchObject({
      farmName: "Green Valley",
      location: "Northern",
      verified: false,
    });
  });

  it("farmer sign-in requires the farmer role", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ token: "tok4", user: { id: 9, name: "Patron", email: "p@example.com", role: "patron" } }),
      ),
    );
    const { result } = renderHook(() => useFarmerAuth(), { wrapper: FarmerAuthProvider });

    let signedIn = true;
    await act(async () => {
      signedIn = await result.current.signIn("p@example.com", "password123");
    });

    expect(signedIn).toBe(false);
    expect(result.current.farmer).toBeNull();
  });
});
