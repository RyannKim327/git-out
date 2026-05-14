// ──────────────────────────────────────────────────────────────
// 1️⃣  Imports & type definitions
// ──────────────────────────────────────────────────────────────
import fetch from 'node-fetch'; // npm i node-fetch@2
// If you’re in a browser environment just drop the import line
// and use the native `fetch` API.

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ──────────────────────────────────────────────────────────────
// 2️⃣  The async loader
// ──────────────────────────────────────────────────────────────
async function fetchPosts(apiUrl: string): Promise<Post[]> {
  // A quick sanity check – you don’t want to send an empty string.
  if (!apiUrl.trim()) {
    throw new Error('API URL cannot be empty');
  }

  const res = await fetch(apiUrl, {
    // JSON is the common output. Adjust headers if your API
    // requires authentication or special content‑type.
    headers: {
      Accept: 'application/json',
    },
    // A generous timeout – network latency can be unpredictable.
    timeout: 10_000,
  });

  if (!res.ok) {
    // Throw an error with the HTTP status so callers can catch it.
    throw new Error(`Network response was not OK (${res.status})`);
  }

  // We’ve decided the result is an array of posts. 
  // Narrow it to Post[] for full type safety.
  const data = (await res.json()) as Post[];

  return data;
}

// ──────────────────────────────────────────────────────────────
// 3️⃣  Entry point – usage example
// ──────────────────────────────────────────────────────────────
async function main() {
  try {
    // This is a free JSON placeholder service that offers fake blog posts.
    const posts = await fetchPosts('https://jsonplaceholder.typicode.com/posts');

    // Just log the first 3 for brevity
    console.log('🎉 Fetched', posts.length, 'posts. Here are the first 3:');
    posts.slice(0, 3).forEach((p, i) => {
      console.log(`\nPost #${i + 1}`);
      console.log(`ID: ${p.id}`);
      console.log(`Title: ${p.title}`);
      console.log(`Body: ${p.body.slice(0, 60)}…`);
    });
  } catch (err) {
    // A simple error handler – plug in your own logger if needed.
    console.error('❌ Failed to fetch posts:', err);
  }
}

main();
