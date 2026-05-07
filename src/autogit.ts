// fetch-posts.ts
import axios, { AxiosResponse } from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const response: AxiosResponse<Post[]> = await axios.get(url);
  return response.data;
}

async function main() {
  try {
    const posts = await fetchPosts();
    posts.forEach((p) => console.log(`[${p.id}] ${p.title}`));
  } catch (err) {
    console.error('Failed to fetch posts:', err);
  }
}

main();
# 1️⃣  Install dependencies
npm install axios

# 2️⃣  Compile to JavaScript
tsc fetch-posts.ts  # or use ts-node to avoid compiling a separate step

# 3️⃣  Execute
node fetch-posts.js
