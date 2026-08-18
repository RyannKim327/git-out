/* 1️⃣  Define the shapes of the data we expect  */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/* 2️⃣  Helper that turns a StatusCode non‑OK into an error  */
async function safeGet<T>(url: string): Promise<T> {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`GET ${url} failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json() as Promise<T>;
}

/* 3️⃣  Fetch a single post and its comments  */
async function fetchPostWithComments(postId: number) {
  const [post, comments] = await Promise.all([
    safeGet<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    safeGet<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`),
  ]);

  console.log(`\n=== Post #${post.id} ===`);
  console.log(`Title : ${post.title}`);
  console.log(`Body  : ${post.body}\n`);

  console.log(`--- ${comments.length} comment(s) ---`);
  comments.forEach(c => {
    console.log(`- ${c.name} (${c.email}): ${c.body.substring(0, 40)}…`);
  });
}

/* 4️⃣  Run it for a few post IDs  */
async function main() {
  try {
    await Promise.all([1, 2, 3].map(id => fetchPostWithComments(id)));
  } catch (err) {
    console.error('Something went wrong:', (err as Error).message);
  }
}

main();
# compile to JavaScript
npx tsc api-demo.ts

# run the output
node api-demo.js

# or skip the compile step (requires ts-node)
npx ts-node api-demo.ts
