/**
 * A tiny utility that fetches JSON data from a public API
 * and returns a strongly‑typed result.
 *
 * Run with:
 *   npx ts-node fetchDemo.ts
 */

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 * Generic fetch helper that parses the response as JSON.
 * It throws a descriptive error if the request fails or the JSON is malformed.
 */
async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  // 2xx status codes are considered successful
  if (!response.ok) {
    throw new Error(`❌ HTTP ${response.status} – ${response.statusText}`);
  }

  // The `as unknown as T` cast tells TypeScript we expect the JSON shape to match T.
  // In real code you might want runtime validation (e.g., with Zod or io-ts).
  const data = (await response.json()) as unknown as T;
  return data;
}

/**
 * Example usage: fetch a single TODO item from JSONPlaceholder.
 */
async function getTodo(id: number): Promise<Todo> {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  return fetchJson<Todo>(url);
}

/**
 * Demo driver – fetch a few todos and log them.
 */
async function main() {
  try {
    const ids = [1, 2, 3];
    const promises = ids.map(getTodo);
    const todos = await Promise.all(promises);

    console.log('✅ Fetched todos:');
    todos.forEach((todo) => {
      console.log(`- [${todo.completed ? 'x' : ' '}] ${todo.title} (id:${todo.id})`);
    });
  } catch (err) {
    // A catch‑all for any network or parsing errors
    console.error('🚨 Something went wrong:', (err as Error).message);
  }
}

// Execute the demo
main();
# If you don’t have ts-node yet:
npm install -g ts-node typescript @types/node

# Run the file directly:
ts-node fetchDemo.ts
✅ Fetched todos:
- [ ] delectus aut autem (id:1)
- [ ] quis ut nam facilis et officia qui (id:2)
- [ ] fugiat veniam minus (id:3)
