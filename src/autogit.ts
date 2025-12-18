// ------------------------------------------------------------
// 1️⃣  Types that model the JSONPlaceholder API responses
// ------------------------------------------------------------
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ------------------------------------------------------------
// 2️⃣  Generic GET helper – works for any JSON endpoint
// ------------------------------------------------------------
async function apiGet<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      // Add any custom headers you need here, e.g. Authorization
    },
    ...init,
  });

  // Throw on non‑2xx status codes
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `HTTP ${response.status} ${response.statusText}: ${errorBody}`
    );
  }

  // Parse JSON – the generic <T> tells TypeScript what shape we expect
  const data = (await response.json()) as T;
  return data;
}

// ------------------------------------------------------------
// 3️⃣  Specific API call – fetch a list of posts
// ------------------------------------------------------------
async function getPosts(): Promise<Post[]> {
  const endpoint = "https://jsonplaceholder.typicode.com/posts";
  return apiGet<Post[]>(endpoint);
}

// ------------------------------------------------------------
// 4️⃣  Demo / entry point
// ------------------------------------------------------------
async function main() {
  try {
    console.log("Fetching posts…");
    const posts = await getPosts();

    // Show just the first 3 posts to keep the output short
    console.log("✅ Received", posts.length, "posts. Sample:");
    posts.slice(0, 3).forEach((p) => {
      console.log(`- (${p.id}) ${p.title}`);
    });
  } catch (err) {
    // A real‑world app would have richer error handling/logging
    console.error("❌ Something went wrong:", (err as Error).message);
  }
}

// Run the demo when the script is executed directly
if (require.main === module) {
  // Node 18+ has native fetch; for older Node versions you can `npm i node-fetch`
  main();
}
Fetching posts…
✅ Received 100 posts. Sample:
- (1) sunt aut facere repellat provident occaecati excepturi optio reprehenderit
- (2) qui est esse
- (3) ea molestias quasi exercitationem repellat qui ipsa sit aut
