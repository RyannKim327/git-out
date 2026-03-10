// apiDemo.ts
// -----------------------------------------------------
// Example: Call a public JSONPlaceholder API,
// fetch a post, and log its title & body.
//
// Works out of the box in Node≥18 or any modern browser
// with a `tsconfig.json` that has `"esModuleInterop": true`
// and `"target": "es2015"` (or later).

// 1.  Types that model the JSON we expect back
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 2.  A handy helper that ensures we get JSON
async function json<T>(resp: Response): Promise<T> {
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
  }
  return resp.json() as Promise<T>;
}

// 3.  The async routine that talks to the API
async function fetchPost(postId: number): Promise<Post> {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  const response = await fetch(url);        // ← call the API
  const post = await json<Post>(response);   // ← parse & type‑check

  return post;
}

// 4.  Call it and do something with the data
(async () => {
  try {
    const post = await fetchPost(1);
    console.log(`Post #1 title: ${post.title}`);
    console.log(`Post #1 body:  ${post.body}`);
  } catch (err) {
    console.error("Something went wrong:", err);
  }
})();
