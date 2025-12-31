// Types for the data we'll fetch
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// A tiny helper to fetch and type the JSON response
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  // We trust the response shape here; in real code you might validate it
  return res.json() as Promise<T>;
}

// A bit of randomness for "random" behavior
function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Demo: fetch users, pick a random one, fetch their posts
async function randomUserPostsDemo() {
  try {
    const users = await fetchJson<User[]>('https://jsonplaceholder.typicode.com/users');
    const user = sample(users);

    console.log(`Selected user: ${user.name} (${user.email})`);

    const posts = await fetchJson<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    console.log(`User ${user.name} has ${posts.length} posts. Here are the titles:`);
    posts.forEach(p => console.log(`- ${p.title}`));
  } catch (err) {
  // If you want more robust errors, you can inspect (err as Error).message
    console.error('An error occurred while fetching data:', err);
  }
}

// Run the demo (works in browsers and in Node 18+ with global fetch)
randomUserPostsDemo();
