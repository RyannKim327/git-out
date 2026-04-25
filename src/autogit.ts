// Define what the API will return (pick and choose any fields you need)
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// A generic helper that wraps fetch & JSON parsing, throws on non‑OK status
async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// Example usage: pull a single todo item
async function fetchTodo(todoId: number) {
  try {
    const todo = await apiGet<Todo>(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    console.log(`Todo #${todo.id} (user ${todo.userId}): ${todo.title}`);
    console.log(`Completed? ${todo.completed ? 'Yes' : 'No'}`);
  } catch (err) {
    console.error('Oops:', err);
  }
}

// Kick it off (demo)
fetchTodo(42);
