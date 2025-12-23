// ---------------------------------------------------------------
// 1️⃣  Types that model the API payloads
// ---------------------------------------------------------------
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ---------------------------------------------------------------
// 2️⃣  A tiny wrapper around fetch that knows how to talk to the API
// ---------------------------------------------------------------
class TodoService {
  /** Base URL of the JSONPlaceholder API */
  private readonly baseUrl = "https://jsonplaceholder.typicode.com";

  /** Generic helper that performs a GET request and parses JSON */
  private async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // JSONPlaceholder returns JSON, but we explicitly ask for it
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // Throw a typed error so callers can react accordingly
      throw new Error(`HTTP ${response.status} – ${response.statusText}`);
    }

    // The `as T` cast is safe because we control the endpoint and the
    // generic type `T` is supplied by the caller.
    const data = (await response.json()) as T;
    return data;
  }

  /** Fetch a single Todo by its numeric ID */
  async getTodoById(id: number): Promise<Todo> {
    return this.get<Todo>(`/todos/${id}`);
  }

  /** Fetch the first N Todos (useful for pagination demos) */
  async getTodos(limit = 10): Promise<Todo[]> {
    // JSONPlaceholder supports `_limit` as a query param
    return this.get<Todo[]>(`/todos?_limit=${limit}`);
  }

  /** Create a new Todo (POST) – just for illustration; the API fakes it */
  async createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`Failed to create Todo – ${response.statusText}`);
    }

    const created = (await response.json()) as Todo;
    return created;
  }
}

// ---------------------------------------------------------------
// 3️⃣  Demo / usage of the service
// ---------------------------------------------------------------
async function runDemo() {
  const service = new TodoService();

  try {
    console.log("🔎 Fetching Todo #1 …");
    const todo1 = await service.getTodoById(1);
    console.log("✅ Received:", todo1);

    console.log("\n📦 Fetching the first 5 Todos …");
    const firstFive = await service.getTodos(5);
    console.table(firstFive);

    console.log("\n🆕 Creating a new Todo …");
    const newTodo = await service.createTodo({
      userId: 1,
      title: "Learn TypeScript + fetch",
      completed: false,
    });
    console.log("✅ Created:", newTodo);
  } catch (err) {
    // In a real app you might want more sophisticated error handling
    console.error("❌ Something went wrong:", (err as Error).message);
  }
}

// Run the demo when the script is executed directly
if (require.main === module) {
  runDemo();
}

/*
 * ---------------------------------------------------------------
 * How to run this example:
 *
 * 1. Save the code to a file, e.g. `api-demo.ts`.
 * 2. Install TypeScript globally (if you haven't already):
 *      npm install -g typescript
 * 3. Compile:
 *      tsc api-demo.ts --target ES2022 --module commonjs
 * 4. Execute with Node (Node 18+ includes fetch):
 *      node api-demo.js
 *
 * You should see console output similar to:
 *
 *   🔎 Fetching Todo #1 …
 *   ✅ Received: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
 *
 *   📦 Fetching the first 5 Todos …
 *   ┌─────────┬─────────┬─────┬───────────────────────────────────────┬───────────┐
 *   │ (index) │ userId  │ id  │                title                 │ completed │
 *   ├─────────┼─────────┼─────┼───────────────────────────────────────┼───────────┤
 *   │    0    │   1     │  1  │ 'delectus aut autem'                  │  false    │
 *   │    1    │   1     │  2  │ 'quis ut nam facilis et officia qui' │  false    │
 *   │   ...   │   ...   │ ... │                ...                    │   ...     │
 *   └─────────┴─────────┴─────┴───────────────────────────────────────┴───────────┘
 *
 *   🆕 Creating a new Todo …
 *   ✅ Created: { userId: 1, id: 201, title: 'Learn TypeScript + fetch', completed: false }
 *
 * ---------------------------------------------------------------
 */
