// 1️⃣  Install node‑fetch (or use the built‑in fetch in environments that have it)
//    npm install node-fetch @types/node-fetch
import fetch from "node-fetch";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Fetch a single Todo by its numeric ID.
 * @param id - The ID of the Todo to request.
 * @returns Promises a Todo object.
 */
async function getTodoById(id: number): Promise<Todo> {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  // 2️⃣  Basic status check – throws if not 2xx
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status} ${response.statusText}`);
  }

  // 3️⃣  Parse the JSON body and return it as a Todo
  const data = (await response.json()) as Todo;
  return data;
}

/**
 * Demo of calling `getTodoById` and logging the result or an error.
 */
(async () => {
  try {
    const todo = await getTodoById(3);
    console.log("Fetched Todo:", todo);
  } catch (err) {
    console.error("Error fetching Todo:", err);
  }
})();
