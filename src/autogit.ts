// --------------------------------------------------------
// Random TypeScript demo:  GET data from a public API
// --------------------------------------------------------

// Install the needed deps if you run this in a Node project:
//   npm install --save node-fetch @types/node-fetch
//
// If you use this in a browser project, the browser's fetch is already available.

// Import the fetch shim for Node (uncomment if you run under Node)
// import fetch from 'node-fetch';

// A tiny helper to pause (useful for demo pacing)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// -------------------------------------------------------------------
// 1️⃣  Define the shape of the data we expect from the API
// -------------------------------------------------------------------
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// -------------------------------------------------------------------
// 2️⃣  A generic GET helper that returns typed JSON
// -------------------------------------------------------------------
async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    // We simply throw an error for this demo
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data: T = await response.json();
  return data;
}

// -------------------------------------------------------------------
// 3️⃣  Main demo logic
// -------------------------------------------------------------------
async function main() {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts/1';

  console.log('Fetching demo post...');
  try {
    const post = await get<Post>(apiEndpoint);
    console.log('✅ Post fetched:');
    console.log(`  • ID: ${post.id}`);
    console.log(`  • Title: ${post.title}`);
    console.log(`  • Body snippet: "${post.body.slice(0, 60)}..."`);
  } catch (err) {
    console.error('⚠️  Error while fetching:', err);
  }

  // -------------------------------------------------------------------
  // 4️⃣  Throw in a second request: list of all posts
  // -------------------------------------------------------------------
  console.log('\nFetching all posts (just the first 5 for brevity)...');
  try {
    const allPosts = await get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    console.table(allPosts.slice(0, 5));
  } catch (err) {
    console.error('⚠️  Error while fetching:', err);
  }

  // ---------------------------------------------------------------
  // 5️⃣  Optional: POST a new resource (mocked, won't persist)
  // ---------------------------------------------------------------
  console.log('\nAttempting to POST a new post...');
  try {
    const newPostResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Hello World',
        body: 'This post was created by the demo.',
        userId: 42
      })
    });
    const created: Post = await newPostResponse.json();
    console.log('✅ Created post (mocked):', created);
  } catch (err) {
    console.error('⚠️  Error while posting:', err);
  }

  // Small pause before exit (only matters if running in Node)
  await delay(500);
}

main();
