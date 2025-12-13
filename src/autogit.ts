/**
 * A tiny utility that fetches JSON data from a given URL.
 * It demonstrates:
 *   • async/await
 *   • proper error handling
 *   • generic typing for the response payload
 *   • aborting a request after a timeout
 */

type JsonResponse<T> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: string;
};

/**
 * Fetch JSON from `url` and parse it into the generic type `T`.
 *
 * @param url   The endpoint to request.
 * @param timeoutMs Optional timeout in milliseconds (default: 5000).
 * @returns A promise that resolves to a `JsonResponse<T>`.
 */
async function fetchJson<T>(url: string, timeoutMs = 5_000): Promise<JsonResponse<T>> {
  // Create an AbortController so we can cancel the request on timeout.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        // Ask the server to give us JSON (most APIs respect this)
        'Accept': 'application/json',
      },
    });

    // Clear the timeout once we have a response.
    clearTimeout(timeout);

    // HTTP status check – treat anything outside 200‑299 as an error.
    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP ${response.status} – ${response.statusText}`,
      };
    }

    // Parse the body as JSON. If the JSON is malformed, this will throw.
    const data = (await response.json()) as T;

    return { ok: true, data };
  } catch (err) {
    // Distinguish between aborts and other network errors.
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { ok: false, error: `Request timed out after ${timeoutMs} ms` };
    }

    // Anything else (network down, CORS, etc.)
    return { ok: false, error: (err as Error).message };
  }
}

/* -------------------------------------------------------------
   Example usage
------------------------------------------------------------- */

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

/**
 * Fetch a GitHub user profile and log the result.
 */
async function showGithubUser(username: string) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

  const result = await fetchJson<GithubUser>(url, 8_000);

  if (result.ok) {
    const user = result.data;
    console.log('✅ User fetched:', {
      login: user.login,
      repos: user.public_repos,
      profile: user.html_url,
    });
  } else {
    console.error('❌ Failed to fetch user:', result.error);
  }
}

// Run the demo (you can replace "octocat" with any GitHub handle)
showGithubUser('octocat');
