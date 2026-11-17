import { env } from "../config/env";

const REQUEST_TIMEOUT_MS = 5000;

export interface ApiResponse<T> {
  status: number;
  body: T;
}

/**
 * Minimal typed GET helper.
 * - Resolves for ANY HTTP status (the caller decides what 503 means).
 * - Rejects on network failure, timeout, abort, or a non-JSON body.
 */
export async function apiGet<T>(
  path: string,
  signal?: AbortSignal,
): Promise<ApiResponse<T>> {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    signal: combined,
  });

  const body = (await response.json()) as T;
  return { status: response.status, body };
}