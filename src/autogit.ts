// Import the fetch function if you're using Node.js environment
// For browsers, fetch is available globally
// import fetch from 'node-fetch';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.statusText}`);
  }
  const posts: Post[] = await response.json();
  return posts;
}

async function main() {
  try {
    const posts = await fetchPosts();
    console.log(`Fetched ${posts.length} posts:`);
    posts.forEach(post => {
      console.log(`Post #${post.id} by User ${post.userId}: ${post.title}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
