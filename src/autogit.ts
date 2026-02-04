// TypeScript example that fetches JSON and validates the shape of the response

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Fetch a Todo by ID.
 *
 * @param id The ID of the todo to fetch.
 * @returns A promise that resolves to a Todo object.
 */
async function fetchTodo(id: number): Promise<Todo> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to load todo #${id}: ${response.status} ${response.statusText}`);
  }

  // TypeScript's `as` ensures the runtime shape matches the interface
  const data = (await response.json()) as Todo;

  // Quick sanity check
  if (typeof data.completed !== "boolean") {
    throw new Error("data format unexpected");
  }

  return data;
}

// Usage example (you can place this in a main function or wherever you need it)
fetchTodo(1)
  .then(todo => console.log(`Todo #${todo.id}: ${todo.title} (completed: ${todo.completed})`))
  .catch(err => console.error(err));
