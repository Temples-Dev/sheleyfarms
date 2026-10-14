const TOKEN_STORAGE_KEY = "shelley-farms-token";

export function apiBaseUrl(): string {
  return import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";
}

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // Private browsing or disabled storage must not break the app.
  }
}

export function clearStoredToken(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // Ignore storage failures on sign-out.
  }
}

export interface ApiErrorDetails {
  status: number;
  code: string;
  message: string;
  details?: unknown;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor({ status, code, message, details }: ApiErrorDetails) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
}

function errorFromBody(status: number, body: unknown): ApiError {
  if (typeof body === "object" && body !== null && "error" in body) {
    const error = (body as { error: { code?: unknown; message?: unknown; details?: unknown } }).error;
    return new ApiError({
      status,
      code: typeof error.code === "string" ? error.code : "request_error",
      message: typeof error.message === "string" ? error.message : "The request failed.",
      details: error.details,
    });
  }
  return new ApiError({ status, code: "request_error", message: "The request failed." });
}

/** Typed fetch against the API. Throws ApiError on envelope errors and network failures. */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const token = options.token === undefined ? getStoredToken() : options.token;
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError({ status: 0, code: "network_error", message: "Could not reach the server." });
  }
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw errorFromBody(response.status, body);
  }
  return body as T;
}

/** Builds `?search=&status=` style query strings, skipping empty values. */
export function buildQuery(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, value);
    }
  }
  const query = search.toString();
  return query === "" ? "" : `?${query}`;
}
