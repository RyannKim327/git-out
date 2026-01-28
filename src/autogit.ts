// src/apiFetch.ts
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Pulls a single todo item from the JSON‑Placeholder API.
 *
 * @param todoId  the numeric ID of the todo to fetch
 * @returns          a promise that resolves to the Todo object
 */
export async function getTodoById(todoId: number): Promise<Todo> {
  const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API responded with ${response.status} ${response.statusText}`);
  }

  // `response.json()` already resolves to a `Promise<any>`, so we cast
  // to `Todo` to satisfy TypeScript.
  const data = (await response.json()) as Todo;
  return data;
}
// src/start.ts
import { getTodoById, Todo } from "./apiFetch";

async function main(): Promise<void> {
  try {
    const todo: Todo = await getTodoById(1);
    console.log("Fetched todo:", todo);
  } catch (err) {
    console.error("Failed to fetch todo:", err);
  }
}

main().catch((outerErr) => console.error("Unhandled error:", outerErr));
