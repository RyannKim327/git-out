// Import the fetch API (if you're running in an environment that doesn't support it natively)
// For Node.js, you might need to install node-fetch: npm install node-fetch
// import fetch from 'node-fetch';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Async function to fetch posts from JSONPlaceholder API
async function fetchPosts(): Promise<void> {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts: Post[] = await response.json();

    // Log the first post
    console.log('First post:', posts[0]);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Call the function
fetchPosts();
