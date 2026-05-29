// src/api.ts
import axios, { AxiosResponse } from "axios";

/** Simple DTO for demonstration purposes */
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Fetch a single TODO item by ID.
 * Returns a Todo object or throws an ^ if anything goes wrong.
 */
export async function fetchTodoById(id: number): Promise<Todo> {
  const resp: AxiosResponse<Todo> = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return resp.data;
}

/**
 * Create a brand‑new TODO item.
 * Returns the server‑side representation (including the newly minted ID).
 */
export async function createTodo(payload: Omit<Todo, "id">): Promise<Todo> {
  const resp: AxiosResponse<Todo> = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    payload,
    {
      headers: { "Content-Type": "application/json" }
    }
  );
  return resp.data;
}
// src/index.ts
import { fetchTodoById, createTodo } from "./api";

(async () => {
  try {
    const todo = await fetchTodoById(1);
    console.log("Fetched TODO:", todo);

    const newTodo = await createTodo({
      userId: 1,
      title: "Buy coffee",
      completed: false
    });
    console.log("Created TODO:", newTodo);
  } catch (err) {
    console.error("Something went wrong:", err);
  }
})();
