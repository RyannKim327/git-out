// ------------------------------------------------------------
// 1️⃣  Install the dependencies (run once):
// ------------------------------------------------------------
// npm i axios
// npm i -D @types/node   // for the Node typings used below
// ------------------------------------------------------------

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

// ------------------------------------------------------------
// 2️⃣  Define the shape of the data you expect from the API
// ------------------------------------------------------------
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// A tiny wrapper around the raw AxiosError so we can add extra context
class ApiError extends Error {
  public readonly status?: number;
  public readonly data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// ------------------------------------------------------------
// 3️⃣  Create a reusable, typed API client
// ------------------------------------------------------------
class JsonPlaceholderClient {
  private readonly http: AxiosInstance;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.http = axios.create({ baseURL });

    // ---- Request interceptor (e.g., add auth header) ----
    this.http.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Imagine you have a token stored somewhere
        const token = process.env.API_TOKEN;
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[REQ] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ---- Response interceptor (e.g., logging) ----
    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[RES] ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        // Transform AxiosError → ApiError for a cleaner API surface
        const msg = error.message;
        const status = error.response?.status;
        const data = error.response?.data;
        return Promise.reject(new ApiError(msg, status, data));
      }
    );
  }

  // Generic GET helper that returns the typed data directly
  private async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const resp = await this.http.get<T>(url, config);
    return resp.data;
  }

  // --------------------------------------------------------
  // Public methods that expose the API surface
  // --------------------------------------------------------
  async listTodos(): Promise<Todo[]> {
    return this.get<Todo[]>('/todos');
  }

  async getTodoById(id: number): Promise<Todo> {
    return this.get<Todo>(`/todos/${id}`);
  }

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const resp = await this.http.post<Todo>('/todos', todo);
    return resp.data;
  }

  async toggleTodoCompleted(id: number, completed: boolean): Promise<Todo> {
    const resp = await this.http.patch<Todo>(`/todos/${id}`, { completed });
    return resp.data;
  }
}

// ------------------------------------------------------------
// 4️⃣  Example usage (run with `ts-node` or compile to JS)
// ------------------------------------------------------------
(async () => {
  const client = new JsonPlaceholderClient();

  try {
    // 1️⃣  Fetch the first 5 todos
    const todos = await client.listTodos();
    console.log('First 5 todos:', todos.slice(0, 5));

    // 2️⃣  Get a single todo
    const todo42 = await client.getTodoById(42);
    console.log('Todo #42:', todo42);

    // 3️⃣  Create a new todo (the placeholder API just echoes it back)
    const newTodo = await client.createTodo({
      userId: 1,
      title: 'Learn TypeScript + Axios',
      completed: false,
    });
    console.log('Created todo:', newTodo);

    // 4️⃣  Toggle its completed flag
    const updated = await client.toggleTodoCompleted(newTodo.id, true);
    console.log('Toggled completed:', updated);
  } catch (err) {
    if (err instanceof ApiError) {
      console.error(
        `API error (status ${err.status ?? 'unknown'}):`,
        err.message,
        err.data
      );
    } else {
      console.error('Unexpected error:', err);
    }
  }
})();
