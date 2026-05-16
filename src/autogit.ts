// random-example.ts
// a small TypeScript demo that pulls data from a public API using axios

import axios from 'axios';

// ---------- Types ----------
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ---------- API wrapper ----------
async function fetchTodo(id: number): Promise<Todo> {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  const response = await axios.get<Todo>(url); // TS infers response.data is Todo
  return response.data;
}

// ---------- CLI entry point ----------
async function main() {
  const todoId = Number(process.argv[2]) || 1; // allow a command‑line id

  try {
    const todo = await fetchTodo(todoId);
    console.log(`Todo #${todo.id} (user ${todo.userId}):`);
    console.log(`  - ${todo.title}`);
    console.log(`  - completed: ${todo.completed}`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(`Request failed: ${err.message}`);
    } else {
      console.error(`Unexpected error:`, err);
    }
    process.exit(1);
  }
}

main();
# 1. Install deps (run once)
npm install axios

# 2. Compile / run
npx ts-node random-example.ts 5
