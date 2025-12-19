// ---------------------------------------------------------------
//  fetch‑demo.ts
//  A tiny demo that fetches JSON data, types the response,
//  handles errors, and retries once on network failure.
// ---------------------------------------------------------------

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 * Simple wrapper around fetch that:
 *   1. Parses JSON.
 *   2. Throws a typed error for non‑2xx responses.
 *   3. Retries once if the request fails due to a network error.
 */
async function fetchJson<T>(url: string, init?: RequestInit, retry = true): Promise<T> {
  try {
    const response = await fetch(url, init);

    // Throw if the HTTP status is not in the 200‑299 range
    if (!response.ok) {
      const errorBody = await response.text(); // fallback to raw text
      throw new Error(
        `HTTP ${response.status} – ${response.statusText}\n${errorBody}`
      );
    }

    // The response is OK – parse JSON and cast to the generic type T
    return (await response.json()) as T;
  } catch (err) {
    // If we got a network‑level error (e.g. DNS, CORS, offline) and we haven't retried yet,
    // try once more before bubbling the error up.
    if (retry && err instanceof TypeError) {
      console.warn('Network error, retrying once…', err);
      return fetchJson<T>(url, init, false);
    }
    // Re‑throw any other errors (including our own HTTP‑error above)
    throw err;
  }
}

/**
 * Example usage: fetch a single Todo from the public JSONPlaceholder API.
 */
async function getTodo(id: number): Promise<Todo> {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  return fetchJson<Todo>(url);
}

/**
 * Demo runner – prints the result or logs an error.
 */
(async () => {
  try {
    const todo = await getTodo(1);
    console.log('✅ Fetched Todo:', todo);
  } catch (e) {
    console.error('❌ Failed to fetch Todo:', e);
  }
})();
✅ Fetched Todo: {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false
}
