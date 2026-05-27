// fetch-posts.ts
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const url = "https://jsonplaceholder.typicode.com/posts";

  // Allow a “fetch” implementation to be swapped in, e.g. for tests
  const fetcher = typeof globalThis.fetch === "function" ? globalThis.fetch : require("node-fetch");

  try {
    const resp = await fetcher(url, { method: "GET" });

    if (!resp.ok) {
      // Throw an error that includes the status code and message
      throw new Error(`API error (${resp.status}): ${resp.statusText}`);
    }

    const data: unknown = await resp.json();

    // Basic runtime type guard: make sure we really got an array of posts
    if (!Array.isArray(data)) {
      throw new Error("Response was not an array");
    }

    // We trust the API to provide the right shape and coerce
    return data as Post[];
  } catch (e) {
    // Re‑throw with a bit more context if we’re not already an Error
    if (!(e instanceof Error)) {
      throw new Error(String(e));
    }
    throw e;
  }
}

// Demo: print the first five posts
getPosts()
  .then((posts) => {
    posts.slice(0, 5).forEach((p) =>
      console.log(`[${p.id}] ${p.title} (user ${p.userId})`)
    );
  })
  .catch((err) => console.error("Failed to fetch posts:", err));
