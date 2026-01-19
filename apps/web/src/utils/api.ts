/**
 * API utilities
 *
 * Provides helper functions for making authenticated API requests
 */

/**
 * Get the authentication token from localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

/**
 * Get headers with authentication token
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Make an authenticated fetch request
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };
  return fetch(url, { ...options, headers });
}
