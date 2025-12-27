// ---------------------------------------------------------------
// 1️⃣  Install the required dependency (once):
// ---------------------------------------------------------------
// npm i axios
// ---------------------------------------------------------------

import axios, { AxiosInstance, AxiosResponse } from "axios";

/**
 * Shape of a post returned by JSONPlaceholder.
 */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Simple generic API client that wraps Axios.
 * It can be reused for any JSON‑based REST endpoint.
 */
class ApiClient {
  private readonly http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      timeout: 8_000, // 8 seconds
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  /** GET request that returns a typed payload. */
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.get<T>(path, { params });
      return response.data;
    } catch (err) {
      // Re‑throw a more helpful error
      if (axios.isAxiosError(err) && err.response) {
        const { status, statusText, data } = err.response;
        throw new Error(
          `API error ${status} ${statusText}: ${JSON.stringify(data)}`
        );
      }
      throw new Error(`Network or unexpected error: ${err}`);
    }
  }
}

/**
 * Example service that uses the generic client to talk to JSONPlaceholder.
 */
class PostService {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /** Fetch all posts (or a subset via query params). */
  async fetchPosts(limit?: number, userId?: number): Promise<Post[]> {
    const params: Record<string, unknown> = {};
    if (limit) params["_limit"] = limit;
    if (userId) params["userId"] = userId;

    return this.client.get<Post[]>("/posts", params);
  }

  /** Fetch a single post by its ID. */
  async fetchPostById(id: number): Promise<Post> {
    return this.client.get<Post>(`/posts/${id}`);
  }
}

/**
 * Demo entry‑point – runs when you execute the file.
 */
async function main() {
  const api = new ApiClient("https://jsonplaceholder.typicode.com");
  const postService = new PostService(api);

  console.log("🔎  Fetching the first 5 posts for userId = 1 …");
  const posts = await postService.fetchPosts(5, 1);

  // Simple transformation – keep only title & a short excerpt of the body
  const summary = posts.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.body.slice(0, 60) + (p.body.length > 60 ? "…" : ""),
  }));

  console.table(summary);

  // Fetch a single post to show the other method
  const single = await postService.fetchPostById(42);
  console.log("\n📄  Post #42 details:");
  console.log(single);
}

// Run the demo (catch any unhandled promise rejections)
main().catch((e) => {
  console.error("❌  Something went wrong:", e);
  process.exit(1);
});
