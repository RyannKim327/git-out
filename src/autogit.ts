// ------------------------------------------------------------
//  fetch‑demo.ts
//  A tiny demo that fetches JSON data, types the response,
//  handles errors, and retries on transient failures.
// ------------------------------------------------------------

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 * Simple exponential back‑off helper.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch JSON from a URL and parse it as the given generic type.
 *
 * @param url   The endpoint to request.
 * @param init  Optional fetch init options (method, headers, …).
 * @param retries Number of retry attempts on network‑level failures.
 * @returns     The parsed JSON typed as T.
 */
async function fetchJson<T>(
  url: string,
  init?: RequestInit,
  retries = 3
): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      const response = await fetch(url, init);

      // Throw on HTTP errors (4xx, 5xx)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} – ${response.statusText}`);
      }

      // Parse the body as JSON and cast to T
      const data = (await response.json()) as T;
      return data;
    } catch (err) {
      attempt++;

      // If we’ve exhausted retries, re‑throw the error
      if (attempt > retries) {
        throw err;
      }

      // Otherwise wait a bit and try again (exponential back‑off)
      const backoff = 2 ** attempt * 100; // 200ms, 400ms, 800ms, …
      console.warn(
        `Fetch attempt ${attempt} failed – retrying in ${backoff}ms…`,
        err
      );
      await delay(backoff);
    }
  }
}

/**
 * Example usage: fetch a single TODO from the public JSONPlaceholder API.
 */
async function demo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  try {
    const todo = await fetchJson<Todo>(url);
    console.log("✅ Fetched todo:", todo);
  } catch (error) {
    console.error("❌ Failed to fetch todo:", error);
  }
}

// Run the demo when this file is executed directly (Node.js)
if (require.main === module) {
  demo();
}
