// simple-api-call.ts
/**
 * A minimal example of calling a REST API in Node.js with TypeScript.
 * Requires Node 18+ (fetch is built‑in). If you need older Node, use
 * node‑fetch or axios instead.
 */

import type { RequestInit, Response } from 'node-fetch'; // Node type hint, optional

// 1️⃣  Define the shape of the JSON we expect back:
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 2️⃣  Utility to guard for non‑2xx HTTP codes:
function checkStatus(response: Response): Response {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response;
}

// 3️⃣  The async function that does the fetching:
async function fetchPost(postId: number): Promise<Post> {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  // Optional: you can pass a custom RequestInit if you need headers, method, etc.
  const options: RequestInit = {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    // If you want a timeout... (Node 18+ JSON‑placeholder only accepts GET)
  };

  const response = await fetch(url, options);
  checkStatus(response);

  // The `response.json()` call is typed as `any`. We cast it to our Post interface.
  const data = (await response.json()) as Post;

  // Non‑strict guard: ensure required keys exist
  if (typeof data.id !== 'number' || typeof data.title !== 'string') {
    throw new Error('Malformed data');
  }

  return data;
}

// 4️⃣  Drive the example: fetch a single post and log it.
(async () => {
  try {
    const post = await fetchPost(1);
    console.log('Fetched post:', post);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
})();
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["simple-api-call.ts"]
}
